/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated luxury palette
        'luxury-black': '#0A0A0A',
        'luxury-white': '#FAFAFA',
        'luxury-gold': '#D4AF37',
        'luxury-gold-light': '#F4E4BC',
        'luxury-gold-dark': '#B8860B',
        'luxury-champagne': '#F7F3E9',
        'luxury-cream': '#FDFBF7',
        'luxury-charcoal': '#2C2C2C',
        'luxury-slate': '#4A5568',
        'luxury-bronze': '#CD7F32',
        'luxury-copper': '#B87333',
        'luxury-ivory': '#FFFFF0',
        'luxury-beige': '#F5F5DC',
        'luxury-sand': '#F4D03F',
        'luxury-mahogany': '#4E2728',
        'luxury-navy': '#1B365D',
        'luxury-silver': '#C0C0C0',
        'luxury-platinum': '#E5E4E2',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Libre Baskerville', 'Georgia', 'serif'],
        'sans': ['Inter', 'Lato', 'DM Sans', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Optimized for mobile with smaller, more readable sizes
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display': ['2.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-mobile': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h1': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h1-mobile': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h2': ['1.75rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'h2-mobile': ['1.375rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'h3': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'h3-mobile': ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body-lg': ['1rem', { lineHeight: '1.7' }],
        'body-lg-mobile': ['0.9375rem', { lineHeight: '1.7' }],
        'body': ['0.9375rem', { lineHeight: '1.6' }],
        'body-mobile': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
        'caption-mobile': ['0.75rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        'luxury': '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
        'luxury-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury-xl': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'inner-luxury': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #FAFAFA 0%, #F7F3E9 50%, #F4E4BC 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F4E4BC 50%, #D4AF37 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #2C2C2C 50%, #4A5568 100%)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.7) 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(10, 10, 10, 0.4) 0%, rgba(10, 10, 10, 0.8) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

