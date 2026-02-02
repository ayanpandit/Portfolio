import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import footerImage from '../assets/footer.webp';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Handle navigation - scroll if on home page, navigate if on other pages
  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      // On home page, scroll to section
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // On other pages, navigate to home then scroll
      // Using URL hash to trigger scroll after navigation
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

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
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif italic mb-4 sm:mb-5 md:mb-6 cursor-pointer hover:text-gray-400 transition-colors"
              onClick={() => navigate('/')}
              tabIndex={0}
              role="button"
              aria-label="Go to home"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
            >
              Ayan
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Transforming bold concepts into intuitive, high impact digital experiences
              that captivate users, amplify brands, and convert exploration into growth.
            </p>
            
            {/* Navigation */}
            <nav className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 mb-10 sm:mb-12 md:mb-16">
              <span
                className="text-white hover:text-gray-400 transition-colors text-sm sm:text-base cursor-pointer"
                onClick={() => handleNavigation('home')}
              >
                Home
              </span>
              <span
                className="text-white hover:text-gray-400 transition-colors text-sm sm:text-base cursor-pointer"
                onClick={() => handleNavigation('projects')}
              >
                Projects
              </span>
              <span
                className="text-white hover:text-gray-400 transition-colors text-sm sm:text-base cursor-pointer"
                onClick={() => handleNavigation('footer')}
              >
                Contact
              </span>
            </nav>

            {/* Copyright */}
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2025 Ayan All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 mt-8">
              {/* GitHub */}
              <a
                href="https://github.com/ayanpandit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white hover:text-gray-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ayan-pandey-b66067296"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-gray-400 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <rect width="24" height="24" rx="5" fill="currentColor" />
                  <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0A66C2" fontFamily="Arial, Helvetica, sans-serif">in</text>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/ayanpandit_31"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-gray-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              {/* Twitter */}
              <a
                href="https://twitter.com/aayanpandey8528"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white hover:text-gray-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 4.01c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 2c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 7.13 4.07 5.38 1.64 2.9c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 4.01z" />
                </svg>
              </a>
            </div>
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