import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Crown, Zap, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PRICING_TIERS } from "@shared/schema";

interface UpgradeWallProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: "preview" | "page_limit" | "feature_access";
}

export default function UpgradeWall({ isOpen, onClose, trigger }: UpgradeWallProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = authMode === "register" ? "/api/auth/register" : "/api/auth/login";
      const body = authMode === "register" 
        ? { username: formData.username, email: formData.email || undefined, password: formData.password }
        : { username: formData.username, password: formData.password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Success!",
          description: `${authMode === "register" ? "Account created" : "Logged in"} successfully`,
        });
        window.location.reload(); // Refresh to update auth state
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || `${authMode} failed`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Connection failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (tierId: string) => {
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  if (showAuth) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{authMode === "register" ? "Create Account" : "Sign In"}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
                minLength={3}
              />
            </div>
            
            {authMode === "register" && (
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                minLength={6}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : (authMode === "register" ? "Create Account" : "Sign In")}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setAuthMode(authMode === "register" ? "login" : "register")}
            >
              {authMode === "register" ? "Already have an account? Sign in" : "Need an account? Register"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Unlock the Complete Dictionary
          </DialogTitle>
          <p className="text-muted-foreground max-w-md mx-auto">
            You're viewing the preview version. Get full access to all sections plus premium AI features.
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 my-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Preview Access
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• First 5 sections only</li>
              <li>• Limited AI responses (200 words)</li>
              <li>• Basic text selection</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-blue-500" />
              Full Access
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Complete Dictionary (all sections)</li>
              <li>• Unlimited AI interactions</li>
              <li>• Test rewriting & analysis</li>
              <li>• Passage discussions</li>
              <li>• Long-term storage</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-center">Choose Your Plan</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(PRICING_TIERS).map(([tierId, tier]) => (
              <Card key={tierId} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{tier.description.split(' ')[0]}</CardTitle>
                  <p className="text-2xl font-bold text-blue-600">
                    {tier.description.split(' → ')[1]}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handlePurchase(tierId)}
                    className="w-full"
                    variant={tierId === "tier2" ? "default" : "outline"}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t">
          <Button onClick={() => window.location.href = '/checkout'} className="flex-1 bg-green-600 hover:bg-green-700">
            <Zap className="w-4 h-4 mr-2" />
            Upgrade for 1¢
          </Button>
          <Button onClick={() => setShowAuth(true)} variant="outline" className="flex-1">
            <Crown className="w-4 h-4 mr-2" />
            Create Account
          </Button>
          <Button variant="outline" onClick={() => { setShowAuth(true); setAuthMode("login"); }} className="flex-1">
            Sign In
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Join thousands exploring philosophical masterworks with AI-powered insights
        </p>
      </DialogContent>
    </Dialog>
  );
}