"use client";
import React, { useState } from "react";
import { MessageSquare, FileText, Eye, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useOS } from "@/hooks/useOs";
const features = [
  {
    title: "Live Notes",
    description: "Auto-transcribes and highlights key points in real-time.",
    icon: FileText,
    color: "#10B981",
  },
  {
    title: "Instant Answers",
    description:
      "Ask anything, get context-aware responses without switching tabs.",
    icon: MessageSquare,
    color: "#F59E0B",
  },
  {
    title: "Undetectable Overlay",
    description: "Movable UI stays hidden from screen shares and participants.",
    icon: Eye,
    color: "#7C3AED",
  },
  {
    title: "Smart Follow-Ups",
    description: "Generate emails and action items post-meeting.",
    icon: Mail,
    color: "#EC4899",
  },
];
const testimonials = [
  {
    quote:
      "Qluely has transformed how I handle back-to-back meetings. I never miss a detail, and no one knows I'm using it.",
    author: "Sarah Chen",
    role: "Product Manager at TechCorp",
  },
  {
    quote:
      "The real-time answers feature is a game-changer. It's like having a superpower that's completely invisible.",
    author: "Michael Rodriguez",
    role: "Sales Director at GrowthLabs",
  },
  {
    quote:
      "Finally, an AI meeting assistant that actually stays hidden. The undetectable overlay is worth every penny.",
    author: "Emily Watson",
    role: "Consultant at Strategy Partners",
  },
];

export const ApplicationURL: Record<"macOS" | "Linux" | "Windows", string> = {
  macOS:
    "https://github.com/0xLabs-Org/Qluely/releases/download/v1.0.0/Qluely.1.0.2.exe",
  Linux:
    "https://github.com/0xLabs-Org/Qluely/releases/download/v1.0.0/Qluely.1.0.2.exe",
  Windows:
    "https://github.com/0xLabs-Org/Qluely/releases/download/v1.0.0/Qluely.1.0.2.exe",
};

