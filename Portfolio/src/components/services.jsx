import React from 'react';

export default function Services() {
  const services = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
      title: 'Web Design',
      description: 'Designing stylish, user-centric layouts that embody your brand and guide visitors smoothly.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      title: 'Front-end Development',
      description: 'Building accessible React interfaces with Tailwind to deliver fluid visuals on each device.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <path d="M6 7h12v6H6z"></path>
          <path d="M9 10h6v3H9z"></path>
        </svg>
      ),
      title: 'CMS Integrations',
      description: 'Integrating Framer CMS or WordPress, enabling content updates fast through a visual editor.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      ),
      title: 'SEO & Performance',
      description: 'Optimizing code, images, and markup to boost search rankings and keep pages loading swift.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() > 0.7 ? '2px' : '1px',
              height: Math.random() > 0.7 ? '2px' : '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div className="relative z-10 max-w-[1400px] mx-auto px-12 py-16">
        {/* Header with line */}
        <div className="mb-16">
          <div className="flex items-center gap-8">
            <h1 className="text-[72px] font-light tracking-tight" style={{ fontFamily: 'serif' }}>
              Services
            </h1>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </div>

        {/* Services Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-[28px] p-8 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(145deg, #1f1f1f, #1a1a1a)',
                boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(50,50,50,0.2), 4px 4px 12px rgba(0,0,0,0.5)'
              }}
            >
              {/* Icon container */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-8"
                style={{
                  background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                  boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.6), inset -1px -1px 3px rgba(60,60,60,0.2)'
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-[28px] font-light mb-4" style={{ fontFamily: 'serif' }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] leading-[1.6] text-gray-400 font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}