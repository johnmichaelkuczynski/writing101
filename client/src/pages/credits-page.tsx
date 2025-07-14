import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, Star, Crown } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from "@/hooks/use-toast";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const creditTierData = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: 5,
    credits: 5000,
    icon: Zap,
    popular: false
  },
  {
    id: 'power',
    name: 'Power User',
    price: 10,
    credits: 20000,
    icon: Star,
    popular: true
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 100,
    credits: 500000,
    icon: Crown,
    popular: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 1000,
    credits: 10000000,
    icon: CreditCard,
    popular: false
  }
];

export default function CreditsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handlePurchase = async (tierId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to purchase credits",
        variant: "destructive",
      });
      return;
    }

    setPurchasing(tierId);
    
    try {
      // Create payment intent
      const response = await fetch('/api/purchase-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ tier: tierId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/credits?success=true`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast({
        title: "Purchase failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Credit Packages</h1>
        <p className="text-muted-foreground">
          Choose the right package for your philosophical exploration needs
        </p>
        {user && (
          <div className="mt-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Current Credits: {user.credits.toLocaleString()}
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {creditTierData.map((tier) => {
          const Icon = tier.icon;
          return (
            <Card key={tier.id} className={`relative ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
              {tier.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <Icon className="h-12 w-12 mx-auto mb-2 text-primary" />
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">${tier.price}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {tier.credits.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Credits</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>≈ {Math.floor(tier.credits / 10)} chat responses</div>
                  <div>≈ {Math.floor(tier.credits / 50)} document rewrites</div>
                  <div>≈ {Math.floor(tier.credits / 30)} quiz generations</div>
                  <div>≈ {Math.floor(tier.credits / 40)} study guides</div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handlePurchase(tier.id)}
                  disabled={purchasing === tier.id || !user}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {purchasing === tier.id ? "Processing..." : 
                   !user ? "Login Required" : 
                   "Purchase"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How Credits Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Credit Usage</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Chat conversations: 10 credits per response</li>
              <li>• Document rewriting: 50 credits per rewrite</li>
              <li>• Quiz generation: 30 credits per quiz</li>
              <li>• Study guide creation: 40 credits per guide</li>
              <li>• Passage discussions: 15 credits per response</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Storage Fees</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 500 credits per month for storing 50,000 words</li>
              <li>• Only applies to documents stored between sessions</li>
              <li>• No storage fees for the base dictionary content</li>
              <li>• Automatic cleanup of old content to minimize costs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}