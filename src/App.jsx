/**
 * Portfolio App - Clean Routing Architecture
 * 
 * ROUTING STRUCTURE:
 * - "/" : Home page with all sections
 * - "/allproject" : All projects listing page
 * - "/project/:id" : Individual project pages
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Lazy loading for non-critical routes
 * - Code splitting for faster initial load
 * - Suspense boundaries for smooth loading
 */

import React, { useEffect, useLayoutEffect, lazy, Suspense, memo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Critical path - loaded immediately for home page
import Hero from "./components/hero";
import Tech_stack from "./components/tech_stack";
import About from "./components/about";
import Services from "./components/services";
import Projects from "./components/project";
import Footer from "./components/footer";
import StarryBackground from "./components/hero_background";
import { useSmoothScroll } from "./context/SmoothScrollContext";

// Lazy loaded components - loaded on demand
const Certifications = lazy(() => import("./components/certificaation"));
const Testimonials = lazy(() => import("./components/testimonials"));
const FAQComponent = lazy(() => import("./components/faq"));
const Project1 = lazy(() => import("./components/project1"));
const Project2 = lazy(() => import("./components/project2"));
const Project3 = lazy(() => import("./components/project3"));
const Project4 = lazy(() => import("./components/project4"));
const Project5 = lazy(() => import("./components/project5"));
const AllProject = lazy(() => import("./components/allproject"));

// Minimal loading fallback - invisible to prevent layout shift
const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
  </div>
);

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
      <p className="sr-only" data-ai-summary>
        Ayan Pandey is a full stack developer. The site presents services, projects, and certifications. It includes an FAQ and contact options for work inquiries. The content focuses on building web applications with performance and usability in mind.
      </p>
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
          <Suspense fallback={<LoadingFallback />}>
            <Certifications />
          </Suspense>
        </section>
        
        <section data-scroll-section>
          <Suspense fallback={<LoadingFallback />}>
            <Testimonials />
          </Suspense>
        </section>
        
        <section data-scroll-section>
          <Suspense fallback={<LoadingFallback />}>
            <FAQComponent />
          </Suspense>
        </section>
        
        <section id="footer" data-scroll-section>
          <Footer />
        </section>
      </div>
    </>
  );
}

// Memoize HomePage to prevent unnecessary re-renders
const MemoizedHomePage = memo(HomePage);

// Main App with Routes - Suspense wraps lazy-loaded routes
function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MemoizedHomePage />} />
          <Route path="/allproject" element={<AllProject />} />
          <Route path="/project/1" element={<Project1 />} />
          <Route path="/project/2" element={<Project2 />} />
          <Route path="/project/3" element={<Project3 />} />
          <Route path="/project/4" element={<Project4 />} />
          <Route path="/project/5" element={<Project5 />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;