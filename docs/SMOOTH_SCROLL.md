# Premium Smooth Scrolling System

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         main.jsx                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              SmoothScrollProvider                        │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │                  Lenis Instance                  │    │    │
│  │  │  • Virtual scroll position                       │    │    │
│  │  │  • RAF loop for 60fps updates                    │    │    │
│  │  │  • Easing/momentum calculations                  │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  │                         ↓                                │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │           GSAP ScrollTrigger Sync               │    │    │
│  │  │  • scrollerProxy bridges virtual → trigger      │    │    │
│  │  │  • All triggers read Lenis position             │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  │                         ↓                                │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │                   App.jsx                        │    │    │
│  │  │  • Uses useSmoothScroll() for control           │    │    │
│  │  │  • Anchor links use scrollTo()                  │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Scroll Tuning Guide

### Duration (0.6 - 2.0 seconds)

The `duration` parameter controls how long it takes for scroll to reach its target.

| Value | Feel | Best For |
|-------|------|----------|
| 0.6 - 0.8 | Snappy, responsive | Content-heavy, ecommerce |
| 1.0 - 1.2 | Premium, balanced | Portfolios, landing pages |
| 1.4 - 1.8 | Cinematic, heavy | Creative studios, luxury brands |
| 2.0+ | Dramatic, slow | Single-page experiences |

```jsx
// In main.jsx
<SmoothScrollProvider 
  options={{ 
    duration: 1.4  // More cinematic
  }}
>
```

### Easing Functions

Easing controls the acceleration curve of scrolling.

```javascript
// Premium (default) - Quick response, long settle
const premiumEasing = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

// Heavy - More momentum, longer coast
const heavyEasing = (t) => 1 - Math.pow(1 - t, 4);

// Snappy - Quick throughout
const snappyEasing = (t) => 1 - Math.pow(1 - t, 2.5);

// Bouncy (use sparingly)
const bouncyEasing = (t) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
};
```

### Wheel Multiplier (0.5 - 2.0)

Controls how fast the page scrolls per mouse wheel tick.

| Value | Effect |
|-------|--------|
| 0.5 | Half speed - very controlled |
| 1.0 | Native speed (recommended) |
| 1.5 | Faster scrolling |
| 2.0 | Very fast (can feel uncontrolled) |

```jsx
<SmoothScrollProvider options={{ wheelMultiplier: 0.9 }}>
```

### Touch Multiplier (1.0 - 3.0)

Controls touch scroll sensitivity on mobile devices.

| Value | Effect |
|-------|--------|
| 1.0 | Conservative, precise |
| 2.0 | Native iOS feel (default) |
| 2.5+ | Very responsive, might overshoot |

**Important:** Keep `smoothTouch: false` for most projects. Native touch scrolling is highly optimized.

---

## Common Patterns

### Anchor Navigation

```jsx
import { useSmoothScroll } from './context/SmoothScrollContext';

function Navigation() {
  const { scrollTo } = useSmoothScroll();

  return (
    <nav>
      <button onClick={() => scrollTo('#home')}>Home</button>
      <button onClick={() => scrollTo('#about', { offset: -80 })}>About</button>
      <button onClick={() => scrollTo('#contact', { duration: 2 })}>Contact</button>
    </nav>
  );
}
```

### Scroll-Linked Parallax

```jsx
import { useParallax } from './hooks/useScrollAnimation';

function HeroImage() {
  const { ref } = useParallax({ speed: 0.3 });
  
  return (
    <div className="overflow-hidden">
      <img ref={ref} src="/hero.jpg" className="scale-110" />
    </div>
  );
}
```

### Fade In on Scroll

```jsx
import { useFadeIn } from './hooks/useScrollAnimation';

function Card({ children }) {
  const { ref } = useFadeIn({ y: 60, delay: 0.1 });
  
  return <div ref={ref}>{children}</div>;
}
```

### Staggered List Reveal

```jsx
import { useStaggerReveal } from './hooks/useScrollAnimation';

function FeatureList() {
  const { containerRef } = useStaggerReveal({
    stagger: 0.1,
    childSelector: '.feature-item',
  });

  return (
    <div ref={containerRef}>
      <div className="feature-item">Feature 1</div>
      <div className="feature-item">Feature 2</div>
      <div className="feature-item">Feature 3</div>
    </div>
  );
}
```

### Pinned Section

```jsx
import { usePin } from './hooks/useScrollAnimation';

function PinnedGallery() {
  const { ref, triggerRef } = usePin({ duration: '300%' });

  return (
    <div ref={triggerRef} className="h-[400vh]">
      <div ref={ref} className="h-screen">
        {/* Content stays fixed while scrolling 300% */}
      </div>
    </div>
  );
}
```

---

