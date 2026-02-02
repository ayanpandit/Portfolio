import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '../assets/hero1.avif';
import RotatingText from './hero_text_animation';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.6]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-8 mb-10 md:mb-16 lg:mb-20">
        {/* Logo */}
        <motion.div 
          className="text-white text-3xl md:text-4xl italic" 
          style={{ fontFamily: 'Brush Script MT, cursive' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AYAN
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
            onClick={() => {
              toggleMenu();
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <span>Home</span>
            <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </button>
          <button 
            type="button"
            className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
            style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
            onClick={() => {
              toggleMenu();
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <span>Services</span>
            <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </button>
          <button 
            type="button"
            className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
            style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
            onClick={() => {
              toggleMenu();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <span>Projects</span>
            <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </button>
          <button 
            type="button"
            className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
            style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
            onClick={() => {
              toggleMenu();
              document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
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

      {/* Hero PNG Image - Positioned at top/center with Fade Effect */}
      <motion.div 
        className="absolute left-1/2 top-0 -translate-x-[48%] z-5 w-full h-full flex items-start justify-center pt-20 sm:pt-20 md:pt-16"
      >
        <motion.img
          src={heroImage}
          alt="Hero"
          className="w-auto h-[55%] sm:h-[60%] md:h-2/3 object-contain"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)',
            scale: imageScale,
            willChange: 'transform'
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </motion.div>

      {/* Main Content - Positioned Lower */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-end h-full px-4 w-full pb-16 sm:pb-24 md:pb-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-white text-center mb-4 w-full max-w-7xl">
          <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-2" style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}>
            I'm Ayan,
          </div>

          {/* RotatingText Component */}
          <div className="flex items-center justify-center w-full">
            <RotatingText
              texts={['WEB DESIGNER.', 'WEB DEVELOPER.']}
              mainClassName="px-2 sm:px-2 md:px-3 text-2xl sm:text-3xl md:text-5xl lg:text-7xl tracking-wider overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              style={{ fontFamily: 'Anton, Oswald, Chela One, Norican, Pompiere, Varela Round, sans-serif', color: '#808080' }}
            />
          </div>
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 justify-center">
          <button 
            onClick={() => window.location.href = 'mailto:aayanpandey8528@gmail.com'}
            className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] playwrite-nz-basic"
          >
            <span className="tracking-wide">Get in touch</span>
          </button>
          <button 
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-transparent text-white text-sm sm:text-base font-semibold rounded-full border-2 border-transparent hover:border-white transition-all duration-300 hover:scale-105 playwrite-nz-basic"
          >
            <span className="tracking-wide">See my projects</span>
          </button>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default Hero;