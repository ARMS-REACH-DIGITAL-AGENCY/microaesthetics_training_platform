import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Users, Award, BookOpen, ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/malti-logo.png" 
              alt="MALTI Logo" 
              className="h-12 w-auto"
            />
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Button 
                onClick={() => setLocation("/chapter1")}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Continue Learning
              </Button>
            ) : (
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Master Laser Technology
                </h1>
                <p className="text-xl text-slate-200 mb-8">
                  Professional certification training for cosmetic laser technicians. Learn from industry experts with real-world experience.
                </p>
                <div className="flex gap-4">
                  {isAuthenticated ? (
                    <Button 
                      onClick={() => setLocation("/chapter1")}
                      size="lg"
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Start Chapter 1 <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => window.location.href = getLoginUrl()}
                      size="lg"
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="/malti-logo.png" 
                  alt="Isabel's Microaesthetics Laser Tech Institute" 
                  className="w-full max-w-md mx-auto opacity-90"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Free Chapter 1 Preview */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Free Chapter 1 Preview
              </h2>
              <p className="text-xl text-slate-600">
                Experience the complete Chapter 1 curriculum with professional narration
              </p>
            </div>

            <Card className="bg-white shadow-xl overflow-hidden mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Introduction to Laser Industry Laws & Agencies
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Learn the fundamentals of laser technology, Arizona regulations, safety standards, and professional responsibilities. This comprehensive chapter covers:
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Certified Laser Technician definition and career path</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Arizona regulations and governing agencies (ADHS, ARRA)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">ANSI laser classifications and safety standards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Laser Safety Officer responsibilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Incident reporting and key storage procedures</span>
                    </li>
                  </ul>
                  {isAuthenticated ? (
                    <Button 
                      onClick={() => setLocation("/chapter1")}
                      size="lg"
                      className="bg-teal-600 hover:bg-teal-700 w-full"
                    >
                      Start Chapter 1 Now
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => window.location.href = getLoginUrl()}
                      size="lg"
                      className="bg-teal-600 hover:bg-teal-700 w-full"
                    >
                      Start Free Chapter 1
                    </Button>
                  )}
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-slate-50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-1">
                        Total Slides
                      </p>
                      <p className="text-3xl font-bold text-teal-600">33</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-1">
                        Duration
                      </p>
                      <p className="text-3xl font-bold text-teal-600">45-60 min</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-1">
                        Narrated By
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        Isabel
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600">
                        ✓ Professional narration
                      </p>
                      <p className="text-sm text-slate-600">
                        ✓ Compliance tracking
                      </p>
                      <p className="text-sm text-slate-600">
                        ✓ Quiz included
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Why Choose MALTI */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Why Choose Isabel's MALTI
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-lg transition">
                <Users className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Expert Instruction
                </h3>
                <p className="text-slate-600">
                  Learn from Isabel, an industry expert with decades of experience in aesthetic laser technology.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition">
                <Award className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  State-Approved Curriculum
                </h3>
                <p className="text-slate-600">
                  Our training meets Arizona Department of Health Services (ADHS) requirements for laser technician certification.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition">
                <BookOpen className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Comprehensive Content
                </h3>
                <p className="text-slate-600">
                  Complete coverage of laser safety, regulations, classifications, and professional responsibilities.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Laser Career?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Access Chapter 1 for free and see if laser technology is right for you.
            </p>
            {isAuthenticated ? (
              <Button 
                onClick={() => setLocation("/chapter1")}
                size="lg"
                className="bg-white text-teal-600 hover:bg-slate-100"
              >
                Start Learning Now
              </Button>
            ) : (
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                size="lg"
                className="bg-white text-teal-600 hover:bg-slate-100"
              >
                Get Free Access
              </Button>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">
            Isabel's Microaesthetics Laser Tech Institute
          </p>
          <p className="text-sm">
            Licensed laser training center governed by the Arizona Department of Health Services (ADHS)
          </p>
        </div>
      </footer>
    </div>
  );
}
