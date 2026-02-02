/**
 * Portfolio App - Clean Routing Architecture
 * 
 * ROUTING STRUCTURE:
 * - "/" : Home page with all sections
 * - "/allproject" : All projects listing page
 * - "/project/:id" : Individual project pages
 */

import React, { useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/hero";
import Tech_stack from "./components/tech_stack";
import About from "./components/about";
import Services from "./components/services";
import Projects from "./components/project";
import Certifications from "./components/certificaation";
import Testimonials from "./components/testimonials";
import FAQComponent from "./components/faq";
import Footer from "./components/footer";
import StarryBackground from "./components/hero_background";
import Project1 from "./components/project1";
import Project2 from "./components/project2";
import Project3 from "./components/project3";
import Project4 from "./components/project4";
import Project5 from "./components/project5";
import AllProject from "./components/allproject";
import { useSmoothScroll } from "./context/SmoothScrollContext";

/**
 * ScrollToTop - Resets scroll position on every route change
 * Uses both useLayoutEffect (before paint) and useEffect (after paint)
 * with multiple scroll reset methods for maximum reliability
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Reset scroll function - multiple methods for cross-browser support
  const resetScroll = () => {
    // Method 1: window.scrollTo
    window.scrollTo(0, 0);
    // Method 2: documentElement
    document.documentElement.scrollTop = 0;
    // Method 3: body (for older browsers)
    document.body.scrollTop = 0;
    // Method 4: Lenis (global reference set by SmoothScrollContext)
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    }
  };
  
  // Run BEFORE browser paint - critical for preventing flash of wrong position
  useLayoutEffect(() => {
    resetScroll();
  }, [pathname]);
  
  // Run AFTER paint as backup with delay for async content
  useEffect(() => {
    resetScroll();
    // Delayed reset catches any async rendering
    const timer = setTimeout(resetScroll, 50);
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return null;
}

// Home Page Component with all sections
function HomePage() {
  const { scrollTo, isReady } = useSmoothScroll();
  const location = useLocation();

  // Handle navigation state - scroll to section after navigating from other pages
  useEffect(() => {
    if (!isReady) return;
    
    // Check if we need to scroll to a specific section
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      // Small delay to ensure the page is fully rendered
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.state, isReady]);

  /**
   * Handle anchor links with smooth scroll
   * This intercepts native anchor behavior and uses Lenis instead
   */
  useEffect(() => {
    if (!isReady) return;

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();
      
      // Use premium scroll with offset for any fixed headers
      scrollTo(href, {
        offset: 0,       // Adjust if you have a fixed header
        duration: 1.2,   // Consistent with global feel
      });
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [scrollTo, isReady]);

  return (
    <>
      {/* Fixed starry background - stays in place while content scrolls */}
      <div className="fixed inset-0 z-0 bg-black">
        <StarryBackground />
      </div>

      {/* Scrollable content layer */}
      <div className="relative z-10">
        {/* 
          Section wrapper structure
          Each section has an id for anchor navigation
          data-scroll-section can be used for section-specific scroll effects
        */}
        <section id="home" data-scroll-section>
          <Hero />
        </section>
        
        <section data-scroll-section>
          <Tech_stack />
        </section>
        
        <section data-scroll-section>
          <About />
        </section>
        
        <section id="services" data-scroll-section>
          <Services />
        </section>
        
        <section id="projects" data-scroll-section>
          <Projects />
        </section>
        
        <section data-scroll-section>
          <Certifications />
        </section>
        
        <section data-scroll-section>
          <Testimonials />
        </section>
        
        <section data-scroll-section>
          <FAQComponent />
        </section>
        
        <section id="footer" data-scroll-section>
          <Footer />
        </section>
      </div>
    </>
  );
}

// Main App with Routes
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allproject" element={<AllProject />} />
        <Route path="/project/1" element={<Project1 />} />
        <Route path="/project/2" element={<Project2 />} />
        <Route path="/project/3" element={<Project3 />} />
        <Route path="/project/4" element={<Project4 />} />
        <Route path="/project/5" element={<Project5 />} />
      </Routes>
    </>
  );
}

export default App;