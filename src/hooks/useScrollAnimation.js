/**
 * useScrollAnimation Hook - GSAP ScrollTrigger + Lenis Integration
 * 
 * This hook provides production-ready scroll-triggered animations
 * that work seamlessly with the Lenis smooth scrolling system.
 * 
 * ARCHITECTURE:
 * - Lenis handles the virtual scroll position
 * - GSAP ScrollTrigger reads that position via scroller proxy (set in SmoothScrollContext)
 * - This hook provides easy animation patterns for components
 * 
 * WHY GSAP FOR SCROLL ANIMATIONS?
 * - Battle-tested performance (10+ years of optimization)
 * - Proper compositor-layer handling
 * - Scrubbing, pinning, and complex timeline support
 * - Syncs perfectly with Lenis via scrollerProxy
 */

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '../context/SmoothScrollContext';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

/**
 * Premium easing curves for scroll animations
 * These match the Lenis scroll feel for visual consistency
 */
export const SCROLL_EASINGS = {
  // Smooth entry - matches Lenis momentum
  smooth: 'power2.out',
  
  // Premium feel - quick start, long settle
  premium: 'expo.out',
  
  // Snappy - good for UI elements
  snappy: 'power3.out',
  
  // Elastic - subtle bounce (use sparingly)
  elastic: 'elastic.out(1, 0.5)',
  
  // Linear - for scrub animations only
  linear: 'none',
};

/**
 * Basic fade-in animation on scroll
 * 
 * @param {Object} options - Animation configuration
 * @returns {Object} - { ref } - Attach to animated element
 * 
 * @example
 * function MyComponent() {
 *   const { ref } = useFadeIn({ delay: 0.2 });
 *   return <div ref={ref}>Fades in on scroll</div>;
 * }
 */
export function useFadeIn({
  delay = 0,
  duration = 0.8,
  y = 60,
  ease = SCROLL_EASINGS.premium,
  start = 'top 85%',      // Trigger when element top hits 85% of viewport
  markers = false,        // Debug markers
} = {}) {
  const ref = useRef(null);
  const { isReady } = useSmoothScroll();

  useEffect(() => {
    if (!ref.current || !isReady) return;

    const element = ref.current;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: y,
    });

    // Create scroll-triggered animation
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: start,
      markers: markers,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: ease,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, y, ease, start, markers, isReady]);

  return { ref };
}

/**
 * Scrub animation - Animation progress tied directly to scroll position
 * 
 * @param {Function} animationFn - Function that receives gsap timeline and element
 * @param {Object} options - ScrollTrigger options
 * @returns {Object} - { ref }
 * 
 * @example
 * const { ref } = useScrub((tl, el) => {
 *   tl.to(el, { x: 200, rotation: 45 });
 * }, { start: 'top center', end: 'bottom center' });
 */
export function useScrub(
  animationFn,
  {
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,            // Scrub smoothing (higher = more lag, 1 = natural)
    markers = false,
  } = {}
) {
  const ref = useRef(null);
  const { isReady } = useSmoothScroll();

  useEffect(() => {
    if (!ref.current || !isReady) return;

    const element = ref.current;
    const timeline = gsap.timeline();

    // Let consumer define the animation
    animationFn(timeline, element);

    // Attach timeline to scroll position
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: start,
      end: end,
      scrub: scrub,
      animation: timeline,
      markers: markers,
    });

    return () => {
      trigger.kill();
      timeline.kill();
    };
  }, [animationFn, start, end, scrub, markers, isReady]);

  return { ref };
}

/**
 * Parallax effect - Element moves at different speed than scroll
 * 
 * @param {Object} options - Parallax configuration
 * @returns {Object} - { ref }
 * 
 * @example
 * // Slow parallax (moves 50% of scroll speed)
 * const { ref } = useParallax({ speed: 0.5 });
 * 
 * // Fast parallax (moves 150% of scroll speed)
 * const { ref } = useParallax({ speed: 1.5 });
 * 
 * // Reverse parallax (moves opposite to scroll)
 * const { ref } = useParallax({ speed: -0.3 });
 */
