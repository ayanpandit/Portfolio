import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Certifications() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const certifications = [
    {
      organization: 'Meta',
      achievement: 'Front-End Developer Professional Certificate',
      year: '2025'
    },
    {
      organization: 'Google',
      achievement: 'UX Design Professional Certificate',
      year: '2025'
    },
    {
      organization: 'AWS',
      achievement: 'Certified Cloud Practitioner',
      year: '2025'
    },
    {
      organization: 'MongoDB',
      achievement: 'MongoDB Certified Developer Associate',
      year: '2024'
    },
    {
      organization: 'Coursera',
      achievement: 'Full-Stack Web Development Specialization',
      year: '2024'
    },
    {
      organization: 'freeCodeCamp',
      achievement: 'Responsive Web Design Certification',
      year: '2023'
    }
  ];

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen text-white relative overflow-hidden font-sans playwrite-nz-basic"
      style={{ opacity }}
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

      <motion.div 
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16"
        style={{ y }}
      >
        {/* Header with line */}
        <motion.div 
          className="mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-light tracking-tight">
              Certifications
            </h2>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </motion.div>

        {/* Certifications List */}
        <div className="space-y-0">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              className="border-t border-white/20 py-5 sm:py-6 md:py-8 lg:py-10 hover:bg-white/5 transition-colors duration-300"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              {/* Mobile layout - stacked */}
              <div className="flex flex-col gap-2 md:hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-normal text-white">
                    {cert.organization}
                  </h3>
                  <span className="text-sm sm:text-base font-light text-white">
                    {cert.year}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-light text-gray-400">
                  {cert.achievement}
                </p>
              </div>
              
              {/* Desktop layout - grid */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                {/* Organization name - left aligned */}
                <div className="col-span-3">
                  <h3 className="text-sm md:text-base font-normal text-white">
                    {cert.organization}
                  </h3>
                </div>

                {/* Achievement description - center/left */}
                <div className="col-span-7">
                  <p className="text-sm md:text-base font-light text-gray-400">
                    {cert.achievement}
                  </p>
                </div>

                {/* Year - right aligned */}
                <div className="col-span-2 text-right">
                  <span className="text-sm md:text-base font-light text-white">
                    {cert.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-white/20"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}