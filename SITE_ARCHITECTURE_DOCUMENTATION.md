# Persian Green Webapp - Complete Site Architecture & Styling Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [HTML Structure & Layout](#html-structure--layout)
3. [CSS Architecture & Styling System](#css-architecture--styling-system)
4. [Component Structure](#component-structure)
5. [Page Architecture](#page-architecture)
6. [Design System](#design-system)
7. [Responsive Design](#responsive-design)
8. [Performance & Optimization](#performance--optimization)

---

## 🎯 Project Overview

**Framework**: Next.js 14 with App Router  
**Language**: TypeScript  
**Styling**: Tailwind CSS with custom design system  
**Animations**: GSAP with ScrollTrigger  
**UI Components**: Radix UI primitives with custom styling  
**Icons**: Lucide React  

---

## 🏗️ HTML Structure & Layout

### Root Layout Structure
```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Meta tags, favicon, SEO optimizations -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#2A9D8F">
  <title>Craft&Art Marketplace - Authentic Handcraft & Art Marketplace</title>
</head>
<body class="antialiased bg-ivory text-graphite">
  <div class="min-h-screen flex flex-col">
    <!-- Navigation Component -->
    <nav class="fixed top-0 left-0 right-0 z-50">
      <!-- Dynamic navigation with scroll effects -->
    </nav>
    
    <!-- Main Content Area -->
    <main class="flex-1">
      <!-- Page-specific content -->
    </main>
    
    <!-- Footer Component -->
    <footer class="bg-graphite text-white">
      <!-- Site-wide footer -->
    </footer>
  </div>
</body>
</html>
```

### Navigation Structure
```html
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16 md:h-20">
      <!-- Logo Section -->
      <a href="/" class="flex items-center space-x-3 group">
        <div class="w-10 h-10 rounded-lg overflow-hidden">
          <img src="/Craft&Art_logo.png" alt="Logo" class="w-full h-full object-contain">
        </div>
        <span class="text-xl font-bold">Craft&Art Marketplace</span>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="/" class="font-medium transition-all duration-200">Home</a>
        <a href="/stories" class="font-medium transition-all duration-200">Craft Stories</a>
        <a href="/artisans" class="font-medium transition-all duration-200">Artisans</a>
        <a href="/about" class="font-medium transition-all duration-200">About</a>
        <a href="/contact" class="font-medium transition-all duration-200">Contact</a>
      </div>
      
      <!-- CTA Button -->
      <button class="ceramic-button flex items-center gap-2">
        <svg class="w-4 h-4"><!-- Download icon --></svg>
        Download App
      </button>
      
      <!-- Mobile Menu Toggle -->
      <button class="md:hidden p-2 rounded-lg">
        <!-- Hamburger/Close icon -->
      </button>
    </div>
    
    <!-- Mobile Navigation Menu -->
    <div class="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md">
      <!-- Mobile menu items -->
    </div>
  </div>
</nav>
```

### Homepage Structure
```html
<main>
  <!-- Hero Section -->
  <section class="relative min-h-screen flex items-center justify-center">
    <div class="absolute inset-0 bg-gradient-persian-1">
      <!-- Background video/image -->
    </div>
    <div class="relative z-10 text-center text-white">
      <h1 class="hero-title text-4xl md:text-6xl font-bold mb-6">
        Discover Authentic Tanzanian Crafts
      </h1>
      <p class="hero-subtitle text-xl md:text-2xl mb-8">
        Connect with talented artisans and their cultural heritage
      </p>
      <div class="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
        <button class="ceramic-button">Explore Crafts</button>
        <button class="btn-persian-outline">Meet Artisans</button>
      </div>
    </div>
  </section>
  
  <!-- Features Section -->
  <section class="py-20 bg-ivory">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div class="feature-card bg-white p-8 rounded-lg shadow-lg">
          <!-- Feature content -->
        </div>
      </div>
    </div>
  </section>
  
  <!-- Statistics Section -->
  <section class="py-20 bg-gradient-persian-7">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <div class="stat-item text-center">
          <div class="text-4xl font-bold text-white mb-2">500+</div>
          <div class="text-persian-green-200">Artisans</div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Artisan Carousel -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <!-- Carousel component -->
    </div>
  </section>
</main>
```

### Footer Structure
```html
<footer class="bg-graphite text-white">
  <div class="container mx-auto px-4 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
      <!-- Brand Section -->
      <div class="lg:col-span-2">
        <a href="/" class="flex items-center space-x-3 mb-6">
          <img src="/Craft&Art_logo.png" alt="Logo" class="w-36 h-36">
          <span class="text-2xl font-bold">Craft&Art Marketplace</span>
        </a>
        <p class="text-gray-300 mb-6">Description...</p>
        <div class="space-y-3">
          <!-- Contact information -->
        </div>
      </div>
      
      <!-- Link Columns -->
      <div>
        <h3 class="text-lg font-semibold mb-4 text-persian-green-500">Company</h3>
        <ul class="space-y-3">
          <!-- Company links -->
        </ul>
      </div>
      <!-- More columns... -->
    </div>
    
    <!-- Newsletter Signup -->
    <div class="mt-12 pt-8 border-t border-gray-700">
      <!-- Newsletter form -->
    </div>
    
    <!-- Social Links -->
    <div class="mt-8 flex justify-center space-x-6">
      <!-- Social media icons -->
    </div>
  </div>
  
  <!-- Bottom Bar -->
  <div class="border-t border-gray-700">
    <div class="container mx-auto px-4 py-6">
      <!-- Copyright and legal links -->
    </div>
  </div>
</footer>
```

---

## 🎨 CSS Architecture & Styling System

### CSS Layer Structure
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* CSS Custom Properties (Design Tokens) */
  :root {
    --background: 248 248 245; /* Ivory */
    --foreground: 51 51 51; /* Graphite */
    --primary: 42 157 143; /* Persian Green */
    --secondary: 30 95 139; /* Zanzibar Twilight */
    --muted: 157 122 109; /* Copper Patina */
    --accent: 157 122 109; /* Copper Patina */
    --radius: 0.5rem;
  }
  
  /* Base Styles */
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  /* Custom Component Classes */
}
```

### Color System
```css
/* Primary Color Palette */
.text-craftart-500 { color: #2A9D8F; } /* Persian Green */
.bg-ivory { background-color: #F8F8F5; }
.text-graphite { color: #333333; }
.text-copper-patina { color: #9D7A6D; }
.text-zanzibar-twilight { color: #1E5F8B; }

/* Persian Green Shades */
.bg-craftart-50 { background-color: #f0fdf9; }
.bg-craftart-100 { background-color: #ccfbef; }
.bg-craftart-200 { background-color: #99f6e0; }
.bg-craftart-300 { background-color: #5eead4; }
.bg-craftart-400 { background-color: #2dd4bf; }
.bg-craftart-500 { background-color: #2A9D8F; } /* Primary */
.bg-craftart-600 { background-color: #0f766e; }
.bg-craftart-700 { background-color: #0f5d5a; }
.bg-craftart-800 { background-color: #134e4a; }
.bg-craftart-900 { background-color: #134e4a; }
```

### Custom Component Styles
```css
/* Persian Green Button */
.btn-persian {
  @apply bg-craftart-500 hover:bg-craftart-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1;
}

.btn-persian-outline {
  @apply border-2 border-craftart-500 text-craftart-500 hover:bg-craftart-500 hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-300;
}

/* Ceramic Button Effect */
.ceramic-button {
  @apply relative overflow-hidden;
  background: linear-gradient(145deg, #2A9D8F, #0f766e);
  box-shadow: 
    0 4px 15px rgba(42, 157, 143, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.ceramic-button:hover {
  box-shadow: 
    0 6px 20px rgba(42, 157, 143, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

/* Cultural Pattern Overlays */
.kitenge-overlay {
  position: relative;
}

.kitenge-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/patterns/kitenge.svg');
  background-repeat: repeat;
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
}

.paper-grain {
  background-image: url('/textures/paper-grain.svg');
  background-repeat: repeat;
}
```

### Gradient System
```css
/* Persian Green Gradients */
.gradient-persian-1 {
  background: linear-gradient(135deg, #2A9D8F 0%, #0f766e 100%);
}

.gradient-persian-2 {
  background: linear-gradient(45deg, #2A9D8F 0%, #2dd4bf 50%, #0f766e 100%);
}

.gradient-persian-3 {
  background: radial-gradient(circle at center, #2A9D8F 0%, #0f766e 70%);
}

.gradient-persian-4 {
  background: linear-gradient(90deg, #2A9D8F 0%, #1E5F8B 100%);
}

.gradient-persian-5 {
  background: conic-gradient(from 0deg, #2A9D8F, #2dd4bf, #0f766e, #2A9D8F);
}

.gradient-persian-6 {
  background: linear-gradient(135deg, #2A9D8F 0%, #9D7A6D 50%, #1E5F8B 100%);
}

.gradient-persian-7 {
  background: linear-gradient(180deg, #f0fdf9 0%, #2A9D8F 100%);
}

.gradient-persian-8 {
  background: linear-gradient(270deg, #2A9D8F 0%, rgba(42, 157, 143, 0.1) 100%);
}
```

### Animation & Interaction Styles
```css
/* Custom Animations */
@keyframes bead-spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.bead-loader {
  @apply w-8 h-8 rounded-full bg-craftart-500 animate-bead-spin;
  box-shadow: 
    0 0 0 4px rgba(42, 157, 143, 0.2),
    0 0 0 8px rgba(42, 157, 143, 0.1);
}

/* Scroll Effects */
.parallax-container {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.parallax-element {
  transform: translateZ(0);
  will-change: transform;
}

.scroll-snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
}

.scroll-snap-item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

### Custom Scrollbar Styles
```css
/* Light Theme Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #F8F8F5;
}

::-webkit-scrollbar-thumb {
  background: #2A9D8F;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0f766e;
}

/* Dark Theme Scrollbar */
.dark ::-webkit-scrollbar {
  width: 6px;
}

.dark ::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
  border: 1px solid #374151;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
```

---

## 🧩 Component Structure

### Navigation Component
- **File**: `src/components/Navigation.tsx`
- **Features**: Scroll-responsive design, mobile hamburger menu, app download integration
- **States**: Scroll detection, mobile menu toggle, active route highlighting

### Footer Component
- **File**: `src/components/Footer.tsx`
- **Sections**: Brand info, link columns, newsletter signup, social links, copyright
- **Layout**: Responsive grid system with 6-column layout on large screens

### UI Components
- **Location**: `src/components/ui/`
- **Base Components**: Button, Card, Input, etc. (Radix UI based)
- **Custom Styling**: Persian Green theme integration

### Specialized Components
- **ArtisanCarousel**: Interactive carousel with video backgrounds
- **PersianGreenLoader**: Custom loading animation with cultural design
- **NotificationDropdown**: Admin panel notifications

---

## 📄 Page Architecture

### Homepage (`src/app/page.tsx`)
```typescript
// Structure:
// 1. Hero Section with GSAP animations
// 2. Features Section with scroll-triggered animations
// 3. Statistics Section with counter animations
// 4. Artisan Carousel
// 5. App Download Section

// Key Features:
// - GSAP ScrollTrigger animations
// - Device detection for app downloads
// - Responsive design with mobile-first approach
```

### Category Pages
- **Categories**: `/categories` - Grid view of all craft categories
- **Crafts**: `/crafts` - Browse all crafts with filtering
- **Featured**: `/featured` - Curated collections and highlights

### Content Pages
- **Stories**: `/stories` - Craft stories and cultural articles
- **Artisans**: `/artisans` - Artisan profiles and portfolios
- **About**: `/about` - Company information and mission
- **Contact**: `/contact` - Contact form and office locations

### Utility Pages
- **Download**: `/download` - Mobile app download page
- **Legal**: `/legal/*` - Privacy policy, terms, accessibility
- **Support**: `/support/*` - Help center and customer support
- **Admin**: `/admin/*` - Administrative dashboard (protected)

---

## 🎨 Design System

### Typography Scale
```css
/* Heading Styles */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; } /* 36px */
.text-5xl { font-size: 3rem; line-height: 1; } /* 48px */
.text-6xl { font-size: 3.75rem; line-height: 1; } /* 60px */

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; } /* 16px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; } /* 20px */

/* Font Weights */
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

### Spacing System
```css
/* Padding/Margin Scale */
.p-1 { padding: 0.25rem; } /* 4px */
.p-2 { padding: 0.5rem; } /* 8px */
.p-3 { padding: 0.75rem; } /* 12px */
.p-4 { padding: 1rem; } /* 16px */
.p-6 { padding: 1.5rem; } /* 24px */
.p-8 { padding: 2rem; } /* 32px */
.p-12 { padding: 3rem; } /* 48px */
.p-16 { padding: 4rem; } /* 64px */
.p-20 { padding: 5rem; } /* 80px */
```

### Border Radius System
```css
.rounded { border-radius: 0.25rem; } /* 4px */
.rounded-md { border-radius: 0.375rem; } /* 6px */
.rounded-lg { border-radius: 0.5rem; } /* 8px */
.rounded-xl { border-radius: 0.75rem; } /* 12px */
.rounded-2xl { border-radius: 1rem; } /* 16px */
.rounded-full { border-radius: 9999px; }
```

### Shadow System
```css
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
```

---

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
/* Base styles: 0px and up (mobile) */

/* Tablet */
@media (min-width: 768px) { /* md: */ }

/* Desktop */
@media (min-width: 1024px) { /* lg: */ }

/* Large Desktop */
@media (min-width: 1280px) { /* xl: */ }

/* Extra Large */
@media (min-width: 1536px) { /* 2xl: */ }
```

### Responsive Grid Examples
```css
/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */
.grid.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3

/* Mobile: 1 column, Desktop: 6 columns with 2-column span */
.grid.grid-cols-1.lg\:grid-cols-6
.lg\:col-span-2
```

### Mobile Navigation
```css
/* Hidden on mobile, visible on desktop */
.hidden.md\:flex

/* Visible on mobile, hidden on desktop */
.md\:hidden

/* Mobile menu positioning */
.absolute.top-full.left-0.right-0
```

---

## ⚡ Performance & Optimization

### CSS Optimization
- **Tailwind CSS**: Purged unused styles in production
- **Critical CSS**: Above-the-fold styles inlined
- **CSS Layers**: Organized for optimal cascade

### Animation Performance
- **GSAP**: Hardware-accelerated animations
- **Transform Properties**: GPU-optimized transforms
- **Will-Change**: Optimized for animation properties

### Image Optimization
- **Next.js Image**: Automatic optimization and lazy loading
- **WebP Support**: Modern image formats with fallbacks
- **Responsive Images**: Multiple sizes for different viewports

### Bundle Optimization
- **Code Splitting**: Route-based and component-based splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript compression

---

## 🔧 Development Guidelines

### CSS Class Naming
- **Utility-First**: Prefer Tailwind utilities over custom CSS
- **Component Classes**: Use `@layer components` for reusable patterns
- **BEM Methodology**: For complex custom components when needed

### Responsive Design Patterns
- **Mobile-First**: Start with mobile styles, enhance for larger screens
- **Progressive Enhancement**: Ensure functionality without JavaScript
- **Touch-Friendly**: Minimum 44px touch targets

### Accessibility Standards
- **WCAG 2.1 AA**: Compliance with accessibility guidelines
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: Minimum 4.5:1 ratio for normal text

---

*This documentation provides a comprehensive overview of the Persian Green Webapp's HTML structure and CSS styling system. For implementation details, refer to the individual component files and the Tailwind configuration.*