## Performance Optimization

### GPU Acceleration

Add to elements that animate frequently:

```css
.parallax-element {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### Avoid Layout Thrashing

```jsx
// BAD - Causes reflow
useScrollCallback(({ scroll }) => {
  element.style.top = scroll + 'px';  // Forces layout
});

// GOOD - Uses transform (composited)
useScrollCallback(({ scroll }) => {
  element.style.transform = `translateY(${scroll}px)`;
});
```

### Debounce Heavy Operations

```jsx
import { useSmoothScroll } from './context/SmoothScrollContext';
import { useRef } from 'react';

function HeavyComponent() {
  const { lenis } = useSmoothScroll();
  const frameRef = useRef(null);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll }) => {
      // Cancel pending frame
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      // Schedule heavy work for next frame
      frameRef.current = requestAnimationFrame(() => {
        // Heavy calculations here
      });
    };

    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);
}
```

---

## Common Mistakes & Solutions

### ❌ Mistake: CSS scroll-behavior: smooth

```css
/* WRONG - Conflicts with Lenis */
html {
  scroll-behavior: smooth;
}
```

```css
/* CORRECT - Lenis handles scrolling */
html {
  /* No scroll-behavior */
}
```

### ❌ Mistake: Multiple Lenis Instances

```jsx
// WRONG - Each component creates its own Lenis
function Component1() {
  useLenis();
}
function Component2() {
  useLenis();
}
```

```jsx
// CORRECT - Single instance at root, consume via context
<SmoothScrollProvider>
  <Component1 />
  <Component2 />
</SmoothScrollProvider>

function Component1() {
  const { scrollTo } = useSmoothScroll();
}
```

### ❌ Mistake: Not Cleaning Up RAF

```jsx
// WRONG - Memory leak
useEffect(() => {
  const raf = () => {
    lenis.raf(performance.now());
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  // No cleanup!
}, []);
```

```jsx
// CORRECT - Proper cleanup
useEffect(() => {
  let rafId;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  
  return () => cancelAnimationFrame(rafId);
}, []);
```

### ❌ Mistake: Breaking Sticky Elements

```css
/* WRONG - Breaks sticky */
.parent {
  overflow: hidden;
}
.sticky {
  position: sticky;
  top: 0;
}
```

```css
/* CORRECT - Use clip instead */
.parent {
  overflow-x: clip;
}
```

### ❌ Mistake: smoothTouch on Mobile

```jsx
// WRONG - Fights native touch scrolling
new Lenis({ smoothTouch: true });
```

```jsx
// CORRECT - Let native handle touch
new Lenis({ smoothTouch: false });
```

### ❌ Mistake: Not Refreshing ScrollTrigger

```jsx
// WRONG - Triggers don't update after content change
function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  return <div style={{ height: isOpen ? 500 : 100 }} />;
}
```

```jsx
// CORRECT - Refresh after layout changes
import { refreshScrollTriggers } from './hooks/useScrollAnimation';

function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    refreshScrollTriggers();
  }, [isOpen]);

  return <div style={{ height: isOpen ? 500 : 100 }} />;
}
```

---

## Modal/Dialog Handling

When opening a modal, stop Lenis to prevent background scrolling:

```jsx
import { useSmoothScroll } from './context/SmoothScrollContext';

function Modal({ isOpen, children }) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (isOpen) {
      stop();
    } else {
      start();
    }

    return () => start(); // Ensure started on unmount
  }, [isOpen, stop, start]);

  if (!isOpen) return null;

  return <div className="modal">{children}</div>;
}
```

---

## Debugging

Enable debug mode for scroll logging:

```jsx
<SmoothScrollProvider debug={true}>
```

Enable ScrollTrigger markers:

```jsx
const { ref } = useFadeIn({ markers: true });
```

Check Lenis state:

```jsx
const { lenis, getScroll } = useSmoothScroll();

console.log('Scroll state:', getScroll());
console.log('Is scrolling:', lenis.isScrolling);
console.log('Velocity:', lenis.velocity);
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 60+ | ✅ Full |
| Firefox 55+ | ✅ Full |
| Safari 12+ | ✅ Full |
| Edge 79+ | ✅ Full |
| iOS Safari 12+ | ✅ Full (with smoothTouch: false) |
| Android Chrome | ✅ Full |

---

## File Structure

```
src/
├── context/
│   └── SmoothScrollContext.jsx   # Provider + useSmoothScroll hook
├── hooks/
│   ├── useLenis.js               # Standalone Lenis hook (alternative)
│   └── useScrollAnimation.js     # GSAP ScrollTrigger hooks
├── App.jsx                        # Anchor link handling
├── main.jsx                       # Provider wrapper
└── index.css                      # Lenis-compatible styles
```
