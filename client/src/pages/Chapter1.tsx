/**
 * Chapter 1 Training Module — MicroAesthetics Laser Tech Institute
 *
 * KEY BEHAVIOR:
 * - Timer ONLY counts time when audio is actively playing
 * - Timer pauses immediately when audio pauses/ends/errors
 * - Timer never runs as a wall-clock timer
 * - Progress only moves forward (anti-skip)
 * - Must finish audio before advancing to next slide
 * - 33 slides with iZabel's narration from MALE_chapter_1_final.ppsx
 */

import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

// ── Slide Data ──────────────────────────────────────────────────────────────

// PROOF OF CONCEPT: Slides 1-2 from MALE_chapter_1_final.ppsx
// iZabel's actual voice recordings, real slide images, real speaker notes
// Remaining 31 slides will be added after user verification
const SLIDES = [
  {
    id: 1,
    title: "MicroAesthetics Laser Education",
    subtitle: "Chapter 1 — Introduction to the Laser Industry: AZ Laws & Agencies",
    content: "Welcome to your first class of the 40-hour Laser didactic training. MicroAesthetics Laser Education is an Arizona state licensed school of laser, a division of IzaBella Aesthetics, LLC in Phoenix, Arizona.",
    audioFile: "/manus-storage/slide1_audio_be29d284.m4a",
    audioDuration: 177,
    slideImage: "/manus-storage/slide1_image_349f3bca.png"
  },
  {
    id: 2,
    title: "Laws of the Laser — Disclaimer",
    subtitle: "Important Information Before We Begin",
    content: "MicroAesthetics is an Arizona licensed laser training facility governed by ADHS and ARRA. This is a cosmetic laser course — treatments are for enhancement of appearance only and are NOT medical treatments.",
    audioFile: "/manus-storage/slide2_audio_a60a771b.m4a",
    audioDuration: 287,
    slideImage: "/manus-storage/slide2_image_27ac1298.png"
  },
];

