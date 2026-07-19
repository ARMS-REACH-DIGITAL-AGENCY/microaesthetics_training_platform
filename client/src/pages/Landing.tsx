/**
 * MicroAesthetics Laser Tech Institute — Landing Page
 * Faithful rebuild of the original site with these fixes applied:
 *   1. Hero headline: "Complete Your 88-Hour Laser Technician Certification — Start with Chapter 1 Free"
 *   2. State Certification: 40 hrs didactic + 48 hrs hands-on (was 24)
 *   3. FAQ: corrected hours reference
 *   4. Three Paths: professional SVG illustrations replacing emoji
 *   5. About School section with building image preserved
 *   6. Footer with copyright and tagline
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ── Lead Capture Modal ────────────────────────────────────────────────────────
function LeadCaptureModal({ onClose }: { onClose: () => void }) {
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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/chapter1"); }, 800);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Header */}
        <div className="bg-teal-600 px-6 pt-6 pb-5 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            100% Free — No Credit Card Required
          </div>
          <h2 className="text-xl font-bold mb-1">Get Instant Access to Chapter 1</h2>
          <p className="text-teal-100 text-sm">Enter your details to start your free training on Arizona laser laws &amp; agencies.</p>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="m-firstName" className="text-xs">First Name <span className="text-destructive">*</span></Label>
                <Input id="m-firstName" name="firstName" placeholder="Isabel" value={form.firstName} onChange={handleChange} className={errors.firstName ? "border-destructive" : ""} />
                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="m-lastName" className="text-xs">Last Name <span className="text-destructive">*</span></Label>
                <Input id="m-lastName" name="lastName" placeholder="Smith" value={form.lastName} onChange={handleChange} className={errors.lastName ? "border-destructive" : ""} />
                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="m-email" className="text-xs">Email Address <span className="text-destructive">*</span></Label>
              <Input id="m-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={errors.email ? "border-destructive" : ""} />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="m-phone" className="text-xs">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input id="m-phone" name="phone" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={handleChange} />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
              {loading ? "Sending your access..." : "Get My Free Chapter 1 Now →"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">We respect your privacy and will never share your information.</p>
          </form>
        </div>

        {/* Trust signals */}
        <div className="border-t border-border px-6 py-3 flex items-center justify-center gap-5 text-xs text-muted-foreground bg-gray-50 rounded-b-2xl">
          <span className="flex items-center gap-1"><svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-teal-600"><path d="M8 1l1.9 3.8 4.2.6-3 2.9.7 4.2L8 10.4l-3.8 2.1.7-4.2-3-2.9 4.2-.6z"/></svg>500+ Graduates</span>
          <span className="flex items-center gap-1"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-teal-600"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 4v4m0-4h.01" strokeLinecap="round"/></svg>No Spam, Ever</span>
          <span className="flex items-center gap-1"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-teal-600"><rect x="3" y="7" width="10" height="7" rx="1"/><path d="M5 7V5a3 3 0 016 0v2" strokeLinecap="round"/></svg>Secure &amp; Private</span>
        </div>
      </div>
    </div>
  );
}

// ── SVG Illustrations ──────────────────────────────────────────────────────

function DigitalLearningIllustration() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-20 mx-auto">
      <rect x="15" y="10" width="90" height="58" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="22" y="16" width="76" height="44" rx="2" fill="#eff6ff"/>
      <rect x="28" y="22" width="40" height="4" rx="2" fill="#3b82f6" opacity="0.7"/>
      <rect x="28" y="30" width="60" height="3" rx="1.5" fill="#93c5fd"/>
      <rect x="28" y="36" width="50" height="3" rx="1.5" fill="#93c5fd"/>
      <rect x="28" y="42" width="55" height="3" rx="1.5" fill="#93c5fd"/>
      <circle cx="82" cy="36" r="10" fill="#3b82f6" opacity="0.15"/>
      <polygon points="78,31 78,41 88,36" fill="#3b82f6"/>
      <rect x="5" y="68" width="110" height="6" rx="3" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
      <rect x="50" y="68" width="20" height="3" rx="1.5" fill="#93c5fd"/>
      <path d="M55 55 Q60 50 65 55" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M51 51 Q60 43 69 51" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <circle cx="60" cy="58" r="2" fill="#3b82f6"/>
    </svg>
  );
}

