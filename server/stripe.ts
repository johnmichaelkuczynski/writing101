import Stripe from "stripe";
import { storage } from "./storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export interface CreatePaymentIntentRequest {
  amount: number; // amount in cents
  credits: number;
}

export async function createPaymentIntent(userId: number, data: CreatePaymentIntentRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${data.credits.toLocaleString()} Credits`,
              description: `Purchase ${data.credits.toLocaleString()} credits for the Living Book application`,
            },
            unit_amount: data.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/success`,
      cancel_url: `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/`,
      metadata: {
        user_id: userId.toString(),
        credits: data.credits.toString(),
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment session");
  }
}

export async function handleWebhook(body: Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_1PHILOSOPHYDICTIONARY;
  
  if (!webhookSecret) {
    throw new Error('Missing webhook secret');
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const userId = parseInt(session.metadata?.user_id || '0');
    const credits = parseInt(session.metadata?.credits || '0');
    
    if (userId && credits) {
      try {
        // Get current user to add credits
        const user = await storage.getUserById(userId);
        if (user) {
          const newCredits = (user.credits || 0) + credits;
          await storage.updateUserCredits(userId, newCredits);
          console.log(`Added ${credits} credits to user ${userId}, new total: ${newCredits}`);
        }
      } catch (error) {
        console.error('Error updating user credits:', error);
      }
    }
  }

  return { received: true };
}