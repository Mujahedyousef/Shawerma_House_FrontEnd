import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

const AwesomeButton = ({ project, isRTL, getButtonText }) => {
  return (
    <div className="relative group">
      {/* 1. الخلفية المتوهجة (Glow Behind) - تظهر عند الهوفر */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-75 blur-lg transition duration-500 group-hover:duration-200" />
      
      <motion.button
        layout
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1], // Cubic Bezier لنعومة سينمائية
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="relative z-10 flex items-center justify-center gap-3 px-8 py-3.5 mx-auto overflow-hidden rounded-xl bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all"
        onClick={() => {
          if (project.buttonLink) {
            window.location.href = project.buttonLink;
          }
        }}
      >
        {/* 2. تأثير اللمعة المتحركة (The Shooting Star) */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            repeat: Infinity,
            duration: 2, // يتكرر كل ثانيتين
            ease: 'linear',
            repeatDelay: 1, // استراحة قصيرة بين كل لمعة
          }}
        />

        {/* 3. إضاءة علوية خافتة (Top Highlight) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
        
        {/* 4. إضاءة سفلية خافتة (Bottom Highlight) */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" />

        {/* أيقونة جمالية إضافية (اختياري) */}
        <Sparkles className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-110" />

        {/* النص */}
        <span className="relative z-10 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-wide group-hover:text-white transition-colors duration-300">
          {getButtonText(project)}
        </span>

        {/* السهم */}
        <div className={`relative z-10 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
            <ChevronRight size={16} className="text-white/70 group-hover:text-cyan-400 transition-colors" />
        </div>

      </motion.button>
    </div>
  );
};

export default AwesomeButton;