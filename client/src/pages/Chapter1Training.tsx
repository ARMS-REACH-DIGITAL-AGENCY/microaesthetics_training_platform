import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

// Slide content data for Chapter 1
const CHAPTER1_SLIDES = [
  {
    id: 1,
    title: "Welcome to Chapter 1",
    subtitle: "Introduction to Laser Industry Laws & Agencies",
    content: "This comprehensive introduction covers the regulatory landscape, safety standards, and professional requirements for laser technicians in Arizona.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/iHpJsnsfRTjohxNN.wav",
  },
  {
    id: 2,
    title: "Important Disclaimer",
    subtitle: "Before We Begin",
    content: "This training is for educational purposes. Always follow local, state, and federal regulations. Consult with legal and medical professionals as needed.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/PlSvIfGYFHoDpDhl.wav",
  },
  {
    id: 3,
    title: "Course Objectives",
    subtitle: "What You'll Learn",
    content: "By the end of this chapter, you will understand laser safety classifications, regulatory agencies, Arizona-specific requirements, and professional responsibilities.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/KcxAerLrZYQYJERu.wav",
  },
  {
    id: 4,
    title: "Meet Your Instructor",
    subtitle: "iZabel - Founder & Expert",
    content: "With decades of experience in aesthetic laser technology, iZabel brings real-world expertise and practical knowledge to every lesson.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/MvBVpfvpKQUlVIfe.wav",
  },
  {
    id: 5,
    title: "Laser Industry Overview",
    subtitle: "Market Trends & Growth",
    content: "The aesthetic laser industry continues to grow at 12% annually. Understanding regulations is essential for professional success.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/vyaPNZbaHHHWHXfe.wav",
  },
  {
    id: 6,
    title: "What is a Certified Laser Technician?",
    subtitle: "Professional Definition",
    content: "A certified laser technician is a trained professional authorized to operate laser equipment for aesthetic and medical procedures under proper supervision.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/chrSMGphFdszMHAV.wav",
  },
  {
    id: 7,
    title: "Laser Industry Trends",
    subtitle: "Current Market Landscape",
    content: "Emerging technologies, increased consumer demand, and stricter regulations are shaping the future of laser services.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/cAKPjhwixoUtuNbK.wav",
  },
  {
    id: 8,
    title: "ANSI Standards",
    subtitle: "American National Standards Institute",
    content: "ANSI sets the safety standards for laser equipment and operation. Understanding these standards is critical for compliance.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ITtCTsBpsskFMOdH.wav",
  },
  {
    id: 9,
    title: "Government Agencies",
    subtitle: "Regulatory Bodies",
    content: "Multiple agencies oversee laser technology including OSHA, FDA, ADHS, and state boards. Each has specific requirements.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ZSrfDaItVuoVOaHr.wav",
  },
  {
    id: 10,
    title: "Laser Classifications",
    subtitle: "Safety Levels 1-4",
    content: "Lasers are classified by power and safety risk. Class 1 is safest, Class 4 requires maximum precautions.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/bGyGtIithjEqBKyg.wav",
  },
  {
    id: 11,
    title: "Laser Safety Manager Responsibilities",
    subtitle: "Key Duties",
    content: "Safety managers ensure compliance, maintain equipment, conduct training, and manage incident reporting.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/mTRlmieVlNxjwVUY.wav",
  },
  {
    id: 12,
    title: "Incident Reporting",
    subtitle: "When & How to Report",
    content: "All laser-related incidents must be documented and reported to appropriate agencies within required timeframes.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/KouVSVBdzXtXAtyf.wav",
  },
  {
    id: 13,
    title: "Laser Key Safety",
    subtitle: "Equipment Access Control",
    content: "Laser equipment must be secured with proper key management to prevent unauthorized access and misuse.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/pvriupuushsPfrGq.wav",
  },
  {
    id: 14,
    title: "End of Chapter Quiz",
    subtitle: "Test Your Knowledge",
    content: "You've completed the content. Now take the quiz to test your understanding. You need 80% to pass.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/GyFxUQNHHIWezgwj.wav",
  },
  {
    id: 15,
    title: "Arizona Department of Health Services",
    subtitle: "ADHS Requirements",
    content: "ADHS oversees healthcare professionals in Arizona. Laser technicians must comply with state-specific regulations.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/HUspkHZJVDzRahSj.wav",
  },
  {
    id: 16,
    title: "Arizona Radiation Regulatory Agency",
    subtitle: "State Oversight",
    content: "Arizona's radiation agency ensures safe use of radioactive materials and radiation-emitting devices.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/DkgeTwClWAoiUJuj.wav",
  },
  {
    id: 17,
    title: "Professional Certifications",
    subtitle: "Industry Credentials",
    content: "Various organizations offer professional certifications for laser technicians. Continuing education is often required.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/THBfQlIbysnuAAih.wav",
  },
  {
    id: 18,
    title: "Safety Protocols",
    subtitle: "Best Practices",
    content: "Always follow established safety protocols including proper eyewear, skin testing, and client consent procedures.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/DbQbKJMOvTfUJUUW.wav",
  },
  {
    id: 19,
    title: "Equipment Maintenance",
    subtitle: "Keeping Systems Safe",
    content: "Regular maintenance and calibration of laser equipment is essential for safety and effectiveness.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/kEDfReuNYkokNXBI.wav",
  },
  {
    id: 20,
    title: "Client Consultation",
    subtitle: "Pre-Procedure Assessment",
    content: "Thorough client consultation identifies contraindications and ensures informed consent before any laser procedure.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/cBdFIHCgLiyRNefp.wav",
  },
  {
    id: 21,
    title: "Post-Procedure Care",
    subtitle: "Client Instructions",
    content: "Proper post-procedure care instructions reduce complications and ensure optimal results for clients.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ppqaRAhpYXztuVpE.wav",
  },
  {
    id: 22,
    title: "Continuing Education",
    subtitle: "Professional Development",
    content: "Stay current with industry changes through continuing education and professional development opportunities.",
    audioFile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663368558979/ywWcTqPwSahRWmtk.wav",
  },
];

export default function Chapter1Training() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const slide = CHAPTER1_SLIDES[currentSlide];
  const totalSlides = CHAPTER1_SLIDES.length;
  const completionPercentage = Math.round(((currentSlide + 1) / totalSlides) * 100);

  // Handle slide changes
  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setProgress(0);
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
    handleNextSlide();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Chapter 1: Introduction to Laser Industry Laws & Agencies
          </h1>
          <p className="text-lg text-slate-600">
            Slide {currentSlide + 1} of {totalSlides}
          </p>
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
                  Click play to hear iZabel's expert narration
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="bg-slate-100 p-6 flex gap-4">
                <Button
                  onClick={handlePreviousSlide}
                  disabled={currentSlide === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNextSlide}
                  disabled={currentSlide === totalSlides - 1}
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar: Progress & Slide Navigation */}
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
            </Card>

            {/* Slide Thumbnails */}
            <Card className="bg-white shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                All Slides
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {CHAPTER1_SLIDES.map((s, index) => (
                  <button
                    key={s.id}
                    onClick={() => handleSlideClick(index)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      currentSlide === index
                        ? "bg-teal-100 border-2 border-teal-600 text-teal-900 font-semibold"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="text-sm font-medium">Slide {s.id}</div>
                    <div className="text-xs truncate">{s.title}</div>
                  </button>
                ))}
              </div>
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