function FastTrackIllustration() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-20 mx-auto">
      <rect x="30" y="20" width="60" height="30" rx="6" fill="#fed7aa" stroke="#f97316" strokeWidth="2"/>
      <rect x="36" y="26" width="28" height="18" rx="2" fill="#fff7ed"/>
      <rect x="39" y="29" width="16" height="3" rx="1" fill="#f97316" opacity="0.7"/>
      <rect x="39" y="35" width="20" height="2" rx="1" fill="#fdba74"/>
      <rect x="39" y="40" width="14" height="2" rx="1" fill="#fdba74"/>
      <circle cx="82" cy="35" r="6" fill="#f97316" opacity="0.2"/>
      <circle cx="82" cy="35" r="3" fill="#f97316"/>
      <line x1="90" y1="35" x2="115" y2="35" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4 2"/>
      <circle cx="115" cy="35" r="4" fill="#fef3c7" stroke="#f97316" strokeWidth="1.5"/>
      <rect x="50" y="50" width="20" height="22" rx="4" fill="#fed7aa" stroke="#f97316" strokeWidth="2"/>
      <ellipse cx="42" cy="62" rx="12" ry="7" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
      <ellipse cx="78" cy="62" rx="12" ry="7" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
      <text x="8" y="28" fontSize="10" fill="#f97316">★</text>
      <text x="100" y="22" fontSize="8" fill="#f97316" opacity="0.6">★</text>
    </svg>
  );
}

