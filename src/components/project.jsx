import React from 'react';
import projectImage from '../assets/skillboard.png';
import allfilechangerImage from '../assets/allfilechanger.png';
import smartstockImage from '../assets/smartstock.png';
import splitilyImage from '../assets/splitily.png';


export default function Projects() {
  const projects = [
    {
      title: 'SkillBoard',
      year: '2024',
      image: projectImage,
      url: 'https://skillboard-nit5.onrender.com/'
    },
    {
      title: 'E-Commerce',
      year: '2024',
      image: allfilechangerImage,
      url: 'https://example.com'
    },
    {
      title: 'Dashboard',
      year: '2025',
      image: smartstockImage,
      url: 'https://example.com'
    },
    {
      title: 'Portfolio',
      year: '2025',
      image: splitilyImage,
      url: 'https://example.com'
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans playwrite-nz-basic">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
      `}</style>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-12 py-16">
        {/* Header with line */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 flex-1">
              <h1 className="text-[48px] font-light tracking-tight whitespace-nowrap">
                Projects
              </h1>
              <div className="flex-1 h-[1px] bg-white"></div>
            </div>
          </div>
        </div>

        {/* Projects - Full width cards */}
        <div className="flex flex-col gap-20">
          {projects.map((project, index) => (
            <div key={index} className="group">
              {/* Outer card with blurred background */}
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                <div className="relative w-full h-[120vh] overflow-hidden">
                  {/* Blurred background image */}
                  <div 
                    className="absolute inset-0 scale-110"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(30px) brightness(0.7)',
                    }}
                  />
                  
                  {/* Gradient overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
                  
                  {/* Inner card with actual project image - even more padding, no bottom padding */}
                  <div className="absolute top-24 left-24 right-24 bottom-0 flex items-center justify-center">
                    <div 
                      className="relative w-full h-full rounded-t-[24px] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                      }}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} Preview`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </a>
              
              {/* Project info outside the card */}
              <div className="flex items-center justify-between mt-6 px-2">
                <div>
                  <h3 className="text-white text-2xl font-medium tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">
                    {project.year}
                  </p>
                </div>
                
                {/* Arrow icon */}
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
                >
                  <svg 
                    className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-black" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}