import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimizations for production
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,      // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - cached separately
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion', 'motion', 'gsap'],
          'vendor-scroll': ['lenis'],
          'vendor-three': ['three'],
        },
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    
    // Enable source maps for debugging (optional)
    sourcemap: false,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
  },
  
  // Development optimizations
  server: {
    // Enable HMR
    hmr: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap', 'lenis'],
  },
})
