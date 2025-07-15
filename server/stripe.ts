import Stripe from "stripe";
import { storage } from "./storage";
import type { PurchaseRequest } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function createPaymentIntent(userId: number, purchaseData: PurchaseRequest) {
  try {
    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: purchaseData.amount, // amount in cents
      currency: "usd",
      metadata: {
        userId: userId.toString(),
        credits: purchaseData.credits.toString(),
      },
    });

    // Store the purchase record
    await storage.createPurchase({
      userId,
      amount: purchaseData.amount,
      credits: purchaseData.credits,
      stripePaymentIntentId: paymentIntent.id,
      status: "pending",
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

export async function handleWebhook(body: Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_1PHILOSOPHYDICTIONARY;
  
  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET_1PHILOSOPHYDICTIONARY');
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handleSuccessfulPayment(paymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        await handleFailedPayment(failedPaymentIntent);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const { userId, credits } = paymentIntent.metadata;
  
  if (!userId || !credits) {
    console.error('Missing metadata in payment intent:', paymentIntent.id);
    return;
  }

  try {
    // Find the purchase by payment intent ID
    const purchases = await storage.getPurchasesByUserId(parseInt(userId));
    const purchase = purchases.find(p => p.stripePaymentIntentId === paymentIntent.id);
    
    if (!purchase) {
      console.error('Purchase not found for payment intent:', paymentIntent.id);
      return;
    }

    // Update purchase status
    await storage.updatePurchaseStatus(purchase.id, 'completed');

    // Add credits to user
    const user = await storage.getUserById(parseInt(userId));
    if (user) {
      const newCredits = (user.credits || 0) + parseInt(credits);
      await storage.updateUserCredits(user.id, newCredits);
      console.log(`Added ${credits} credits to user ${userId}. New total: ${newCredits}`);
    }
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const { userId } = paymentIntent.metadata;
  
  if (!userId) {
    console.error('Missing userId in failed payment intent:', paymentIntent.id);
    return;
  }

  try {
    // Find the purchase by payment intent ID
    const purchases = await storage.getPurchasesByUserId(parseInt(userId));
    const purchase = purchases.find(p => p.stripePaymentIntentId === paymentIntent.id);
    
    if (purchase) {
      await storage.updatePurchaseStatus(purchase.id, 'failed');
      console.log(`Payment failed for purchase ${purchase.id}`);
    }
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}