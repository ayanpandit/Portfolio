/**
 * Application Entry Point
 * 
 * The SmoothScrollProvider wraps the entire app at the root level.
 * This ensures:
 * - Single Lenis instance for the whole app
 * - All components can access scroll controls via useSmoothScroll()
 * - Proper cleanup on unmount
 * - GSAP ScrollTrigger is automatically synced
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SmoothScrollProvider } from './context/SmoothScrollContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 
      SmoothScrollProvider Configuration:
      
      enableGSAP={true}  - Syncs with GSAP ScrollTrigger
      debug={false}      - Set true to log scroll events
      
      Custom options can be passed:
      options={{
        duration: 1.4,        // More momentum
        wheelMultiplier: 0.9, // Slower wheel scroll
      }}
    */}
    <SmoothScrollProvider enableGSAP={true} debug={false}>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
)
