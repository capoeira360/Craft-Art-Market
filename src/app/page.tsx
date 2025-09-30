'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Link from 'next/link'
import { ArrowRight, Download, Star, Users, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArtisanCarousel } from '@/components/ArtisanCarousel'
import { PersianGreenLoader } from '@/components/PersianGreenLoader'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const artisanRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const legalRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const smoothWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Initialize ScrollSmoother with optimized settings
      ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: "#smooth-content",
        smooth: 2, // Increased for smoother scrolling
        effects: true,
        smoothTouch: 0.3, // Improved touch responsiveness
        normalizeScroll: true, // Better cross-browser consistency
        ignoreMobileResize: true, // Prevent layout shifts on mobile
        speed: 1.2 // Slightly faster scroll speed
      })

      // Set initial state for image fragments with hardware acceleration
      gsap.set('.hero-fragment', { 
        scale: 1,
        opacity: 1,
        rotation: 0,
        x: 0,
        y: 0,
        force3D: true, // Enable hardware acceleration
        transformOrigin: "center center",
        willChange: "transform, opacity" // Optimize for animations
      })

      // Hero text animations
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )

      gsap.fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' }
      )

      gsap.fromTo('.hero-cta', 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: 'back.out(1.7)' }
      )

      // Image fragment split animation on scroll - optimized for smoothness
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2, // Increased scrub value for smoother animation
        invalidateOnRefresh: true, // Better performance on resize
        onUpdate: (self) => {
          const progress = self.progress

          // Use a single timeline for better performance
          const tl = gsap.timeline()

          // Vertical strip fragments - slide horizontally outward with rotation
          tl.to('.hero-fragment-col-1', {
            x: -300 * progress,
            y: -100 * progress,
            rotation: -15 * progress,
            opacity: 1 - progress * 0.8,
            duration: 0,
            ease: "none"
          }, 0)

          tl.to('.hero-fragment-col-2', {
            x: -150 * progress,
            y: 80 * progress,
            rotation: -8 * progress,
            opacity: 1 - progress * 0.8,
            duration: 0,
            ease: "none"
          }, 0)

          tl.to('.hero-fragment-col-3', {
            x: 150 * progress,
            y: -80 * progress,
            rotation: 8 * progress,
            opacity: 1 - progress * 0.8,
            duration: 0,
            ease: "none"
          }, 0)

          tl.to('.hero-fragment-col-4', {
            x: 300 * progress,
            y: 100 * progress,
            rotation: 15 * progress,
            opacity: 1 - progress * 0.8,
            duration: 0,
            ease: "none"
          }, 0)

          // Hero text fade out
          tl.to('.hero-title, .hero-subtitle, .hero-cta', {
            opacity: 1 - progress * 1.2,
            y: -50 * progress,
            duration: 0,
            ease: "none"
          }, 0)
        }
      })

      // Reassembly animation when scrolling back to top
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = 1 - self.progress // Reverse progress for reassembly

          // When scrolling back up, fragments return to original positions
          if (progress > 0.8) {
            gsap.to('.hero-fragment', {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            })

            gsap.to('.hero-title, .hero-subtitle, .hero-cta', {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
        }
      })

      // Features animation
      gsap.fromTo('.feature-card', 
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          }
        }
      )

      // Stats animation
      gsap.fromTo('.stat-item', 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      )

      // Advanced Artisan Section with Pinned Parallax Animation
      ScrollTrigger.create({
        trigger: artisanRef.current,
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => {
          gsap.fromTo('.artisan-title', 
            { opacity: 0, y: 50, rotationX: 45 },
            { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'power3.out' }
          )
          gsap.fromTo('.artisan-subtitle', 
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.3, ease: 'back.out(1.7)' }
          )
        },
        onLeaveBack: () => {
          gsap.to('.artisan-title', { opacity: 0, y: 50, rotationX: 45, duration: 0.8 })
          gsap.to('.artisan-subtitle', { opacity: 0, y: 30, scale: 0.9, duration: 0.6 })
        }
      })

      // Multi-layer Parallax Background Animation for Artisan Section
      ScrollTrigger.create({
        trigger: artisanRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Layer 1 - Slowest parallax (background blurred circles)
          gsap.to('.parallax-bg-layer-1', {
            y: -30 * progress,
            rotation: 5 * progress,
            duration: 0,
            ease: 'none'
          })
          
          // Layer 2 - Medium parallax (mid-ground elements)
          gsap.to('.parallax-bg-layer-2', {
            y: -60 * progress,
            rotation: -8 * progress,
            duration: 0,
            ease: 'none'
          })
          
          // Geometric elements - Fastest parallax
          gsap.to('.parallax-geometric', {
            y: -100 * progress,
            rotation: 15 * progress,
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Pinned Section Effect for Artisan Carousel
      ScrollTrigger.create({
        trigger: artisanRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Scale and fade effect during pin
          gsap.to('.artisan-carousel-container', {
            scale: 1 + (0.1 * progress),
            opacity: 1 - (0.3 * progress),
            duration: 0,
            ease: 'none'
          })
          
          // Background color transition during pin
          gsap.to(artisanRef.current, {
            backgroundColor: `rgba(${Math.round(249 - 20 * progress)}, ${Math.round(250 - 30 * progress)}, ${Math.round(251 - 40 * progress)}, 1)`,
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Artisan carousel container with additional parallax effect
      ScrollTrigger.create({
        trigger: artisanRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to('.artisan-carousel-container', {
            y: -50 * progress,
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Individual Artisan Card Parallax Effects
      ScrollTrigger.create({
        trigger: artisanRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Video background parallax (slower)
          gsap.to('.artisan-video', {
            y: -20 * progress,
            scale: 1 + (0.05 * progress),
            duration: 0,
            ease: 'none'
          })
          
          // Background image parallax (medium)
          gsap.to('.artisan-bg', {
            y: -35 * progress,
            scale: 1 + (0.08 * progress),
            duration: 0,
            ease: 'none'
          })
          
          // Overlay parallax (subtle)
          gsap.to('.artisan-overlay', {
            opacity: 0.7 + (0.3 * progress),
            duration: 0,
            ease: 'none'
          })
          
          // Content parallax (fastest)
          gsap.to('.artisan-content', {
            y: -80 * progress,
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Artisan Card Hover Effects with 3D Transforms
      document.querySelectorAll('.artisan-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card.querySelector('.artisan-avatar'), {
            scale: 1.1,
            rotationY: 10,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(card.querySelector('.artisan-overlay'), {
            opacity: 0.5,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card.querySelector('.artisan-avatar'), {
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(card.querySelector('.artisan-overlay'), {
            opacity: 0.7,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })

      // Enhanced Features Section Animations with Advanced Interactions
      // Staggered card reveals with direction-based effects
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => {
          gsap.fromTo('.features-title', 
            { opacity: 0, y: 60, rotationY: 15, scale: 0.9 },
            { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
          )
          
          gsap.fromTo('.feature-card', 
            { 
              opacity: 0, 
              y: 80, 
              rotationX: 45,
              scale: 0.8,
              transformOrigin: 'center bottom'
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1,
              stagger: {
                amount: 0.6,
                from: 'start'
              },
              ease: 'back.out(1.7)'
            }
          )
        },
        onLeaveBack: () => {
          gsap.to('.features-title', { opacity: 0, y: 60, rotationY: 15, scale: 0.9, duration: 0.8 })
          gsap.to('.feature-card', { 
            opacity: 0, 
            y: 80, 
            rotationX: 45,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.1
          })
        }
      })

      // Advanced Feature Card Hover Effects with 3D Transforms
      document.querySelectorAll('.feature-card').forEach((card, index) => {
        const icon = card.querySelector('.feature-icon')
        const content = card.querySelector('.feature-content')
        const title = card.querySelector('.feature-title')
        const description = card.querySelector('.feature-description')
        
        // Mouse enter effects
        card.addEventListener('mouseenter', (e) => {
          gsap.to(card, {
            y: -15,
            scale: 1.05,
            rotationY: 5,
            rotationX: 5,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            duration: 0.4,
            ease: 'power2.out'
          })
          
          // Icon animations
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 360,
              duration: 0.6,
              ease: 'back.out(1.7)'
            })
            
            // Icon pulse effect
            gsap.to(icon, {
              boxShadow: '0 0 20px rgba(139, 69, 19, 0.4)',
              duration: 0.3,
              ease: 'power2.out'
            })
            
            // Icon inner glow
            const iconElement = icon.querySelector('svg') || icon.querySelector('.w-8')
            if (iconElement) {
              gsap.to(iconElement, {
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
                duration: 0.3,
                ease: 'power2.out'
              })
            }
          }
          
          // Content reveal animation
          if (title) {
            gsap.to(title, {
              color: '#8B4513',
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
          
          if (description) {
            gsap.to(description, {
              y: -5,
              opacity: 1,
              duration: 0.3,
              delay: 0.1,
              ease: 'power2.out'
            })
          }
          
          // Background gradient shift
          gsap.to(card, {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
            duration: 0.4,
            ease: 'power2.out'
          })
        })
        
        // Mouse leave effects
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            duration: 0.4,
            ease: 'power2.out'
          })
          
          if (icon) {
             gsap.to(icon, {
               scale: 1,
               rotation: 0,
               boxShadow: '0 0 0px rgba(139, 69, 19, 0)',
               duration: 0.4,
               ease: 'power2.out'
             })
             
             // Reset icon inner glow
             const iconElement = icon.querySelector('svg') || icon.querySelector('.w-8')
             if (iconElement) {
               gsap.to(iconElement, {
                 filter: 'none',
                 duration: 0.3,
                 ease: 'power2.out'
               })
             }
           }
          
          if (title) {
            gsap.to(title, {
              color: '#374151',
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
          
          if (description) {
            gsap.to(description, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
          
          gsap.to(card, {
            background: '#ffffff',
            duration: 0.4,
            ease: 'power2.out'
          })
        })
        
        // Mouse move tilt effect
        card.addEventListener('mousemove', (e) => {
          const mouseEvent = e as MouseEvent
          const rect = card.getBoundingClientRect()
          const x = mouseEvent.clientX - rect.left
          const y = mouseEvent.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = (y - centerY) / 10
          const rotateY = (centerX - x) / 10
          
          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.2,
            ease: 'power2.out'
          })
        })
      })

      // Floating background elements for Features section
      gsap.to('.features-bg-element', {
        y: -20,
        rotation: 360,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 2
      })

      // Advanced Stats Section with Counter Animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => {
          // Animate stat containers
          gsap.fromTo('.stat-item', 
            { 
              opacity: 0, 
              scale: 0.5,
              rotationY: 90,
              transformOrigin: 'center center'
            },
            {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'back.out(1.7)'
            }
          )

          // Animate numbers with counting effect
          document.querySelectorAll('.stat-number').forEach((element, index) => {
            const finalValue = element.textContent
            const numericValue = parseInt(finalValue.replace(/\D/g, ''))
            const suffix = finalValue.replace(/[\d,]/g, '')
            
            gsap.fromTo(element, 
              { textContent: 0 },
              {
                textContent: numericValue,
                duration: 2,
                delay: index * 0.15 + 0.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                  const current = Math.round(this.targets()[0].textContent)
                  element.textContent = current.toLocaleString() + suffix
                }
              }
            )
          })
        },
        onLeaveBack: () => {
          gsap.to('.stat-item', { 
            opacity: 0, 
            scale: 0.5,
            rotationY: 90,
            duration: 0.8,
            stagger: 0.1
          })
        }
      })

      // Legal Section Advanced Animations
      ScrollTrigger.create({
        trigger: legalRef.current,
        start: 'top 85%',
        end: 'top 20%',
        onEnter: () => {
          gsap.fromTo('.legal-title', 
            { opacity: 0, y: 50, rotationX: 30 },
            { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'power3.out' }
          )
          gsap.fromTo('.legal-subtitle', 
            { opacity: 0, scale: 0.8, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.3, ease: 'back.out(1.7)' }
          )
          
          gsap.fromTo('.legal-card', 
            { 
              opacity: 0, 
              y: 60,
              rotationY: 45,
              scale: 0.8,
              transformOrigin: 'center center'
            },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.8,
              stagger: {
                amount: 0.8,
                grid: [2, 2],
                from: 'center'
              },
              ease: 'back.out(1.7)'
            }
          )
        },
        onLeaveBack: () => {
          gsap.to('.legal-title', { opacity: 0, y: 50, rotationX: 30, duration: 0.8 })
          gsap.to('.legal-subtitle', { opacity: 0, scale: 0.8, y: 30, duration: 0.6 })
          gsap.to('.legal-card', { 
            opacity: 0, 
            y: 60,
            rotationY: 45,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.1
          })
        }
      })

      // CTA Section Hero-Style Animation
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 85%',
        end: 'top 20%',
        onEnter: () => {
          // Background reveal effect
          gsap.fromTo('.cta-background', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
          )
          
          // Title with dramatic entrance
          gsap.fromTo('.cta-title', 
            { 
              opacity: 0, 
              y: 80, 
              rotationX: 45,
              transformOrigin: 'center bottom'
            },
            { 
              opacity: 1, 
              y: 0, 
              rotationX: 0,
              duration: 1.2, 
              delay: 0.3,
              ease: 'power3.out' 
            }
          )
          
          // Subtitle with scale effect
          gsap.fromTo('.cta-subtitle', 
            { opacity: 0, scale: 0.8, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.6, ease: 'back.out(1.7)' }
          )
          
          // Button with bounce effect
          gsap.fromTo('.cta-button', 
            { opacity: 0, scale: 0.5, rotationZ: 180 },
            { 
              opacity: 1, 
              scale: 1, 
              rotationZ: 0,
              duration: 1, 
              delay: 0.9, 
              ease: 'back.out(2)' 
            }
          )
        },
        onLeaveBack: () => {
          gsap.to('.cta-background', { scale: 0.8, opacity: 0, duration: 1 })
          gsap.to('.cta-title', { opacity: 0, y: 80, rotationX: 45, duration: 0.8 })
          gsap.to('.cta-subtitle', { opacity: 0, scale: 0.8, y: 40, duration: 0.6 })
          gsap.to('.cta-button', { opacity: 0, scale: 0.5, rotationZ: 180, duration: 0.8 })
        }
      })

      // Parallax effect for CTA section
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to('.cta-content', {
            y: -30 * progress,
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Carousel Overlay Section - Strategic Cover Animation (No Movement)
      ScrollTrigger.create({
        trigger: overlayRef.current,
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Only fade out carousel - no movement or scaling
          gsap.to(artisanRef.current, {
            opacity: 1 - progress,
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Overlay Background Parallax Effects
      ScrollTrigger.create({
        trigger: overlayRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Wood background subtle parallax
          gsap.to('.overlay-wood-bg', {
            y: -20 * progress,
            scale: 1 + (0.05 * progress),
            duration: 0,
            ease: 'none'
          })
          
          // Background layers parallax
          gsap.to('.overlay-bg-layer-1', {
            y: -40 * progress,
            rotation: 5 * progress,
            duration: 0,
            ease: 'none'
          })
          
          gsap.to('.overlay-geometric', {
            y: -60 * progress,
            rotation: -10 * progress,
            opacity: 0.2 + (0.3 * progress),
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Overlay Content Reveal Animation - Always Visible When Covering Carousel
      ScrollTrigger.create({
        trigger: overlayRef.current,
        start: 'top 80%',
        end: 'center center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Title reveal - starts early and stays visible
          gsap.to('.overlay-title', {
            opacity: Math.min(1, progress * 1.5),
            y: -30 * (1 - Math.min(1, progress * 1.5)),
            scale: 0.9 + (0.1 * Math.min(1, progress * 1.5)),
            duration: 0,
            ease: 'none'
          })
          
          // Subtitle reveal - starts after title
          gsap.to('.overlay-subtitle', {
            opacity: Math.min(1, Math.max(0, (progress - 0.2) * 1.5)),
            y: -20 * (1 - Math.min(1, Math.max(0, (progress - 0.2) * 1.5))),
            duration: 0,
            ease: 'none'
          })
          
          // CTA reveal - starts after subtitle
          gsap.to('.overlay-cta', {
            opacity: Math.min(1, Math.max(0, (progress - 0.4) * 1.5)),
            y: -10 * (1 - Math.min(1, Math.max(0, (progress - 0.4) * 1.5))),
            scale: 0.95 + (0.05 * Math.min(1, Math.max(0, (progress - 0.4) * 1.5))),
            duration: 0,
            ease: 'none'
          })
        }
      })

      // Ensure Overlay Content Stays Visible When Carousel is Fully Covered
      ScrollTrigger.create({
        trigger: overlayRef.current,
        start: 'center center',
        end: 'bottom center',
        scrub: false,
        onEnter: () => {
          // Ensure all overlay content is fully visible
          gsap.set('.overlay-title, .overlay-subtitle, .overlay-cta', {
            opacity: 1,
            y: 0,
            scale: 1
          })
        }
      })

      // Overlay Border Elements Animation
       ScrollTrigger.create({
         trigger: overlayRef.current,
         start: 'top bottom',
         end: 'bottom top',
         scrub: 1,
         onUpdate: (self) => {
           const progress = self.progress
           
           gsap.to('.overlay-border-elements', {
             opacity: 0.6 * progress,
             duration: 0,
             ease: 'none'
           })
         }
       })

       // Smooth Transition to Features Section
       ScrollTrigger.create({
         trigger: overlayRef.current,
         start: 'bottom 80%',
         end: 'bottom 20%',
         scrub: 1,
         onUpdate: (self) => {
           const progress = self.progress
           
           // Prepare features section entrance
           gsap.to(featuresRef.current, {
             y: -20 * progress,
             opacity: 0.8 + (0.2 * progress),
             duration: 0,
             ease: 'none'
           })
           
           // Overlay exit animation
           gsap.to('.overlay-content', {
             scale: 1 - (0.05 * progress),
             opacity: 1 - (0.3 * progress),
             duration: 0,
             ease: 'none'
           })
         }
       })
     })

    return () => ctx.revert()
  }, [])

  const handleAppDownload = () => {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Try deep link first
      window.location.href = 'persiangreen://open'
      
      // Fallback to app store after 2 seconds
      setTimeout(() => {
        if (/Android/i.test(navigator.userAgent)) {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.craftandartmarketplace.app'
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = 'https://apps.apple.com/app/craftandartmarketplace/id123456789'
        }
      }, 2000)
    } else {
      // Desktop - redirect to download page
      window.location.href = '/download'
    }
  }

  return (
    <div id="smooth-wrapper" ref={smoothWrapperRef} className="overflow-hidden">
      <div id="smooth-content">
        <Navigation />
        
        {/* Hero Section with Split Image Animation */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-persian-green-600 via-persian-green-700 to-persian-green-800">
          {/* Persian Green Background Layer - Now as section background */}
          
          {/* Hero Image Fragments - Vertical Strip Layout */}
          <div className="absolute inset-0 z-10">
            {/* Vertical Image Strip - Four columns */}
            <div 
              className="hero-fragment hero-fragment-col-1 absolute w-1/4 h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(/imagy_images_vertical_2025-09-29/hero-animate_r1_c1_processed_by_imagy.jpg)',
                top: '0%',
                left: '0%'
              }}
            />
            <div 
              className="hero-fragment hero-fragment-col-2 absolute w-1/4 h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(/imagy_images_vertical_2025-09-29/hero-animate_r1_c2_processed_by_imagy.jpg)',
                top: '0%',
                left: '25%'
              }}
            />
            <div 
              className="hero-fragment hero-fragment-col-3 absolute w-1/4 h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(/imagy_images_vertical_2025-09-29/hero-animate_r1_c3_processed_by_imagy.jpg)',
                top: '0%',
                left: '50%'
              }}
            />
            <div 
              className="hero-fragment hero-fragment-col-4 absolute w-1/4 h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(/imagy_images_vertical_2025-09-29/hero-animate_r1_c4_processed_by_imagy.jpg)',
                top: '0%',
                left: '75%'
              }}
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-persian-green-900/60 via-persian-green-800/40 to-persian-green-700/20 z-20" />
          
          {/* Hero Content */}
          <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Authentic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                African Crafts
              </span>
            </h1>
            
            <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect directly with skilled artisans and bring home pieces of African heritage, 
              crafted with passion and tradition.
            </p>
            
            <button 
              onClick={handleAppDownload}
              className="hero-cta bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Download App
            </button>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-amber-400/20 rounded-full animate-pulse z-25" />
          <div className="absolute top-40 right-20 w-12 h-12 bg-orange-500/30 rounded-full animate-bounce z-25" />
          <div className="absolute bottom-32 left-20 w-20 h-20 bg-red-400/25 rounded-full animate-ping z-25" />
          <div className="absolute bottom-20 right-10 w-14 h-14 bg-persian-green-400/30 rounded-full animate-pulse z-25" />
        </section>

      {/* Artisan Spotlight Carousel */}
      <section ref={artisanRef} className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Parallax Background Layers */}
        <div className="parallax-bg-layer-1 absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-craftart-200 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-copper-patina/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-zanzibar-twilight/15 rounded-full blur-3xl"></div>
        </div>
        
        <div className="parallax-bg-layer-2 absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-20 h-20 bg-craftart-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-copper-patina/25 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-10 w-36 h-36 bg-zanzibar-twilight/20 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Geometric Elements */}
        <div className="parallax-geometric absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-4 h-4 bg-craftart-400 rotate-45 opacity-40"></div>
          <div className="absolute top-32 right-1/3 w-3 h-3 bg-copper-patina rounded-full opacity-50"></div>
          <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-zanzibar-twilight rotate-12 opacity-30"></div>
          <div className="absolute bottom-16 right-1/4 w-2 h-2 bg-craftart-500 rounded-full opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="artisan-title text-4xl md:text-5xl text-extra-thin text-graphite mb-4">
              Meet Our <span className="text-craftart-500">Artisans</span>
            </h2>
            <p className="artisan-subtitle text-xl text-light text-gray-600 max-w-2xl mx-auto">
              Discover the stories behind the crafts and the talented hands that create them.
            </p>
          </div>
          <div className="artisan-carousel-container">
            <ArtisanCarousel />
          </div>
        </div>
      </section>

      {/* Carousel Overlay Section - Strategic Cover */}
      <section ref={overlayRef} className="carousel-overlay-section relative min-h-screen">
        {/* Hero Background Image - Primary Layer */}
        <div 
          className="overlay-hero-bg absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/hero-animate.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 1,
            filter: 'brightness(0.7) contrast(1.1) saturate(1.2)'
          }}
        ></div>

        {/* Subtle Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30 z-10"></div>

        {/* Content Container */}
        <div className="overlay-content relative z-50 flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="overlay-title text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                Crafting <span className="text-craftart-300">Tomorrow's</span> Heritage
              </h2>
              <p className="overlay-subtitle text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg">
                Where traditional artistry meets modern innovation, creating timeless pieces that bridge cultures and generations.
              </p>
              <div className="overlay-cta flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-craftart-600 hover:bg-craftart-700 text-white text-lg px-12 py-4 rounded-lg font-semibold shadow-2xl border-2 border-white/20">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="text-lg px-12 py-4 border-2 border-white text-white hover:bg-white hover:text-craftart-600 rounded-lg font-semibold shadow-2xl backdrop-blur-sm">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50 paper-grain">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="features-title text-4xl md:text-5xl text-extra-thin text-graphite mb-4">
              Why Choose <span className="text-craftart-500">Craft&Art Marketplace</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Floating background elements */}
            <div className="features-bg-element absolute top-10 left-10 w-20 h-20 bg-craftart-200/20 rounded-full blur-xl"></div>
            <div className="features-bg-element absolute top-32 right-20 w-16 h-16 bg-copper-patina/15 rounded-full blur-lg"></div>
            <div className="features-bg-element absolute bottom-20 left-1/4 w-24 h-24 bg-zanzibar-twilight/10 rounded-full blur-2xl"></div>
            
            <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-shadow paper-grain relative overflow-hidden">
              <CardContent className="feature-content p-8 text-center relative z-10">
                <div className="feature-icon w-16 h-16 bg-craftart-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="feature-title text-2xl text-light text-graphite mb-4 transition-all duration-300">Authentic Artisans</h3>
                <p className="feature-description text-light text-gray-600 leading-relaxed font-small-text transition-all duration-300">
                  Connect directly with verified Tanzanian artisans who preserve traditional crafting techniques passed down through generations.
                </p>
              </CardContent>
              {/* Card background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-craftart-50/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </Card>

            <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-shadow paper-grain relative overflow-hidden">
              <CardContent className="feature-content p-8 text-center relative z-10">
                <div className="feature-icon w-16 h-16 bg-copper-patina rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="feature-title text-2xl text-light text-graphite mb-4 transition-all duration-300">Quality Guaranteed</h3>
                <p className="feature-description text-light text-gray-600 leading-relaxed font-small-text transition-all duration-300">
                  Every piece is carefully curated and authenticated to ensure you receive genuine, high-quality Tanzanian crafts.
                </p>
              </CardContent>
              {/* Card background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-copper-patina/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </Card>

            <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-shadow paper-grain relative overflow-hidden">
              <CardContent className="feature-content p-8 text-center relative z-10">
                <div className="feature-icon w-16 h-16 bg-zanzibar-twilight rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="feature-title text-2xl text-light text-graphite mb-4 transition-all duration-300">Global Impact</h3>
                <p className="feature-description text-light text-gray-600 leading-relaxed font-small-text transition-all duration-300">
                  Support local communities and preserve cultural heritage while bringing beautiful, meaningful art to your home.
                </p>
              </CardContent>
              {/* Card background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-zanzibar-twilight/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 gradient-persian-1 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <div className="stat-number text-4xl md:text-5xl text-extra-thin mb-2">500+</div>
              <div className="text-lg font-small-text opacity-90">Verified Artisans</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-4xl md:text-5xl text-extra-thin mb-2">10K+</div>
              <div className="text-lg font-small-text opacity-90">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-4xl md:text-5xl text-extra-thin mb-2">25+</div>
              <div className="text-lg font-small-text opacity-90">Craft Categories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-4xl md:text-5xl text-extra-thin mb-2">98%</div>
              <div className="text-lg font-small-text opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Trust Section */}
      <section ref={legalRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="legal-title text-3xl md:text-4xl text-extra-thin text-graphite mb-4">
              Trust & <span className="text-craftart-500">Transparency</span>
            </h2>
            <p className="legal-subtitle text-lg text-light text-gray-600 max-w-2xl mx-auto">
              Learn about our policies, protections, and commitment to creating a safe, fair marketplace for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/legal/terms-of-service" className="group">
              <Card className="legal-card border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-light text-graphite mb-2">Terms of Service</h3>
                  <p className="text-sm font-small-text text-gray-600">Platform rules and user responsibilities</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/legal/privacy-policy" className="group">
              <Card className="legal-card border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-light text-graphite mb-2">Privacy Policy</h3>
                  <p className="text-sm font-small-text text-gray-600">How we protect your personal data</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/legal/buyer-protection" className="group">
              <Card className="legal-card border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-craftart-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-light text-graphite mb-2">Buyer Protection</h3>
                  <p className="text-sm font-small-text text-gray-600">Your rights and purchase guarantees</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/legal/community-guidelines" className="group">
              <Card className="legal-card border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-light text-graphite mb-2">Community Guidelines</h3>
                  <p className="text-sm font-small-text text-gray-600">Standards for respectful interaction</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/legal">
              <Button variant="outline" className="border-craftart-200 text-graphite hover:border-craftart-500 hover:text-craftart-600">
                View All Legal Documents
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-br from-craftart-500 via-craftart-600 to-craftart-700 text-white relative overflow-hidden">
        <div className="cta-background absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="cta-content text-center max-w-4xl mx-auto">
            <h2 className="cta-title text-4xl md:text-5xl lg:text-6xl text-extra-thin mb-6">
              Ready to <span className="text-yellow-300">Discover</span> Authentic Crafts?
            </h2>
            <p className="cta-subtitle text-xl md:text-2xl text-light mb-8 opacity-90">
              Join thousands of craft enthusiasts and support artisans worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleAppDownload}
                size="lg" 
                className="cta-button bg-white text-craftart-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Download CraftArt App
                <Download className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/artisans">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-craftart-600 text-lg px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Explore Artisans
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-yellow-300/30 rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-300/50 rounded-full"></div>
      </section>

      <Footer />
      </div>
    </div>
  )
}