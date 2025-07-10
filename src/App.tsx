import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { FadeInWhenVisible } from './FadeInWhenVisible';

const heroImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=80';
// Removed unused heroVideo variable - now using multiple sources in video element
const agentHeadshot = 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?auto=format&fit=crop&w=400&q=80';
const testimonialPhotos = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/46.jpg',
];
const listingImages = [
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
];

const testimonials = [
  {
    quote: "The most seamless, private, and profitable sale we've ever experienced. True luxury expertise.",
    name: 'Alexandra P.',
    title: 'Seller, Paradise Valley',
    photo: testimonialPhotos[0],
  },
  {
    quote: "Unmatched market knowledge and white-glove service. We felt like VIPs every step of the way.",
    name: 'Michael R.',
    title: 'Buyer, Scottsdale',
    photo: testimonialPhotos[1],
  },
  {
    quote: "Discretion, results, and a network that opened doors we didn't know existed.",
    name: 'Samantha L.',
    title: 'Seller, Silverleaf',
    photo: testimonialPhotos[2],
  },
];

const listings = [
  {
    price: '$7,200,000',
    location: 'Silverleaf, Scottsdale',
    image: listingImages[0],
    caption: 'Sold in 12 Days',
  },
  {
    price: '$4,950,000',
    location: 'Paradise Valley',
    image: listingImages[1],
    caption: 'Record Price',
  },
  {
    price: '$2,800,000',
    location: 'DC Ranch, Scottsdale',
    image: listingImages[2],
    caption: 'Off-Market Sale',
  },
  {
    price: '$1,650,000',
    location: 'Gainey Ranch, Scottsdale',
    image: listingImages[3],
    caption: 'Multiple Offers',
  },
];

// Add featured properties data
const featuredProperties = [
  {
    price: '$12,500,000',
    location: 'Silverleaf, Scottsdale',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    beds: '6',
    baths: '8',
    sqft: '12,500',
    status: 'Active',
    description: 'Ultra-luxury estate with panoramic mountain views, private golf course access, and world-class amenities.',
  },
  {
    price: '$8,900,000',
    location: 'Paradise Valley',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    beds: '5',
    baths: '6',
    sqft: '9,200',
    status: 'Coming Soon',
    description: 'Architectural masterpiece with resort-style pool, gourmet kitchen, and private guest house.',
  },
  {
    price: '$6,750,000',
    location: 'DC Ranch, Scottsdale',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    beds: '4',
    baths: '5',
    sqft: '7,800',
    status: 'Active',
    description: 'Contemporary luxury with smart home technology, wine cellar, and outdoor entertainment pavilion.',
  },
];

