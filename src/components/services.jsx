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
      className="min-h-screen text-white relative overflow-hidden font-sans playwrite-nz-basic"
    >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div 
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16"
      >
        {/* Header with line */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-light tracking-tight">
              Services <span className="sr-only">by Ayan Pandey</span>
            </h2>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </div>

        {/* Services Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-[20px] sm:rounded-[24px] md:rounded-[28px] p-5 sm:p-6 md:p-8 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(145deg, #1f1f1f, #1a1a1a)',
                boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(50,50,50,0.2), 4px 4px 12px rgba(0,0,0,0.5)'
              }}
            >
              {/* Icon container */}
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-6 md:mb-8"
                style={{
                  background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                  boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.6), inset -1px -1px 3px rgba(60,60,60,0.2)'
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-light mb-2 sm:mb-3 md:mb-4" style={{ fontFamily: 'serif' }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] text-gray-400 font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}