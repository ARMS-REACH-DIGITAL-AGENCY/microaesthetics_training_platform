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
 * - Slide images and audio served from /slides/ and /audio/ in public/
 */

import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

// ── Slide Data ──────────────────────────────────────────────────────────────
// All 33 slides from MALE_chapter_1_final.ppsx
// Images: /slides/slide{N}_img.png  |  Audio: /audio/slide{N}_audio.m4a
const SLIDES = [
  { id: 1,  title: "MicroAesthetics Laser Education",          subtitle: "Chapter 1 — Introduction to the Laser Industry: AZ Laws & Agencies",    audioDuration: 177  },
  { id: 2,  title: "Laws of the Laser — Disclaimer",           subtitle: "Important Information Before We Begin",                                   audioDuration: 287  },
  { id: 3,  title: "Laws of the Laser — Objectives",           subtitle: "Learning Objectives for Chapter 1",                                       audioDuration: 217  },
  { id: 4,  title: "Certified Laser Technician",               subtitle: "Who Can Perform Laser & IPL Treatments?",                                 audioDuration: 120  },
  { id: 5,  title: "CLT Career — Requirements",                subtitle: "Career of a Certified Laser Technician",                                  audioDuration: 334  },
  { id: 6,  title: "CLT Career — State Governance",            subtitle: "State Requirements, Hours & Procedures",                                  audioDuration: 129  },
  { id: 7,  title: "Laser Industry Trends",                    subtitle: "Industry Growth & Market Overview",                                       audioDuration: 524  },
  { id: 8,  title: "Laser Trends — Growth Stats",              subtitle: "2,500+ Med-Spas, $10B Industry",                                         audioDuration: 296  },
  { id: 9,  title: "CLT Career — Professional Growth",         subtitle: "Job Opportunities & Wage Data",                                           audioDuration: 152  },
  { id: 10, title: "History of Cosmetic Laser Therapy",        subtitle: "1959 to the 2020s",                                                       audioDuration: 217  },
  { id: 11, title: "Cosmetic Laser Treatments",                subtitle: "Overview of Laser Services",                                              audioDuration: 91   },
  { id: 12, title: "Cosmetic Laser Services",                  subtitle: "13 Procedures Covered in This Program",                                   audioDuration: 200  },
  { id: 13, title: "Skin Conditions Treated",                  subtitle: "Detailed Definitions & Scope of Practice",                                audioDuration: 410  },
  { id: 14, title: "Laws and Regulations",                     subtitle: "Responsibility Chain for Laser Safety",                                   audioDuration: 205  },
  { id: 15, title: "AZ Agencies — ADHS & ARRA",                subtitle: "Arizona Governing Agencies for Cosmetic Lasers",                          audioDuration: 41   },
  { id: 16, title: "Agencies Ensuring Laser Safety",           subtitle: "ANSI, NIOH, CDRH, JCAHO",                                                audioDuration: 227  },
  { id: 17, title: "ASLMS, OSHA & FDA",                        subtitle: "Roles and Responsibilities",                                              audioDuration: 120  },
  { id: 18, title: "ANSI Z136.3 — Purpose & Scope",            subtitle: "The Primary Standard for Safe Laser Use",                                 audioDuration: 252  },
  { id: 19, title: "ANSI Z136.3 — SOP Manual",                 subtitle: "Standard Operating Procedures",                                           audioDuration: 218  },
  { id: 20, title: "ANSI Z136.3 §5.1 — Laser Safety Officer",  subtitle: "LSO Responsibilities",                                                    audioDuration: 225  },
  { id: 21, title: "ANSI Z136.3 §6.3.2 — Incident Reports",    subtitle: "When and How to File",                                                    audioDuration: 118  },
  { id: 22, title: "ANSI Z136.3 §2 — Definitions",             subtitle: "Shall vs. Should, Laser Assistant, Laser User",                           audioDuration: 241  },
  { id: 23, title: "Laser Exposure Limits",                    subtitle: "MAE, Rated Danger Zone, NEHD",                                            audioDuration: 156  },
  { id: 24, title: "4 Laser Classifications",                  subtitle: "Facility Types and Requirements",                                         audioDuration: 100  },
  { id: 25, title: "ANSI Laser Hazard Rating",                 subtitle: "Class I Through IV",                                                      audioDuration: 472  },
  { id: 26, title: "Laser Safety Goggles",                     subtitle: "Selection, Use & Requirements",                                           audioDuration: 249  },
  { id: 27, title: "ANSI Class Laser Hazard Signage",          subtitle: "Overview of Required Signage",                                            audioDuration: 228  },
  { id: 28, title: "Yellow Caution Sign",                      subtitle: "ANSI Caution Signage Requirements",                                       audioDuration: 122  },
  { id: 29, title: "Orange Warning Sign",                      subtitle: "ANSI Warning Signage Requirements",                                       audioDuration: 66   },
  { id: 30, title: "Red Danger Sign",                          subtitle: "ANSI Danger Signage Requirements",                                        audioDuration: 27   },
  { id: 31, title: "Blue Notice Sign",                         subtitle: "ANSI Notice Signage Requirements",                                        audioDuration: 89   },
  { id: 32, title: "ANSI Device & Key Storage",                subtitle: "General Safety Guidelines",                                               audioDuration: 205  },
  { id: 33, title: "Review & Quiz",                            subtitle: "Prepare for Your Chapter 1 Quiz",                                         audioDuration: 16   },
].map((s) => ({
  ...s,
  slideImage: `/slides/slide${s.id}_img.png`,
  audioFile: `/audio/slide${s.id}_audio.m4a`,
}));

