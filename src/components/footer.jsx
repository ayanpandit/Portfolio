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
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left side - Brand and description */}
          <div>
            <h2 className="text-5xl font-serif italic mb-6">Ayan</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Transforming bold concepts into intuitive, high impact digital experiences
              that captivate users, amplify brands, and convert exploration into growth.
            </p>
            
            {/* Navigation */}
            <nav className="flex flex-wrap gap-8 mt-12 mb-16">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white hover:text-gray-400 transition-colors text-base"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © 2025 Ayan All rights reserved.
            </p>
          </div>

          {/* Right side - CTA */}
          <div className="flex flex-col items-start lg:items-end justify-start">
            <div className="relative w-48 h-48 mb-8 flex-shrink-0">
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
            
            <h3 className="text-4xl font-light mb-8 text-left lg:text-right">
              Let's build your next big thing
            </h3>
            
            <a 
              href="mailto:aayanpandey8528@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full text-base font-medium hover:bg-gray-100 transition-colors inline-block"
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