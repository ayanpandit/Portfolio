import React, { useEffect, useRef } from 'react';
import heroImage from '../assets/hero.png';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated Stars Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-8 md:px-16 py-8">
        {/* Logo */}
        <div className="text-white text-3xl md:text-4xl italic" style={{ fontFamily: 'Brush Script MT, cursive' }}>
          Dominicus
        </div>

        {/* Hamburger Menu */}
        <button className="flex flex-col gap-2 group">
          <span className="w-8 h-0.5 bg-white transition-all group-hover:w-10"></span>
          <span className="w-8 h-0.5 bg-white transition-all group-hover:w-10"></span>
          <span className="w-8 h-0.5 bg-white transition-all group-hover:w-10"></span>
        </button>
      </header>

      {/* Hero PNG Image - Centered Behind Content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5 w-full h-full flex items-center justify-center">
        <img 
          src={heroImage}
          alt="Hero" 
          className="max-w-full max-h-full object-contain opacity-90"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-white text-center mb-4">
          <div className="text-4xl md:text-5xl lg:text-6xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            I'm Dominicus,
          </div>
          <div className="text-5xl md:text-6xl lg:text-7xl tracking-wider" style={{ fontFamily: 'Playfair Display, serif', color: '#a0a0a0' }}>
            WEB DESIGNER.
          </div>
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <button className="px-7 py-3 bg-white text-black text-base rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105">
            Get in touch
          </button>
          <button className="px-7 py-3 bg-transparent text-white text-base rounded-full font-medium border-2 border-transparent hover:border-white transition-all hover:scale-105">
            See my projects
          </button>
        </div>
      </div>

      {/* Made in Framer Badge */}
      <div className="absolute bottom-6 right-6 z-20">
        <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-black">
            <path d="M0 0H16V5.33333H8L0 0Z" fill="currentColor"/>
            <path d="M8 5.33333H16V10.6667H8V5.33333Z" fill="currentColor"/>
            <path d="M8 10.6667L16 16H8V10.6667Z" fill="currentColor"/>
          </svg>
          <span className="text-sm font-medium text-black">Made in Framer</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;