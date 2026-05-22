import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Zap, ArrowRight, Sparkles, Brain, Clock, Users } from 'lucide-react';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-brand/10 blur-3xl mix-blend-multiply animate-float"></div>
        <div className="absolute bottom-0 left-0 -ml-40 w-96 h-96 rounded-full bg-ai/10 blur-3xl mix-blend-multiply animate-float-delayed"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-ai/10 text-ai font-semibold text-sm border border-ai/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Healthcare Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-[64px] font-extrabold text-text-primary leading-[1.1] tracking-tight">
              Smarter Care.<br/>
              <span className="text-gradient">AI Powered.</span><br/>
              Seamless Booking.
            </h1>
            
            <p className="text-lg text-text-secondary max-w-lg leading-relaxed font-sans">
              Experience the future of healthcare. Get instant AI triage, smart specialist recommendations, and book appointments with top-rated doctors in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/doctors" className="px-8 py-4 bg-hero-gradient text-white text-lg font-semibold rounded-full shadow-[var(--shadow-glow)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/symptom-checker" className="px-8 py-4 bg-white text-text-primary text-lg font-semibold rounded-full border border-border hover:border-brand/30 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm">
                <Brain className="w-5 h-5 text-ai" />
                <span>Try AI Checker</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 pt-6 text-sm text-text-secondary font-medium">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span>Verified Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-brand" />
                <span>Instant Booking</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block h-[600px] animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {/* Main Image/Card Mockup */}
            <div className="absolute inset-0 bg-hero-gradient rounded-[40px] opacity-10 transform rotate-3 scale-105"></div>
            <div className="absolute inset-0 bg-glass rounded-[40px] border border-white/60 shadow-[var(--shadow-glow)] p-8 flex flex-col items-center justify-center relative overflow-hidden group">
              
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Floating UI Element 1 */}
              <div className="absolute top-12 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-4 animate-float">
                <div className="w-12 h-12 bg-ai/10 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-ai" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium">AI Diagnosis</p>
                  <p className="font-bold text-text-primary">98% Accuracy</p>
                </div>
              </div>

              {/* Floating UI Element 2 */}
              <div className="absolute bottom-20 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-4 animate-float-delayed">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-medium">Time Saved</p>
                  <p className="font-bold text-text-primary">45 mins/visit</p>
                </div>
              </div>

              {/* Center Profile Mockup */}
              <div className="w-64 bg-white rounded-3xl shadow-lg border border-slate-100 p-6 flex flex-col items-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-hero-gradient p-1 mb-4">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl overflow-hidden border-2 border-white">
                    👨‍⚕️
                  </div>
                </div>
                <h3 className="font-bold text-xl text-text-primary">Dr. Sarah Jenkins</h3>
                <p className="text-sm text-text-secondary mb-4">Cardiologist</p>
                <div className="w-full h-10 bg-slate-100 rounded-full flex items-center justify-center text-sm font-semibold text-brand">
                  Available Today
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-text-primary mb-6 tracking-tight">The Future of Care is Here</h2>
            <p className="text-xl text-text-secondary">Our platform integrates cutting-edge artificial intelligence to provide you with the most accurate, frictionless healthcare experience possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-10 rounded-[32px] bg-surface border border-border hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-ai mb-8 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">AI Symptom Checker</h3>
              <p className="text-text-secondary leading-relaxed">Enter your symptoms in natural language. Our advanced LLM instantly triages your condition and recommends the right specialist.</p>
            </div>
            
            {/* Card 2 */}
            <div className="p-10 rounded-[32px] bg-surface border border-border hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Report Summarizer</h3>
              <p className="text-text-secondary leading-relaxed">Upload complex medical PDFs. Our OCR and AI breaks down medical jargon into simple, actionable summaries and metrics.</p>
            </div>
            
            {/* Card 3 */}
            <div className="p-10 rounded-[32px] bg-surface border border-border hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Smart Matching</h3>
              <p className="text-text-secondary leading-relaxed">Get personalized doctor recommendations based on your symptoms, appointment history, and real-time doctor availability.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-hero-gradient rounded-[40px] p-12 md:p-20 text-center text-white shadow-[var(--shadow-glow-ai)]">
            {token ? (
              <>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Manage Your Health</h2>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">Keep track of your scheduled visits and past consultations easily.</p>
                <Link to="/my-appointments" className="inline-block px-10 py-5 bg-white text-text-primary text-lg font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
                  View Previous Appointments
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to take control of your health?</h2>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">Join thousands of patients who are already experiencing the seamless, AI-powered booking platform.</p>
                <Link to="/login" className="inline-block px-10 py-5 bg-white text-text-primary text-lg font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
                  Get Started for Free
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
