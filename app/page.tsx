import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, Sparkles, Menu, X, BookOpen, Brain, Shield, Clock, GraduationCap, FileText, TrendingUp, MessageCircle, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

type Message = {
  id: number;
  type: "user" | "ai";
  text: string;
};

type Page = 'home' | 'students' | 'teachers' | 'contact' | 'chat';

export default function TDSDataLabs() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      text: "Hello! I'm School AI by TDS Data Labs. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    if (!input.trim()) return;

    const text = input;
    setMessages((prev) => [...prev, { id: Date.now(), type: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://n8nclient.in/webhook/school_ai?message=" + encodeURIComponent(text)
      );
      const responseText = await response.text();
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "ai", text: responseText || "No answer returned" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, type: "ai", text: "⚠️ Error connecting to School AI service." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function exportChat() {
    const content = messages
      .map((m) => `${m.type === "user" ? "You" : "School AI"}: ${m.text}`)
      .join("\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tds-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const NavBar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TDS Data Labs</h1>
              <p className="text-xs text-gray-400">School AI Platform</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setCurrentPage('home')} className="text-gray-300 hover:text-white transition-colors">Home</button>
            <button onClick={() => setCurrentPage('students')} className="text-gray-300 hover:text-white transition-colors">For Students</button>
            <button onClick={() => setCurrentPage('teachers')} className="text-gray-300 hover:text-white transition-colors">For Teachers</button>
            <button onClick={() => setCurrentPage('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
            <button onClick={() => setCurrentPage('chat')} className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all">
              Try AI Tutor
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white py-2">Home</button>
            <button onClick={() => { setCurrentPage('students'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white py-2">For Students</button>
            <button onClick={() => { setCurrentPage('teachers'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white py-2">For Teachers</button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white py-2">Contact</button>
            <button onClick={() => { setCurrentPage('chat'); setMobileMenuOpen(false); }} className="w-full px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium">Try AI Tutor</button>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl top-20 left-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
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
            <button onClick={() => setCurrentPage('chat')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-white font-medium text-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all">
              Try the AI Tutor
            </button>
            <button onClick={() => setCurrentPage('contact')} className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-medium text-lg hover:bg-white/20 transition-all">
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
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Instant Doubt Solving</h3>
            <p className="text-gray-300">24/7 answers for homework with step-by-step explanations that help students truly understand concepts.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Teacher Assistant</h3>
            <p className="text-gray-300">Auto-grading, lesson planning, and analytics to help teachers focus on what matters most—teaching.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Safe & Secure</h3>
            <p className="text-gray-300">Data privacy optimized for schools with secure, compliant infrastructure protecting student information.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const StudentsPage = () => (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Your Personal Tutor, Available 24/7
          </h1>
          <p className="text-xl text-gray-300">Never get stuck on homework again. Learn smarter, not harder.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Homework Helper</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Stuck on a math problem? Snap a photo or type it in. Our AI doesn't just give the answer—it teaches you the steps so you understand the concept.
            </p>
            <div className="flex items-center gap-2 text-purple-400">
              <span>Try it now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Exam Prep</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Generate custom quizzes based on your textbook chapters to practice before the real test. Get instant feedback and track your progress.
            </p>
            <div className="flex items-center gap-2 text-purple-400">
              <span>Start practicing</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Concept Simplifier</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Confused by Physics? Ask TDS AI to 'explain it like I'm 10 years old'. Complex topics become simple with personalized explanations.
            </p>
            <div className="flex items-center gap-2 text-purple-400">
              <span>Ask a question</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Try it now!</h3>
            <div className="space-y-3">
              <button onClick={() => { setCurrentPage('chat'); setInput('What is photosynthesis?'); }} className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all">
                "What is photosynthesis?"
              </button>
              <button onClick={() => { setCurrentPage('chat'); setInput('Explain Newton\'s laws'); }} className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all">
                "Explain Newton's laws"
              </button>
              <button onClick={() => { setCurrentPage('chat'); setInput('Help me with algebra'); }} className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all">
                "Help me with algebra"
              </button>
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
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-teal-500/50 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Lesson Planning</h3>
            <p className="text-gray-300">Generate comprehensive lesson plans, worksheets, and slide decks in seconds. Customize to match your teaching style.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-teal-500/50 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Automated Grading</h3>
            <p className="text-gray-300">Upload student essays and get instant feedback on grammar, structure, and factual accuracy. Save hours every week.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-teal-500/50 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Student Insights</h3>
            <p className="text-gray-300">Track which concepts your class is struggling with using TDS Data Labs analytics. Personalize your teaching approach.</p>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-3xl p-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-teal-400" />
            <span className="text-lg font-medium text-teal-400">Certified & Compliant</span>
          </div>
          <p className="text-2xl font-bold mb-2">Aligned with Education Standards</p>
          <p className="text-gray-300">Our platform meets all local and international curriculum requirements.</p>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Headquarters</h3>
                  <p className="text-gray-300">Tech Park, Innovation District<br />Mumbai, Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-300">schools@tdsdatalabs.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-gray-300">+91-XXXXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all"
              />
              <input
                type="text"
                placeholder="School Name"
                className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all"
              />
              <select className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all">
                <option value="">Select Role</option>
                <option value="principal">Principal</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Administrator</option>
                <option value="other">Other</option>
              </select>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all resize-none"
              />
              <button className="w-full p-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ChatPage = () => (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white pt-20">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        <div className="p-6 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
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
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-2xl p-4 rounded-2xl ${m.type === "user" ? "bg-gradient-to-r from-purple-500 to-blue-500" : "backdrop-blur-xl bg-white/10 border border-white/20"}`}>
                <p className="leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 backdrop-blur-xl bg-white/5 border-t border-white/10">
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything about your studies..."
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all resize-none"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );

  const FloatingChatButton = () => {
    if (currentPage === 'chat') return null;
    
    return (
      <>
        {chatOpen && (
          <div className="fixed bottom-24 right-6 w-96 h-[600px] backdrop-blur-2xl bg-slate-900/95 border border-white/20 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span className="font-bold">TDS AI Tutor</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.slice(0, 5).map((m) => (
                <div key={m.id} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.type === "user" ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-white/10"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm outline-none"
                />
                <button onClick={handleSend} className="p-3 bg-teal-500 rounded-lg hover:bg-teal-600 transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-40"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'students' && <StudentsPage />}
      {currentPage === 'teachers' && <TeachersPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'chat' && <ChatPage />}
      <FloatingChatButton />
    </div>
  );
}