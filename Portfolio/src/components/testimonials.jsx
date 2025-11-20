import React from 'react';

export default function Testimonials() {
  const testimonialsRow1 = [
    {
      name: 'Eliza Grant',
      text: 'Pixel-perfect layouts that come alive with animations while staying accessible and lightning-fast under the hood. Genuinely impressive.',
      rating: 5
    },
    {
      name: 'James Reed',
      text: 'Transformed our outdated site into a responsive hub. Full-height galleries and a refreshingly unified look.',
      rating: 5
    },
    {
      name: 'Sarah Lopez',
      text: 'Clean, intuitive layouts dramatically improved navigation, turning visitors into buyers overnight.',
      rating: 5
    },
    {
      name: 'Eliza Grant',
      text: 'Pixel-perfect layouts that come alive with animations while staying accessible and lightning-fast under the hood. Genuinely impressive.',
      rating: 5
    },
    {
      name: 'James Reed',
      text: 'Transformed our outdated site into a responsive hub. Full-height galleries and a refreshingly unified look.',
      rating: 5
    }
  ];

  const testimonialsRow2 = [
    {
      name: 'Lucas Wayne',
      text: 'Clear communication kept the project on track, and the CMS training was incredibly straightforward, simplifying backend updates during delivery.',
      rating: 5
    },
    {
      name: 'Hannah Brooks',
      text: 'Fast-launch support plus prompt tweaks. Shipping under budget, hitting every milestone on any hour.',
      rating: 5
    },
    {
      name: 'Mark Patel',
      text: 'Seamless backend integrations raised conversion. Polished dashboards, rock-solid scalability, and bulletproof daily peace of mind.',
      rating: 5
    },
    {
      name: 'Lucas Wayne',
      text: 'Clear communication kept the project on track, and the CMS training was incredibly straightforward, simplifying backend updates during delivery.',
      rating: 5
    },
    {
      name: 'Hannah Brooks',
      text: 'Fast-launch support plus prompt tweaks. Shipping under budget, hitting every milestone on any hour.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans py-16">
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
        
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scrollLeft 40s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scrollRight 40s linear infinite;
        }
      `}</style>

      <div className="relative z-10">
        {/* First Row - Scrolling Left to Right */}
        <div className="overflow-hidden mb-6">
          <div className="flex animate-scroll-left">
            {testimonialsRow1.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[400px] mx-3"
              >
                <div
                  className="rounded-[24px] p-6 h-full"
                  style={{
                    background: 'linear-gradient(145deg, #1f1f1f, #1a1a1a)',
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(50,50,50,0.2), 4px 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="text-white"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-[14px] leading-[1.6] text-gray-300 font-light mb-6">
                    {testimonial.text}
                  </p>

                  {/* Name */}
                  <p className="text-[15px] font-normal text-white">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Scrolling Right to Left */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll-right">
            {testimonialsRow2.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[400px] mx-3"
              >
                <div
                  className="rounded-[24px] p-6 h-full"
                  style={{
                    background: 'linear-gradient(145deg, #1f1f1f, #1a1a1a)',
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(50,50,50,0.2), 4px 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="text-white"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-[14px] leading-[1.6] text-gray-300 font-light mb-6">
                    {testimonial.text}
                  </p>

                  {/* Name */}
                  <p className="text-[15px] font-normal text-white">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}