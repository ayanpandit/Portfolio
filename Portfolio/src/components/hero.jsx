import React, { useEffect, useRef } from 'react';
import heroImage from '../assets/hero.png';

const Hero = () => {
  const canvasRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const titles = ['WEB DESIGNER.', 'WEB DEVELOPER.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          
          {/* 3D Cube Text Rotation */}
          <div className="relative h-20 md:h-24 lg:h-32 flex items-center justify-center w-full" style={{ perspective: '1000px' }}>
            <div
              className="relative w-full max-w-4xl h-full"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${currentIndex * 180}deg)`,
                transition: 'transform 1s ease-in-out'
              }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(40px)'
                }}
              >
                <div className="text-4xl md:text-5xl lg:text-7xl tracking-wider px-4" style={{ fontFamily: 'Anton, Oswald, Chela One, Norican, Pompiere, Varela Round, sans-serif', color: '#808080' }}>
                  {titles[0]}
                </div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg) translateZ(40px)'
                }}
              >
                <div className="text-4xl md:text-5xl lg:text-7xl tracking-wider px-4" style={{ fontFamily: 'Anton, Oswald, Chela One, Norican, Pompiere, Varela Round, sans-serif', color: '#808080' }}>
                  {titles[1]}
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Hero;