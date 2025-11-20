import React from 'react';

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
            <button className="text-white text-[14px] font-light ml-8 hover:underline whitespace-nowrap">
              See all
            </button>
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
          <div className="p-12">
            <div 
              className="bg-white rounded-[16px] overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
            >
              {/* Browser header */}
              <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-200">
                {/* Logo and brand */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <span className="text-gray-800 text-sm font-medium">Pestorle</span>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-gray-600 cursor-pointer hover:text-gray-900">Home</span>
                  <span className="text-gray-600 cursor-pointer hover:text-gray-900">Services</span>
                  <span className="text-gray-600 cursor-pointer hover:text-gray-900">About Us</span>
                  <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Content area */}
              <div className="p-12">
                {/* Left column - Text content */}
                <div className="max-w-[480px] mb-8">
                  <h2 className="text-[42px] font-light text-blue-700 mb-4 leading-tight" style={{ fontFamily: 'serif' }}>
                    Goodbye Pests<br />Hello Comfort
                  </h2>
                  <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
                    We use the latest pest control technology, from advanced baiting systems that eliminate pests at the source to eco-friendly spray solutions that safeguard your family and pets.
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium">
                      Get Started Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm font-medium">
                      Explore
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/assets/project1.jpg" 
                    alt="Pest control professional"
                    className="w-full h-auto object-cover"
                    style={{
                      maxHeight: '320px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Project label */}
            <div className="mt-6 text-white">
              <h3 className="text-[20px] font-light" style={{ fontFamily: 'serif' }}>
                Pestorle
              </h3>
              <p className="text-[13px] font-light opacity-90">
                2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}