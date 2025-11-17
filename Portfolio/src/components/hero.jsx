import React, { useEffect, useState, useRef } from 'react';
import heroImage from '../assets/hero.png';
import RotatingText from './hero_text_animation';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // Create stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.2 + 0.05,
      twinkle: Math.random() * 0.02
    }));
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        // Twinkling effect
        star.opacity += star.twinkle;
        if (star.opacity > 0.8 || star.opacity < 0.2) {
          star.twinkle *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        // Move stars slowly
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Animated Stars Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-8">
        {/* Logo */}
        <div className="text-white text-3xl md:text-4xl italic" style={{ fontFamily: 'Brush Script MT, cursive' }}>
          Dominicus
        </div>

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
      ></div>

      {/* Blur overlay when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 backdrop-blur-md bg-black/30 transition-all duration-500" />
      )}

      {/* Hero PNG Image - Positioned at top/center with Fade Effect */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-5 w-full h-full flex items-start justify-center pt-16">
        <img
          src={heroImage}
          alt="Hero"
          className="w-auto h-2/3 object-contain"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>

      {/* Main Content - Positioned Lower */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 w-full pb-32">
        <h1 className="text-white text-center mb-4 w-full max-w-7xl">
          <div className="text-4xl md:text-5xl lg:text-6xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            I'm Dominicus,
          </div>

          {/* RotatingText Component */}
          <div className="flex items-center justify-center w-full">
            <RotatingText
              texts={['WEB DESIGNER.', 'WEB DEVELOPER.']}
              mainClassName="px-2 sm:px-2 md:px-3 text-4xl md:text-5xl lg:text-7xl tracking-wider overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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
        <div className="flex flex-wrap gap-6 mt-8 justify-center">
          <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-base font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">
            <span className="tracking-wide">Get in touch</span>
          </button>
          <button className="group relative px-8 py-4 bg-transparent text-white text-base font-semibold rounded-full border-2 border-transparent hover:border-white transition-all duration-300 hover:scale-105">
            <span className="tracking-wide">See my projects</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;