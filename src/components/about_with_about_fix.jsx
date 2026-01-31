import React from 'react';

export default function About() {
  const skills = [
    { name: 'React', subtitle: 'Frontend library', percentage: 100, icon: '⚛' },
    { name: 'Node.js', subtitle: 'Backend runtime', percentage: 90, icon: '◆' },
    { name: 'TypeScript', subtitle: 'Type-safe JS', percentage: 50, icon: 'TS' },
    { name: 'PostgreSQL', subtitle: 'Database', percentage: 80, icon: '🐘' },
    { name: 'Git', subtitle: 'Version control', percentage: 100, icon: '⎇' }
  ];

  return (
    <div className="min-h-screen text-white relative font-sans playwrite-nz-basic">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div className="relative z-10 max-w-[1400px] mx-auto px-12 py-16">
        {/* Two column layout with sticky left side including heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left column - Heading + Tagline (both sticky) */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {/* Header with line that extends across full width */}
            <div className="mb-12">
              <div className="flex items-center gap-8">
                <h1 className="text-[48px] font-light tracking-tight playwrite-nz-basic">
                  About
                </h1>
                <div className="h-[1px] bg-white" style={{ width: 'calc(100% + 50vw)' }}></div>
              </div>
            </div>
            
            <p className="text-[28px] leading-[1.4] font-light">
              I'm a full-stack developer building scalable web applications.
              I focus on clean architecture, performance, and reliability.
              I enjoy turning complex problems into simple solutions
            </p>
          </div>

          {/* Right column - Description and Skills */}
          <div className="space-y-10 lg:pt-[120px]">
            {/* Description */}
            <p className="text-[15px] leading-[1.7] text-gray-400 font-light">
              I'm Ayan, a full-stack developer who builds end-to-end web applications with a focus on structure, performance, and usability. I work across the stack—crafting responsive front-end interfaces, developing reliable back-end services, and integrating databases and APIs to deliver scalable solutions. My workflow is centered on clean architecture, version-controlled code, and well-defined systems that remain easy to maintain and extend.

              Every project begins with understanding the problem and defining the system before writing code. I plan features, data flow, and application structure to ensure efficiency and clarity throughout development. The result is a production-ready application that balances speed, functionality, and simplicity, built to scale and deliver consistent value.</p>

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