/**
 * Smooth Scrolling System - Public Exports
 * 
 * Import from this file for clean API access:
 * 
 * import { 
 *   SmoothScrollProvider, 
 *   useSmoothScroll,
 *   useFadeIn,
 *   useParallax 
 * } from './lib/scroll';
 */

// Core provider and context hook
export { 
  SmoothScrollProvider, 
  useSmoothScroll, 
  useScrollCallback 
} from '../context/SmoothScrollContext';

// Standalone Lenis hook (for advanced use cases)
export { 
  useLenis, 
  useScrollPosition,
  SCROLL_PRESETS 
} from '../hooks/useLenis';

// GSAP-powered scroll animation hooks
export { 
  useFadeIn,
  useScrub,
  useParallax,
  usePin,
  useStaggerReveal,
  useScrollTrigger,
  refreshScrollTriggers,
  killAllScrollTriggers,
  SCROLL_EASINGS,
} from '../hooks/useScrollAnimation';
