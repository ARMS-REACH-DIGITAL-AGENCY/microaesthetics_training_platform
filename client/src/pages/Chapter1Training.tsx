import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Clock } from "lucide-react";

// Slide content data for Chapter 1
const CHAPTER1_SLIDES = [
  {
    id: 1,
    title: "Welcome to Chapter 1",
    subtitle: "Introduction to Laser Industry Laws & Agencies",
    content: "This comprehensive introduction covers the regulatory landscape, safety standards, and professional requirements for laser technicians in Arizona.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/iHpJsnsfRTjohxNN.wav",
    audioDuration: 36,
  },
  {
    id: 2,
    title: "Important Disclaimer",
    subtitle: "Before We Begin",
    content: "This training is for educational purposes. Always follow local, state, and federal regulations. Consult with legal and medical professionals as needed.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/PlSvIfGYFHoDpDhl.wav",
    audioDuration: 45,
  },
  {
    id: 3,
    title: "Course Objectives",
    subtitle: "What You'll Learn",
    content: "By the end of this chapter, you will understand laser safety classifications, regulatory agencies, Arizona-specific requirements, and professional responsibilities.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/KcxAerLrZYQYJERu.wav",
    audioDuration: 42,
  },
  {
    id: 4,
    title: "Meet Your Instructor",
    subtitle: "iZabel - Founder & Expert",
    content: "With decades of experience in aesthetic laser technology, iZabel brings real-world expertise and practical knowledge to every lesson.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/MvBVpfvpKQUlVIfe.wav",
    audioDuration: 38,
  },
  {
    id: 5,
    title: "Laser Industry Overview",
    subtitle: "Market Trends & Growth",
    content: "The aesthetic laser industry continues to grow at 12% annually. Understanding regulations is essential for professional success.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/vyaPNZbaHHHWHXfe.wav",
    audioDuration: 40,
  },
  {
    id: 6,
    title: "What is a Certified Laser Technician?",
    subtitle: "Professional Definition",
    content: "A certified laser technician is a trained professional authorized to operate laser equipment for aesthetic and medical procedures under proper supervision.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/chrSMGphFdszMHAV.wav",
    audioDuration: 44,
  },
  {
    id: 7,
    title: "Laser Industry Trends",
    subtitle: "Current Market Landscape",
    content: "Emerging technologies, increased consumer demand, and stricter regulations are shaping the future of laser services.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/cAKPjhwixoUtuNbK.wav",
    audioDuration: 39,
  },
  {
    id: 8,
    title: "ANSI Standards",
    subtitle: "American National Standards Institute",
    content: "ANSI sets the safety standards for laser equipment and operation. Understanding these standards is critical for compliance.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ITtCTsBpsskFMOdH.wav",
    audioDuration: 46,
  },
  {
    id: 9,
    title: "Government Agencies",
    subtitle: "Regulatory Bodies",
    content: "Multiple agencies oversee laser technology including OSHA, FDA, ADHS, and state boards. Each has specific requirements.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ZSrfDaItVuoVOaHr.wav",
    audioDuration: 41,
  },
  {
    id: 10,
    title: "Laser Classifications",
    subtitle: "Safety Levels 1-4",
    content: "Lasers are classified by power and safety risk. Class 1 is safest, Class 4 requires maximum precautions.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/bGyGtIithjEqBKyg.wav",
    audioDuration: 43,
  },
  {
    id: 11,
    title: "Laser Safety Manager Responsibilities",
    subtitle: "Key Duties",
    content: "Safety managers ensure compliance, maintain equipment, conduct training, and manage incident reporting.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/mTRlmieVlNxjwVUY.wav",
    audioDuration: 47,
  },
  {
    id: 12,
    title: "Incident Reporting",
    subtitle: "When & How to Report",
    content: "All laser-related incidents must be documented and reported to appropriate agencies within required timeframes.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/KouVSVBdzXtXAtyf.wav",
    audioDuration: 40,
  },
  {
    id: 13,
    title: "Laser Key Safety",
    subtitle: "Equipment Access Control",
    content: "Laser equipment must be secured with proper key management to prevent unauthorized access and misuse.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/pvriupuushsPfrGq.wav",
    audioDuration: 38,
  },
  {
    id: 14,
    title: "End of Chapter Quiz",
    subtitle: "Test Your Knowledge",
    content: "You've completed the content. Now take the quiz to test your understanding. You need 80% to pass.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/GyFxUQNHHIWezgwj.wav",
    audioDuration: 35,
  },
  {
    id: 15,
    title: "Arizona Department of Health Services",
    subtitle: "ADHS Requirements",
    content: "ADHS oversees healthcare professionals in Arizona. Laser technicians must comply with state-specific regulations.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/HUspkHZJVDzRahSj.wav",
    audioDuration: 42,
  },
  {
    id: 16,
    title: "Arizona Radiation Regulatory Agency",
    subtitle: "State Oversight",
    content: "Arizona's radiation agency ensures safe use of radioactive materials and radiation-emitting devices.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/DkgeTwClWAoiUJuj.wav",
    audioDuration: 39,
  },
  {
    id: 17,
    title: "Professional Certifications",
    subtitle: "Industry Credentials",
    content: "Various organizations offer professional certifications for laser technicians. Continuing education is often required.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/THBfQlIbysnuAAih.wav",
    audioDuration: 41,
  },
  {
    id: 18,
    title: "Safety Protocols",
    subtitle: "Best Practices",
    content: "Always follow established safety protocols including proper eyewear, skin testing, and client consent procedures.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/DbQbKJMOvTfUJUUW.wav",
    audioDuration: 44,
  },
  {
    id: 19,
    title: "Equipment Maintenance",
    subtitle: "Keeping Systems Safe",
    content: "Regular maintenance and calibration of laser equipment is essential for safety and effectiveness.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/kEDfReuNYkokNXBI.wav",
    audioDuration: 40,
  },
  {
    id: 20,
    title: "Client Consultation",
    subtitle: "Pre-Procedure Assessment",
    content: "Thorough client consultation identifies contraindications and ensures informed consent before any laser procedure.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/cBdFIHCgLiyRNefp.wav",
    audioDuration: 43,
  },
  {
    id: 21,
    title: "Post-Procedure Care",
    subtitle: "Client Instructions",
    content: "Proper post-procedure care instructions reduce complications and ensure optimal results for clients.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ppqaRAhpYXztuVpE.wav",
    audioDuration: 38,
  },
  {
    id: 22,
    title: "Continuing Education",
    subtitle: "Professional Development",
    content: "Stay current with industry changes through continuing education and professional development opportunities.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
    audioDuration: 36,
  },
];

