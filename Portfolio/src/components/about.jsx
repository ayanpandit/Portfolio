import React from 'react';

export default function About() {
  const skills = [
    { name: 'Framer', subtitle: 'Website builder', percentage: 100, icon: '▲' },
    { name: 'Figma', subtitle: 'Design tool', percentage: 70, icon: '●' },
    { name: 'Notion', subtitle: 'Workspace app', percentage: 90, icon: 'N' },
    { name: 'Github', subtitle: 'Code hosting', percentage: 50, icon: '◆' },
    { name: 'Vercel', subtitle: 'Deploy platform', percentage: 60, icon: '▲' }
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
              About
            </h1>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left column - Tagline */}
          <div>
            <p className="text-[28px] leading-[1.4] font-light">
              My craft lives where design meets code, merging elegant visuals with solid engineering to deliver web experiences that feel effortless, engaging, and alive on every device.
            </p>
          </div>

          {/* Right column - Description and Skills */}
          <div className="space-y-10">
            {/* Description */}
            <p className="text-[15px] leading-[1.7] text-gray-400 font-light">
              I'm Dominicus, a freelance designer-developer who prototypes in Figma and Framer, documents road-maps in Notion, version-controls code on GitHub, and ships lightning-fast sites to Vercel. Each project starts with research: I map user goals, content flow, and performance targets before sketching wireframes. Framer then brings interactions to life, while GitHub Actions run automated tests that safeguard quality. Notion keeps briefs, timelines, and analytics in one shared workspace, ensuring feedback loops stay tight. The outcome is a clean, accessible interface that loads in a blink and keeps evolving through data-driven refinements.
            </p>

            {/* Skills with 3D frame effect */}
            <div className="space-y-5 pt-4">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="relative rounded-[32px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #2a2a2a, #1f1f1f)',
                    boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.5), inset -2px -2px 5px rgba(60,60,60,0.3), 3px 3px 10px rgba(0,0,0,0.4)'
                  }}
                >
                  {/* Progress background fill */}
                  <div 
                    className="absolute inset-0 transition-all duration-1000 ease-out rounded-[32px]"
                    style={{
                      background: `linear-gradient(90deg, #3a3a3a 0%, #3a3a3a ${skill.percentage}%, transparent ${skill.percentage}%, transparent 100%)`,
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-4 p-5">
                    {/* Icon */}
                    <div 
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base font-semibold flex-shrink-0"
                      style={{
                        background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                        boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.6), inset -1px -1px 3px rgba(60,60,60,0.2)'
                      }}
                    >
                      {skill.icon}
                    </div>
                    
                    {/* Text content */}
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <div className="text-white text-[17px] font-normal">{skill.name}</div>
                        <div className="text-gray-500 text-[13px] font-light">{skill.subtitle}</div>
                      </div>
                      <div className="text-white text-[24px] font-light pr-2">{skill.percentage}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}