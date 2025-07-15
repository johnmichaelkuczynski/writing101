import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

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
  const [selectedAmount, setSelectedAmount] = useState(5.00);
  const { isAuthenticated, loading } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please register or log in before purchasing tokens.",
        variant: "destructive",
      });
      window.location.href = "/";
    }
  }, [isAuthenticated, loading, toast]);

  useEffect(() => {
    // Only load upgrade options if authenticated
    if (isAuthenticated) {
      apiRequest("/api/upgrade-options", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          console.log("Upgrade options loaded:", data);
          setUpgradeOptions(data.options || []);
        })
        .catch((error) => {
          console.error("Failed to load upgrade options:", error);
          setUpgradeOptions([]);
        });
    }
  }, [isAuthenticated]);

  const createPaymentIntent = async (amount: number) => {
    try {
      const response = await apiRequest("/api/create-payment-intent", { 
        method: "POST", 
        body: JSON.stringify({ amount }) 
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Payment intent creation failed:", error);
    }
  };

  useEffect(() => {
    if (selectedAmount > 0 && isAuthenticated) {
      createPaymentIntent(selectedAmount);
    }
  }, [selectedAmount, isAuthenticated]);

  const handleSuccess = () => {
    window.location.href = "/";
  };

  // Show loading while authentication is being checked
  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Checking authentication status...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, this should not render (redirected in useEffect)
  if (!isAuthenticated) {
    return null;
  }

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
            {upgradeOptions.length === 0 ? (
              <div className="p-3 border rounded-lg">
                <div className="text-center text-muted-foreground">
                  Loading upgrade options...
                </div>
              </div>
            ) : (
              upgradeOptions.map((option: any) => (
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
              ))
            )}
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