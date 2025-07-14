import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_placeholder");

const CheckoutForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/checkout-success",
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Your tokens have been added!",
      });
      onSuccess();
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isLoading}
        className="w-full"
      >
        {isLoading ? "Processing..." : "Complete Payment"}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [upgradeOptions, setUpgradeOptions] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0.50);

  useEffect(() => {
    // Get upgrade options
    apiRequest("GET", "/api/upgrade-options")
      .then((res) => res.json())
      .then((data) => {
        setUpgradeOptions(data.options);
      })
      .catch(console.error);
  }, []);

  const createPaymentIntent = async (amount: number) => {
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { amount });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Payment intent creation failed:", error);
    }
  };

  useEffect(() => {
    if (selectedAmount > 0) {
      createPaymentIntent(selectedAmount);
    }
  }, [selectedAmount]);

  const handleSuccess = () => {
    window.location.href = "/";
  };

  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Stripe Not Configured</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Stripe payment processing is not yet configured. Please set up your Stripe keys.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Choose your upgrade package:
            </p>
            {upgradeOptions.map((option: any) => (
              <div
                key={option.id}
                className={`p-3 border rounded-lg cursor-pointer ${
                  selectedAmount === option.price ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setSelectedAmount(option.price)}
              >
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-muted-foreground">{option.description}</div>
                <div className="text-sm font-medium">${option.price.toFixed(2)} for {option.tokens} tokens</div>
              </div>
            ))}
          </div>
          
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm onSuccess={handleSuccess} />
            </Elements>
          )}
        </CardContent>
      </Card>
    </div>
  );
}