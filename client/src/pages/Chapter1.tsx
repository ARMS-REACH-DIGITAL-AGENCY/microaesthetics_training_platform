import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2 } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

const SLIDES = Array.from({ length: 37 }, (_, i) => ({
  id: i + 1,
  title: `Slide ${i + 1}`,
  content: `Content for slide ${i + 1}`,
  audioUrl: `/audio/chapter1_segment_${String(i + 1).padStart(2, "0")}.mp3`,
}));

export default function Chapter1() {
  const [, navigate] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("chapter1_access_token");
    const name = localStorage.getItem("lead_name");
    const email = localStorage.getItem("lead_email");

    if (!token) {
      navigate("/lead-capture");
      return;
    }

    setAccessToken(token);
    setLeadName(name || "");
    setLeadEmail(email || "");
  }, [navigate]);

  const { data: progress } = trpc.progress.get.useQuery(undefined, {
    enabled: !!accessToken,
  });

  const updateProgressMutation = trpc.progress.update.useMutation();

  useEffect(() => {
    if (progress?.currentSlide) {
      setCurrentSlide(progress.currentSlide);
    }
  }, [progress]);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < SLIDES.length) {
      setCurrentSlide(slideIndex);
      updateProgressMutation.mutate({ currentSlide: slideIndex });
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    if (currentSlide < SLIDES.length - 1) {
      nextSlide();
    }
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">Loading...</h2>
        </Card>
      </div>
    );
  }

  const slide = SLIDES[currentSlide];
  const progressPercent = ((currentSlide + 1) / SLIDES.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Chapter 1: Introduction to Laser Industry Laws & Agencies
              </h1>
              <p className="text-sm text-muted-foreground">
                Slide {currentSlide + 1} of {SLIDES.length}
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Exit
            </Button>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white min-h-96 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {slide.title}
                </h2>
                <div className="prose prose-sm max-w-none text-foreground">
                  <p>{slide.content}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={nextSlide}
                  disabled={currentSlide === SLIDES.length - 1}
                  className="flex-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Audio Narration
              </h3>

              <audio
                ref={audioRef}
                src={slide.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnd}
              />

              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  className="flex-1 bg-accent hover:bg-accent/90 text-white"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline">
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Progress
                  value={duration ? (currentTime / duration) * 100 : 0}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Slides
              </h3>
              <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`aspect-square rounded border-2 text-xs font-semibold transition-colors ${
                      currentSlide === idx
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-muted text-foreground hover:border-accent"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-muted">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your Progress
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground">Completion</span>
                    <span className="font-semibold text-accent">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
                <p className="text-sm text-foreground">
                  {currentSlide === SLIDES.length - 1
                    ? "🎉 You've reached the end! Take the quiz to test your knowledge."
                    : `${SLIDES.length - currentSlide - 1} slides remaining`}
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-muted">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your Info
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">
                  <span className="font-semibold">Name:</span> {leadName}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Email:</span> {leadEmail}
                </p>
              </div>
            </Card>

            {currentSlide === SLIDES.length - 1 && (
              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-white"
                onClick={() => navigate("/quiz")}
              >
                Take the Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
