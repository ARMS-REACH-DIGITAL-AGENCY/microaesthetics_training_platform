/**
 * Orientation Module — MicroAesthetics Laser Tech Institute
 *
 * KEY BEHAVIOR:
 * - No audio — free navigation, no compliance gate
 * - Students can go forward and backward freely
 * - 23 slides from the Orientation PPTX
 * - Slide images served from /orientation/slideN_img.png
 * - Same teal design language as Chapter 1
 */

import { useState } from "react";
import { useLocation } from "wouter";

// ── Slide Data ──────────────────────────────────────────────────────────────
const SLIDES = [
  { id: 1,  title: "Certified Laser Technician Orientation",  subtitle: "MicroAesthetics Laser Education — Revised 01-01-2026" },
  { id: 2,  title: "MicroAesthetics Disclaimer",              subtitle: "Important Information Before You Begin" },
  { id: 3,  title: "Orientation Objectives",                  subtitle: "What You Will Learn in This Orientation" },
  { id: 4,  title: "About MicroAesthetics",                   subtitle: "Who We Are & What We Do" },
  { id: 5,  title: "Our Mission",                             subtitle: "Training the Next Generation of Laser Technicians" },
  { id: 6,  title: "The School & Facility",                   subtitle: "Your Learning Environment" },
  { id: 7,  title: "Program Overview",                        subtitle: "88-Hour Laser Technician Certification" },
  { id: 8,  title: "Curriculum Structure",                    subtitle: "40 Hours Didactic + 48 Hours Hands-On" },
  { id: 9,  title: "Arizona Requirements",                    subtitle: "ADHS & ARRA Licensing Requirements" },
  { id: 10, title: "Student Expectations",                    subtitle: "Attendance, Conduct & Professionalism" },
  { id: 11, title: "Grading & Assessments",                   subtitle: "Quizzes, Practicals & Final Exam" },
  { id: 12, title: "Hands-On Training",                       subtitle: "Live Model & Clinical Practice" },
  { id: 13, title: "Equipment & Technology",                  subtitle: "Lasers & Devices Used in Training" },
  { id: 14, title: "Safety Protocols",                        subtitle: "Laser Safety in the Classroom & Clinic" },
  { id: 15, title: "Career Pathways",                         subtitle: "Where Your Certification Takes You" },
  { id: 16, title: "Job Placement Support",                   subtitle: "How We Help You Launch Your Career" },
  { id: 17, title: "Tuition & Payment Options",               subtitle: "Investment in Your Future" },
  { id: 18, title: "Financial Aid & Scholarships",            subtitle: "Available Assistance Programs" },
  { id: 19, title: "Enrollment Process",                      subtitle: "How to Get Started" },
  { id: 20, title: "Student Resources",                       subtitle: "Study Materials, Support & Community" },
  { id: 21, title: "Meet Your Instructor",                    subtitle: "iZabel — Founder & Lead Instructor" },
  { id: 22, title: "Frequently Asked Questions",              subtitle: "Answers to Common Questions" },
  { id: 23, title: "Welcome to MicroAesthetics",              subtitle: "Your Journey Starts Here" },
].map((s) => ({
  ...s,
  slideImage: `/orientation/slide${s.id}_img.png`,
}));

