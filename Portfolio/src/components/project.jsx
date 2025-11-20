import React from 'react';
import image from '../assets/image.png';

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="relative z-10 max-w-[1400px] mx-auto px-12 py-16">
        {/* Header with line */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 flex-1">
              <h1 className="text-[72px] font-light tracking-tight whitespace-nowrap" style={{ fontFamily: 'serif' }}>
                Projects
              </h1>
              <div className="flex-1 h-[1px] bg-white"></div>
            </div>
          </div>
        </div>

        {/* Project Card */}
        <div 
          className="relative rounded-[32px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #87CEEB 0%, #98D8C8 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}
        >
          {/* Inner white card with browser mockup */}


                  


      <div className="flex items-center justify-center">
        <img src={image} alt="Project" className="max-w-full max-h-[80vh] rounded-lg shadow-lg" />
      </div>
        </div>
      </div>
    </div>
  );
}