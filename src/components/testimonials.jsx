import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Testimonials() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  const testimonialsRow1 = [
    {
      name: 'Adarsh Prakash Singh',
      text: 'Ayan approaches problems with clarity and logic. He focuses on building solutions that are not only functional but also easy to understand and maintain. Working with him felt structured and efficient.',
      role: 'Data Analyst',
      rating: 5
    },
    {
      name: 'Divyanshu Chaubey',
      text: 'Ayan has a strong grasp of frontend and system-level thinking. He understands requirements quickly and translates them into clean, practical implementations without unnecessary complexity.',
      role: 'ML Developer',
      rating: 5
    },
    {
      name: 'Nilesh Shukla',
      text: 'Ayan is detail-oriented and thoughtful in his development approach. He pays attention to both user experience and code quality, which makes collaboration smooth and productive.',
      role: 'Full Stack Developer',
      rating: 5
    },
    {
      name: 'Alok Yadav',
      text: 'Working with Ayan was seamless. He respects design intent and implements interfaces with precision, ensuring interactions feel natural and consistent across the product.',
      role: 'UI/UX Designer',
      rating: 5
    },
    {
      name: 'Adarsh Prakash Singh',
      text: 'Ayan approaches problems with clarity and logic. He focuses on building solutions that are not only functional but also easy to understand and maintain. Working with him felt structured and efficient.',
      role: 'Data Analyst',
      rating: 5
    }
  ];

  const testimonialsRow2 = [
    {
      name: 'Rohit Verma',
      text: 'Ayan was easy to work with and very clear in his communication. He understood our requirements quickly and delivered a clean, reliable solution that fit well with our existing system.',
      role: 'Product Manager',
      rating: 5
    },
    {
      name: 'Ankit Sharma',
      text: 'What stood out was Ayan\'s structured approach. He didn\'t just write code — he thought through the problem and suggested better ways to implement features.',
      role: 'Startup Founder',
      rating: 5
    },
    {
      name: 'Saurabh Mishra',
      text: 'Ayan handled the technical side smoothly and kept things simple for us. The final product was stable, easy to use, and delivered on time.',
      role: 'Operations Lead',
      rating: 5
    },
    {
      name: 'Kunal Gupta',
      text: 'Working with Ayan was straightforward and professional. He focused on building something practical and scalable rather than overcomplicating the solution.',
      role: 'Business Consultant',
      rating: 5
    },
    {
      name: 'Aman Srivastava',
      text: 'Ayan paid close attention to details and followed through on feedback carefully. The result was a well-built application that met our expectations.',
      role: 'Project Coordinator',
      rating: 5
    }
  ];

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen text-white relative overflow-hidden font-sans py-16 playwrite-nz-basic"
      style={{ opacity, scale }}
    >

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
                  className="rounded-[24px] p-6 h-full backdrop-blur-lg border border-white/20 shadow-lg"
                  style={{
                    background: 'linear-gradient(145deg, rgba(31,31,31,0.32), rgba(26,26,26,0.18))',
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)'
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

                  {/* Name and Role */}
                  <div>
                    <p className="text-[15px] font-normal text-white">
                      {testimonial.name}
                    </p>
                    {testimonial.role && (
                      <p className="text-[13px] text-gray-500 font-light mt-1">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
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
                  className="rounded-[24px] p-6 h-full backdrop-blur-lg border border-white/20 shadow-lg"
                  style={{
                    background: 'linear-gradient(145deg, rgba(31,31,31,0.32), rgba(26,26,26,0.18))',
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)'
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

                  {/* Name and Role */}
                  <div>
                    <p className="text-[15px] font-normal text-white">
                      {testimonial.name}
                    </p>
                    {testimonial.role && (
                      <p className="text-[13px] text-gray-500 font-light mt-1">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}