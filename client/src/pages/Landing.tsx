import { useLocation } from "wouter";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      {/* HERO SECTION - Minimal, Direct, Action-Focused */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left: Main Message */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Get Licensed as a Laser Technician in 40 Hours
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Master Arizona's laser safety regulations and industry standards
              </p>
              <p className="text-base text-muted-foreground mb-6">
                Free Chapter 1 training reveals everything you need to know about laser laws, agencies, and ANSI standards—no credit card required.
              </p>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
                onClick={() => navigate("/lead-capture")}
              >
                Get Free Chapter 1
              </Button>
            </div>

            {/* Right: Small Isabel Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/wsfdHBiAIbeBmhbN.png"
                alt="iZabel - Founder"
                className="w-full max-w-xs rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 1 PREVIEW - Show Them What They'll Get */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Chapter 1: Introduction to Laser Industry Laws & Agencies
            </h2>
            <p className="text-muted-foreground text-lg">
              Your free preview—completely complimentary, no strings attached
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
                  <p>36 professional slides with expert narration</p>
                </div>
                <div>
                  <p className="font-semibold text-accent">Access</p>
                  <p>Instant access after signing up</p>
                </div>
                <div>
                  <p className="font-semibold text-accent">Certificate</p>
                  <p>Quiz at the end with instant results</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
              onClick={() => navigate("/lead-capture")}
            >
              Start Your Free Training Now
            </Button>
          </div>
        </div>
      </section>

      {/* THREE PATHS - The Value Ladder */}
      <section className="py-16 md:py-20 px-4 bg-muted">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              One Institute. Three Paths. Your Future.
            </h2>
            <p className="text-muted-foreground text-lg">
              The MicroAesthetics Method™: One platform, three distinct journeys.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Path 1: Digital Learning */}
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                DIGITAL LEARNING:
              </h3>
              <p className="text-lg font-bold text-blue-900 mb-6">
                START LEARNING TODAY
              </p>
              <div className="mb-6 h-32 flex items-center justify-center">
                <div className="text-6xl">📱</div>
              </div>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="text-blue-600">●</span>
                  <span>100% online, on-demand modules</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">●</span>
                  <span>Covering laser physics and safety basics for curious learners.</span>
                </li>
              </ul>
            </div>

            {/* Path 2: Fast Track (Most Popular) */}
            <div className="bg-orange-50 rounded-lg p-8 border-2 border-orange-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-400 text-white px-4 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">
                FAST TRACK:
              </h3>
              <p className="text-lg font-bold text-orange-900 mb-6">
                HANDS-ON SKILL MASTERY
              </p>
              <div className="mb-6 h-32 flex items-center justify-center">
                <div className="text-6xl">🔧</div>
              </div>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="text-orange-600">★</span>
                  <span>Focused, condensed training with live models</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600">★</span>
                  <span>For experienced practitioners adding new skills without state certification.</span>
                </li>
              </ul>
            </div>

            {/* Path 3: State Certification */}
            <div className="bg-green-50 rounded-lg p-8 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-2">
                STATE CERTIFICATION:
              </h3>
              <p className="text-lg font-bold text-green-900 mb-6">
                BECOME A LICENSED PROFESSIONAL
              </p>
              <div className="mb-6 h-32 flex items-center justify-center">
                <div className="text-6xl">🏆</div>
              </div>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="text-green-600">🛡</span>
                  <span>The premium Arizona track</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">🛡</span>
                  <span>Featuring 40 hours of didactic learning and 24 hours of hands-on application for full licensure.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Quick Credibility */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-accent mb-2">500+</p>
              <p className="text-foreground">Graduates Trained</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">95%</p>
              <p className="text-foreground">Certification Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">20+</p>
              <p className="text-foreground">Years of Industry Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ISABEL - Build Trust in the Guide */}
      <section className="py-16 md:py-20 px-4 bg-muted">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Meet Your Instructor: iZabel
              </h2>
              <div className="space-y-4 text-foreground">
                <p>
                  iZabel is the founder of the MicroAesthetics Method and a recognized expert in aesthetic laser technology. With over 20 years of experience in the laser industry, she has dedicated her career to advancing professional standards and educating the next generation of laser technicians.
                </p>
                <div className="pt-4 space-y-2">
                  <p className="font-semibold text-accent">Credentials & Expertise:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Certified Laser Safety Officer</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>ANSI Z136.3 Compliance Expert</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Founder of the MicroAesthetics Method</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Industry Speaker & Consultant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/wsfdHBiAIbeBmhbN.png"
                alt="iZabel - Founder"
                className="w-full max-w-sm rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE SCHOOL - Lower Priority */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              About The MicroAesthetics Laser Tech Institute
            </h2>
          </div>
          <div className="prose prose-sm max-w-none text-foreground space-y-4">
            <p>
              The MicroAesthetics Laser Tech Institute is Arizona's premier training facility for aspiring laser technicians. Founded on the principle that professional laser education should be accessible, comprehensive, and practical, we've trained hundreds of successful laser technicians who are now thriving in the aesthetic and medical laser industry.
            </p>
            <p>
              Our curriculum is built on real-world experience and the latest industry standards. We don't just teach theory—we teach the practical skills, safety protocols, and professional knowledge you need to succeed as a certified laser technician.
            </p>
            <p>
              Whether you're looking to start a new career, expand your existing business, or advance your professional credentials, the MicroAesthetics Laser Tech Institute provides the education and support you need to achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-20 px-4 bg-muted">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "Placeholder testimonial from a satisfied student. This will be replaced with real feedback from graduates."
                </p>
                <p className="font-semibold text-foreground text-sm">Student Name</p>
                <p className="text-muted-foreground text-sm">Certified Laser Technician</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is Chapter 1 really free?",
                a: "Yes, completely free. No credit card required, no hidden fees, no obligation to continue.",
              },
              {
                q: "How long does Chapter 1 take?",
                a: "45-60 minutes of professional content covering laser laws, agencies, and ANSI standards.",
              },
              {
                q: "Will I get certified from Chapter 1?",
                a: "Chapter 1 is a foundation course. Full certification requires the State Certification Track (40 hours didactic + 24 hours hands-on).",
              },
              {
                q: "What's the difference between the three paths?",
                a: "Digital Learning is 100% online for flexible learning. Fast Track offers hands-on skills without state certification. State Certification Track provides full ADHS certification and legal authorization to practice.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-accent to-accent/80">
        <div className="container max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Licensed?
          </h2>
          <p className="text-lg mb-8 text-accent-foreground/90">
            Start with our free Chapter 1 training. No credit card required, no obligation to continue.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-accent px-8 py-6 text-lg font-semibold"
            onClick={() => navigate("/lead-capture")}
          >
            Get Free Chapter 1 Now
          </Button>
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