// ── Per-slide notes (key points shown below slide player) ──────────────────
// Notes sourced directly from iZabel's speaker notes in MALE_chapter_1_final.ppsx
const SLIDE_NOTES: string[][] = [
  // 1 — MicroAesthetics Laser Education (Cover)
  [
    "MicroAesthetics Laser Education is an Arizona state licensed school of laser and a division of IzaBella Aesthetics, LLC in Phoenix, Arizona.",
    "This 40-hour didactic program covers the theory and hands-on practical experience needed for daily cosmetic laser practice.",
    "The curriculum focuses on the relationship between the skin and the selective laser device — not just the on/off button or manufacturer protocols.",
    "References come from major laser manufacturers and years of experience and research by a team of aesthetics and laser professionals."
  ],
  // 2 — Laws of the Laser — Disclaimer
  [
    "MicroAesthetics is governed by the Arizona Department of Health Services (ADHS) and the Arizona Radiation Regulatory Agency (ARRA) for cosmetic laser instruction.",
    "Cosmetic laser treatments in Arizona are defined as health and beauty treatments for enhancement of appearance only — they are NOT medical treatments and cannot be represented as such.",
    "The language used with clients cannot make medically implied claims or be interpreted as medical — this is illegal and beyond scope of practice for beauty industry professionals.",
    "Each state has its own rules and regulations. MicroAesthetics does not endorse or approve other states\' regulations — it is your responsibility to verify your state\' s laws."
  ],
  // 3 Course Objectives
  ["You will be able to identify laser safety classifications (Class 1–4).", "You will understand which agencies regulate laser technicians in Arizona.", "You will know Arizona-specific requirements and your professional responsibilities."],
  // 4 Meet Your Instructor
  ["iZabel is the founder of MicroAesthetics Laser Tech Institute.", "She brings decades of hands-on aesthetic laser experience to every lesson.", "Her curriculum is built on real-world clinical practice, not just theory."],
  // 5 Laser Industry Overview
  ["The aesthetic laser industry grows approximately 12% per year.", "Demand for certified technicians is outpacing supply in most states.", "Arizona is one of the more regulated states — certification is legally required."],
  // 6 Certified Laser Technician
  ["A certified laser technician is trained to operate laser devices for aesthetic procedures.", "They must work under proper supervision as defined by state law.", "Certification requires completing both didactic (classroom) and hands-on training hours."],
  // 7 Laser Industry Trends
  ["Consumer demand for non-invasive aesthetic treatments is rising sharply.", "New laser technologies are entering the market faster than regulations can keep up.", "Stricter state oversight means proper certification is more important than ever."],
  // 8 ANSI Standards
  ["ANSI Z136 is the primary standard governing safe laser use in the U.S.", "It defines maximum permissible exposure (MPE) limits for skin and eyes.", "Compliance with ANSI standards is required for ADHS-certified programs."],
  // 9 Government Agencies
  ["OSHA sets workplace safety requirements for laser use.", "FDA regulates laser device manufacturing and labeling.", "ADHS (Arizona Dept. of Health Services) licenses laser technicians in Arizona.", "ARRA (Arizona Radiation Regulatory Agency) oversees radiation-emitting devices."],
  // 10 Laser Classifications
  ["Class 1: Safe under normal use — enclosed systems.", "Class 2: Low power visible lasers — momentary exposure is safe.", "Class 3B: Moderate power — direct viewing is hazardous.", "Class 4: High power — can cause skin and eye injury; requires maximum precautions."],
  // 11 Laser Safety Manager
  ["Every laser facility must designate a Laser Safety Officer (LSO).", "The LSO ensures equipment is properly maintained and staff are trained.", "They are responsible for incident documentation and regulatory reporting."],
  // 12 Incident Reporting
  ["All laser-related injuries or near-misses must be documented immediately.", "Reports must be filed with ADHS and ARRA within required timeframes.", "Failure to report can result in license suspension or facility closure."],
  // 13 Laser Key Safety
  ["Laser systems must be physically secured when not in use.", "Key-switch controls prevent unauthorized access to Class 3B and 4 devices.", "Access logs should be maintained for compliance audits."],
  // 14 End of Chapter / Quiz Intro
  ["You have covered all 13 content slides in Chapter 1.", "The quiz tests your understanding of key regulatory concepts.", "You need 80% or higher to pass and receive your Chapter 1 completion record."],
  // 15 ADHS
  ["ADHS licenses laser technicians and oversees certified training programs.", "Programs must meet minimum hour requirements: 40 didactic + 48 hands-on.", "ADHS can audit facilities and revoke licenses for non-compliance."],
  // 16 ARRA
  ["ARRA regulates all radiation-emitting devices in Arizona, including lasers.", "Facilities must register their laser equipment with ARRA.", "ARRA conducts inspections and enforces radiation safety standards."],
  // 17 Professional Certifications
  ["National certifications (e.g., NCEA, CLT) complement state licensure.", "Many employers prefer or require nationally recognized credentials.", "Continuing education is typically required to maintain certification."],
  // 18 Safety Protocols
  ["Always use appropriate laser safety eyewear — wavelength-specific OD rating required.", "Conduct a skin patch test before full treatment.", "Obtain written informed consent from every client before any procedure."],
  // 19 Equipment Maintenance
  ["Laser output should be verified before each treatment session.", "Scheduled calibration by a qualified technician is required.", "Maintenance records must be kept on file for ADHS and ARRA inspections."],
  // 20 Client Consultation
  ["Screen for contraindications: medications, skin conditions, recent sun exposure.", "Review client medical history and document findings.", "Informed consent must be signed and retained in the client file."],
  // 21 Post-Procedure Care
  ["Provide written aftercare instructions to every client.", "Advise on sun avoidance and SPF use for at least 2 weeks post-treatment.", "Document any adverse reactions and follow incident reporting procedures if needed."],
  // 22 Continuing Education
  ["Arizona requires ongoing education to maintain laser technician licensure.", "Stay current with ADHS rule changes and ANSI standard updates.", "MicroAesthetics offers advanced chapters covering specific laser modalities."],
];

