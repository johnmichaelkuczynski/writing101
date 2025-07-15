import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function SuccessPage() {
  const [, setLocation] = useLocation();
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Refresh user data to get updated credits
    const refreshCredits = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error("Failed to refresh user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure webhook has processed
    const timer = setTimeout(refreshCredits, 2000);
    return () => clearTimeout(timer);
  }, [refreshUser]);

  const handleContinue = () => {
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <h2 className="text-xl font-semibold">Processing your payment...</h2>
              <p className="text-muted-foreground">
                Please wait while we update your account.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your credits have been added to your account.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {user && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Your current balance:</p>
              <p className="text-2xl font-bold text-primary">
                {(user.credits || 0).toLocaleString()} credits
              </p>
            </div>
          )}
          
          <Button onClick={handleContinue} className="w-full">
            Continue to Living Book
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}