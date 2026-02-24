import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Check } from "lucide-react";

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

      {/* About the School Section */}
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
              Whether you're looking to start a new career, expand your existing business, or become a franchise partner, the MicroAesthetics Laser Tech Institute provides the education and support you need to achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* About Isabel Section */}
      <section className="py-16 md:py-20 px-4 bg-muted">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Meet iZabel
              </h2>
              <div className="space-y-4 text-foreground">
                <p>
                  iZabel is the founder of the MicroAesthetics Method and a recognized expert in aesthetic laser technology. With over 20 years of experience in the laser industry, she has dedicated her career to advancing professional standards and educating the next generation of laser technicians.
                </p>
                <p>
                  Her innovative teaching methodology combines cutting-edge laser science with practical, hands-on training. Students consistently praise her ability to make complex technical concepts accessible and engaging.
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

      {/* Welcome Message Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-8 md:p-12 rounded-lg border border-accent/20">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              A Personal Welcome from iZabel
            </h3>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Welcome to the MicroAesthetics Laser Tech Institute. I'm thrilled you're considering this journey into the laser technology field.
              </p>
              <p>
                Over my 20+ years in this industry, I've seen firsthand how transformative proper laser education can be. The difference between a mediocre laser technician and an exceptional one isn't just technical knowledge—it's a commitment to safety, continuous learning, and professional excellence.
              </p>
              <p>
                That's why I created this training program. I wanted to build something that goes beyond the basics and truly prepares you for success. Our free Chapter 1 is just the beginning—it's designed to give you a taste of what professional laser education should be.
              </p>
              <p>
                Whether you're just exploring the field or ready to commit to a full certification, I'm here to support your journey. Let's build something amazing together.
              </p>
              <p className="font-semibold text-accent pt-4">
                — iZabel, Founder of the MicroAesthetics Method
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 1 Preview Section */}
      <section className="py-16 md:py-20 px-4 bg-muted">
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

          <div className="bg-white p-8 rounded-lg text-center">
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

      {/* Three Packages Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-lg text-muted-foreground">
              Three flexible options designed for different goals and timelines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Package 1: Digital Learning */}
            <div className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">Digital Learning</h3>
                <p className="text-sm text-muted-foreground mt-2">Learn. Upgrade. Explore.</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-3xl font-bold text-accent">$497+</p>
                  <p className="text-sm text-muted-foreground">Individual courses</p>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Includes:</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>100% online access</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>On-demand modules</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Instant access</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Global reach</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Flexible scheduling</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Explore Courses
                </Button>
              </div>
            </div>

            {/* Package 2: Fast Track Skill Training */}
            <div className="border-2 border-accent rounded-lg overflow-hidden hover:shadow-lg transition relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold">
                Most Popular
              </div>
              <div className="bg-gradient-to-r from-accent to-accent/80 p-6 border-b border-accent text-white">
                <h3 className="text-xl font-bold">Fast Track Skill Training</h3>
                <p className="text-sm text-accent-foreground/90 mt-2">Upgrade your skills quickly</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-3xl font-bold text-accent">$3,700</p>
                  <p className="text-sm text-muted-foreground">Hands-on training</p>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Includes:</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Condensed hands-on sessions</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Laser protocols & techniques</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Live model training</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Flexible scheduling</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>No state certification</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Enroll Now
                </Button>
              </div>
            </div>

            {/* Package 3: State Certification Track */}
            <div className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">State Certification Track</h3>
                <p className="text-sm text-muted-foreground mt-2">Get certified. Get legal. Get ahead.</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-3xl font-bold text-accent">$10,500</p>
                  <p className="text-sm text-muted-foreground">Complete certification</p>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Includes:</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>40-hour didactic (board reported)</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>24 hours hands-on training</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>10 required applications</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>ADHS submission & certification</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Graduation certificate</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Placeholder) */}
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

      {/* FAQ Section (Placeholder) */}
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
                q: "How long does the certification take?",
                a: "Most students complete the certification in 4-8 weeks, depending on their pace and schedule.",
              },
              {
                q: "Do I need prior experience?",
                a: "No prior experience is required. Our curriculum is designed for beginners and experienced professionals alike.",
              },
              {
                q: "Is there job placement assistance?",
                a: "We provide career guidance and connect graduates with industry opportunities.",
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

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-accent to-accent/80">
        <div className="container max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 text-accent-foreground/90">
            Begin with our free Chapter 1 training. No credit card required, no obligation to continue.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-accent px-8 py-6 text-lg font-semibold"
            onClick={() => navigate("/lead-capture")}
          >
            Start Your Free Training Now
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
