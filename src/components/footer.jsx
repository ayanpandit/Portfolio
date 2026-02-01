import React from 'react';
import footerImage from '../assets/footer.webp';
const Footer = () => {
  const navLinks = ['Home', 'Articles', 'Projects', 'Contact', 'Privacy', 'Cookies'];

  return (
    <footer className="text-white relative overflow-hidden playwrite-nz-basic" style={{
      background: 'rgba(17, 17, 17, 0.7)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-24 items-start">
          {/* Left side - Brand and description */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic mb-4 sm:mb-5 md:mb-6">Ayan</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Transforming bold concepts into intuitive, high impact digital experiences
              that captivate users, amplify brands, and convert exploration into growth.
            </p>
            
            {/* Navigation */}
            <nav className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 mb-10 sm:mb-12 md:mb-16">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white hover:text-gray-400 transition-colors text-sm sm:text-base"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2025 Ayan All rights reserved.
            </p>
          </div>

          {/* Right side - CTA */}
          <div className="flex flex-col items-center lg:items-end justify-start mt-4 lg:mt-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-5 sm:mb-6 md:mb-8 flex-shrink-0">
              <img
                src={footerImage}
                alt="Profile"
                loading="lazy"
                decoding="async"
                width={192}
                height={192}
                className="w-full h-full rounded-full object-cover grayscale"
              />
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-5 sm:mb-6 md:mb-8 text-center lg:text-right">
              Let's build your next big thing
            </h3>
            
            <a 
              href="mailto:aayanpandey8528@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;