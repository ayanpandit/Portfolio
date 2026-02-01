/**
 * Application Entry Point
 * 
 * The SmoothScrollProvider wraps the entire app at the root level.
 * This ensures:
 * - Single Lenis instance for the whole app
 * - All components can access scroll controls via useSmoothScroll()
 * - Proper cleanup on unmount
 * - GSAP ScrollTrigger is automatically synced
 * 
 * ROUTING: Using BrowserRouter for SEO-friendly URLs.
 * Server rewrite rules in vercel.json / _redirects handle 404 prevention.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { SmoothScrollProvider } from './context/SmoothScrollContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 
      BrowserRouter: SEO-friendly routing with clean URLs
      Server-side rewrites (vercel.json / _redirects) handle page refreshes
    */}
    <BrowserRouter>
      <SmoothScrollProvider enableGSAP={true} debug={false}>
        <App />
      </SmoothScrollProvider>
    </BrowserRouter>
  </StrictMode>,
)
