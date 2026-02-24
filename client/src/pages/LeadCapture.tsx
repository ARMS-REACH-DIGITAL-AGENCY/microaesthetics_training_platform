import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function LeadCapture() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"basic" | "optional">("basic");
  const [isLoading, setIsLoading] = useState(false);

  // Mandatory fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Optional fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [dob, setDob] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const captureLead = trpc.leads.capture.useMutation();

  const validateBasicFields = () => {
    if (!firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Valid email is required");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    return true;
  };

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateBasicFields()) {
      setStep("optional");
    }
  };

  const handleOptionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Combine name for backward compatibility
      const fullName = `${firstName} ${lastName}`;

      const result = await captureLead.mutateAsync({
        name: fullName,
        email,
      });

      if (result?.accessToken) {
        // Store all captured data in localStorage
        localStorage.setItem("chapter1_access_token", result.accessToken);
        localStorage.setItem("lead_firstName", firstName);
        localStorage.setItem("lead_lastName", lastName);
        localStorage.setItem("lead_email", email);
        localStorage.setItem("lead_phone", phone);
        localStorage.setItem("lead_address", address);
        localStorage.setItem("lead_city", city);
        localStorage.setItem("lead_state", state);
        localStorage.setItem("lead_zip", zip);
        localStorage.setItem("lead_dob", dob);
        localStorage.setItem("lead_emergencyContact", emergencyContact);
        localStorage.setItem("lead_emergencyPhone", emergencyPhone);

        // Open training in new window
        const trainingWindow = window.open("/chapter1", "_blank");
        if (!trainingWindow) {
          toast.error("Please allow pop-ups to open the training module");
          return;
        }

        toast.success("Welcome! Your training is opening in a new window...");
        // Keep the homepage open
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

          {/* Step Indicator */}
          <div className="flex gap-2 mb-6">
            <div
              className={`flex-1 h-2 rounded ${
                step === "basic" ? "bg-accent" : "bg-muted"
              }`}
            />
            <div
              className={`flex-1 h-2 rounded ${
                step === "optional" ? "bg-accent" : "bg-muted"
              }`}
            />
          </div>

          {/* Basic Information Form */}
          {step === "basic" && (
            <form onSubmit={handleBasicSubmit} className="space-y-4">
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground mb-4">
                  Required Information *
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 mt-6"
              >
                Continue
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                * Required fields
              </p>
            </form>
          )}

          {/* Optional Information Form */}
          {step === "optional" && (
            <form onSubmit={handleOptionalSubmit} className="space-y-4">
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Additional Information (Optional)
                </p>
                <p className="text-xs text-muted-foreground">
                  Help us serve you better. You can skip these fields.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mailing Address
                </label>
                <Input
                  type="text"
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    placeholder="Phoenix"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    State
                  </label>
                  <Input
                    type="text"
                    placeholder="AZ"
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                    disabled={isLoading}
                    maxLength={2}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ZIP Code
                </label>
                <Input
                  type="text"
                  placeholder="85001"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Emergency Contact Name
                </label>
                <Input
                  type="text"
                  placeholder="Jane Doe"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Emergency Contact Phone
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 987-6543"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => setStep("basic")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold"
                >
                  {isLoading ? "Processing..." : "Start Free Training"}
                </Button>
              </div>
            </form>
          )}

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
