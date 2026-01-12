"use client";

import React, { useState, useRef, useEffect } from 'react';
// FIX 1: Use relative path to ensure it finds the file
import { supabase } from './lib/supabaseClient';

// --- Components ---

const Navbar = ({ currentPage, navigateTo, toggleMobileMenu, isMobileMenuOpen, session }: any) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TDS Data Labs</h1>
              <p className="text-xs text-gray-400">School AI Platform</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['home', 'students', 'teachers', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className={`capitalize transition-colors ${currentPage === page ? 'text-white font-medium' : 'text-gray-300 hover:text-white'}`}
              >
                {page === 'home' ? 'Home' : page === 'students' ? 'For Students' : page === 'teachers' ? 'For Teachers' : 'Contact'}
              </button>
            ))}
            
            {/* Login / Chat Button Logic */}
            {!session ? (
              <button
                onClick={() => navigateTo('login')}
                className="px-6 py-2 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => navigateTo('chat')}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all"
              >
                Open AI Tutor
              </button>
            )}
          </div>

          <button onClick={toggleMobileMenu} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
            {['home', 'students', 'teachers', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className="block w-full text-left text-gray-300 hover:text-white py-2 capitalize"
              >
                {page}
              </button>
            ))}
             {!session ? (
              <button
                onClick={() => navigateTo('login')}
                className="block w-full text-left text-gray-300 hover:text-white py-2"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => navigateTo('chat')}
                className="w-full px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium"
              >
                Open AI Tutor
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// --- Page Components ---

const LoginPage = ({ navigateTo }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigateTo('chat');
      }
    };
    checkSession();
  }, [navigateTo]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // On success, navigate to chat
      navigateTo('chat');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-4">
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to continue to your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

const HomePage = ({ navigateTo }: any) => (
  <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
    {/* Background Animations */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl top-20 left-0 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse delay-700"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          The Future of Learning is Personalized
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Empowering students and assisting teachers with the world's most advanced School AI. Powered by TDS Data Labs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigateTo('login')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-white font-medium text-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all">
            Try the AI Tutor
          </button>
          <button onClick={() => navigateTo('contact')} className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-medium text-lg hover:bg-white/20 transition-all">
            Request a Demo
          </button>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-20">
        <h2 className="text-2xl font-bold mb-4 text-center">About TDS Data Labs</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto">
          At TDS Data Labs, we bridge the gap between traditional curriculum and artificial intelligence, ensuring safe, accurate, and syllabus-compliant assistance for the next generation of learners.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
          title="Instant Doubt Solving"
          desc="24/7 answers for homework with step-by-step explanations that help students truly understand concepts."
        />
        <FeatureCard 
          icon={<><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></>}
          title="Teacher Assistant"
          desc="Auto-grading, lesson planning, and analytics to help teachers focus on what matters most—teaching."
        />
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>}
          title="Safe & Secure"
          desc="Data privacy optimized for schools with secure, compliant infrastructure protecting student information."
        />
      </div>
    </div>
  </div>
);

