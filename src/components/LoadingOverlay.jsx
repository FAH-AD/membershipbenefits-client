import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, Globe, UserCheck, Zap } from 'lucide-react';

const LoadingOverlay = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    { text: "Verifying your credentials...", icon: <UserCheck className="w-6 h-6 text-[#00d26a]" /> },
    { text: "Connecting to the global deals network...", icon: <Globe className="w-6 h-6 text-[#60a5fa]" /> },
    { text: "Authenticating your membership...", icon: <ShieldCheck className="w-6 h-6 text-[#ff9f40]" /> },
    { text: "Fetching exclusive software deals...", icon: <Zap className="w-6 h-6 text-[#c084fc]" /> },
    { text: "Almost there! Preparing your portal access...", icon: <Loader2 className="w-6 h-6 animate-spin text-[#00d26a]" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 6000); // Change message every 6 seconds to cover 30-40s wait
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-[#050c18]/80 backdrop-blur-md transition-all duration-500">
      <div className="max-w-md w-full px-8 py-12 text-center">
        {/* Animated Outer Ring */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-[#00d26a]/10 scale-125"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-[#00d26a] animate-spin"></div>
          <div className="bg-[#0d1a2e] p-6 rounded-full shadow-2xl relative z-10 border border-white/5">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/69b30bfaac362e539cfe126d/07b0c51a-28f8-40b9-98cc-d5d1ab77ec6c/logo.png?format=1500w" 
              alt="Logo" 
              className="w-16 h-16 object-contain opacity-90"
            />
          </div>
        </div>

        {/* Dynamic Message Section */}
        <div className="min-h-[100px] flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-4 animate-bounce">
            {messages[messageIndex].icon}
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {messages[messageIndex].text}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            We're synchronizing your account with the Membership Benefits portal. This usually takes less than a minute.
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {messages.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === messageIndex ? 'w-8 bg-[#00d26a]' : 'w-2 bg-slate-700'
              }`}
            ></div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-ring {
          0% { transform: scale(.33); }
          80%, 100% { opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default LoadingOverlay;