// ── Per-slide notes (key points shown below slide player) ──────────────────
const SLIDE_NOTES: string[][] = [
  // 1 — Cover
  [
    "MicroAesthetics Laser Education is an Arizona state licensed school of laser and a division of IzaBella Aesthetics, LLC in Phoenix, Arizona.",
    "This 40-hour didactic program covers the theory and hands-on practical experience needed for daily cosmetic laser practice.",
    "The curriculum focuses on the relationship between the skin and the selective laser device — not just the on/off button or manufacturer protocols.",
    "References come from major laser manufacturers and years of experience and research by a team of aesthetics and laser professionals.",
  ],
  // 2 — Disclaimer
  [
    "MicroAesthetics is governed by the Arizona Department of Health Services (ADHS) and the Arizona Radiation Regulatory Agency (ARRA) for cosmetic laser instruction.",
    "Cosmetic laser treatments in Arizona are defined as health and beauty treatments for enhancement of appearance only — they are NOT medical treatments and cannot be represented as such.",
    "The language used with clients cannot make medically implied claims or be interpreted as medical — this is illegal and beyond scope of practice for beauty industry professionals.",
    "Each state has its own rules and regulations. MicroAesthetics does not endorse or approve other states' regulations — it is your responsibility to verify your state's laws.",
  ],
  // 3 — Objectives
  [
    "By the end of this chapter you will understand the definition of a Certified Laser Technician.",
    "You will know the Arizona rules and regulations of agencies governing cosmetic lasers.",
    "You will understand the 4 laser classifications and the Laser Safety Manager's responsibilities.",
    "A quiz will be administered upon completion — a passing score of 80% is required to advance.",
  ],
  // 4 — CLT Definition
  [
    "Cosmetic laser therapies use light energy to treat skin imperfections and certain abnormalities.",
    "Each state has its own training requirements, curriculum criteria, and certification rules.",
    "Arizona requires completion of both didactic and hands-on training hours for licensure.",
    "Resources for state-by-state regulations are available at myethosspa.com.",
  ],
  // 5 — CLT Career
  [
    "A certified laser technician is certified or licensed by a state agency to perform cosmetic procedures.",
    "Procedures include skin rejuvenation, unwanted hair removal, and other non-invasive treatments.",
    "CLTs must work within their state-defined scope of practice and under proper supervision.",
    "National certifications complement state licensure and are preferred by many employers.",
  ],
  // 6 — CLT Career State Governance
  [
    "State agencies define the minimum training hours required for laser technician certification.",
    "Arizona requires 40 didactic hours plus 48 hands-on clinical hours.",
    "Facilities must also be registered and inspected by ADHS and ARRA.",
    "Continuing education is required to maintain active licensure.",
  ],
  // 7 — Laser Trends
  [
    "The aesthetic laser industry grows approximately 12% per year.",
    "Consumer demand for non-invasive treatments is rising sharply across all demographics.",
    "New laser technologies are entering the market faster than regulations can keep up.",
    "Stricter state oversight means proper certification is more important than ever.",
  ],
  // 8 — Growth Stats
  [
    "There are over 2,500 medical spas operating in the United States.",
    "The aesthetic laser market is valued at over $10 billion.",
    "Demand for certified technicians is outpacing supply in most states.",
    "Arizona is one of the more regulated states — certification is legally required.",
  ],
  // 9 — Professional Growth
  [
    "Certified laser technicians enjoy strong job prospects and competitive wages.",
    "Many CLTs work in medical spas, dermatology offices, and plastic surgery centers.",
    "Entrepreneurial CLTs can open their own facilities after meeting state requirements.",
    "Advanced certifications in specific modalities command higher compensation.",
  ],
  // 10 — History
  [
    "The first laser was developed by Theodore Maiman in 1960.",
    "Medical laser applications began in the 1970s with vascular and dermatology treatments.",
    "The 1990s saw rapid expansion into cosmetic applications including hair removal and resurfacing.",
    "Today's aesthetic lasers are highly precise, safe, and effective when used by trained technicians.",
  ],
  // 11 — Treatments Overview
  [
    "Cosmetic laser treatments are classified as health and beauty procedures.",
    "They are NOT medical treatments and must not be represented as such.",
    "MicroAesthetics does not support use of cosmetic lasers for conditions outside the practitioner's scope.",
    "All training provided is for cosmetic enhancement purposes only.",
  ],
  // 12 — Services List
  [
    "This program covers 13 cosmetic laser procedures including hair removal, skin rejuvenation, and pigmentation treatments.",
    "Each procedure requires specific training and an understanding of skin types and contraindications.",
    "Practitioners must obtain informed consent before performing any laser service.",
    "Proper documentation of each treatment is required for compliance.",
  ],
  // 13 — Skin Conditions
  [
    "Understanding skin conditions is essential for safe laser practice.",
    "Contraindications include active infections, certain medications, and recent sun exposure.",
    "Fitzpatrick skin typing guides laser parameter selection to minimize adverse events.",
    "Practitioners must screen every client and document findings before treatment.",
  ],
  // 14 — Laws & Regulations
  [
    "The responsibility chain for laser safety runs from the state agency to the facility to the practitioner.",
    "Facilities must maintain current licenses and ensure all staff are properly certified.",
    "Practitioners are personally responsible for staying within their scope of practice.",
    "Violations can result in license suspension, facility closure, and legal liability.",
  ],
  // 15 — ADHS & ARRA
  [
    "ADHS (Arizona Department of Health Services) licenses laser technicians and training programs.",
    "ARRA (Arizona Radiation Regulatory Agency) regulates all radiation-emitting devices including lasers.",
    "Both agencies conduct audits and inspections of licensed facilities.",
    "Facilities must register their laser equipment with ARRA.",
  ],
  // 16 — ANSI, NIOH, CDRH, JCAHO
  [
    "ANSI develops the Z136 series of laser safety standards used nationwide.",
    "NIOSH (National Institute for Occupational Safety and Health) addresses workplace laser hazards.",
    "CDRH (Center for Devices and Radiological Health) is the FDA division that regulates laser devices.",
    "JCAHO accredits healthcare facilities and includes laser safety in its standards.",
  ],
  // 17 — ASLMS, OSHA, FDA
  [
    "ASLMS (American Society for Laser Medicine and Surgery) sets clinical practice guidelines.",
    "OSHA requires employers to protect workers from laser hazards in the workplace.",
    "FDA regulates the manufacturing, labeling, and sale of laser devices.",
    "Understanding each agency's role helps practitioners stay compliant.",
  ],
  // 18 — ANSI Z136.3 Purpose
  [
    "ANSI Z136.3 is the standard specifically for safe use of lasers in health care.",
    "It defines maximum permissible exposure (MPE) limits for skin and eyes.",
    "Compliance with ANSI Z136.3 is required for ADHS-certified programs.",
    "The standard is updated periodically — practitioners must stay current.",
  ],
  // 19 — SOP Manual
  [
    "Every laser facility must have a written Standard Operating Procedures (SOP) manual.",
    "The SOP covers equipment operation, safety protocols, emergency procedures, and documentation.",
    "All staff must be trained on the SOP and sign acknowledgment.",
    "The SOP must be reviewed and updated annually.",
  ],
  // 20 — LSO
  [
    "Every laser facility must designate a Laser Safety Officer (LSO).",
    "The LSO ensures equipment is properly maintained and staff are trained.",
    "They are responsible for incident documentation and regulatory reporting.",
    "The LSO must have formal laser safety training.",
  ],
  // 21 — Incident Reports
  [
    "All laser-related injuries or near-misses must be documented immediately.",
    "Reports must be filed with ADHS and ARRA within required timeframes.",
    "Failure to report can result in license suspension or facility closure.",
    "Incident reports are reviewed during regulatory audits.",
  ],
  // 22 — Definitions
  [
    "'Shall' in ANSI standards means mandatory — it is not optional.",
    "'Should' means recommended but not strictly required.",
    "A Laser Assistant operates under direct supervision of a licensed practitioner.",
    "A Laser User is independently licensed to perform laser procedures.",
  ],
  // 23 — Exposure Limits
  [
    "Maximum Allowable Exposure (MAE) defines the safe threshold for skin and eye exposure.",
    "The Nominal Hazard Zone (NHZ) is the area where exposure could exceed the MAE.",
    "Nominal Eye Hazard Distance (NEHD) defines the safe distance from the beam.",
    "All personnel within the NHZ must wear appropriate laser safety eyewear.",
  ],
  // 24 — Classifications
  [
    "Class I lasers are safe under normal use — typically enclosed systems.",
    "Class II lasers are low-power visible lasers — momentary exposure is safe.",
    "Class IIIb lasers are moderate power — direct viewing is hazardous.",
    "Class IV lasers are high power — can cause skin and eye injury; require maximum precautions.",
  ],
  // 25 — Hazard Rating
  [
    "ANSI classifies lasers from Class I (lowest hazard) to Class IV (highest hazard).",
    "The classification determines required safety controls, signage, and PPE.",
    "Most aesthetic lasers used in cosmetic practices are Class IIIb or Class IV.",
    "Facilities must post the correct hazard class signage at all entry points.",
  ],
  // 26 — Safety Goggles
  [
    "Laser safety eyewear must be wavelength-specific with the correct Optical Density (OD) rating.",
    "Both the practitioner and the client must wear appropriate eyewear during treatment.",
    "Goggles must be inspected before each use for damage or scratches.",
    "Eyewear must be stored properly and replaced when damaged.",
  ],
  // 27 — Signage Overview
  [
    "ANSI requires specific hazard warning signs at all laser facility entry points.",
    "Signs must display the laser class, wavelength, and maximum output power.",
    "Four sign types are used: Caution (yellow), Warning (orange), Danger (red), and Notice (blue).",
    "Signs must be posted whenever the laser is in use.",
  ],
  // 28 — Yellow Caution
  [
    "Yellow Caution signs are used for Class II and Class IIIa lasers.",
    "They indicate a potentially hazardous situation that could result in minor injury.",
    "Caution signs must include the word CAUTION and the laser class.",
    "They are the lowest level of ANSI laser hazard signage.",
  ],
  // 29 — Orange Warning
  [
    "Orange Warning signs are used for Class IIIb lasers.",
    "They indicate a potentially hazardous situation that could result in serious injury.",
    "Warning signs must include the word WARNING and the laser class.",
    "Direct beam exposure from a Class IIIb laser can cause immediate eye injury.",
  ],
  // 30 — Red Danger
  [
    "Red Danger signs are used for Class IV lasers.",
    "They indicate an imminently hazardous situation that will result in serious injury.",
    "Danger signs must include the word DANGER and the laser class.",
    "Class IV lasers can cause skin burns and eye injury from both direct and reflected beams.",
  ],
  // 31 — Blue Notice
  [
    "Blue Notice signs provide general safety information not related to a specific hazard level.",
    "They are used to communicate required PPE or operational instructions.",
    "Notice signs must include the word NOTICE.",
    "They are commonly posted at facility entrances to require eyewear before entry.",
  ],
  // 32 — Key Storage
  [
    "Laser systems must be physically secured when not in use.",
    "Key-switch controls prevent unauthorized access to Class IIIb and IV devices.",
    "Keys must be stored separately from the laser when not in use.",
    "Access logs should be maintained for compliance audits.",
  ],
  // 33 — Quiz
  [
    "You have completed all 33 slides of Chapter 1.",
    "The quiz tests your understanding of key regulatory concepts covered in this chapter.",
    "You need a score of 80% or higher to pass and receive your Chapter 1 completion record.",
    "Review your notes before beginning — you can retake the quiz if needed.",
  ],
];