export function useParallax({
  speed = 0.5,
  direction = 'vertical',
} = {}) {
  const ref = useRef(null);
  const { isReady } = useSmoothScroll();

  useEffect(() => {
    if (!ref.current || !isReady) return;

    const element = ref.current;
    
    // Calculate movement based on viewport height and speed
    const movement = 100 * speed;
    
    const property = direction === 'vertical' ? 'y' : 'x';

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // Map progress (0-1) to movement range
        const yPos = (self.progress - 0.5) * movement;
        gsap.set(element, { [property]: yPos });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [speed, direction, isReady]);

  return { ref };
}

/**
 * Pin element during scroll
 * 
 * @param {Object} options - Pin configuration
 * @returns {Object} - { ref, triggerRef }
 * 
 * @example
 * const { ref, triggerRef } = usePin({ duration: '200%' });
 * 
 * return (
 *   <div ref={triggerRef}>
 *     <div ref={ref}>I stay fixed while you scroll</div>
 *   </div>
 * );
 */
export function usePin({
  duration = '100%',      // How long to pin (can be px or %)
  anticipatePin = 1,      // Prevents jank at pin start
  markers = false,
} = {}) {
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const { isReady } = useSmoothScroll();

  useEffect(() => {
    if (!ref.current || !isReady) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current || ref.current,
      start: 'top top',
      end: `+=${duration}`,
      pin: ref.current,
      anticipatePin: anticipatePin,
      markers: markers,
    });

    return () => {
      trigger.kill();
    };
  }, [duration, anticipatePin, markers, isReady]);

  return { ref, triggerRef };
}

/**
 * Staggered reveal for multiple child elements
 * 
 * @param {Object} options - Stagger configuration
 * @returns {Object} - { containerRef }
 * 
 * @example
 * const { containerRef } = useStaggerReveal({
 *   stagger: 0.1,
 *   childSelector: '.card',
 * });
 * 
 * return (
 *   <div ref={containerRef}>
 *     <div className="card">1</div>
 *     <div className="card">2</div>
 *     <div className="card">3</div>
 *   </div>
 * );
 */
export function useStaggerReveal({
  stagger = 0.08,
  duration = 0.6,
  y = 40,
  ease = SCROLL_EASINGS.premium,
  childSelector = '> *',
  start = 'top 80%',
  markers = false,
} = {}) {
  const containerRef = useRef(null);
  const { isReady } = useSmoothScroll();

  useEffect(() => {
    if (!containerRef.current || !isReady) return;

    const container = containerRef.current;
    const children = container.querySelectorAll(childSelector);

    if (children.length === 0) return;

    // Set initial state
    gsap.set(children, {
      opacity: 0,
      y: y,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: start,
      markers: markers,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          ease: ease,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [stagger, duration, y, ease, childSelector, start, markers, isReady]);

  return { containerRef };
}

/**
 * Custom ScrollTrigger hook for advanced use cases
 * 
 * @param {Object} config - Full ScrollTrigger configuration
 * @returns {Object} - { ref, scrollTrigger }
 * 
 * @example
 * const { ref } = useScrollTrigger({
 *   start: 'top center',
 *   end: 'bottom center',
 *   onEnter: () => console.log('Entered'),
 *   onLeave: () => console.log('Left'),
 *   onUpdate: (self) => console.log(self.progress),
 * });
 */
export function useScrollTrigger(config = {}) {
  const ref = useRef(null);
  const scrollTriggerRef = useRef(null);
  const { isReady } = useSmoothScroll();

  useEffect(() => {
    if (!ref.current || !isReady) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      ...config,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [config, isReady]);

  return { ref, scrollTrigger: scrollTriggerRef.current };
}

/**
 * Utility: Refresh all ScrollTriggers
 * Call after dynamic content changes (images load, accordions open, etc.)
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Utility: Kill all ScrollTriggers
 * Use for complete cleanup (route changes in SPA)
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

export default {
  useFadeIn,
  useScrub,
  useParallax,
  usePin,
  useStaggerReveal,
  useScrollTrigger,
  refreshScrollTriggers,
  killAllScrollTriggers,
  SCROLL_EASINGS,
};