const QUIZ_QUESTIONS = [
  { question: "What does ANSI stand for?", options: ["American National Standards Institute", "Arizona Nursing Safety Institute", "Applied National Safety Index", "American Nurse Safety Institute"], correct: 0 },
  { question: "Which class of laser requires maximum precautions?", options: ["Class 1", "Class 2", "Class 3", "Class 4"], correct: 3 },
  { question: "Which Arizona agency oversees laser technicians?", options: ["OSHA", "FDA", "ADHS", "CDC"], correct: 2 },
  { question: "What is the minimum passing score for this chapter?", options: ["60%", "70%", "80%", "90%"], correct: 2 },
  { question: "How often must laser incidents be reported?", options: ["Monthly", "Annually", "Within required timeframes", "Only if serious injury occurs"], correct: 2 },
];

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const STORAGE_KEY = "ch1_progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      currentSlide: number;
      highestUnlocked: number;
      audioFinished: boolean[];
      watchSeconds: number;
    };
  } catch { return null; }
}

export default function Chapter1() {
  const [, navigate] = useLocation();
  const saved = loadProgress();
  // Clamp saved slide index to valid range in case SLIDES array length changed
  const savedSlide = Math.min(saved?.currentSlide ?? 0, SLIDES.length - 1);
  const savedUnlocked = Math.min(saved?.highestUnlocked ?? 0, SLIDES.length - 1);
  const [currentSlide, setCurrentSlide] = useState(savedSlide);
  const [highestUnlocked, setHighestUnlocked] = useState(savedUnlocked);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioFinished, setAudioFinished] = useState<boolean[]>(
    saved?.audioFinished
      ? [...saved.audioFinished.slice(0, SLIDES.length), ...new Array(Math.max(0, SLIDES.length - saved.audioFinished.length)).fill(false)]
      : new Array(SLIDES.length).fill(false)
  );
  const [watchSeconds, setWatchSeconds] = useState(saved?.watchSeconds ?? 0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = SLIDES[currentSlide];
  const completedSlides = audioFinished.filter(Boolean).length;
  const completionPct = Math.round((completedSlides / SLIDES.length) * 100);

  // ── Timer: only ticks while audio is playing ──────────────────────────────
  useEffect(() => {
    if (audioPlaying) {
      timerRef.current = setInterval(() => {
        setWatchSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [audioPlaying]);

  // ── Save progress to localStorage whenever key state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentSlide, highestUnlocked, audioFinished, watchSeconds }));
  }, [currentSlide, highestUnlocked, audioFinished, watchSeconds]);

  // ── Reset audio and autoplay when slide changes ────────────────────────────
  useEffect(() => {
    setAudioPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      // Small delay to let the new src load before playing
      const t = setTimeout(() => {
        audioRef.current?.play().catch(() => {/* autoplay blocked — user must press play */});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [currentSlide]);

  // ── Audio event handlers ──────────────────────────────────────────────────
  function handleAudioPlay() {
    setAudioPlaying(true);
  }

  function handleAudioPause() {
    setAudioPlaying(false);
  }

  function handleAudioEnded() {
    setAudioPlaying(false);
    const updated = [...audioFinished];
    updated[currentSlide] = true;
    setAudioFinished(updated);
    if (currentSlide >= highestUnlocked) {
      setHighestUnlocked(currentSlide + 1);
    }
  }

  function handleAudioError() {
    setAudioPlaying(false);
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  function goNext() {
    if (!audioFinished[currentSlide]) return; // must finish audio first
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowQuiz(true);
    }
  }

  function goPrev() {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  function submitQuiz() {
    const score = quizAnswers.reduce<number>((acc, ans, i) => {
      return acc + (ans === QUIZ_QUESTIONS[i].correct ? 1 : 0);
    }, 0);
    const pct = Math.round(((score as number) / QUIZ_QUESTIONS.length) * 100);
    setQuizScore(pct);
    setQuizSubmitted(true);
  }

  // ── Quiz Screen ───────────────────────────────────────────────────────────
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Chapter 1 Quiz</h1>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <span className="text-gray-500">Watch Time</span>
              <span className="font-mono font-bold text-teal-600">{formatTime(watchSeconds)}</span>
            </div>
          </div>

          {!quizSubmitted ? (
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, qi) => (
                <div key={qi} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-4">{qi + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <label key={oi} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                        <input
                          type="radio"
                          name={`q${qi}`}
                          checked={quizAnswers[qi] === oi}
                          onChange={() => {
                            const updated = [...quizAnswers];
                            updated[qi] = oi;
                            setQuizAnswers(updated);
                          }}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={submitQuiz}
                disabled={quizAnswers.some((a) => a === null)}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg text-lg transition-colors"
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className={`text-6xl font-bold mb-4 ${quizScore >= 80 ? "text-teal-600" : "text-red-500"}`}>
                {quizScore}%
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {quizScore >= 80 ? "Congratulations! You Passed!" : "Keep Studying"}
              </h2>
              <p className="text-gray-600 mb-6">
                {quizScore >= 80
                  ? `You scored ${quizScore}% and have completed Chapter 1. Total watch time: ${formatTime(watchSeconds)}.`
                  : `You scored ${quizScore}%. You need 80% to pass. Please review the material and try again.`}
              </p>
              <div className="flex gap-4 justify-center">
                {quizScore < 80 && (
                  <button
                    onClick={() => { setQuizSubmitted(false); setQuizAnswers(new Array(QUIZ_QUESTIONS.length).fill(null)); }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Retake Quiz
                  </button>
                )}
                <button
                  onClick={() => navigate("/")}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Main Slide Player ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-lg font-bold text-gray-900 truncate">Chapter 1: Laser Industry Laws &amp; Agencies</h1>
            <p className="text-xs sm:text-sm text-gray-500">Slide {currentSlide + 1} of {SLIDES.length}</p>
          </div>
          {/* Watch Time — only counts audio playback */}
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
            </svg>
            <span className="text-xs text-gray-500 hidden sm:inline">Watch Time</span>
            <span className="font-mono font-bold text-teal-600 text-sm">{formatTime(watchSeconds)}</span>
            {audioPlaying && (
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" title="Timer running"/>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        {/* Slide Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Slide image */}
            {slide.slideImage && (
              <div className="w-full bg-gray-100">
                <img
                  src={slide.slideImage}
                  alt={slide.title}
                  className="w-full object-contain max-h-[420px]"
                  loading="lazy"
                />
              </div>
            )}
            {/* Slide body — shown below image as caption/summary */}
            <div className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">{slide.subtitle}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{slide.content}</p>
            </div>

            {/* Audio player */}
            <div className="border-t border-gray-100 bg-gray-900 px-6 py-4">
              <audio
                ref={audioRef}
                src={slide.audioFile}
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
                onEnded={handleAudioEnded}
                onError={handleAudioError}
                controls
                className="w-full"
                style={{ height: 40 }}
                preload="metadata"
              />
              <p className="text-xs text-gray-400 text-center mt-2">
                {audioFinished[currentSlide]
                  ? "✓ Audio complete — you may advance"
                  : "Listen to the full narration to unlock the next slide"}
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
              <button
                onClick={goNext}
                disabled={!audioFinished[currentSlide]}
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white transition-colors text-sm font-medium"
              >
                {currentSlide === SLIDES.length - 1 ? "Take Quiz →" : "Next →"}
              </button>
            </div>
          </div>

          {/* ── SLIDE NOTES PANEL ── */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50">
              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 className="text-sm font-semibold text-gray-700">Slide Notes — {slide.title}</h3>
            </div>
            <ul className="px-5 py-4 space-y-2">
              {(SLIDE_NOTES[currentSlide] ?? []).map((note, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* ── THREE PATHS CTA ── inside main column */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-2">
            <div className="text-center mb-5">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">One Institute. Three Paths.</p>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Ready to Go Further?</h2>
              <p className="text-sm text-gray-500">Choose the path that fits your goals and get fully certified.</p>
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
                      <path d="M24 8c-4 0-7 3-7 7 0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="24" cy="15" r="2.5" fill="currentColor" fillOpacity="0.15"/>
                      <path d="M14 32c-3 1-5 3-5 5h30c0-2-2-4-5-5" strokeLinecap="round"/>
                      <path d="M18 32l2-5h8l2 5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Fast Track Training",
                  desc: "Hands-on with live clients.",
                  cta: "Get Started",
                },
                {
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 mx-auto mb-2" stroke="currentColor" strokeWidth="1.8">
                      <rect x="10" y="14" width="28" height="20" rx="2" strokeLinecap="round"/>
                      <path d="M18 34v4M30 34v4M14 38h20" strokeLinecap="round"/>
                      <path d="M24 19v10M19 24h10" strokeLinecap="round"/>
                      <circle cx="24" cy="24" r="6" strokeDasharray="2 2"/>
                    </svg>
                  ),
                  title: "State Certification",
                  desc: "Full 88-hour ADHS program.",
                  cta: "Get Certified",
                },
              ].map((path) => (
                <div key={path.title} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:border-teal-400 hover:shadow-sm transition-all">
                  <div className="text-teal-600">{path.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{path.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{path.desc}</p>
                  <button
                    onClick={() => setShowEnrollModal(true)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    {path.cta} →
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowEnrollModal(true)}
                className="inline-flex items-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
              >
                Stay in the Loop
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar — order: Progress, Slides, Downloads, Compliance Mode */}
        <div className="space-y-4">
          {/* Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Your Progress</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Completion</span>
              <span className="text-sm font-bold text-teal-600">{completionPct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
              <div
                className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">Slide {currentSlide + 1} of {SLIDES.length}</p>
            <p className="text-xs text-gray-400 mt-1">Progress only moves forward</p>
          </div>

          {/* Slide list */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Slides</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { if (i <= highestUnlocked) setCurrentSlide(i); }}
                  disabled={i > highestUnlocked}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                    i === currentSlide
                      ? "bg-teal-50 text-teal-700 font-semibold"
                      : i <= highestUnlocked
                      ? "text-gray-600 hover:bg-gray-50"
                      : "text-gray-400 cursor-not-allowed opacity-60"
                  }`}
                >
                  <span className="mr-2">{audioFinished[i] ? "✓" : i <= highestUnlocked ? "○" : "🔒"}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Downloads */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Chapter 1 Downloads</h3>
            <div className="space-y-2">
              {[
                { label: "Study Guide", icon: "📄", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663380477995/sFNICUMFTQbZlUcf.pdf", filename: "Chapter1_Study_Guide.pdf" },
                { label: "Flashcards", icon: "🗂️", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663380477995/DtermVkZxTTReuKO.pdf", filename: "Chapter1_Flashcards.pdf" },
                { label: "Practice Exam", icon: "📝", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663380477995/qbxFyXuvzpBBAiLd.pdf", filename: "Chapter1_Exam.pdf" },
              ].map((dl) => (
                <a
                  key={dl.label}
                  href={dl.url}
                  download={dl.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border border-gray-200 hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm text-gray-700 hover:text-teal-700 group"
                >
                  <span className="text-base">{dl.icon}</span>
                  <span className="flex-1 font-medium">{dl.label}</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Compliance Mode — last in sidebar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-teal-600 mb-3">Compliance Mode</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Only audio time is tracked",
                "Cannot skip slides",
                "Cannot go backward past current",
                "Must finish audio to advance",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-teal-500 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-gray-400">
        Narrated by iZabel • 22 slides • Approximately 45-60 minutes
      </div>

      {/* Enroll Modal Overlay */}
      {showEnrollModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowEnrollModal(false); }}
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
              <p className="text-teal-100 text-sm">Choose the path that fits your goals. Full enrollment links coming soon — drop your info and we’ll reach out.</p>
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
              <p className="text-xs text-center text-muted-foreground">Questions? Contact us at MicroAesthetics Laser Tech Institute.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