function StateCertificationIllustration() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-20 mx-auto">
      <rect x="10" y="8" width="80" height="62" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <rect x="10" y="8" width="80" height="14" rx="3" fill="#16a34a"/>
      <rect x="10" y="17" width="80" height="5" fill="#16a34a"/>
      <rect x="20" y="12" width="60" height="4" rx="2" fill="white" opacity="0.9"/>
      <rect x="20" y="28" width="60" height="3" rx="1.5" fill="#bbf7d0"/>
      <rect x="20" y="34" width="50" height="3" rx="1.5" fill="#bbf7d0"/>
      <rect x="20" y="40" width="55" height="3" rx="1.5" fill="#bbf7d0"/>
      <line x1="20" y1="60" x2="45" y2="60" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="55" y1="60" x2="80" y2="60" stroke="#16a34a" strokeWidth="1.5"/>
      <circle cx="95" cy="55" r="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="95" cy="55" r="13" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="3 2"/>
      <text x="87" y="60" fontSize="14" fill="#16a34a">★</text>
      <text x="76" y="76" fontSize="5.5" fill="#16a34a" fontWeight="bold">ARIZONA</text>
      <path d="M88 73 L92 80 L95 73 L98 80 L102 73" stroke="#16a34a" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function Landing() {
  const [, navigate] = useLocation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {showModal && <LeadCaptureModal onClose={() => setShowModal(false)} />}

      {/* ── NAVIGATION ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663380477995/pyHDXWQJoRMIconk.png"
            alt="MicroAesthetics Laser Tech Institute"
            className="h-10 w-auto"
          />
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => setShowModal(true)}
          >
            Start Free Chapter
          </Button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-3 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/wsfdHBiAIbeBmhbN.png"
                alt="iZabel - Founder"
                className="w-full max-w-[180px] md:max-w-[200px] rounded-lg shadow-lg object-cover object-top"
                style={{maxHeight: '280px'}}
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                Complete Your 88-Hour<br />Laser Technician Certification<br />Start with Chapter 1 Free
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Master Arizona's laser safety regulations and industry standards
              </p>
              <p className="text-base text-muted-foreground mb-6">
                Free Chapter 1 training reveals everything you need to know about laser laws, agencies, and ANSI standards—no credit card required.
              </p>
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg"
                onClick={() => setShowModal(true)}
              >
                Get Free Chapter 1
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 1 PREVIEW ── */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Chapter 1: Introduction to Laser Industry Laws &amp; Agencies
            </h2>
            <p className="text-muted-foreground text-lg">
              Your free preview—completely complimentary, no strings attached
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">What You'll Learn</h3>
              <ul className="space-y-3 text-foreground">
                {[
                  "Laser industry laws and regulations in Arizona",
                  "ANSI standards and safety protocols",
                  "Laser classifications and safety requirements",
                  "Government agencies and compliance",
                  "Professional laser safety best practices",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Course Details</h3>
              <div className="space-y-3">
                {[
                  { label: "Duration", value: "45-60 minutes of professional content" },
                  { label: "Format", value: "36 professional slides with expert narration" },
                  { label: "Access", value: "Instant access after signing up" },
                  { label: "Certificate", value: "Quiz at the end with instant results" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-semibold text-teal-600">{label}</p>
                    <p className="text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg"
              onClick={() => setShowModal(true)}
            >
              Start Your Free Training Now
            </Button>
          </div>
        </div>
      </section>

      {/* ── THREE PATHS ── */}
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
            {/* Digital Learning */}
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200 flex flex-col">
              <h3 className="text-xl font-bold text-blue-900 mb-1">DIGITAL LEARNING:</h3>
              <p className="text-lg font-bold text-blue-900 mb-6">START LEARNING TODAY</p>
              <div className="mb-6 flex items-center justify-center h-24">
                <DigitalLearningIllustration />
              </div>
              <ul className="space-y-2 text-sm text-foreground mt-auto">
                <li className="flex gap-2"><span className="text-blue-600">●</span><span>100% online, on-demand modules</span></li>
                <li className="flex gap-2"><span className="text-blue-600">●</span><span>Covering laser physics and safety basics for curious learners.</span></li>
              </ul>
            </div>
            {/* Fast Track */}
            <div className="bg-orange-50 rounded-lg p-8 border-2 border-orange-400 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-1">FAST TRACK:</h3>
              <p className="text-lg font-bold text-orange-900 mb-6">HANDS-ON SKILL MASTERY</p>
              <div className="mb-6 flex items-center justify-center h-24">
                <FastTrackIllustration />
              </div>
              <ul className="space-y-2 text-sm text-foreground mt-auto">
                <li className="flex gap-2"><span className="text-orange-500">★</span><span>Focused, condensed training with live models</span></li>
                <li className="flex gap-2"><span className="text-orange-500">★</span><span>For experienced practitioners adding new skills without state certification.</span></li>
              </ul>
            </div>
            {/* State Certification */}
            <div className="bg-green-50 rounded-lg p-8 border border-green-200 flex flex-col">
              <h3 className="text-xl font-bold text-green-900 mb-1">STATE CERTIFICATION:</h3>
              <p className="text-lg font-bold text-green-900 mb-6">BECOME A LICENSED PROFESSIONAL</p>
              <div className="mb-6 flex items-center justify-center h-24">
                <StateCertificationIllustration />
              </div>
              <ul className="space-y-2 text-sm text-foreground mt-auto">
                <li className="flex gap-2"><span className="text-green-600">🛡</span><span>The premium Arizona track</span></li>
                <li className="flex gap-2"><span className="text-green-600">🛡</span><span>Featuring 40 hours of didactic learning and 48 hours of hands-on application for full licensure.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "500+", label: "Graduates Trained" },
              { value: "95%", label: "Certification Success Rate" },
              { value: "20+", label: "Years of Industry Experience" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl md:text-4xl font-bold text-teal-600">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET INSTRUCTOR ── */}
      <section className="py-16 md:py-20 px-4 bg-muted">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Meet Your Instructor: iZabel
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-foreground mb-4">
              iZabel is the founder of the MicroAesthetics Method and a recognized expert in aesthetic laser technology. With over 20 years of experience in the laser industry, she has dedicated her career to advancing professional standards and educating the next generation of laser technicians.
            </p>
            <div>
              <p className="font-semibold text-foreground mb-2">Credentials &amp; Expertise:</p>
              <ul className="space-y-1 text-foreground">
                {[
                  "Certified Laser Safety Officer",
                  "ANSI Z136.3 Compliance Expert",
                  "Founder of the MicroAesthetics Method",
                  "Industry Speaker & Consultant",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE SCHOOL ── */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            About The MicroAesthetics Laser Tech Institute
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-foreground">
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
            <div className="flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663380477995/rWppBdqUGEOUVmDM.png"
                alt="MicroAesthetics Laser Tech Institute Building"
                className="rounded-lg shadow-md w-full max-w-sm object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-20 px-4 bg-muted">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-muted-foreground italic mb-4">
                  "Placeholder testimonial from a satisfied student. This will be replaced with real feedback from graduates."
                </p>
                <div>
                  <p className="font-semibold text-foreground">Student Name</p>
                  <p className="text-sm text-muted-foreground">Certified Laser Technician</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
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
                a: "Chapter 1 is a foundation course. Full certification requires the State Certification Track (40 hours didactic + 48 hours hands-on).",
              },
              {
                q: "What's the difference between the three paths?",
                a: "Digital Learning is 100% online for flexible learning. Fast Track offers hands-on skills without state certification. State Certification Track provides full ADHS certification and legal authorization to practice.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border border-border rounded-lg p-6 mb-3">
                <h3 className="text-lg font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-20 px-4 bg-teal-700 text-white text-center">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Licensed?</h2>
          <p className="text-teal-100 mb-8 text-lg">
            Start with our free Chapter 1 training. No credit card required, no obligation to continue.
          </p>
          <Button
            size="lg"
            className="bg-white text-teal-700 hover:bg-teal-50 px-8 py-6 text-lg font-bold border-2 border-white"
            onClick={() => setShowModal(true)}
          >
            Get Free Chapter 1 Now
          </Button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p className="mb-1">© 2026 The MicroAesthetics Laser Tech Institute. All rights reserved.</p>
        <p>Home of the MicroAesthetics Method by iZabel™</p>
      </footer>

    </div>
  );
}
