import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarryBackground from './hero_background';
import projectImage from '../assets/project1.svg';
import allfilechangerImage from '../assets/project2.svg';
import smartstockImage from '../assets/project3.svg';
import splitilyImage from '../assets/project4.svg';
import appuiImage from '../assets/project5.svg';
import Footer from './footer';


export default function AllProject() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const projects = [
    {
      title: 'SkillBoard',
      year: '2024',
      image: projectImage,
      route: '/project/1'
    },
    {
      title: 'ALLFileChanger',
      year: '2025',
      image: allfilechangerImage,
      route: '/project/2'
    },
    {
      title: 'SmartStock',
      year: '2025',
      image: smartstockImage,
      route: '/project/3'
    },
    {
      title: 'Splitly',
      year: '2025',
      image: splitilyImage,
      route: '/project/4'
    },
    {
      title: 'APP.UI',
      year: '2025',
      image: appuiImage,
      route: '/project/5'
    }
  ];

  return (
    <div className="relative min-h-screen text-white playwrite-nz-basic">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cookie&family=Dancing+Script:wght@400..700&family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
      `}</style>

      {/* Fixed Starry Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <StarryBackground />
      </div>

      {/* Header - Same as other project pages */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-8">
        {/* Logo */}
        <motion.div
          className="text-white text-3xl md:text-4xl italic cursor-pointer"
          style={{ fontFamily: 'Dancing Script, cursive' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => navigate('/')}
        >
          AYAN PANDEY
        </motion.div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-2 group relative z-50 w-10 h-10 justify-center items-center"
          aria-label="Toggle menu"
        >
          <span
            className={`w-8 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2.5' : 'group-hover:w-10'
            }`}
          ></span>
          <span
            className={`w-8 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'group-hover:w-10'
            }`}
          ></span>
          <span
            className={`w-8 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2.5' : 'group-hover:w-10'
            }`}
          ></span>
        </button>
      </header>

      {/* Brown Panel - Slides down to 75% of screen */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-in-out ${
          isMenuOpen ? 'h-[75vh]' : 'h-0'
        } overflow-hidden`}
        style={{ backgroundColor: '#8B4513' }}
      >
        {/* Navigation Menu Items */}
        <nav className="flex flex-col items-start justify-center h-full px-8 md:px-16 gap-4 pt-20 w-full">
          <button
            type="button"
            className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
            style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
            onClick={() => { toggleMenu(); navigate('/'); }}
          >
            <span>Home</span>
            <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </button>
          <button
            type="button"
            className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
            style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
            onClick={() => { toggleMenu(); navigate('/'); }}
          >
            <span>Services</span>
            <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </button>
          <button
            type="button"
            className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
            style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
            onClick={() => { toggleMenu(); navigate('/'); }}
          >
            <span>Projects</span>
            <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </button>
          <button
            type="button"
            className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
            style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
            onClick={() => { toggleMenu(); navigate('/'); }}
          >
            <span>Get in touch</span>
            <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </button>
        </nav>
      </div>

      {/* Blur overlay when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 backdrop-blur-md bg-black/30 transition-all duration-500" />
      )}

      {/* Scrollable Content */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-36">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
          {/* New Centered Heading and Subtext */}
          <div className="mb-8 md:mb-10 lg:mb-12 flex flex-col items-center text-center">
            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-light tracking-tight mb-3" style={{ fontFamily: 'serif' }}>
              Project
            </h1>
            <p className="text-gray-300 text-[15px] sm:text-[17px] md:text-[19px] max-w-2xl font-light">
              A curated collection of my recent work, where creative thinking meets technical precision.
            </p>
          </div>

          {/* Projects - Full width cards */}
          <div className="flex flex-col gap-10 sm:gap-14 md:gap-16 lg:gap-20">
          {projects.map((project, index) => (
            <div key={index} className="group">
              {/* Single card with project image */}
              <div 
                onClick={() => navigate(project.route)}
                className="block relative rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl aspect-[16/9] w-full max-w-full"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} Preview`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ aspectRatio: '16/9' }}
                />
              </div>
              {/* Project info outside the card */}
              <div className="flex items-center justify-between mt-4 sm:mt-5 md:mt-6 px-1 sm:px-2">
                <div>
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-medium tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    {project.year}
                  </p>
                </div>
                {/* Arrow icon */}
                <button 
                  onClick={() => navigate(project.route)}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 group/arrow"
                >
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-300 group-hover/arrow:text-black" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
    
  );
   
}