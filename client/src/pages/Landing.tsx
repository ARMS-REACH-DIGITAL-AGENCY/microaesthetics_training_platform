import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Landing() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/microaesthetics-logo.png"
              alt="MicroAesthetics"
              className="h-10 w-auto"
            />
          </div>
          <Button
            className="bg-accent hover:bg-accent/90 text-white"
            onClick={() => navigate("/lead-capture")}
          >
            Start Free Chapter
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            The Micro Aesthetics Laser Tech Institute
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-semibold">
            Home of the MicroAesthetics Method by iZabel™
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master laser safety certification and become a certified laser technician. Start with our completely free Chapter 1 introduction to laser industry laws and regulations—no credit card required, no obligation to continue.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
            onClick={() => navigate("/lead-capture")}
          >
            Start Your Free Training
          </Button>
        </div>
      </section>

      {/* Chapter 1 Preview Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Chapter 1: Introduction to Laser Industry Laws & Agencies
            </h2>
            <p className="text-muted-foreground">
              Your free preview - completely complimentary, no strings attached
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">What You'll Learn</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Laser industry laws and regulations in Arizona</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>ANSI standards and safety protocols</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Laser classifications and safety requirements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Government agencies and compliance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Professional laser safety best practices</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Course Details</h3>
              <div className="space-y-3 text-foreground">
                <div>
                  <p className="font-semibold text-accent">Duration</p>
                  <p>45-60 minutes of professional content</p>
                </div>
                <div>
                  <p className="font-semibold text-accent">Format</p>
                  <p>37 professional slides with expert narration</p>
                </div>
                <div>
                  <p className="font-semibold text-accent">Instructor</p>
                  <p>iZabel - Founder of the MicroAesthetics Method</p>
                </div>
                <div>
                  <p className="font-semibold text-accent">Assessment</p>
                  <p>End-of-chapter quiz to test your knowledge</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted p-8 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              No credit card required. No obligation to continue. Just pure, professional laser safety education.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={() => navigate("/lead-capture")}
            >
              Access Chapter 1 Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container text-center text-sm">
          <p>© 2026 The MicroAesthetics Laser Tech Institute. All rights reserved.</p>
          <p className="mt-2">Home of the MicroAesthetics Method by iZabel™</p>
        </div>
      </footer>
    </div>
  );
}
