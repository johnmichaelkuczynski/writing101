import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentOption {
  amount: number; // in cents
  credits: number;
  label: string;
  description: string;
}

const paymentOptions: PaymentOption[] = [
  { amount: 500, credits: 5000, label: "$5", description: "5,000 credits" },
  { amount: 1000, credits: 20000, label: "$10", description: "20,000 credits" },
  { amount: 10000, credits: 500000, label: "$100", description: "500,000 credits" },
  { amount: 100000, credits: 10000000, label: "$1,000", description: "10,000,000 credits" },
];

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!selectedOption) {
      toast({
        title: "No option selected",
        description: "Please select a credit package first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", selectedOption);
      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Purchase Credits</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {paymentOptions.map((option, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all ${
                selectedOption?.amount === option.amount 
                  ? "ring-2 ring-primary bg-primary/5" 
                  : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {option.description}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
          
          <div className="flex space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase}
              disabled={!selectedOption || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Purchase
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}