const QUIZ_QUESTIONS = [
  { question: "What does ANSI stand for?", options: ["American National Standards Institute", "Arizona Nursing Safety Institute", "Applied National Safety Index", "American Nurse Safety Institute"], correct: 0 },
  { question: "Which class of laser requires maximum precautions?", options: ["Class I", "Class II", "Class IIIb", "Class IV"], correct: 3 },
  { question: "Which Arizona agency licenses laser technicians?", options: ["OSHA", "FDA", "ADHS", "CDC"], correct: 2 },
  { question: "What is the minimum passing score for this chapter?", options: ["60%", "70%", "80%", "90%"], correct: 2 },
  { question: "What color is an ANSI Danger sign?", options: ["Yellow", "Orange", "Blue", "Red"], correct: 3 },
  { question: "What does LSO stand for?", options: ["Laser Safety Officer", "Licensed Skin Operator", "Laser Systems Overseer", "Licensed Safety Official"], correct: 0 },
  { question: "Which agency regulates radiation-emitting devices in Arizona?", options: ["ADHS", "ARRA", "OSHA", "FDA"], correct: 1 },
  { question: "What does 'Shall' mean in ANSI standards?", options: ["Recommended", "Optional", "Mandatory", "Suggested"], correct: 2 },
  { question: "How many cosmetic laser procedures does this program cover?", options: ["8", "10", "13", "15"], correct: 2 },
  { question: "What must every laser facility have written?", options: ["A business plan", "An SOP manual", "A marketing strategy", "A client waiver"], correct: 1 },
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
      const t = setTimeout(() => {
        audioRef.current?.play().catch(() => {/* autoplay blocked */});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [currentSlide]);

  function handleAudioPlay() { setAudioPlaying(true); }
  function handleAudioPause() { setAudioPlaying(false); }
  function handleAudioEnded() {
    setAudioPlaying(false);
    const updated = [...audioFinished];
    updated[currentSlide] = true;
    setAudioFinished(updated);
    if (currentSlide >= highestUnlocked) setHighestUnlocked(currentSlide + 1);
  }
  function handleAudioError() { setAudioPlaying(false); }

  function goNext() {
    if (!audioFinished[currentSlide]) return;
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowQuiz(true);
    }
  }

  function goPrev() {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  }

  function submitQuiz() {
    const score = quizAnswers.reduce<number>((acc, ans, i) => acc + (ans === QUIZ_QUESTIONS[i].correct ? 1 : 0), 0);
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
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
                      <button
                        key={oi}
                        onClick={() => {
                          const a = [...quizAnswers];
                          a[qi] = oi;
                          setQuizAnswers(a);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-colors text-sm ${
                          quizAnswers[qi] === oi
                            ? "border-teal-500 bg-teal-50 text-teal-700 font-medium"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={submitQuiz}
                disabled={quizAnswers.some((a) => a === null)}
                className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold transition-colors"
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <div className={`text-5xl font-bold mb-2 ${quizScore >= 80 ? "text-teal-600" : "text-red-500"}`}>{quizScore}%</div>
              <p className="text-lg font-semibold text-gray-900 mb-2">{quizScore >= 80 ? "Congratulations! You passed." : "Keep studying — you need 80% to pass."}</p>
              <p className="text-sm text-gray-500 mb-6">{quizScore >= 80 ? "Your Chapter 1 completion has been recorded." : "Review the slides and try again."}</p>
              {quizScore < 80 && (
                <button
                  onClick={() => { setShowQuiz(false); setQuizAnswers(new Array(QUIZ_QUESTIONS.length).fill(null)); setQuizSubmitted(false); }}
                  className="mb-3 w-full py-3 rounded-lg border border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 transition-colors"
                >
                  Review Slides
                </button>
              )}
              <button
                onClick={() => navigate("/")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Return to Home
              </button>
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
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
            </svg>
            <span className="text-xs text-gray-500 hidden sm:inline">Watch Time</span>
            <span className="font-mono font-bold text-teal-600 text-sm">{formatTime(watchSeconds)}</span>
            {audioPlaying && <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" title="Timer running"/>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-0 sm:px-4 py-4 sm:py-6 grid md:grid-cols-3 gap-4 sm:gap-6">
        {/* Slide Content */}
        <div className="md:col-span-2">
          <div className="bg-white sm:rounded-xl shadow-sm border-y sm:border border-gray-200 overflow-hidden">
            {/* Slide image — full-bleed, 4:3 aspect ratio matching PPSX */}
            <div className="w-full" style={{ aspectRatio: '4/3', background: '#000' }}>
              <img
                src={slide.slideImage}
                alt={slide.title}
                className="w-full h-full object-contain block"
                loading="lazy"
              />
            </div>

            {/* Slide caption */}
            <div className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">{slide.subtitle}</p>
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

          {/* Slide Notes */}
          <div className="bg-white sm:rounded-xl shadow-sm border-y sm:border border-gray-200 mt-3 sm:mt-4 overflow-hidden">
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

          {/* Three Paths CTA */}
          <div className="bg-white sm:rounded-xl shadow-sm border-y sm:border border-gray-200 px-4 sm:px-6 py-4 sm:py-6 mt-3 sm:mt-2">
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
                <div key={path.title} className="border border-gray-200 rounded-xl p-4 text-center hover:border-teal-300 hover:shadow-sm transition-all">
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
            <div className="text-center">
              <button
                onClick={() => setShowEnrollModal(true)}
                className="px-6 py-2.5 rounded-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 text-sm font-semibold transition-colors"
              >
                Stay in the Loop
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 px-4 sm:px-0">
          {/* Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Your Progress</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Completion</span>
              <span className="text-sm font-bold text-teal-600">{completionPct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
              <div className="bg-teal-500 h-2 rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
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

          {/* Compliance Mode */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-teal-600 mb-3">Compliance Mode</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Only audio time is tracked", "Cannot skip slides", "Cannot go backward past current", "Must finish audio to advance"].map((item) => (
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
        Narrated by iZabel • {SLIDES.length} slides • Approximately 90-120 minutes
      </div>

      {/* Enroll Modal */}
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
              <p className="text-teal-100 text-sm">Choose the path that fits your goals. Full enrollment links coming soon — drop your info and we'll reach out.</p>
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
              <p className="text-xs text-center text-gray-400">Questions? Contact us at MicroAesthetics Laser Tech Institute.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
