import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 150, damping: 20 };
  const mouseX = useSpring(mousePosition.x, springConfig);
  const mouseY = useSpring(mousePosition.y, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      {/* BRIGHT & ENERGETIC HERO - Light Theme with #06D6A0 */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        id="home" 
        className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-white via-cyan-50/30 to-teal-50/40"
      >
        {/* Soft floating gradient orbs - pastel & airy */}
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 214, 160, 0.15) 0%, transparent 70%)',
            x: useTransform(mouseX, [0, 1], [-20, 20]),
            y: useTransform(mouseY, [0, 1], [-20, 20]),
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
            x: useTransform(mouseX, [0, 1], [15, -15]),
            y: useTransform(mouseY, [0, 1], [15, -15]),
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Modern mesh gradient pattern - more visible */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-40">
            <defs>
              <pattern id="mesh-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1.5" fill="#06D6A0" opacity="0.3"/>
                <circle cx="0" cy="0" r="1" fill="#38BDF8" opacity="0.2"/>
                <circle cx="80" cy="80" r="1" fill="#22D3EE" opacity="0.2"/>
                <line x1="40" y1="40" x2="0" y2="0" stroke="#06D6A0" strokeWidth="0.5" opacity="0.1"/>
                <line x1="40" y1="40" x2="80" y2="0" stroke="#06D6A0" strokeWidth="0.5" opacity="0.1"/>
                <line x1="40" y1="40" x2="0" y2="80" stroke="#06D6A0" strokeWidth="0.5" opacity="0.1"/>
                <line x1="40" y1="40" x2="80" y2="80" stroke="#06D6A0" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh-grid)"/>
          </svg>
        </div>

        {/* Animated accent shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${(i * 11 + 8) % 88}%`,
                top: `${(i * 17 + 10) % 80}%`,
                width: i % 2 === 0 ? '16px' : '12px',
                height: i % 2 === 0 ? '16px' : '12px',
                background: i % 3 === 0 
                  ? 'linear-gradient(135deg, #06D6A0 0%, #38BDF8 100%)'
                  : i % 3 === 1
                  ? 'linear-gradient(135deg, #38BDF8 0%, #22D3EE 100%)'
                  : 'linear-gradient(135deg, #06D6A0 0%, #22D3EE 100%)',
                borderRadius: i % 4 === 0 ? '50%' : '30%',
                opacity: 0.5 + (i % 3) * 0.15,
                boxShadow: `0 4px 12px ${i % 2 === 0 ? 'rgba(6, 214, 160, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
                x: useTransform(mouseX, [0, 1], [-(i % 12), i % 12]),
                y: useTransform(mouseY, [0, 1], [-(i % 10), i % 10]),
              }}
              animate={{
                y: [0, -20 - (i % 6) * 4, 0],
                x: [0, (i % 2 === 0 ? 12 : -12), 0],
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
              whileHover={{ scale: 2, opacity: 0.95 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32 pb-24 w-full z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="relative">
              {/* Fresh morning badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white border-2 border-[#06D6A0]/20 shadow-lg shadow-[#06D6A0]/10 cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#06D6A0" />
                  </svg>
                </motion.div>
                <span className="text-sm font-bold text-[#06D6A0]">
                  Your Health, Reimagined
                </span>
              </motion.div>

              {/* Dynamic headline reveal */}
              <div className="mb-6">
                <motion.h1 
                  className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {['Fuel', 'Your', 'Best', 'Life'].map((word, i) => (
                    <motion.span
                      key={word}
                      className="inline-block mr-4"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + i * 0.1,
                        type: 'spring',
                        stiffness: 100,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                
                <motion.div
                  className="relative mt-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                >
                  <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-[#06D6A0] via-cyan-500 to-teal-600 bg-clip-text text-transparent leading-[0.95]">
                    Every Day
                  </h2>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-[#06D6A0] to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                  />
                </motion.div>
              </div>

              {/* Subheadline */}
              <motion.p
                className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
              >
                Track nutrition, log workouts, and hit your goals with intelligent insights 
                and effortless tracking.
              </motion.p>

              {/* Interactive CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
              >
                <Link to="/signup">
                  <motion.button
                    className="group relative px-10 py-5 bg-[#06D6A0] text-white rounded-2xl font-bold text-lg overflow-hidden shadow-lg shadow-[#06D6A0]/30"
                    whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(6, 214, 160, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#05c28f] to-[#06D6A0]"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Free Trial
                      <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </span>
                  </motion.button>
                </Link>

                <motion.button
                  className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg border-2 border-gray-200 shadow-md hover:border-[#06D6A0]/50 hover:shadow-lg hover:shadow-[#06D6A0]/10 transition-all"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <span className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                    </svg>
                    Watch Demo
                  </span>
                </motion.button>
              </motion.div>

              {/* Social proof with spring animations */}
              <motion.div
                className="flex gap-10 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.5 }}
              >
                {[
                  { value: '50K+', label: 'Active Users', delay: 0 },
                  { value: '4.9★', label: 'Rating', delay: 0.1 },
                  { value: '1M+', label: 'Workouts', delay: 0.2 },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 1.6 + stat.delay, 
                      type: 'spring', 
                      stiffness: 300,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      transition: { type: 'spring', stiffness: 400, damping: 10 }
                    }}
                    className="cursor-pointer"
                  >
                    <p className="text-5xl font-black text-[#06D6A0] mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Floating nutrition dashboard */}
            <motion.div
              variants={itemVariants}
              className="relative h-[600px] hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Floating nutrition icons - modern glass morphism design */}
                {[
                  { 
                    label: 'Fats', 
                    color: '#06D6A0', 
                    delay: 0, 
                    x: -180, 
                    y: -140,
                    icon: (
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                        {/* Avocado */}
                        <path d="M12 3C8.13 3 5 6.13 5 10C5 13.87 8.13 17 12 17C15.87 17 19 13.87 19 10C19 6.13 15.87 3 12 3Z" fill="#06D6A0" opacity="0.3"/>
                        <path d="M12 3C8.13 3 5 6.13 5 10C5 13.87 8.13 17 12 17C15.87 17 19 13.87 19 10C19 6.13 15.87 3 12 3Z" stroke="#06D6A0" strokeWidth="2.5" strokeLinecap="round"/>
                        <circle cx="12" cy="11" r="2.5" fill="#065f46" stroke="#06D6A0" strokeWidth="1.5"/>
                        <path d="M12 17C12 17 8 18 7 21C7 21 9 22 12 22C15 22 17 21 17 21C16 18 12 17 12 17Z" fill="#06D6A0" opacity="0.3" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )
                  },
                  { 
                    label: 'Protein', 
                    color: '#38BDF8', 
                    delay: 0.2, 
                    x: 180, 
                    y: -140,
                    icon: (
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                        {/* Drumstick/Meat */}
                        <ellipse cx="10" cy="8" rx="3" ry="4" fill="#38BDF8" opacity="0.3"/>
                        <ellipse cx="10" cy="8" rx="3" ry="4" stroke="#38BDF8" strokeWidth="2.5"/>
                        <path d="M10 11C10 11 8 12 7 15C6.5 17 7 19 8 20C9 21 11 21 12 20C13 19 13.5 17 13 15C12 12 10 11 10 11Z" fill="#38BDF8" opacity="0.3"/>
                        <path d="M10 11C10 11 8 12 7 15C6.5 17 7 19 8 20C9 21 11 21 12 20C13 19 13.5 17 13 15C12 12 10 11 10 11Z" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="14" y1="7" x2="16" y2="5" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>
                        <line x1="14" y1="10" x2="17" y2="10" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>
                        <circle cx="16" cy="5" r="1.2" fill="#38BDF8"/>
                        <circle cx="17" cy="10" r="1.2" fill="#38BDF8"/>
                      </svg>
                    )
                  },
                  { 
                    label: 'Carbs', 
                    color: '#22D3EE', 
                    delay: 0.4, 
                    x: -180, 
                    y: 160,
                    icon: (
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                        {/* Bread/Baguette */}
                        <path d="M4 10C4 7 6 5 9 5H15C18 5 20 7 20 10V14C20 17 18 19 15 19H9C6 19 4 17 4 14V10Z" fill="#22D3EE" opacity="0.3"/>
                        <path d="M4 10C4 7 6 5 9 5H15C18 5 20 7 20 10V14C20 17 18 19 15 19H9C6 19 4 17 4 14V10Z" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 9C8 9 10 8 12 8C14 8 16 9 16 9" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                        <path d="M8 12C8 12 10 11 12 11C14 11 16 12 16 12" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                        <path d="M8 15C8 15 10 14 12 14C14 14 16 15 16 15" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                      </svg>
                    )
                  },
                  { 
                    label: 'Fiber', 
                    color: '#06D6A0', 
                    delay: 0.6, 
                    x: 180, 
                    y: 160,
                    icon: (
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                        {/* Leafy Vegetable/Broccoli */}
                        <circle cx="8" cy="10" r="3" fill="#06D6A0" opacity="0.3"/>
                        <circle cx="8" cy="10" r="3" stroke="#06D6A0" strokeWidth="2"/>
                        <circle cx="13" cy="8" r="2.5" fill="#06D6A0" opacity="0.3"/>
                        <circle cx="13" cy="8" r="2.5" stroke="#06D6A0" strokeWidth="2"/>
                        <circle cx="16" cy="11" r="2.5" fill="#06D6A0" opacity="0.3"/>
                        <circle cx="16" cy="11" r="2.5" stroke="#06D6A0" strokeWidth="2"/>
                        <circle cx="11" cy="13" r="2.5" fill="#06D6A0" opacity="0.3"/>
                        <circle cx="11" cy="13" r="2.5" stroke="#06D6A0" strokeWidth="2"/>
                        <path d="M12 13V21" stroke="#06D6A0" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M10 16L8 18" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M14 16L16 18" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="absolute z-30"
                    style={{
                      left: `calc(50% + ${item.x}px)`,
                      top: `calc(50% + ${item.y}px)`,
                      x: useTransform(mouseX, [0, 1], [-item.x * 0.1, item.x * 0.1]),
                      y: useTransform(mouseY, [0, 1], [-item.y * 0.1, item.y * 0.1]),
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.8 + item.delay,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 5,
                      zIndex: 50,
                      transition: { type: 'spring', stiffness: 400, damping: 10 }
                    }}
                  >
                    <motion.div
                      className="relative group cursor-pointer"
                      animate={{
                        y: [0, -12, 0],
                      }}
                      transition={{
                        duration: 3 + i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    >
                      {/* Glowing background effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
                        style={{ 
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                        }}
                      />
                      
                      {/* Glass card */}
                      <div 
                        className="relative bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/40 shadow-lg"
                        style={{ 
                          boxShadow: `0 8px 32px ${item.color}20, 0 0 0 1px ${item.color}10`,
                        }}
                      >
                        <div className="text-center">
                          <div className="mb-2 flex items-center justify-center filter drop-shadow-sm">
                            {item.icon}
                          </div>
                          <p 
                            className="text-xs font-bold tracking-wide uppercase"
                            style={{ color: item.color }}
                          >
                            {item.label}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Center dashboard card */}
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -5,
                    zIndex: 25,
                    transition: { type: 'spring', stiffness: 400, damping: 15 }
                  }}
                >
                  <div className="relative bg-white rounded-3xl p-8 border-2 border-[#06D6A0]/30 shadow-2xl shadow-[#06D6A0]/20 w-80 backdrop-blur-sm">
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-[#06D6A0]/25 to-cyan-400/25 rounded-3xl blur-2xl"
                      animate={{
                        opacity: [0.4, 0.6, 0.4],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#06D6A0] to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="white" />
                        </svg>
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Today's Goals
                      </h3>
                      <p className="text-gray-500 text-center text-sm mb-6">
                        Track your macros live
                      </p>

                      <div className="space-y-4">
                        {[
                          { label: 'Protein', value: 85, color: '#06D6A0' },
                          { label: 'Carbs', value: 70, color: '#38BDF8' },
                          { label: 'Fats', value: 92, color: '#22D3EE' },
                        ].map((item, i) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                          >
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-700 font-semibold">{item.label}</span>
                              <motion.span 
                                className="font-bold"
                                style={{ color: item.color }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 + i * 0.1 }}
                              >
                                {item.value}%
                              </motion.span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ 
                                  background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ 
                                  duration: 1, 
                                  delay: 1.3 + i * 0.1, 
                                  ease: 'easeOut' 
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Soft wave transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 100">
            <motion.path
              fill="#ffffff"
              d="M0,48 C240,72 480,24 720,48 C960,72 1200,36 1440,48 L1440,100 L0,100 Z"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="tracker" className="relative bg-gradient-to-b from-white via-cyan-50/20 to-white py-32 overflow-hidden">
        {/* Subtle background decoration matching hero */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="features-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#06D6A0" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#features-grid)"/>
          </svg>
        </div>

        {/* Floating gradient orbs like hero */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6, 214, 160, 0.15) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 70%)' }}
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white border-2 border-[#06D6A0]/20 shadow-lg shadow-[#06D6A0]/10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#06D6A0" />
                </svg>
              </motion.div>
              <span className="text-sm font-bold text-[#06D6A0]">
                Powerful Features
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to
              <span className="block mt-2 bg-gradient-to-r from-[#06D6A0] via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                Stay Healthy
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed to help you reach your fitness goals with ease and style
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
            }}
          >
            {[
              { 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradNutrition)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="gradNutrition" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06D6A0"/>
                        <stop offset="100%" stopColor="#22D3EE"/>
                      </linearGradient>
                    </defs>
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>
                ),
                title: 'Nutrition Tracking', 
                desc: 'Log meals effortlessly with smart food database and barcode scanner.',
                accentColor: '#06D6A0',
                iconBg: 'from-[#06D6A0]/10 to-cyan-500/10',
                link: '/nutrition'
              },
              { 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradWorkout)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="gradWorkout" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8"/>
                        <stop offset="100%" stopColor="#22D3EE"/>
                      </linearGradient>
                    </defs>
                    <path d="M6.5 6.5l11 11"/>
                    <path d="M17.5 6.5l-11 11"/>
                    <circle cx="12" cy="12" r="1"/>
                    <path d="M5 5h3v3H5z"/>
                    <path d="M16 5h3v3h-3z"/>
                    <path d="M5 16h3v3H5z"/>
                    <path d="M16 16h3v3h-3z"/>
                  </svg>
                ),
                title: 'Workout Tracking', 
                desc: 'Track exercises with activity rings and auto-calculated calories.',
                accentColor: '#38BDF8',
                iconBg: 'from-sky-400/10 to-cyan-500/10',
                link: '/workouts'
              },
              { 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradProgress)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="gradProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE"/>
                        <stop offset="100%" stopColor="#06D6A0"/>
                      </linearGradient>
                    </defs>
                    <rect x="3" y="14" width="4" height="7" rx="1"/>
                    <rect x="10" y="9" width="4" height="12" rx="1"/>
                    <rect x="17" y="4" width="4" height="17" rx="1"/>
                  </svg>
                ),
                title: 'Progress Reports', 
                desc: 'Beautiful charts and insights to track your fitness journey.',
                accentColor: '#22D3EE',
                iconBg: 'from-cyan-400/10 to-[#06D6A0]/10',
                link: '/reports'
              },
              { 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradReminders)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="gradReminders" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06D6A0"/>
                        <stop offset="100%" stopColor="#38BDF8"/>
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                title: 'Smart Reminders', 
                desc: 'Never miss a meal or workout with intelligent notifications.',
                accentColor: '#06D6A0',
                iconBg: 'from-[#06D6A0]/10 to-sky-400/10',
                link: '/settings'
              },
              { 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradGoals)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="gradGoals" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8"/>
                        <stop offset="100%" stopColor="#06D6A0"/>
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                ),
                title: 'Goal Setting', 
                desc: 'Set personalized goals and celebrate your achievements.',
                accentColor: '#38BDF8',
                iconBg: 'from-sky-400/10 to-[#06D6A0]/10',
                link: '/#progress'
              },
              { 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradCustom)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="gradCustom" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE"/>
                        <stop offset="100%" stopColor="#38BDF8"/>
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                  </svg>
                ),
                title: 'Customization', 
                desc: 'Personalize units, theme, and preferences to match your style.',
                accentColor: '#22D3EE',
                iconBg: 'from-cyan-400/10 to-sky-400/10',
                link: '/settings'
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.7,
                      type: 'spring',
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                className="group"
              >
                <Link to={feature.link}>
                  <motion.div 
                    className="relative h-full bg-white/70 backdrop-blur-md p-8 lg:p-10 rounded-3xl overflow-hidden cursor-pointer"
                    style={{
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(6, 214, 160, 0.08)'
                    }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.02,
                      boxShadow: '0 20px 60px rgba(6, 214, 160, 0.15), 0 0 0 1px rgba(6, 214, 160, 0.2)',
                      transition: { type: 'spring', stiffness: 400, damping: 20 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      y: {
                        duration: 4 + i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }
                    }}
                  >
                    {/* Subtle gradient background that appears on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${feature.accentColor}08 0%, transparent 100%)`
                      }}
                    />

                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${feature.accentColor}15, transparent)`,
                        filter: 'blur(20px)',
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon with breathing animation */}
                      <motion.div 
                        className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${feature.iconBg}`}
                        animate={{
                          scale: [1, 1.08, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.3,
                        }}
                        whileHover={{ 
                          rotate: [0, -8, 8, -8, 0],
                          scale: 1.15,
                          transition: { duration: 0.6 }
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base mb-6">
                        {feature.desc}
                      </p>
                      
                      {/* Arrow indicator with smooth animation */}
                      <motion.div
                        className="flex items-center gap-2 font-semibold"
                        style={{ color: feature.accentColor }}
                        initial={{ x: 0, opacity: 0.7 }}
                        whileHover={{ x: 6, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <span className="text-sm">Explore</span>
                        <motion.svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </motion.div>
                    </div>

                    {/* Decorative corner accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${feature.accentColor}12, transparent 70%)`,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Progress Section */}
      <section id="progress" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Your Progress
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visualize your journey with beautiful charts and insights
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {[
              { value: '92%', label: 'Weekly Consistency', trend: '+12%', color: 'from-[#06D6A0] to-[#073B4C]' },
              { value: '-2.3kg', label: 'Weight Progress', trend: 'This month', color: 'from-[#FFD166] to-[#EF476F]' },
              { value: '1,247', label: 'Total Workouts', trend: '+45 this week', color: 'from-[#118AB2] to-[#073B4C]' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-900 font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-[#06D6A0] font-medium">{stat.trend}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Smooth gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06D6A0] via-[#073B4C] to-[#118AB2]">
          {/* Animated glow orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD166]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06D6A0]/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of users achieving their fitness goals with FitMind.
            </p>
            <Link to="/signup">
              <motion.button 
                className="px-12 py-5 bg-white text-[#073B4C] rounded-full hover:bg-gray-50 transition-all shadow-2xl text-lg font-bold"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Animated, layered parallax wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg className="w-full h-36" preserveAspectRatio="none" viewBox="0 0 1440 200">
            <defs>
              <linearGradient id="waveGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#06D6A0" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="waveWhite" x1="0" x2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Back wave - slow vertical float */}
            <motion.path
              fill="url(#waveGrad)"
              d="M0 80 C 240 140 480 20 720 80 C 960 140 1200 30 1440 80 L1440 200 L0 200 Z"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: [18, 0, 18], opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Front wave - horizontal parallax slide */}
            <motion.path
              fill="url(#waveWhite)"
              d="M0 110 C 200 60 420 160 720 110 C 1020 60 1240 150 1440 110 L1440 200 L0 200 Z"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, -60, 0], opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Subtle highlight line that draws in */}
            <motion.path
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              d="M0 100 C 220 40 460 160 720 100 C 980 40 1220 150 1440 100"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-[#073B4C] to-gray-900 text-white py-16 overflow-hidden">
        {/* Subtle animated glow */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#06D6A0]/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#06D6A0] to-white bg-clip-text text-transparent">
                💪 FitMind
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your personal companion for a healthier lifestyle.
              </p>
            </motion.div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'FAQ']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Contact']
              }
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-[#06D6A0] transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-gray-800/50 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400">
              &copy; 2025 FitMind. All rights reserved. Made with ❤️ for your health.
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  )
}

export default Home;
