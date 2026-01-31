import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Services() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  const services = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      title: 'Frontend Development',
      description: 'Building responsive, accessible, and performant user interfaces with modern web technologies.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
      title: 'UI Engineering & Interaction Design',
      description: 'Engineering reusable UI components, animations, and interactions with attention to detail and usability.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      title: 'Backend Development & APIs',
      description: 'Designing and implementing server-side logic, REST APIs, and data flows to support real-world applications.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: 'Data & Application Architecture',
      description: 'Structuring databases, application logic, and content systems for scalability, maintainability, and performance.'
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen text-white relative overflow-hidden font-sans"
    >

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div 
        className="relative z-10 max-w-[1400px] mx-auto px-12 py-16"
      >
        {/* Header with line */}
        <div className="mb-16">
          <div className="flex items-center gap-8">
            <h1 className="text-[72px] font-light tracking-tight" style={{ fontFamily: 'serif' }}>
              Services
            </h1>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </div>

        {/* Services Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-[28px] p-8 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(145deg, #1f1f1f, #1a1a1a)',
                boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(50,50,50,0.2), 4px 4px 12px rgba(0,0,0,0.5)'
              }}
            >
              {/* Icon container */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-8"
                style={{
                  background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                  boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.6), inset -1px -1px 3px rgba(60,60,60,0.2)'
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-[28px] font-light mb-4" style={{ fontFamily: 'serif' }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] leading-[1.6] text-gray-400 font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}