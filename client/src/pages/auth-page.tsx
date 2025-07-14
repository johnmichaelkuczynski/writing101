import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, CreditCard } from "lucide-react";
import { Redirect } from "wouter";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerForm);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Authentication Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Living Book Access</CardTitle>
            <CardDescription>
              Sign in or create an account to unlock full features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Username</Label>
                    <Input
                      id="login-username"
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      type="text"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Feature Overview */}
      <div className="flex-1 bg-muted p-8 flex items-center justify-center">
        <div className="max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Dictionary of Analytic Philosophy</h1>
            <p className="text-muted-foreground">
              Interactive AI-powered exploration of philosophical concepts
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <BookOpen className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Full Document Access</h3>
                <p className="text-sm text-muted-foreground">
                  Complete access to the entire dictionary with unlimited browsing
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Users className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Unlimited AI Conversations</h3>
                <p className="text-sm text-muted-foreground">
                  Full-length responses from multiple AI models for deep philosophical discussions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CreditCard className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Credit-Based System</h3>
                <p className="text-sm text-muted-foreground">
                  Start with 100 free credits, purchase more as needed. Guests get limited previews.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">Guest Access</h4>
            <p className="text-sm text-muted-foreground">
              Try the system without registering! You'll get:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• First 5 pages of content</li>
              <li>• 200-word AI response previews</li>
              <li>• Limited rewrite and quiz features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}