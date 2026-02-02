/**
 * SmoothScrollProvider - App-level Lenis Context
 * 
 * This provider wraps your entire application and:
 * - Initializes Lenis once at the root level
 * - Provides scroll control to all child components via context
 * - Handles GSAP ScrollTrigger integration automatically
 * - Manages lifecycle cleanup properly
 * 
 * WHY A CONTEXT?
 * - Single Lenis instance prevents conflicts
 * - Any component can access scroll controls (scrollTo, stop, start)
 * - Centralized scroll event handling for performance
 * - Clean separation from component logic
 */

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'; // Lenis default styles for html.lenis class
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create context with null default (we'll check for this)
const SmoothScrollContext = createContext(null);

/**
 * Premium easing - exponential decay for luxury momentum
 * 
 * Mathematical breakdown:
 * - At t=0: returns 0 (start position)
 * - At t=0.5: returns ~0.97 (most travel done quickly)
 * - At t=1: returns 1 (end position)
 * 
 * This creates the "fast response, long settle" feel
 */
const premiumEasing = (t) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

/**
 * Default configuration optimized for portfolio sites
 * 
 * TUNING GUIDE:
 * 
 * duration (0.6 - 2.0):
 *   - Lower = snappier, more responsive
 *   - Higher = more momentum, heavier feel
 *   - Sweet spot for portfolios: 1.0 - 1.4
 * 
 * wheelMultiplier (0.5 - 2.0):
 *   - Lower = slower scroll per wheel tick
 *   - Higher = faster scroll per wheel tick
 *   - Keep at 1.0 unless users complain
 * 
 * touchMultiplier (1.0 - 3.0):
 *   - Lower = more "resistance" to touch
 *   - Higher = more responsive to finger movement
 *   - Default 2.0 matches iOS native feel
 * 
 * smoothTouch:
 *   - FALSE for most sites (native touch scroll is highly optimized)
 *   - TRUE only for horizontal scroll galleries or special interactions
 */
const DEFAULT_CONFIG = {
  duration: 1.2,
  easing: premiumEasing,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  smoothTouch: false,      // Native touch is better for most cases
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
  autoResize: true,
  // Wrapper/content - leave undefined to use document
  // wrapper: window,
  // content: document.documentElement,
};

export function SmoothScrollProvider({ 
  children, 
  options = {},
  enableGSAP = true,        // Enable GSAP ScrollTrigger sync
  debug = false,            // Log scroll events for debugging
}) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  
  // Store scroll state for consumers
  const scrollState = useRef({
    scroll: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
    isScrolling: false,
  });

  useEffect(() => {
    // Accessibility check - respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      if (debug) console.info('[SmoothScroll] Reduced motion - native scroll active');
      setIsReady(true);
      return;
    }

    // Merge configs
    const config = { ...DEFAULT_CONFIG, ...options };

    // Initialize Lenis
    const lenis = new Lenis(config);
    lenisRef.current = lenis;
    
    // Expose Lenis globally for ScrollToTop component
    window.__lenis = lenis;

    /**
     * Scroll event handler
     * Updates internal state and optionally logs
     */
    lenis.on('scroll', ({ scroll, velocity, direction, progress }) => {
      scrollState.current = {
        scroll,
        velocity,
        direction,
        progress,
        isScrolling: Math.abs(velocity) > 0.01,
      };

      if (debug) {
        console.log(`[Scroll] pos: ${scroll.toFixed(0)}, vel: ${velocity.toFixed(3)}, dir: ${direction}`);
      }

      /**
       * GSAP ScrollTrigger Integration
       * 
       * WHY THIS IS CRITICAL:
       * Lenis uses a virtual scroll position that differs from native scroll.
       * ScrollTrigger by default reads native scroll position.
       * We must sync them or scroll-triggered animations break.
       * 
       * ScrollTrigger.update() forces GSAP to recalculate all triggers
       * based on the current (virtual) scroll position.
       */
      if (enableGSAP) {
        ScrollTrigger.update();
      }
    });

    /**
     * RAF Loop with GSAP Integration
     * 
     * OPTION A: Standalone RAF (what we're using)
     * - Simpler, works without GSAP
     * - Lenis manages its own timing
     * 
     * OPTION B: GSAP Ticker (alternative)
     * - gsap.ticker.add((time) => lenis.raf(time * 1000));
     * - Better sync with GSAP animations
     * - Use if you have complex GSAP sequences
     */
    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    
    rafIdRef.current = requestAnimationFrame(raf);

    /**
     * Tell ScrollTrigger to use Lenis's scroll position
     * This is the bridge between virtual and trigger positions
     */
    if (enableGSAP) {
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }

    setIsReady(true);

    // Cleanup
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      
      if (enableGSAP) {
        ScrollTrigger.clearScrollMemory();
      }
      
      // Remove global reference
      window.__lenis = null;
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [options, enableGSAP, debug]);

  /**
   * Exposed scroll methods
   * These are memoized to prevent unnecessary re-renders
   */
  const scrollTo = useCallback((target, scrollOptions = {}) => {
    if (!lenisRef.current) {
      // Fallback to native scroll if Lenis isn't available
      const element = typeof target === 'string' 
        ? document.querySelector(target)
        : target;
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      return;
    }

    lenisRef.current.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: premiumEasing,
      immediate: false,
      lock: false,
      ...scrollOptions,
    });
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const getScroll = useCallback(() => scrollState.current, []);

  // Context value
  const contextValue = {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
    getScroll,
    isReady,
  };

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

/**
 * Hook to consume scroll context
 * 
 * @returns {Object} - { lenis, scrollTo, stop, start, getScroll, isReady }
 * 
 * @example
 * function MyComponent() {
 *   const { scrollTo, stop, start } = useSmoothScroll();
 *   
 *   return (
 *     <button onClick={() => scrollTo('#contact', { duration: 2 })}>
 *       Go to Contact
 *     </button>
 *   );
 * }
 */
export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  
  if (context === null) {
    throw new Error(
      'useSmoothScroll must be used within a SmoothScrollProvider. ' +
      'Wrap your app with <SmoothScrollProvider>.'
    );
  }
  
  return context;
}

/**
 * Hook for scroll-linked animations
 * Subscribes to scroll events and calls callback on each frame
 * 
 * @param {Function} callback - Called with scroll state each frame
 * 
 * @example
 * useScrollCallback(({ scroll, velocity, progress }) => {
 *   // Parallax effect
 *   myElement.style.transform = `translateY(${scroll * 0.5}px)`;
 *   
 *   // Velocity-based effects
 *   if (Math.abs(velocity) > 0.5) {
 *     // Fast scrolling - maybe blur or stretch
 *   }
 * });
 */
export function useScrollCallback(callback) {
  const { lenis, isReady } = useSmoothScroll();
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!lenis || !isReady) return;

    const onScroll = (e) => {
      callbackRef.current(e);
    };

    lenis.on('scroll', onScroll);
    
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, isReady]);
}

export default SmoothScrollProvider;
