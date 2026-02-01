import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiJavascript, 
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiFigma,
  SiTypescript,
  SiExpress,
  SiRedux,
  SiVite,
  SiFramer,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiFirebase,
  SiVercel
} from 'react-icons/si';

const Tech_stack = () => {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const techStack = [
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiPython, name: 'Python', color: '#3776AB' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: SiGit, name: 'Git', color: '#F05032' },
    { icon: SiVite, name: 'Vite', color: '#646CFF' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiFigma, name: 'Figma', color: '#F24E1E' },
    { icon: SiExpress, name: 'Express', color: '#FFFFFF' },
    { icon: SiRedux, name: 'Redux', color: '#764ABC' },
    { icon: SiFramer, name: 'Framer Motion', color: '#0055FF' },
    { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#FFFFFF' },
    { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
    { icon: SiVercel, name: 'Vercel', color: '#FFFFFF' },
  ];

  // Duplicate 4 times for smooth cycling
  const duplicatedStack = [
    ...techStack,
    ...techStack,
    ...techStack,
    ...techStack
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const gap = 80;
    const cardWidth = 112 + gap;
    const totalWidth = cardWidth * techStack.length;
    const maxScroll = totalWidth * 4;

    const speed = 1.5;

    const animate = () => {
      positionRef.current -= speed;
      track.style.transform = `translateX(${positionRef.current}px)`;

      if (-positionRef.current >= maxScroll) {
        track.style.transition = 'none';
        positionRef.current = 0;
        track.style.transform = 'translateX(0)';

        requestAnimationFrame(() => {
          track.style.transition = 'transform 0.05s linear';
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [techStack.length]);

  return (
    <motion.div 
      ref={sectionRef}
      className="relative w-full py-6 sm:py-8 md:py-10 overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* 3D Perspective Container - responsive width */}
      <motion.div 
        className="relative w-[92%] sm:w-[88%] md:w-[80%] mx-auto overflow-hidden"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        {/* Curved Gradient Overlays with 3D feel */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-48 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(90deg, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, black 0%, transparent 100%)'
          }}
        ></div>
        
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-48 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(270deg, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(270deg, black 0%, transparent 100%)'
          }}
        ></div>

        {/* 3D Scrolling Track */}
        <div 
          ref={trackRef}
          className="flex gap-8 sm:gap-12 md:gap-20"
          style={{ 
            transition: 'transform 0.05s linear',
            transformStyle: 'preserve-3d'
          }}
        >
          {duplicatedStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div 
                  className="relative flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28"
                  style={{
                    transform: 'translateZ(0)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* 3D Icon with inset/outset shadows */}
                  <div className="relative">
                    <Icon 
                      className="text-4xl sm:text-5xl md:text-7xl transition-all duration-300 group-hover:scale-110 relative z-10" 
                      style={{ 
                        color: tech.color,
                        filter: `
                          drop-shadow(0 4px 8px rgba(0,0,0,0.5))
                          drop-shadow(0 -2px 4px rgba(255,255,255,0.1))
                          drop-shadow(2px 2px 6px rgba(0,0,0,0.4))
                          drop-shadow(-2px -2px 4px rgba(255,255,255,0.05))
                        `,
                        textShadow: `
                          2px 2px 4px rgba(0,0,0,0.6),
                          -1px -1px 2px rgba(255,255,255,0.1),
                          0 0 20px ${tech.color}40
                        `
                      }}
                    />
                    
                    {/* Inner shadow effect */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.3), inset -2px -2px 8px rgba(255,255,255,0.05)',
                        borderRadius: '50%',
                        opacity: 0.3
                      }}
                    ></div>
                  </div>

                  {/* 3D Text with depth */}
                  <span 
                    className="mt-1.5 sm:mt-2 text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-center select-none relative"
                    style={{
                      textShadow: `
                        1px 1px 2px rgba(0,0,0,0.8),
                        -1px -1px 1px rgba(255,255,255,0.1),
                        0 2px 4px rgba(0,0,0,0.5)
                      `,
                      transform: 'translateZ(10px)'
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Vignette effect for more depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      ></div>
    </motion.div>
  );
};

export default Tech_stack;