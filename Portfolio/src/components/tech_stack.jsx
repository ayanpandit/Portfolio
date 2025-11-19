import React from 'react';
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
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiFigma, name: 'Figma', color: '#F24E1E' },
    { icon: SiExpress, name: 'Express', color: '#000000' },
    { icon: SiRedux, name: 'Redux', color: '#764ABC' },
    { icon: SiVite, name: 'Vite', color: '#646CFF' },
    { icon: SiFramer, name: 'Framer Motion', color: '#0055FF' },
    { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
    { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
    { icon: SiVercel, name: 'Vercel', color: '#000000' },
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <div className="relative w-full bg-black py-10 overflow-hidden">
      {/* Scrolling Container */}
      <div className="relative w-3/4 mx-auto overflow-hidden">
        {/* Gradient Overlays for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

        {/* Scrolling Track */}
        <div className="flex gap-16 animate-scroll-fast">
          {duplicatedStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="relative flex flex-col items-center justify-center w-28 h-28">
                  {/* Icon */}
                  <Icon 
                    className="text-7xl transition-all duration-300 group-hover:scale-110" 
                    style={{ color: tech.color }}
                  />
                  {/* Tech Name */}
                  <span className="mt-2 text-white text-sm font-semibold tracking-wide text-center select-none">
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom CSS for infinite scroll animation (faster) */}
      <style jsx>{`
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-fast {
          animation: scroll-fast 10s linear infinite;
        }

        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Tech_stack;
