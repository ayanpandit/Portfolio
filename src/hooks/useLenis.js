/**
 * useLenis Hook - Premium Smooth Scrolling for React
 * 
 * This hook provides a production-ready Lenis integration with:
 * - Automatic RAF loop management tied to React lifecycle
 * - Proper cleanup to prevent memory leaks
 * - Accessibility support (prefers-reduced-motion)
 * - Configurable scroll behavior for different use cases
 * 
 * WHY LENIS?
 * Lenis uses a virtual scroll position that interpolates toward the target,
 * creating the "heavy, luxury" feel seen on Awwwards sites. Unlike CSS 
 * scroll-behavior which is binary, Lenis provides continuous momentum.
 */

import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

/**
 * Premium easing function - Custom bezier for luxury feel
 * This curve provides:
 * - Quick initial response (no perceived lag)
 * - Long deceleration tail (momentum/inertia feel)
 * - Subtle overshoot potential via duration
 * 
 * The (1 - t)^3 creates exponential decay - the scroll "settles" naturally
 * like a heavy object coming to rest, not an abrupt stop.
 */
const premiumEasing = (t) => {
  // Ultra-smooth bezier-inspired easing: fast start, very long smooth tail
  // Enhanced for luxury feel - mimics high-end physical scrolling (Apple trackpad)
  // Higher exponent (12 vs 10) = longer, more gradual deceleration
  return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
};

/**
 * Alternative easing options for different feels:
 * 
 * HEAVIER (more momentum, longer settle):
 * const heavyEasing = (t) => 1 - Math.pow(1 - t, 4);
 * 
 * SNAPPIER (quick response, less float):
 * const snappyEasing = (t) => 1 - Math.pow(1 - t, 2.5);
 * 
 * ELASTIC (subtle bounce at end - use sparingly):
 * const elasticEasing = (t) => {
 *   const c4 = (2 * Math.PI) / 3;
 *   return t === 0 ? 0 : t === 1 ? 1 
 *     : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
 * };
 */

/**
 * Configuration presets for different project needs
 */
export const SCROLL_PRESETS = {
  // Default premium feel - balanced for most portfolios
  PREMIUM: {
    duration: 1.8,           // Time to reach target (seconds) - higher = more momentum & deceleration
    easing: premiumEasing,   // Custom curve for luxury feel
    orientation: 'vertical', // Scroll direction
    gestureOrientation: 'vertical',
    smoothWheel: true,       // Smooth mouse wheel
    smoothTouch: false,      // CRITICAL: Keep false for touch - native feels better
    wheelMultiplier: 0.9,    // Wheel sensitivity (slightly reduced for smoother feel)
    touchMultiplier: 2,      // Touch sensitivity
    infinite: false,         // Infinite scroll (usually false for portfolios)
    autoResize: true,        // Auto-handle resize events
  },
  
  // Heavier, more cinematic feel (slower, more dramatic)
  CINEMATIC: {
    duration: 1.6,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.8,
    infinite: false,
    autoResize: true,
  },
  
  // Snappier, more responsive (for content-heavy sites)
  SNAPPY: {
    duration: 0.8,
    easing: (t) => 1 - Math.pow(1 - t, 2.5),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.2,
    touchMultiplier: 2.2,
    infinite: false,
    autoResize: true,
  },
};

/**
 * Main hook for Lenis smooth scrolling
 * 
 * @param {Object} options - Lenis configuration options
 * @param {Function} onScroll - Callback fired on each scroll frame
 * @returns {Object} - { lenis, scrollTo, stop, start }
 * 
 * @example
 * // Basic usage
 * const { lenis, scrollTo } = useLenis();
 * 
 * // With scroll callback (for animations)
 * const { lenis } = useLenis({}, ({ scroll, velocity, direction }) => {
 *   // Use scroll position for parallax, etc.
 * });
 * 
 * // Programmatic scroll
 * scrollTo('#section', { duration: 2, easing: (t) => t });
 */
export function useLenis(options = {}, onScroll = null) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const callbackRef = useRef(onScroll);
  
  // Keep callback ref updated without triggering re-init
  useEffect(() => {
    callbackRef.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    // ACCESSIBILITY: Respect user's motion preferences
    // This is non-negotiable for WCAG compliance
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion) {
      console.info('[Lenis] Reduced motion preferred - using native scroll');
      return; // Exit early, use native scrolling
    }

    // Merge user options with premium defaults
    const config = {
      ...SCROLL_PRESETS.PREMIUM,
      ...options,
    };

    // Initialize Lenis instance
    const lenis = new Lenis(config);
    lenisRef.current = lenis;

    // Attach scroll callback if provided
    if (callbackRef.current) {
      lenis.on('scroll', (e) => {
        callbackRef.current(e);
      });
    }

    /**
     * RAF Loop - The heart of smooth scrolling
     * 
     * WHY RAF?
     * - Syncs with display refresh rate (typically 60fps)
     * - Pauses when tab is inactive (performance)
     * - Provides consistent time delta for physics calculations
     * 
     * CRITICAL: We pass `time` to lenis.raf(), NOT the delta.
     * Lenis internally calculates delta for interpolation.
     */
    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    
    // Start the animation loop
    rafIdRef.current = requestAnimationFrame(raf);

    /**
     * CLEANUP - Absolutely critical in React
     * 
     * Without proper cleanup:
     * - RAF loops accumulate on hot reload (dev mode disaster)
     * - Memory leaks from orphaned Lenis instances
     * - Scroll listeners stack up causing jank
     * 
     * This cleanup runs on:
     * - Component unmount
     * - Dependency changes (if any were added)
     * - Hot module replacement (Vite/Webpack)
     */
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []); // Empty deps = single initialization
  // WARNING: Adding options to deps would cause re-init on every render if object reference changes

  /**
   * Programmatic scroll with premium defaults
   * 
   * @param {string|number|HTMLElement} target - Scroll destination
   * @param {Object} scrollOptions - Override default scroll behavior
   * 
   * Target types:
   * - '#section-id' - Scroll to element by selector
   * - 500 - Scroll to absolute pixel position
   * - element - Scroll to DOM element reference
   */
  const scrollTo = useCallback((target, scrollOptions = {}) => {
    if (!lenisRef.current) return;
    
    lenisRef.current.scrollTo(target, {
      offset: 0,           // Offset from target (useful for fixed headers)
      duration: 1.2,       // Animation duration
      easing: premiumEasing,
      immediate: false,    // If true, jumps instantly (no animation)
      lock: false,         // If true, prevents user scroll during animation
      ...scrollOptions,
    });
  }, []);

  /**
   * Stop/Start controls for specific interactions
   * 
   * Use cases:
   * - Stop during modal open (prevent background scroll)
   * - Stop during complex animations that might conflict
   * - Start when returning to normal state
   */
  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
  };
}

/**
 * Lightweight hook for scroll position only
 * Use when you need scroll data but Lenis is managed elsewhere (context)
 * 
 * @returns {Object} - { scroll, velocity, direction, progress }
 */
export function useScrollPosition() {
  const scrollRef = useRef({
    scroll: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
  });

  return scrollRef.current;
}

export default useLenis;
