import { useEffect, useRef } from 'react';
import cursorIcon from '../assets/icon.svg';

/**
 * CustomCursor - Lightweight premium cursor
 * 
 * Uses refs only (no state re-renders) for maximum performance
 * Handles tab switching, visibility, and position correctly
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  
  // All tracking via refs to avoid re-renders
  const state = useRef({
    mouseX: -100,
    mouseY: -100,
    cursorX: -100,
    cursorY: -100,
    isVisible: false,
    isHovering: false,
    hasMoved: false,
  });

  // Easing factor (higher = snappier)
  const EASE = 0.25;

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );

    if (isTouchDevice) {
      // Hide cursor element on touch devices
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initially hide cursor off-screen
    cursor.style.transform = 'translate3d(-100px, -100px, 0)';
    cursor.style.opacity = '0';

    // Update cursor classes
    const updateCursorStyle = () => {
      if (!cursor) return;
      
      if (state.current.isVisible && state.current.hasMoved) {
        cursor.style.opacity = '1';
      } else {
        cursor.style.opacity = '0';
      }

      if (state.current.isHovering) {
        cursor.classList.add('custom-cursor--hover');
      } else {
        cursor.classList.remove('custom-cursor--hover');
      }
    };

    // Animation loop
    const animate = () => {
      const s = state.current;
      
      // Only animate if we have a valid position
      if (s.hasMoved) {
        // Apply easing
        s.cursorX += (s.mouseX - s.cursorX) * EASE;
        s.cursorY += (s.mouseY - s.cursorY) * EASE;

        // Apply transform
        cursor.style.transform = `translate3d(${s.cursorX}px, ${s.cursorY}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const onMouseMove = (e) => {
      const s = state.current;
      
      // If this is the first move (or after tab switch), snap immediately
      if (!s.hasMoved) {
        s.cursorX = e.clientX;
        s.cursorY = e.clientY;
        s.hasMoved = true;
      }
      
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
      s.isVisible = true;
      
      updateCursorStyle();
    };

    // Mouse enter/leave document
    const onMouseLeave = () => {
      state.current.isVisible = false;
      updateCursorStyle();
    };

    const onMouseEnter = (e) => {
      // Snap to entry position
      state.current.mouseX = e.clientX;
      state.current.mouseY = e.clientY;
      state.current.cursorX = e.clientX;
      state.current.cursorY = e.clientY;
      state.current.isVisible = true;
      state.current.hasMoved = true;
      updateCursorStyle();
    };

    // Tab visibility
    const onVisibilityChange = () => {
      if (document.hidden) {
        state.current.isVisible = false;
        state.current.hasMoved = false;
        updateCursorStyle();
      }
    };

    // Window blur (switching to another app/tab)
    const onWindowBlur = () => {
      state.current.isVisible = false;
      state.current.hasMoved = false;
      updateCursorStyle();
    };

    // Hover detection
    const isInteractive = (el) => {
      if (!el) return false;
      return (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[data-cursor="hover"]') ||
        el.hasAttribute?.('data-cursor')
      );
    };

    const onMouseOver = (e) => {
      if (isInteractive(e.target)) {
        state.current.isHovering = true;
        updateCursorStyle();
      }
    };

    const onMouseOut = (e) => {
      if (isInteractive(e.target)) {
        state.current.isHovering = false;
        updateCursorStyle();
      }
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onWindowBlur);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <img 
        src={cursorIcon} 
        alt="" 
        className="custom-cursor__icon"
        draggable="false"
      />
    </div>
  );
};

export default CustomCursor;