export default function Orientation() {
  const [, navigate] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const slide = SLIDES[currentSlide];
  const progressPct = Math.round(((currentSlide + 1) / SLIDES.length) * 100);

  function goNext() {
    if (currentSlide < SLIDES.length - 1) setCurrentSlide(currentSlide + 1);
  }

  function goPrev() {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-lg font-bold text-gray-900 truncate">
              Certified Laser Technician — Orientation
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Slide {currentSlide + 1} of {SLIDES.length}
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-gray-400 bg-teal-50 border border-teal-200 text-teal-700 px-2.5 py-1 rounded-full font-medium">
              Free Preview
            </span>
            <button
              onClick={() => navigate("/")}
              className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              ← Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        {/* Slide Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Slide image — 4:3 aspect ratio */}
            <div className="w-full" style={{ aspectRatio: "4/3", background: "#f8fafc" }}>
              <img
                src={slide.slideImage}
                alt={slide.title}
                className="w-full h-full object-contain block"
                loading="lazy"
              />
            </div>

            {/* Slide caption */}
            <div className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-0.5">
                {slide.subtitle}
              </p>
            </div>

            {/* Navigation */}
            <div className="border-t border-gray-100 px-6 py-4 flex justify-between items-center">
              <button
                onClick={goPrev}
                disabled={currentSlide === 0}
                className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                ← Previous
              </button>

              {/* Dot progress */}
              <div className="hidden sm:flex items-center gap-1">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`rounded-full transition-all ${
                      i === currentSlide
                        ? "w-3 h-3 bg-teal-500"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {currentSlide < SLIDES.length - 1 ? (
                <button
                  onClick={goNext}
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors text-sm font-medium"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors text-sm font-medium"
                >
                  Enroll Now →
                </button>
              )}
            </div>
          </div>

          {/* Three Paths CTA */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-4">
            <div className="text-center mb-5">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
                One Institute. Three Paths.
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Ready to Enroll?</h2>
              <p className="text-sm text-gray-500">
                Choose the path that fits your goals and get fully certified.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 mx-auto mb-2" stroke="currentColor" strokeWidth="1.8">
                      <rect x="8" y="10" width="32" height="24" rx="3" strokeLinecap="round"/>
                      <path d="M16 38h16M24 34v4" strokeLinecap="round"/>
                      <rect x="14" y="16" width="20" height="12" rx="1.5" fill="currentColor" fillOpacity="0.08"/>
                      <path d="M18 20h12M18 24h8" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "Digital Learning",
                  desc: "Self-paced online curriculum.",
                  cta: "Enroll Now",
                },
                {
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 mx-auto mb-2" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="24" cy="16" r="7" strokeLinecap="round"/>
                      <path d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14" strokeLinecap="round"/>
                      <path d="M32 28l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Fast Track Training",
                  desc: "Hands-on with live clients.",
                  cta: "Get Started",
                },
                {
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 mx-auto mb-2" stroke="currentColor" strokeWidth="1.8">
                      <rect x="10" y="8" width="28" height="36" rx="3" strokeLinecap="round"/>
                      <path d="M18 20h12M18 26h8M18 32h10" strokeLinecap="round"/>
                      <path d="M16 14h16" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "State Certification",
                  desc: "Full 88-hour ADHS program.",
                  cta: "Get Certified",
                },
              ].map((path) => (
                <div
                  key={path.title}
                  className="border border-gray-200 rounded-xl p-4 text-center hover:border-teal-300 hover:shadow-sm transition-all"
                >
                  <div className="text-teal-600">{path.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{path.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{path.desc}</p>
                  <button
                    onClick={() => setShowEnrollModal(true)}
                    className="w-full py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors"
                  >
                    {path.cta} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Your Progress</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Viewed</span>
              <span className="text-sm font-bold text-teal-600">{progressPct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
              <div
                className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              Slide {currentSlide + 1} of {SLIDES.length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Navigate freely — no audio required</p>
          </div>

          {/* Slide list */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Slides</h3>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                    i === currentSlide
                      ? "bg-teal-50 text-teal-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2 text-gray-400">{i + 1}.</span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* About this orientation */}
          <div className="bg-teal-50 rounded-xl border border-teal-200 p-5">
            <h3 className="font-semibold text-teal-800 mb-2">About This Orientation</h3>
            <ul className="space-y-2 text-sm text-teal-700">
              {[
                "Free — no enrollment required",
                "Navigate slides at your own pace",
                "Learn about the school & program",
                "See what the full course covers",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-teal-500 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowEnrollModal(true)}
              className="mt-4 w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors"
            >
              Ready to Enroll? →
            </button>
          </div>

          {/* Also see Chapter 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Want a Taste of the Course?</h3>
            <p className="text-xs text-gray-500 mb-3">
              Try Chapter 1 — a full lesson on Arizona laser laws with iZabel's narration.
            </p>
            <button
              onClick={() => navigate("/chapter1")}
              className="w-full py-2.5 rounded-lg border border-teal-500 text-teal-600 hover:bg-teal-50 text-sm font-semibold transition-colors"
            >
              Try Chapter 1 →
            </button>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-gray-400">
        MicroAesthetics Laser Tech Institute • Certified Laser Technician Orientation • 2026
      </div>

      {/* Enroll Modal */}
      {showEnrollModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEnrollModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden">
            <button
              onClick={() => setShowEnrollModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div className="bg-teal-600 px-6 pt-6 pb-4 text-white">
              <h2 className="text-lg font-bold mb-1">Ready to Enroll?</h2>
              <p className="text-teal-100 text-sm">
                Choose the path that fits your goals. Full enrollment links coming soon — drop your info and we'll reach out.
              </p>
            </div>
            <div className="px-6 py-5 space-y-3">
              {["Digital Learning", "Fast Track Skill Training", "State Certification"].map((path) => (
                <button
                  key={path}
                  onClick={() => setShowEnrollModal(false)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm font-medium text-gray-700"
                >
                  {path} →
                </button>
              ))}
            </div>
            <div className="px-6 pb-5">
              <p className="text-xs text-center text-gray-400">
                Questions? Contact us at MicroAesthetics Laser Tech Institute.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