const StudentsPage = ({ navigateTo }: any) => (
  <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Your Personal Tutor, Available 24/7
        </h1>
        <p className="text-xl text-gray-300">Never get stuck on homework again. Learn smarter, not harder.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <StudentFeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>}
          title="Homework Helper"
          desc="Stuck on a math problem? Snap a photo or type it in. Our AI doesn't just give the answer—it teaches you the steps."
          actionText="Try it now"
        />
        <StudentFeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>}
          title="Exam Prep"
          desc="Generate custom quizzes based on your textbook chapters to practice before the real test."
          actionText="Start practicing"
        />
        <StudentFeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>}
          title="Concept Simplifier"
          desc="Confused by Physics? Ask TDS AI to 'explain it like I'm 10 years old'."
          actionText="Ask a question"
        />

        {/* Interactive Try Box */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Try it now!</h3>
          <div className="space-y-3">
            {[
              "What is photosynthesis?",
              "Explain Newton's laws",
              "Help me with algebra"
            ].map((prompt) => (
              <button 
                key={prompt}
                onClick={() => navigateTo('chat', prompt)} 
                className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeachersPage = () => (
  <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
          Teach More. Grade Less.
        </h1>
        <p className="text-xl text-gray-300">Empower your teaching with AI-driven tools that save time and enhance learning.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>}
          title="Lesson Planning"
          desc="Generate comprehensive lesson plans, worksheets, and slide decks in seconds. Customize to match your teaching style."
        />
        <FeatureCard 
           icon={<><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></>}
          title="Automated Grading"
          desc="Upload student essays and get instant feedback on grammar, structure, and factual accuracy. Save hours every week."
        />
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>}
          title="Student Insights"
          desc="Track which concepts your class is struggling with using TDS Data Labs analytics. Personalize your teaching approach."
        />
      </div>

      <div className="backdrop-blur-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-3xl p-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <span className="text-lg font-medium text-teal-400">Certified & Compliant</span>
        </div>
        <p className="text-2xl font-bold mb-2">Aligned with Education Standards</p>
        <p className="text-gray-300">Our platform meets all local and international curriculum requirements.</p>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Partner with TDS Data Labs</h1>
          <p className="text-xl text-gray-300">Let's transform education together. Get in touch with our team.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <ContactInfoItem 
                icon={<><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></>}
                title="Headquarters"
                details={<>Tech Park, Innovation District<br />Mumbai, Maharashtra, India</>}
              />
              <ContactInfoItem 
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>}
                title="Email"
                details="schools@tdsdatalabs.com"
              />
              <ContactInfoItem 
                 icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>}
                title="Phone"
                details="+91-XXXXXXXXXX"
              />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" required className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all text-white" />
              <input type="text" placeholder="School Name" required className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all text-white" />
              <select className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all text-white" required>
                <option value="" className="bg-slate-900">Select Role</option>
                <option value="principal" className="bg-slate-900">Principal</option>
                <option value="teacher" className="bg-slate-900">Teacher</option>
                <option value="admin" className="bg-slate-900">Administrator</option>
              </select>
              <textarea 
                placeholder="Message" 
                rows={4} 
                required 
                className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all resize-none text-white"
              ></textarea>
              <button type="submit" className="w-full p-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = ({ initialMessage }: any) => {
  const [messages, setMessages] = useState([{ type: 'ai', text: "Hello! I'm School AI by TDS Data Labs. How can I help you today?" }]);
  const [inputValue, setInputValue] = useState(initialMessage || "");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://n8nclient.in/webhook/school_ai?message=" + encodeURIComponent(userText));
      const text = await response.text();
      setMessages(prev => [...prev, { type: 'ai', text: text || "No answer returned" }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', text: "⚠️ Error connecting to School AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exportChat = () => {
    const textContent = messages.map(m => `${m.type.toUpperCase()}: ${m.text}`).join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tds-chat-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white pt-20 flex flex-col">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full h-full">
        {/* Chat Header */}
        <div className="p-6 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">TDS AI Tutor</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Online</span>
                </div>
              </div>
            </div>
            <button onClick={exportChat} className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl p-4 rounded-2xl ${msg.type === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'backdrop-blur-xl bg-white/10 border border-white/20'}`}>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 backdrop-blur-xl bg-white/5 border-t border-white/10">
          <div className="flex gap-3 items-end">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your studies..."
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all resize-none text-white"
              rows={1}
            ></textarea>
            <button onClick={handleSendMessage} className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Press Enter to send • Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  );
};

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'ai', text: "Hello! I'm School AI by TDS Data Labs. How can I help you today?" }]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://n8nclient.in/webhook/school_ai?message=" + encodeURIComponent(userText));
      const text = await response.text();
      setMessages(prev => [...prev, { type: 'ai', text: text || "No answer returned" }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', text: "⚠️ Error connecting to School AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Widget Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] backdrop-blur-2xl bg-slate-900/95 border border-white/20 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <span className="font-bold text-white">TDS AI Tutor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-all text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.type === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/10'} text-white`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="max-w-[80%] p-3 rounded-xl text-sm bg-white/10 text-white">
                   <div className="flex gap-2">
                     <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                     <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm outline-none text-white"
              />
              <button onClick={handleSendMessage} className="p-3 bg-teal-500 rounded-lg hover:bg-teal-600 transition-all">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-40"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </button>
      )}
    </>
  );
};

// --- Helper Components ---

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-300">{desc}</p>
  </div>
);

const StudentFeatureCard = ({ icon, title, desc, actionText }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
    </div>
    <p className="text-gray-300 mb-4">{desc}</p>
    <div className="flex items-center gap-2 text-purple-400 cursor-pointer">
      <span>{actionText}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  </div>
);

const ContactInfoItem = ({ icon, title, details }: any) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-gray-300">{details}</p>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [chatInitialMessage, setChatInitialMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  // Check Supabase session
  useEffect(() => {
    // FIX: Added ": any" to response to satisfy TypeScript
    supabase.auth.getSession().then((response: any) => {
      setSession(response.data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const navigateTo = (page: string, initialMsg = '') => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (page === 'chat' && initialMsg) {
      setChatInitialMessage(initialMsg);
    } else if (page !== 'chat') {
      setChatInitialMessage('');
    }
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        session={session}
      />

      <main>
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'students' && <StudentsPage navigateTo={navigateTo} />}
        {currentPage === 'teachers' && <TeachersPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'chat' && <ChatPage initialMessage={chatInitialMessage} />}
        {currentPage === 'login' && <LoginPage navigateTo={navigateTo} />}
      </main>

      {currentPage !== 'chat' && currentPage !== 'login' && <FloatingChatWidget />}
    </div>
  );
};

export default App;