export default function QluelyLanding() {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const os = useOS();

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#7C3AED] selection:text-white overflow-x-hidden">
      {/* --- Navigation --- */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <div className="gradient-text font-bold tracking-wider text-lg sm:text-xl">
              QLUELY
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all font-medium"
            onClick={() => {
              const url = ApplicationURL[os as "macOS" | "Linux" | "Windows"];
              window.open(url);
            }}
          >
            Download Free
          </motion.button>
        </div>
      </motion.nav>

      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-20 pb-12 relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 border border-[#7C3AED]/20 rounded-full text-[#7C3AED] text-sm font-medium mb-8">
              ✨ Trusted by 10,000+ professionals worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="gradient-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 sm:mb-8 px-2 tracking-tight"
          >
            #1 UNDETECTABLE
            <br />
            AI FOR MEETINGS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-700 text-xl sm:text-2xl md:text-3xl leading-[1.5] mb-10 sm:mb-12 max-w-4xl mx-auto px-2 font-light"
          >
            Qluely takes <span className="font-semibold text-[#7C3AED]">perfect meeting notes</span> and gives <span className="font-semibold text-[#EC4899]">real-time answers</span>, all while completely <span className="font-semibold text-[#10B981]">undetectable</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-6 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient group relative bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#7C3AED] bg-size-200 text-white px-10 sm:px-16 py-5 sm:py-6 text-lg sm:text-xl rounded-full hover:shadow-[0_10px_50px_rgba(124,58,237,0.6)] transition-all font-semibold w-full sm:w-auto max-w-md"
              onClick={() => {
                const url = ApplicationURL[os as "macOS" | "Linux" | "Windows"];
                window.open(url);
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Download for {os}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-gray-600"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                ))}
              </div>
              <p className="text-sm sm:text-base ml-2">
                <span className="font-semibold text-gray-900">4.9/5</span> from 2,000+ reviews
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600 text-base sm:text-lg flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Works with Zoom, Teams, Meet • No traces left behind
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 border border-[#7C3AED]/20 rounded-full text-[#7C3AED] text-sm font-medium mb-6">
              ⚡ Powerful Features
            </span>
            <h2 className="gradient-text text-4xl sm:text-5xl md:text-6xl font-bold mb-6 px-2">
              Stay Ahead Without
              <br />
              Breaking Focus
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Everything you need to dominate your meetings while staying completely invisible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative glass rounded-3xl p-8 sm:p-10 hover:shadow-[0_20px_60px_rgba(124,58,237,0.2)] transition-all duration-300 border border-gray-200/50 hover:border-[#7C3AED]/30 bg-white/50"
                >
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7C3AED]/0 via-[#EC4899]/0 to-[#10B981]/0 group-hover:from-[#7C3AED]/10 group-hover:via-[#EC4899]/10 group-hover:to-[#10B981]/10 transition-all duration-500 -z-10"></div>
                  
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}30)`,
                      border: `2px solid ${feature.color}40`,
                    }}
                  >
                    <Icon
                      size={36}
                      className="sm:hidden"
                      style={{ color: feature.color }}
                    />
                    <Icon
                      size={40}
                      className="hidden sm:block"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-4 group-hover:text-[#7C3AED] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative corner element */}
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: feature.color }}></div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 sm:mt-20 text-center"
          >
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-8">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-40">
              {['Google', 'Microsoft', 'Salesforce', 'HubSpot', 'Slack'].map((company, i) => (
                <div key={i} className="text-gray-800 text-xl sm:text-2xl font-bold">{company}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 border border-[#7C3AED]/20 rounded-full text-[#7C3AED] text-sm font-medium mb-6">
              💬 Customer Stories
            </span>
            <h2 className="gradient-text text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Loved by Professionals
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              See what our users have to say about their experience
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200/50"
            >
              <div className="mb-8">
                <svg className="w-12 h-12 text-[#7C3AED] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className="text-gray-800 text-xl sm:text-2xl leading-relaxed mb-8 font-light italic">
                "{testimonials[current].quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[current].author.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-lg">
                    {testimonials[current].author}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-12 h-12 rounded-full glass border border-gray-200 flex items-center justify-center text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === current 
                        ? 'w-8 bg-gradient-to-r from-[#7C3AED] to-[#EC4899]' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-12 h-12 rounded-full glass border border-gray-200 flex items-center justify-center text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="glass rounded-3xl p-10 sm:p-16 border border-gray-200/50 shadow-xl">
              <h2 className="gradient-text text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Get Qluely Now
                <br />
                Free Trial
              </h2>
              <p className="text-gray-600 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
                Join thousands of professionals staying ahead in meetings
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 glass border border-gray-300 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-gradient bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-10 py-4 rounded-2xl hover:shadow-[0_10px_40px_rgba(124,58,237,0.4)] transition-all font-semibold whitespace-nowrap text-base sm:text-lg"
                >
                  {submitted ? "✓ Subscribed!" : "Start Free Trial"}
                </motion.button>
              </form>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#10B981] font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you! Check your email for the download link.
                </motion.p>
              )}

              <p className="text-gray-500 text-sm mt-6">
                No credit card required • Cancel anytime • 14-day free trial
              </p>
            </div>
          </motion.div>

          {/* Footer bottom */}
          <div className="border-t border-gray-200 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                  <span className="text-white font-bold">Q</span>
                </div>
                <div className="gradient-text text-2xl font-bold tracking-wider">
                  QLUELY
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <a href="#features" className="hover:text-[#7C3AED] transition-colors font-medium">Features</a>
                <a href="#testimonials" className="hover:text-[#7C3AED] transition-colors font-medium">Testimonials</a>
                <a href="#" className="hover:text-[#7C3AED] transition-colors font-medium">Privacy</a>
                <a href="#" className="hover:text-[#7C3AED] transition-colors font-medium">Terms</a>
                <a href="#" className="hover:text-[#7C3AED] transition-colors font-medium">Contact</a>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Qluely. All rights reserved. Made with 💜 for professionals worldwide.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
