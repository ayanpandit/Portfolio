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
      year: '2023'
    },
    {
      organization: 'Google',
      achievement: 'UX Design Professional Certificate',
      year: '2023'
    },
    {
      organization: 'AWS',
      achievement: 'Certified Cloud Practitioner',
      year: '2024'
    },
    {
      organization: 'MongoDB',
      achievement: 'MongoDB Certified Developer Associate',
      year: '2022'
    },
    {
      organization: 'Coursera',
      achievement: 'Full-Stack Web Development Specialization',
      year: '2022'
    },
    {
      organization: 'freeCodeCamp',
      achievement: 'Responsive Web Design Certification',
      year: '2021'
    }
  ];

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen text-white relative overflow-hidden font-sans"
      style={{ opacity }}
    >

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <motion.div 
        className="relative z-10 max-w-[1400px] mx-auto px-12 py-16"
        style={{ y }}
      >
        {/* Header with line */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-8">
            <h1 className="text-[72px] font-light tracking-tight" style={{ fontFamily: 'serif' }}>
              Certifications
            </h1>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </motion.div>

        {/* Certifications List */}
        <div className="space-y-0">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              className="border-t border-white/20 py-6 hover:bg-white/5 transition-colors duration-300"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Organization name - left aligned */}
                <div className="col-span-3">
                  <h3 className="text-[16px] font-normal text-white">
                    {cert.organization}
                  </h3>
                </div>

                {/* Achievement description - center/left */}
                <div className="col-span-7">
                  <p className="text-[16px] font-light text-gray-400">
                    {cert.achievement}
                  </p>
                </div>

                {/* Year - right aligned */}
                <div className="col-span-2 text-right">
                  <span className="text-[16px] font-light text-white">
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