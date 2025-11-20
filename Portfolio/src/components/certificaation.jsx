import React from 'react';

export default function Certifications() {
  const certifications = [
    {
      organization: 'Meta',
      achievement: 'Front-End Developer Professional Certificate',
      year: '2023'
    },
    {
      organization: 'Google',
      achievement: 'UX Design Professional Certificate',
      year: '2023'
    },
    {
      organization: 'AWS',
      achievement: 'Certified Cloud Practitioner',
      year: '2024'
    },
    {
      organization: 'MongoDB',
      achievement: 'MongoDB Certified Developer Associate',
      year: '2022'
    },
    {
      organization: 'Coursera',
      achievement: 'Full-Stack Web Development Specialization',
      year: '2022'
    },
    {
      organization: 'freeCodeCamp',
      achievement: 'Responsive Web Design Certification',
      year: '2021'
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
              Certifications
            </h1>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </div>

        {/* Certifications List */}
        <div className="space-y-0">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="border-t border-white/20 py-6 hover:bg-white/5 transition-colors duration-300"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Organization name - left aligned */}
                <div className="col-span-3">
                  <h3 className="text-[16px] font-normal text-white">
                    {cert.organization}
                  </h3>
                </div>

                {/* Achievement description - center/left */}
                <div className="col-span-7">
                  <p className="text-[16px] font-light text-gray-400">
                    {cert.achievement}
                  </p>
                </div>

                {/* Year - right aligned */}
                <div className="col-span-2 text-right">
                  <span className="text-[16px] font-light text-white">
                    {cert.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-white/20"></div>
        </div>
      </div>
    </div>
  );
}