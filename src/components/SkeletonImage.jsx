import React, { useState, useCallback } from 'react';

/**
 * SkeletonImage — YouTube-style skeleton loading for images.
 *
 * Features:
 *  - Shimmer placeholder rendered instantly (zero layout shift)
 *  - Real image loads in background via lazy loading
 *  - Smooth opacity fade-in once loaded
 *  - Skeleton removed from DOM after transition
 *  - Lightweight — pure CSS shimmer, no libraries
 *  - Fully responsive, inherits parent size & border-radius
 *
 * Props:
 *  @param {string}  src           — Image source URL
 *  @param {string}  alt           — Alt text
 *  @param {string}  [className]   — Classes applied to the <img>
 *  @param {object}  [style]       — Inline styles applied to the <img>
 *  @param {string}  [wrapperClassName] — Extra classes on the outer wrapper
 *  @param {number}  [fadeDuration=500] — Fade-in duration in ms
 */
export default function SkeletonImage({
  src,
  alt,
  className = '',
  style = {},
  wrapperClassName = '',
  fadeDuration = 500,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [skeletonVisible, setSkeletonVisible] = useState(true);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    // Remove skeleton from DOM after fade completes
    const timer = setTimeout(() => setSkeletonVisible(false), fadeDuration + 50);
    return () => clearTimeout(timer);
  }, [fadeDuration]);

  return (
    <div className={`skeleton-image-wrapper ${wrapperClassName}`}>
      {/* Shimmer skeleton */}
      {skeletonVisible && (
        <div
          className="skeleton-shimmer"
          aria-hidden="true"
        />
      )}

      {/* Actual image — hidden until loaded, then fades in */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: `opacity ${fadeDuration}ms ease`,
        }}
        {...rest}
      />
    </div>
  );
}