// Add market insights data
const marketInsights = [
  {
    title: 'Luxury Market Trends',
    stat: '+18%',
    description: 'Year-over-year price appreciation in Scottsdale luxury segment',
    graphic: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark rounded-full flex items-center justify-center relative">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-end justify-between px-1">
            <div className="w-1 h-2 md:w-1.5 md:h-3 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1 h-3 md:w-1.5 md:h-4 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1 h-1.5 md:w-1.5 md:h-2 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1 h-4 md:w-1.5 md:h-5 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1 h-2.5 md:w-1.5 md:h-3.5 bg-luxury-black rounded-t-sm"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Days on Market',
    stat: '23',
    description: 'Average days on market for luxury properties in Paradise Valley',
    graphic: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark rounded-full flex items-center justify-center relative">
          <div className="w-8 h-8 md:w-10 md:h-10 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 border-2 border-luxury-black rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 border-2 border-luxury-black rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 border-2 border-luxury-black rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 md:w-2 md:h-2 bg-luxury-black rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 md:w-1 md:h-4 bg-luxury-black rounded-full origin-bottom"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 md:w-4 md:h-1 bg-luxury-black rounded-full origin-center"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Inventory Levels',
    stat: '2.1',
    description: 'Months of inventory - indicating a strong seller\'s market',
    graphic: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark rounded-full flex items-center justify-center relative">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-end justify-between px-1">
            <div className="w-1.5 h-3 md:w-2 md:h-4 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1.5 h-2.5 md:w-2 md:h-3.5 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1.5 h-4 md:w-2 md:h-5 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2.5 bg-luxury-black rounded-t-sm"></div>
            <div className="w-1.5 h-3.5 md:w-2 md:h-4.5 bg-luxury-black rounded-t-sm"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Premium Sales',
    stat: '94%',
    description: 'Properties selling above asking price in luxury segment',
    graphic: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark rounded-full flex items-center justify-center relative">
          <div className="w-8 h-8 md:w-10 md:h-10 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 bg-luxury-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-luxury-gold rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-luxury-black rounded-full flex items-center justify-center">
              <div className="w-1 h-1 md:w-2 md:h-2 bg-luxury-gold rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 md:w-2 md:h-2 bg-luxury-black rounded-full flex items-center justify-center">
              <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-luxury-gold rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
];

function App() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // All hooks must be called before any conditional returns
  const { scrollY } = useViewportScroll();
  const yHero = useTransform(scrollY, [0, 400], [0, 100]);

  useEffect(() => {
    // Simulate loading time for luxury experience
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Luxury loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-luxury flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-gold rounded-3xl flex items-center justify-center shadow-gold-glow animate-pulse">
            <svg className="w-12 h-12 text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl text-luxury-black font-bold mb-4 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">Juliet Kasaya Estates</h1>
          <p className="text-luxury-slate font-body">Loading your luxury experience...</p>
        </div>
      </div>
    );
  }

  const testimonial = testimonials[testimonialIdx];

  // NAVBAR
  const nav = (
    <nav className="fixed top-0 left-0 w-full z-50 bg-luxury-black/60 backdrop-blur-md flex items-center justify-between px-4 md:px-10 py-3 md:py-5 shadow-lg border-b border-luxury-gold/30">
      <div className="flex items-center gap-2 md:gap-3">
        <span className="font-display text-xl md:text-3xl font-bold tracking-tight text-luxury-gold drop-shadow-lg animate-shimmer bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark bg-[length:200%_auto] bg-clip-text text-transparent">Juliet Kasaya Estates</span>
      </div>
      <a href="#consultation" className="px-4 md:px-7 py-2 md:py-3 rounded-3xl bg-gradient-gold text-luxury-black font-semibold text-sm md:text-lg shadow-gold-glow hover:scale-105 hover:shadow-gold-glow-lg transition-all duration-200 border-2 border-luxury-gold active:scale-95">Request Consultation</a>
    </nav>
  );

  // HERO
  const hero = (
    <section className="relative min-h-screen bg-luxury-black overflow-hidden" style={{ marginTop: '0', paddingTop: '0' }}>
      {/* Video background with fallback */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        autoPlay
        loop
        muted
        playsInline
        poster={heroImage}
        style={{ objectFit: 'cover' }}
        onError={(e) => {
          console.log('Video failed to load, using image fallback');
          const target = e.target as HTMLVideoElement;
          target.style.display = 'none';
        }}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
      >
        <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        <source src="https://cdn.pixabay.com/vimeo/328714/luxury-23825.mp4?width=1280" type="video/mp4" />
        <source src="https://static.videezy.com/system/resources/previews/000/000/168/original/Record.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <motion.img
        src={heroImage}
        alt="Luxury Home"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ y: yHero }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-hero z-10"
        style={{ y: yHero }}
      />
      {/* Floating gold particles overlay */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark opacity-60 animate-float`}
            style={{
              width: `${16 + Math.random() * 24}px`,
              height: `${16 + Math.random() * 24}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              filter: 'blur(1.5px)',
            }}
          />
        ))}
      </div>
      <div className="relative z-30 flex flex-col items-center text-center px-4 animate-fade-in-up" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <h1 className="font-display text-hero-mobile md:text-hero font-bold text-luxury-gold drop-shadow-lg mb-4 md:mb-6 max-w-4xl mx-auto leading-tight animate-fade-in-up relative overflow-hidden">
          <span className="block bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">Luxury Real Estate in Scottsdale — <span className="text-luxury-gold-light">Zero Stress</span>, <span className="text-luxury-gold">Maximum Profit</span>.</span>
        </h1>
        <p className="mt-2 text-lg md:text-xl lg:text-2xl font-body text-luxury-champagne max-w-2xl mx-auto animate-fade-in-up delay-200">Boutique service, world-class marketing, unmatched expertise.</p>
        <a href="#consultation" className="mt-6 md:mt-10 px-6 md:px-10 py-3 md:py-4 rounded-3xl bg-gradient-gold text-luxury-black font-semibold text-base md:text-xl shadow-gold-glow hover:scale-105 hover:shadow-gold-glow-lg transition-all duration-200 border-2 border-luxury-gold active:scale-95">
          Request Your Private Consultation
        </a>
      </div>
    </section>
  );

  // TRUST STRIP
  const trustStrip = (
    <FadeInWhenVisible direction="up" delay={0.2}>
      <section className="bg-luxury-black py-6 md:py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-16 text-luxury-champagne font-body text-sm md:text-lg">
          <div className="flex items-center gap-1 md:gap-2 animate-shimmer bg-gradient-to-r from-luxury-champagne via-luxury-gold to-luxury-champagne bg-[length:200%_auto] bg-clip-text text-transparent">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Top 1% Nationwide</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 animate-shimmer bg-gradient-to-r from-luxury-champagne via-luxury-gold to-luxury-champagne bg-[length:200%_auto] bg-clip-text text-transparent">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span>15+ Years Experience</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 animate-shimmer bg-gradient-to-r from-luxury-champagne via-luxury-gold to-luxury-champagne bg-[length:200%_auto] bg-clip-text text-transparent">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>$250M+ Sales Volume</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 animate-shimmer bg-gradient-to-r from-luxury-champagne via-luxury-gold to-luxury-champagne bg-[length:200%_auto] bg-clip-text text-transparent">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span>100% Confidential</span>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // PROBLEM/SOLUTION
  const problemSolution = (
    <FadeInWhenVisible direction="right" delay={0.1}>
      <section className="flex justify-center items-center py-16 md:py-24 bg-gradient-luxury">
        <div className="bg-luxury-white/80 backdrop-blur-xl rounded-3xl shadow-luxury-xl px-6 md:px-12 py-10 md:py-16 max-w-3xl mx-auto text-center border border-luxury-gold/30">
          <h2 className="text-display-mobile md:text-display font-display font-bold text-luxury-black mb-4 md:mb-6 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">Tired of Realtors Who Don't Understand High-Stakes Luxury Deals?</h2>
          <p className="text-body-lg-mobile md:text-body-lg font-body text-luxury-slate leading-relaxed">You deserve a partner who understands the nuances, privacy, and negotiation power required for multimillion dollar homes. My approach is tailored, discreet, and relentlessly focused on your goals.</p>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // USPs
  const uspsData = [
    {
      title: 'Luxury Market Mastery',
      description: 'Unparalleled expertise in high-stakes transactions with proven results across Scottsdale and Paradise Valley.',
      graphic: (
        <div className="relative w-full h-full">
          {/* Diamond pattern representing luxury and precision */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark rounded-full opacity-30"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-luxury-black to-luxury-gold-dark rounded-full flex items-center justify-center">
            <div className="relative w-12 h-12 transform rotate-45">
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold to-luxury-gold-light rounded-sm"></div>
              <div className="absolute inset-1 bg-luxury-black rounded-sm"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light rounded-sm"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Concierge Excellence',
      description: 'White-glove service with dedicated attention to every detail of your luxury real estate journey.',
      graphic: (
        <div className="relative w-full h-full">
          {/* Crown pattern representing premium service */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark rounded-full opacity-30"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-luxury-black to-luxury-gold-dark rounded-full flex items-center justify-center">
            <div className="relative w-12 h-8">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-luxury-gold rounded-full"></div>
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-luxury-gold rounded-full"></div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-luxury-gold rounded-full"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-luxury-gold rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-12 h-3 bg-gradient-to-r from-luxury-gold to-luxury-gold-light rounded-t-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Exclusive Network',
      description: 'Access to private listings and a global network of luxury real estate professionals.',
      graphic: (
        <div className="relative w-full h-full">
          {/* Interconnected nodes representing network */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold via-luxury-gold-light to-luxury-gold-dark rounded-full opacity-30"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-luxury-black to-luxury-gold-dark rounded-full flex items-center justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-luxury-gold rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-luxury-gold rounded-full"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-luxury-gold rounded-full"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-luxury-gold rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-luxury-gold rounded-full"></div>
              <div className="absolute top-0 left-0 w-1 h-1 bg-luxury-gold rounded-full"></div>
              <div className="absolute top-0 right-0 w-1 h-1 bg-luxury-gold rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-luxury-gold rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-luxury-gold rounded-full"></div>
            </div>
          </div>
        </div>
      )
    },
  ];
  const usps = (
    <FadeInWhenVisible direction="up" delay={0.3}>
      <section className="bg-luxury-white py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-luxury-black font-bold mb-4 md:mb-6 lg:mb-8 text-center animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent py-4 md:py-8 lg:py-12">Why Choose Juliet Kasaya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {uspsData.map((usp, i) => (
              <div key={usp.title} className="bg-gradient-luxury rounded-3xl shadow-luxury-xl p-6 md:p-10 text-center border border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg group min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 bg-gradient-gold rounded-3xl flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-all duration-300 p-2">
                  {usp.graphic}
                </div>
                <h3 className="font-display text-xl md:text-2xl text-luxury-black font-bold mb-3 md:mb-4 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">{usp.title}</h3>
                <p className="font-body text-luxury-slate leading-relaxed text-base md:text-lg">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // TESTIMONIALS
  const testimonialsCarousel = (
    <FadeInWhenVisible direction="left" delay={0.3}>
      <section className="bg-luxury-champagne py-16 md:py-20 px-4 flex justify-center items-center">
        <div className="max-w-2xl w-full mx-auto bg-luxury-white/95 backdrop-blur-xl rounded-3xl shadow-luxury-xl p-6 md:p-12 text-center border border-luxury-gold/20 relative">
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-luxury-gold mb-3 md:mb-4 shadow-gold-glow animate-float">
              <img src={testimonial.photo} alt={testimonial.name} className="object-cover w-full h-full" />
            </div>
            <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-luxury-black mb-3 md:mb-4 italic animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">"{testimonial.quote}"</blockquote>
            <div className="text-luxury-slate font-body text-base md:text-lg font-medium">{testimonial.name}</div>
            <div className="text-luxury-slate font-body text-sm">{testimonial.title}</div>
          </div>
          <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button key={i} className={`w-3 h-3 rounded-full ${i === testimonialIdx ? 'bg-luxury-gold shadow-gold-glow' : 'bg-luxury-champagne border border-luxury-gold'} transition-all duration-200 hover:scale-125`} onClick={() => setTestimonialIdx(i)} aria-label={`Show testimonial ${i+1}`}></button>
            ))}
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // FEATURED PROPERTIES
  const featuredPropertiesSection = (
    <FadeInWhenVisible direction="up" delay={0.4}>
      <section className="bg-luxury-white py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-luxury-black font-bold mb-4 md:mb-6 lg:mb-8 text-center animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent py-4 md:py-8 lg:py-12">Featured Properties</h2>
          <p className="text-luxury-slate font-body text-base md:text-lg text-center mb-10 md:mb-16">Exclusive access to the most prestigious homes in Scottsdale & Paradise Valley</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property, index) => (
              <div key={property.price + property.location} className="bg-gradient-luxury rounded-3xl shadow-luxury-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg border border-luxury-gold/20 hover:border-luxury-gold/40">
                <div className="h-64 md:h-80 w-full bg-luxury-champagne overflow-hidden relative">
                  <img src={property.image} alt={property.location} className="object-cover w-full h-full group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent"></div>
                  <span className={`absolute top-3 md:top-4 right-3 md:right-4 text-xs font-bold px-3 md:px-4 py-1 md:py-2 rounded-2xl shadow-gold-glow uppercase tracking-widest ${
                    property.status === 'Active' ? 'bg-luxury-gold text-luxury-black' : 'bg-luxury-champagne text-luxury-black'
                  }`}>
                    {property.status}
                  </span>
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-luxury-white">
                    <div className="font-display text-xl md:text-2xl font-bold mb-1">{property.price}</div>
                    <div className="font-body text-xs md:text-sm opacity-90">{property.location}</div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-center mb-3 md:mb-4">
                    <div className="flex gap-3 md:gap-4 text-luxury-slate font-body text-xs md:text-sm">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  <p className="font-body text-luxury-slate leading-relaxed mb-3 md:mb-4 text-sm md:text-base">{property.description}</p>
                  <button className="w-full px-4 md:px-6 py-2 md:py-3 rounded-2xl bg-gradient-gold text-luxury-black font-semibold text-sm md:text-base shadow-gold-glow hover:scale-105 hover:shadow-gold-glow-lg transition-all duration-200 border border-luxury-gold active:scale-95">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // MARKET INSIGHTS
  const marketInsightsSection = (
    <FadeInWhenVisible direction="left" delay={0.5}>
      <section className="bg-luxury-black py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-luxury-gold font-bold mb-4 md:mb-6 lg:mb-8 text-center animate-shimmer bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold bg-[length:200%_auto] bg-clip-text text-transparent py-4 md:py-8 lg:py-12">Market Insights</h2>
          <p className="text-luxury-champagne font-body text-base md:text-lg text-center mb-10 md:mb-16">Stay informed with the latest luxury real estate trends and data</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {marketInsights.map((insight, index) => (
              <div key={insight.title} className="bg-gradient-luxury rounded-3xl shadow-luxury-xl p-6 md:p-8 text-center border border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg group">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {insight.graphic}
                </div>
                <h3 className="font-display text-lg md:text-xl text-luxury-black font-bold mb-2 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">{insight.title}</h3>
                <div className="font-display text-2xl md:text-3xl text-luxury-gold font-bold mb-2">{insight.stat}</div>
                <p className="font-body text-luxury-slate text-xs md:text-sm leading-relaxed">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // LISTINGS
  const listingsGallery = (
    <FadeInWhenVisible direction="right" delay={0.6}>
      <section className="bg-luxury-champagne py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-luxury-black font-bold mb-3 md:mb-4 text-center animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">Recent Sales</h2>
          <p className="text-luxury-slate font-body text-base md:text-lg text-center mb-8 md:mb-12">Proven results and exceptional outcomes for our clients</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {listings.map(listing => (
              <div key={listing.price + listing.location} className="bg-gradient-gold rounded-3xl shadow-luxury-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg border-2 border-luxury-gold/40 hover:border-luxury-gold">
                <div className="h-48 md:h-60 w-full bg-luxury-champagne overflow-hidden relative">
                  <img src={listing.image} alt={listing.location} className="object-cover w-full h-full group-hover:scale-110 transition duration-500" />
                  <span className="absolute top-3 md:top-4 right-3 md:right-4 bg-luxury-gold text-luxury-black text-xs font-bold px-3 md:px-4 py-1 rounded-2xl shadow-gold-glow uppercase tracking-widest animate-fade-in-down">{listing.caption}</span>
                </div>
                <div className="p-4 md:p-6 flex flex-col gap-2">
                  <div className="font-display text-xl md:text-2xl text-luxury-black font-bold animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold-dark to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">{listing.price}</div>
                  <div className="font-body text-luxury-slate text-xs md:text-sm">{listing.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // CONSULTATION FORM
  const consultationForm = (
    <FadeInWhenVisible direction="left" delay={0.5}>
      <section id="consultation" className="bg-gradient-luxury py-16 md:py-24 px-4 flex justify-center items-center">
        <div className="bg-luxury-white/95 backdrop-blur-xl rounded-3xl shadow-luxury-xl p-6 md:p-12 max-w-xl w-full mx-auto border border-luxury-gold/20">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-luxury-black font-bold mb-2 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent text-center">Let's Elevate Your Real Estate Experience.</h2>
          <p className="text-luxury-slate font-body mb-6 md:mb-8 text-center">Schedule your confidential consultation today.</p>
          <form className="flex flex-col gap-4 md:gap-5">
            <input type="text" placeholder="Name" className="rounded-2xl border border-luxury-gold/30 px-4 md:px-5 py-3 md:py-4 font-body text-base md:text-lg focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-champagne/40 transition-all duration-200" />
            <input type="email" placeholder="Email" className="rounded-2xl border border-luxury-gold/30 px-4 md:px-5 py-3 md:py-4 font-body text-base md:text-lg focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-champagne/40 transition-all duration-200" />
            <input type="tel" placeholder="Phone" className="rounded-2xl border border-luxury-gold/30 px-4 md:px-5 py-3 md:py-4 font-body text-base md:text-lg focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-champagne/40 transition-all duration-200" />
            <select className="rounded-2xl border border-luxury-gold/30 px-4 md:px-5 py-3 md:py-4 font-body text-base md:text-lg focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-champagne/40 transition-all duration-200">
              <option>Selling</option>
              <option>Buying</option>
              <option>Both</option>
            </select>
            <input type="text" placeholder="Price Range" className="rounded-2xl border border-luxury-gold/30 px-4 md:px-5 py-3 md:py-4 font-body text-base md:text-lg focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-champagne/40 transition-all duration-200" />
            <button type="submit" className="mt-3 md:mt-4 px-6 md:px-10 py-3 md:py-4 rounded-3xl bg-gradient-gold text-luxury-black font-semibold text-base md:text-lg shadow-gold-glow hover:scale-105 hover:shadow-gold-glow-lg transition-all duration-200 border-2 border-luxury-gold active:scale-95">Request Consultation</button>
          </form>
          <div className="text-xs text-luxury-slate mt-3 md:mt-4">100% Confidential. Your info is never shared.</div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // LEAD MAGNET
  const leadMagnet = (
    <FadeInWhenVisible direction="up" delay={0.6}>
      <section className="bg-luxury-black py-16 md:py-20 px-4 flex justify-center items-center">
        <div className="bg-gradient-gold rounded-3xl shadow-luxury-xl p-6 md:p-12 max-w-2xl w-full mx-auto text-center border border-luxury-gold/30">
          <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-luxury-black font-bold mb-2 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold-dark to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">Get the Scottsdale & Paradise Valley Luxury Market Report</h2>
          <p className="text-luxury-slate font-body mb-4 md:mb-6 text-sm md:text-base">Insider insights on pricing trends, off-market listings, and what's driving the luxury market in 2024.</p>
                     <button className="px-6 md:px-10 py-3 md:py-4 rounded-3xl bg-luxury-black text-luxury-gold font-semibold text-base md:text-lg shadow-gold-glow hover:scale-105 hover:shadow-gold-glow-lg transition-all duration-200 border-2 border-luxury-gold active:scale-95">Download Report</button>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // ABOUT AGENT
  const aboutAgent = (
    <FadeInWhenVisible direction="right" delay={0.7}>
      <section className="bg-gradient-luxury py-16 md:py-24 px-4 flex justify-center items-center">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 max-w-4xl w-full mx-auto bg-luxury-white/95 backdrop-blur-xl rounded-3xl shadow-luxury-xl p-6 md:p-12 border border-luxury-gold/20">
          <div className="flex-shrink-0">
            <img src={agentHeadshot} alt="Agent Headshot" className="w-28 h-28 md:w-36 md:h-36 rounded-3xl object-cover border-4 border-luxury-gold shadow-gold-glow animate-float" />
          </div>
          <div>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-luxury-black font-bold mb-2 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">Juliet Kasaya</h2>
            <div className="text-luxury-slate font-body mb-2 text-sm md:text-base">$250M+ Sales Volume • 15 Years Experience</div>
            <div className="text-luxury-slate font-body mb-3 md:mb-4 text-sm md:text-base">Certified Luxury Home Marketing Specialist, Top 1% Nationwide</div>
            <p className="text-body-lg-mobile md:text-body-lg font-body text-luxury-black mb-3 md:mb-4">Known for absolute discretion, market mastery, and a relationship-first approach, Juliet delivers results for discerning clients in Scottsdale & Paradise Valley.</p>
            <div className="flex gap-3 md:gap-4 mt-2">
              <button aria-label="LinkedIn" className="text-luxury-gold hover:text-luxury-black bg-luxury-gold/10 rounded-full p-2 transition-all duration-200 hover:scale-110 hover:shadow-gold-glow"><svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg></button>
              <button aria-label="Instagram" className="text-luxury-gold hover:text-luxury-black bg-luxury-gold/10 rounded-full p-2 transition-all duration-200 hover:scale-110 hover:shadow-gold-glow"><svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07c-1.29.058-2.18.25-2.95.54-.8.3-1.48.7-2.16 1.38-.68.68-1.08 1.36-1.38 2.16-.29.77-.482 1.66-.54 2.95C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.29.25 2.18.54 2.95.3.8.7 1.48 1.38 2.16.68.68 1.36 1.08 2.16 1.38.77.29 1.66.482 2.95.54C8.332 23.988 8.736 24 12 24c3.264 0 3.668-.012 4.948-.07 1.29-.058 2.18-.25 2.95-.54.8-.3 1.48-.7 2.16-1.38.68-.68 1.36-1.08 2.16-1.38.77-.29 1.66-.482 2.95-.54C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg></button>
              <button aria-label="Zillow" className="text-luxury-gold hover:text-luxury-black bg-luxury-gold/10 rounded-full p-2 transition-all duration-200 hover:scale-110 hover:shadow-gold-glow"><svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M21.5 11.5l-9-9-9 9 1.5 1.5 7.5-7.5 7.5 7.5z"/></svg></button>
            </div>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );

  // FINAL CTA + FOOTER
  const finalCTA = (
    <FadeInWhenVisible direction="left" delay={0.8}>
      <section className="bg-luxury-gold py-12 md:py-16 px-4 text-center">
        <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-luxury-black font-bold mb-3 md:mb-4 animate-shimmer bg-gradient-to-r from-luxury-black via-luxury-gold-dark to-luxury-black bg-[length:200%_auto] bg-clip-text text-transparent">Ready to Experience the Pinnacle of Luxury Real Estate?</h2>
        <a href="#consultation" className="inline-block px-6 md:px-10 py-3 md:py-4 rounded-3xl bg-luxury-black text-luxury-gold font-semibold text-base md:text-lg shadow-gold-glow hover:scale-105 hover:shadow-gold-glow-lg transition-all duration-200 border-2 border-luxury-black mb-2 active:scale-95">Request Consultation</a>
        <div className="mt-3 md:mt-4 text-luxury-black font-body text-base md:text-lg">Call <a href="tel:4805551234" className="underline hover:text-luxury-champagne transition-colors duration-200">480-555-1234</a> or email <a href="mailto:luxury@agent.com" className="underline hover:text-luxury-champagne transition-colors duration-200">luxury@agent.com</a></div>
      </section>
    </FadeInWhenVisible>
  );

  // SCROLL TO TOP BUTTON
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FLOATING CONTACT BUTTON
  const floatingContact = (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col gap-4">
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="w-14 h-14 bg-luxury-black rounded-full shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center group border-2 border-luxury-gold"
          >
            <svg className="w-6 h-6 text-luxury-gold group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </button>
        )}
        <a href="tel:4805551234" className="w-14 h-14 bg-gradient-gold rounded-full shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center group">
          <svg className="w-6 h-6 text-luxury-black group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
        <a href="#consultation" className="w-14 h-14 bg-luxury-black rounded-full shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center group border-2 border-luxury-gold">
          <svg className="w-6 h-6 text-luxury-gold group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>
    </div>
  );

  const footer = (
    <footer className="bg-luxury-black py-8 md:py-10 px-4 text-center text-luxury-champagne font-body text-xs md:text-sm flex flex-col gap-2 items-center border-t border-luxury-gold/20">
      <div className="flex gap-4 md:gap-8 mb-2">
        <button className="hover:text-luxury-gold transition-colors duration-200">Home</button>
        <a href="#consultation" className="hover:text-luxury-gold transition-colors duration-200">Consultation</a>
        <button className="hover:text-luxury-gold transition-colors duration-200">Listings</button>
        <button className="hover:text-luxury-gold transition-colors duration-200">About</button>
      </div>
      <div className="flex gap-3 md:gap-4 mb-2">
        <button aria-label="LinkedIn" className="hover:text-luxury-gold transition-all duration-200 hover:scale-110"><svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg></button>
        <button aria-label="Instagram" className="hover:text-luxury-gold transition-all duration-200 hover:scale-110"><svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07c-1.29.058-2.18.25-2.95.54-.8.3-1.48.7-2.16 1.38-.68.68-1.08 1.36-1.38 2.16-.29.77-.482 1.66-.54 2.95C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.29.25 2.18.54 2.95.3.8.7 1.48 1.38 2.16.68.68 1.36 1.08 2.16 1.38.77.29 1.66.482 2.95.54C8.332 23.988 8.736 24 12 24c3.264 0 3.668-.012 4.948-.07 1.29-.058 2.18-.25 2.95-.54.8-.3 1.48-.7 2.16-1.38.68-.68 1.36-1.08 2.16-1.38.77-.29 1.66-.482 2.95-.54C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg></button>
        <button aria-label="Zillow" className="hover:text-luxury-gold transition-all duration-200 hover:scale-110"><svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.5 11.5l-9-9-9 9 1.5 1.5 7.5-7.5 7.5 7.5z"/></svg></button>
      </div>
              <div>&copy; {new Date().getFullYear()} Juliet Kasaya. All rights reserved.</div>
    </footer>
  );

  return (
    <div className="font-body bg-luxury-cream min-h-screen">
      {nav}
      <main className="pt-16 md:pt-20 lg:pt-24">
        {hero}
        {trustStrip}
        {problemSolution}
        {usps}
        {featuredPropertiesSection}
        {marketInsightsSection}
        {testimonialsCarousel}
        {listingsGallery}
        {consultationForm}
        {leadMagnet}
        {aboutAgent}
        {finalCTA}
      </main>
      {footer}
      {floatingContact}
    </div>
  );
}

export default App;
