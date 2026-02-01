/**
 * Portfolio App - Premium Scroll Experience
 * 
 * Architecture notes:
 * - SmoothScrollProvider is in main.jsx (root level)
 * - BrowserRouter wraps the app for SEO-friendly routing
 * - This component can use useSmoothScroll() for scroll control
 * - All anchor links should use scrollTo() for smooth navigation
 */

import { Routes, Route } from "react-router-dom";
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
import { useSmoothScroll } from "./context/SmoothScrollContext";
import { useEffect } from "react";

// Home Page Component with all sections
function HomePage() {
  const { scrollTo, isReady } = useSmoothScroll();

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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project/1" element={<Project1 />} />
      <Route path="/project/2" element={<Project1 />} />
      <Route path="/project/3" element={<Project1 />} />
      <Route path="/project/4" element={<Project1 />} />
      <Route path="/project/5" element={<Project1 />} />
    </Routes>
  );
}

export default App;