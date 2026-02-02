import React, { useEffect, useRef, memo } from 'react';

const StarryBackground = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let lastTime = 0;
    const FPS = 30; // Limit FPS for better performance
    const frameInterval = 1000 / FPS;
    
    // Set canvas size with device pixel ratio for crisp rendering
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    
    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Reduce star count for better performance
    const starCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    
    // Create stars
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.4 + 0.3,
      speed: Math.random() * 0.15 + 0.03,
      twinkle: Math.random() * 0.015
    }));

    // Animation loop with FPS limiting
    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);
      
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);
      
      // Clear with black for better performance (no alpha)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      const len = stars.length;
      for (let i = 0; i < len; i++) {
        const star = stars[i];
        
        // Twinkling effect
        star.opacity += star.twinkle;
        if (star.opacity > 0.7 || star.opacity < 0.25) {
          star.twinkle *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Move stars slowly
        star.y += star.speed;
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.random() * window.innerWidth;
        }
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ 
        willChange: 'auto',
        contain: 'strict'
      }}
    />
  );
});

StarryBackground.displayName = 'StarryBackground';

export default StarryBackground;