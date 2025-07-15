import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Load Stripe - check for valid public key
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripePublicKey) {
  console.error('Missing VITE_STRIPE_PUBLIC_KEY environment variable');
}
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreditOption {
  id: string;
  price: number; // in cents
  credits: number;
  label: string;
  description: string;
  popular?: boolean;
}

const creditOptions: CreditOption[] = [
  {
    id: "basic",
    price: 500, // $5.00
    credits: 5000,
    label: "$5 - 5,000 Credits",
    description: "Great for getting started",
  },
  {
    id: "premium",
    price: 1000, // $10.00
    credits: 20000,
    label: "$10 - 20,000 Credits",
    description: "Perfect for regular users",
  },
  {
    id: "professional",
    price: 10000, // $100.00
    credits: 500000,
    label: "$100 - 500,000 Credits",
    description: "For power users",
  },
  {
    id: "enterprise",
    price: 100000, // $1,000.00
    credits: 10000000,
    label: "$1,000 - 10,000,000 Credits",
    description: "Maximum value package",
  },
];

function CheckoutForm({ selectedOption, onSuccess }: { selectedOption: CreditOption; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful!",
          description: `${selectedOption.credits.toLocaleString()} credits added to your account`,
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium">{selectedOption.label}</h3>
        <p className="text-sm text-muted-foreground">{selectedOption.description}</p>
        <p className="text-2xl font-bold mt-2">${(selectedOption.price / 100).toFixed(2)}</p>
      </div>
      
      <PaymentElement />
      
      <Button type="submit" className="w-full" disabled={!stripe || isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Complete Purchase
          </>
        )}
      </Button>
    </form>
  );
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [selectedOption, setSelectedOption] = useState<CreditOption | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const createPaymentMutation = useMutation({
    mutationFn: async (option: CreditOption) => {
      console.log("Creating payment for option:", option);
      
      const response = await apiRequest("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: option.price,
          credits: option.credits,
        }),
        credentials: "include", // Ensure cookies are sent
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Payment creation successful:", data);
      setClientSecret(data.clientSecret);
      setIsCreatingPayment(false);
    },
    onError: (error) => {
      console.error("Payment creation error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to create payment. Please try again.",
        variant: "destructive",
      });
      setIsCreatingPayment(false);
    },
  });

  const handleSelectOption = async (option: CreditOption) => {
    setSelectedOption(option);
    setIsCreatingPayment(true);
    createPaymentMutation.mutate(option);
  };

  const handlePaymentSuccess = () => {
    setSelectedOption(null);
    setClientSecret(null);
    onClose();
    // Refresh user data to show updated credits
    window.location.reload();
  };

  const handleBack = () => {
    setSelectedOption(null);
    setClientSecret(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedOption ? "Complete Purchase" : "Buy Credits"}
          </DialogTitle>
          {user && (
            <p className="text-sm text-muted-foreground">
              Current balance: {user.credits.toLocaleString()} credits
            </p>
          )}
        </DialogHeader>

        {!selectedOption ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {creditOptions.map((option) => (
                <Card
                  key={option.id}
                  className="cursor-pointer transition-all hover:shadow-md border-2"
                  onClick={() => handleSelectOption(option)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{option.label}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">
                        ${(option.price / 100).toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {option.credits.toLocaleString()} credits
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ≈ ${((option.price / 100) / option.credits * 1000).toFixed(3)}/1000 credits
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>• Credits are used for AI responses, rewrites, and other features</p>
              <p>• No subscription required - pay only for what you use</p>
              <p>• Secure payment processing by Stripe</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isCreatingPayment ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Setting up payment...</span>
              </div>
            ) : clientSecret && stripePromise ? (
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                  },
                }}
              >
                <CheckoutForm 
                  selectedOption={selectedOption} 
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            ) : !stripePromise ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">Payment system not available</p>
                <p className="text-sm text-muted-foreground">
                  Stripe configuration is missing. Please contact support.
                </p>
              </div>
            ) : null}
            
            <Button variant="outline" onClick={handleBack} className="w-full">
              ← Back to Options
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}