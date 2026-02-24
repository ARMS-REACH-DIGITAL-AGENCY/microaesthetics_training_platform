import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function LeadCapture() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const captureLead = trpc.leads.capture.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const result = await captureLead.mutateAsync({ name, email });
      if (result?.accessToken) {
        // Store the access token in localStorage
        localStorage.setItem("chapter1_access_token", result.accessToken);
        localStorage.setItem("lead_name", name);
        localStorage.setItem("lead_email", email);

        // Navigate to Chapter 1
        navigate("/chapter1");
        toast.success("Welcome! Starting your training...");
      }
    } catch (error: any) {
      const errorMessage =
        error?.message || "Failed to process your information. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md bg-white">
        <div className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/microaesthetics-logo.png"
              alt="MicroAesthetics"
              className="h-12 w-auto mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Unlock Your Free Training
            </h1>
            <p className="text-muted-foreground text-sm">
              Get instant access to Chapter 1: Introduction to Laser Industry Laws & Agencies
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2"
            >
              {isLoading ? "Processing..." : "Start Free Training"}
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-4 font-semibold">
              WHAT YOU GET:
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>37 professional slides</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Expert narration by iZabel</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>End-of-chapter quiz</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>45-60 minutes of content</span>
              </li>
            </ul>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            We respect your privacy. Your information will never be shared or sold.
          </p>
        </div>
      </Card>
    </div>
  );
}
