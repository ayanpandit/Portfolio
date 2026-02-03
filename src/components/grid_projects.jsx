import React, { useState, useRef, useEffect } from 'react';
import projectImage from '../assets/skillboard.png';
import skillboardVideo from '../assets/skillboardvid.mp4';
import allfilechangerImage from '../assets/allfilechanger.png';
import allfilechangerVideo from '../assets/allfilechangervid.mp4';
import smartstockImage from '../assets/smartstock.png';
import smartstockVideo from '../assets/smartstockvid.mp4';
import splitilyImage from '../assets/splitily.png';
import splitilyVideo from '../assets/splitilyvid.mp4';


export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (hoveredIndex === 0) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
    if (videoRef2.current) {
      if (hoveredIndex === 1) {
        videoRef2.current.play();
      } else {
        videoRef2.current.pause();
        videoRef2.current.currentTime = 0;
      }
    }
    if (videoRef3.current) {
      if (hoveredIndex === 2) {
        videoRef3.current.play();
      } else {
        videoRef3.current.pause();
        videoRef3.current.currentTime = 0;
      }
    }
    if (videoRef4.current) {
      if (hoveredIndex === 3) {
        videoRef4.current.play();
      } else {
        videoRef4.current.pause();
        videoRef4.current.currentTime = 0;
      }
    }
  }, [hoveredIndex]);
  const projects = [
    {
      gradient: 'linear-gradient(180deg, #87CEEB 0%, #98D8C8 100%)',
      title: 'SkillBoard',
      year: '2024',
      image: projectImage,
      url: 'https://skillboard-nit5.onrender.com/'
    },
    {
      gradient: 'linear-gradient(180deg, #FFB6C1 0%, #FFA07A 100%)',
      title: 'E-Commerce',
      year: '2024',
      image: allfilechangerImage,
      url: 'https://example.com'
    },
    {
      gradient: 'linear-gradient(180deg, #DDA0DD 0%, #BA55D3 100%)',
      title: 'Dashboard',
      year: '2025',
      image: smartstockImage,
      url: 'https://example.com'
    },
    {
      gradient: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
      title: 'Portfolio',
      year: '2025',
      image: splitilyImage,
      url: 'https://example.com'
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans playwrite-nz-basic">
      <div className="relative z-10 max-w-[1400px] mx-auto px-12 py-16">
        {/* Header with line */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 flex-1">
              <h2 className="text-[48px] font-light tracking-tight whitespace-nowrap">
                Projects
              </h2>
              <div className="flex-1 h-[1px] bg-white"></div>
            </div>
          </div>
        </div>

        {/* Projects Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <a 
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-[24px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {index === 0 ? (
                <>
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className={`w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <video
                    ref={videoRef}
                    src={skillboardVideo}
                    className={`absolute inset-0 w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                    loop
                    muted
                    playsInline
                  />
                </>
              ) : index === 1 ? (
                <>
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className={`w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 1 ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <video
                    ref={videoRef2}
                    src={allfilechangerVideo}
                    className={`absolute inset-0 w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                    loop
                    muted
                    playsInline
                  />
                </>
              ) : index === 2 ? (
                <>
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className={`w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 2 ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <video
                    ref={videoRef3}
                    src={smartstockVideo}
                    className={`absolute inset-0 w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 2 ? 'opacity-100' : 'opacity-0'}`}
                    loop
                    muted
                    playsInline
                  />
                </>
              ) : index === 3 ? (
                <>
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className={`w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 3 ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <video
                    ref={videoRef4}
                    src={splitilyVideo}
                    className={`absolute inset-0 w-full h-[300px] object-cover transition-opacity duration-300 ${hoveredIndex === 3 ? 'opacity-100' : 'opacity-0'}`}
                    loop
                    muted
                    playsInline
                  />
                </>
              ) : (
                <img
                  src={project.image}
                  alt={`${project.title} Preview`}
                  className="w-full h-[300px] object-cover"
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}