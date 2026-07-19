/**
 * MicroAesthetics Laser Tech Institute — Lead Capture Page
 *
 * Collects name + email before granting access to free Chapter 1 training.
 * On submit, shows a confirmation/thank-you state with next steps.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LeadCapture() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Brief delay then go straight to Chapter 1 — no email gate
    setTimeout(() => {
      setLoading(false);
      navigate("/chapter1");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-border shadow-sm px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="font-bold text-lg text-foreground tracking-tight">
          MicroAesthetics
        </button>
        <span className="text-sm text-muted-foreground hidden sm:block">
          Free Chapter 1 Access
        </span>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              100% Free — No Credit Card Required
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Get Instant Access to Chapter 1
            </h1>
            <p className="text-muted-foreground">
              Enter your details below to start your free training on Arizona laser industry laws &amp; agencies.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-md border border-border p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Isabel"
                    value={form.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  Phone Number <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-base font-semibold"
              >
                {loading ? "Sending your access..." : "Get My Free Chapter 1 Now →"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to receive course information from MicroAesthetics. We respect your privacy and will never share your information.
              </p>
            </form>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-teal-600"><path d="M8 1l1.9 3.8 4.2.6-3 2.9.7 4.2L8 10.4l-3.8 2.1.7-4.2-3-2.9 4.2-.6z"/></svg>
              500+ Graduates
            </span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-teal-600"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 4v4m0-4h.01" strokeLinecap="round"/></svg>
              No Spam, Ever
            </span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-teal-600"><rect x="3" y="7" width="10" height="7" rx="1"/><path d="M5 7V5a3 3 0 016 0v2" strokeLinecap="round"/></svg>
              Secure & Private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