export default function Chapter1Training() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioFinished, setAudioFinished] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [slideStartTime, setSlideStartTime] = useState<Date | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slide = CHAPTER1_SLIDES[currentSlide];
  const totalSlides = CHAPTER1_SLIDES.length;
  const completionPercentage = Math.round(((currentSlide + 1) / totalSlides) * 100);

  // Initialize session on mount
  useEffect(() => {
    const now = new Date();
    setSessionStartTime(now);
    setSlideStartTime(now);

    // Start real clock timer
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Update slide start time when slide changes
  useEffect(() => {
    setSlideStartTime(new Date());
    setAudioFinished(false);
  }, [currentSlide]);

  // Format time display (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Handle slide changes - ONLY allow next if audio finished
  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1 && audioFinished) {
      setCurrentSlide(currentSlide + 1);
      setIsPlaying(false);
      setProgress(0);
    }
  };

  // Prevent going backward
  const handlePreviousSlide = () => {
    // Disabled - cannot go backward in compliance mode
  };

  // Prevent direct slide clicking
  const handleSlideClick = (index: number) => {
    // Disabled - cannot skip slides in compliance mode
  };

  // Handle audio playback
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  // Auto-advance to next slide when audio ends
  const handleAudioEnd = () => {
    setIsPlaying(false);
    setAudioFinished(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Real Clock */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Chapter 1: Introduction to Laser Industry Laws & Agencies
              </h1>
              <p className="text-lg text-slate-600">
                Slide {currentSlide + 1} of {totalSlides}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-semibold">Session Time</span>
              </div>
              <div className="text-3xl font-bold text-teal-600">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Slide Viewer */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg overflow-hidden">
              {/* Slide Content */}
              <div className="bg-gradient-to-br from-teal-50 to-slate-50 p-12 min-h-96 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-slate-900 mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-xl text-teal-600 font-semibold">
                    {slide.subtitle}
                  </p>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {slide.content}
                </p>
              </div>

              {/* Audio Player */}
              <div className="bg-slate-900 text-white p-6">
                <audio
                  ref={audioRef}
                  src={slide.audioFile}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleAudioEnd}
                  className="hidden"
                />

                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={togglePlayPause}
                    className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 p-3 rounded-full transition"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  {/* Progress Bar */}
                  <div className="flex-1">
                    <div className="bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="flex-shrink-0 hover:text-teal-400 transition"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                </div>

                <p className="text-sm text-slate-400 text-center">
                  {audioFinished
                    ? "✓ Audio complete. Click Next to continue."
                    : "Click play to hear iZabel's expert narration"}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="bg-slate-100 p-6 flex gap-4">
                <Button
                  onClick={handlePreviousSlide}
                  disabled={true}
                  variant="outline"
                  className="flex-1 opacity-50 cursor-not-allowed"
                  title="Cannot go backward in training"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNextSlide}
                  disabled={currentSlide === totalSlides - 1 || !audioFinished}
                  className={`flex-1 ${
                    audioFinished
                      ? "bg-teal-600 hover:bg-teal-700"
                      : "bg-slate-400 cursor-not-allowed"
                  }`}
                  title={
                    !audioFinished
                      ? "Please finish listening to the audio before advancing"
                      : ""
                  }
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar: Progress & Info */}
          <div className="lg:col-span-1">
            {/* Progress Card */}
            <Card className="bg-white shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Your Progress
              </h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Completion</span>
                  <span className="text-lg font-bold text-teal-600">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-teal-600 h-3 rounded-full transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Slide {currentSlide + 1} of {totalSlides}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Progress only moves forward
              </p>
            </Card>

            {/* Compliance Info */}
            <Card className="bg-blue-50 border border-blue-200 shadow-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">
                Compliance Mode
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>All time is tracked</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Cannot skip slides</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Cannot go backward</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Must finish audio</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-slate-600">
            Narrated by iZabel • {totalSlides} slides • Approximately 45-60 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
