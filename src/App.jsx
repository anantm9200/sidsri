import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604928141064-207cea6f5722?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1575995872537-3793d29d972c?q=80&w=2000&auto=format&fit=crop"
];

const SELECTED_WORK = [
  { id: '01', title: 'NIKE AIR', year: '2023', type: 'COMMERCIAL', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop' },
  { id: '02', title: 'NEON DREAMS', year: '2023', type: 'SHORT FILM', image: 'https://images.unsplash.com/photo-1555532538-dcdbd01d3738?q=80&w=2000&auto=format&fit=crop' },
  { id: '03', title: 'VOGUE X', year: '2022', type: 'EDITORIAL', image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2000&auto=format&fit=crop' },
];

const NARRATIVE_WORK = [
  { id: 1, title: 'KARLA WEBSERIES 23', info: 'Director: Karan Johar | Production: Netflix | A story about isolation and rediscovery in the modern age.', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'GUILTY MINDS', info: 'Director: Shefali Bhushan | Production: Amazon Prime | Legal drama exploring the grey areas of justice.', poster: 'https://images.unsplash.com/photo-1575995872537-3793d29d972c?q=80&w=1200&auto=format&fit=crop' },
];

const COMMERCIAL_WORK = [
  { id: 1, title: 'ROYAL ENFIELD', category: 'LIFESTYLE', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, title: 'VIVO X90', category: 'PROMO', image: 'https://images.unsplash.com/photo-1555532538-dcdbd01d3738?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, title: 'CRED', category: 'HUMOR', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, title: 'SONY MUSIC', category: 'MUSIC', image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=1600&auto=format&fit=crop' },
];

const CATEGORIES = ['ALL', 'LIFESTYLE', 'PROMO', 'HUMOR', 'MUSIC'];

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [activeView, setActiveView] = useState('home'); // 'home', 'commercial', 'narratives'
  const [activeCategory, setActiveCategory] = useState('ALL');
  
  const footerRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    setIsAppLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    if (activeView !== 'home') {
      setActiveView('home');
      // Wait for home view to render before scrolling
      setTimeout(() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ThemeToggle = () => (
    <button 
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-7 rounded-full p-1 transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#e5e5e5]'}`}
      aria-label="Toggle Theme"
    >
      <motion.div 
        className={`w-5 h-5 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'} shadow-sm`}
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{ marginLeft: theme === 'dark' ? 'auto' : '0' }}
      >
        {theme === 'dark' ? (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </motion.div>
    </button>
  );

  return (
    <div className={`min-h-screen selection:bg-neutral-500/30 font-sans transition-colors duration-1000 ease-in-out ${theme === 'dark' ? 'bg-[#050505] text-[#ededed]' : 'bg-[#f4f4f4] text-[#111111]'}`}>
      
      {}
      <header className="fixed top-0 left-0 w-full z-50 px-[3vw] py-[3vh] flex justify-between items-start pointer-events-none mix-blend-difference text-white">
        <div 
          onClick={() => { setActiveView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
          className="flex flex-col cursor-pointer pointer-events-auto group w-fit pr-8"
        >
          {/* Logo hover animation (translates entire block right slightly) */}
          <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-4">
            <h1 className="font-sans text-[clamp(14px,1.5vw,18px)] tracking-widest uppercase font-semibold leading-none">Siddharth Srinivasan</h1>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mt-2 opacity-70">DOP</p>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
          {/* Navigation Links with identical slide animations */}
          <button onClick={scrollToAbout} className="group cursor-pointer w-fit overflow-hidden py-2">
             <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-3">
               <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">ABOUT</span>
             </div>
          </button>
          <button onClick={scrollToFooter} className="group cursor-pointer w-fit overflow-hidden py-2">
             <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-3">
               <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">CONTACT</span>
             </div>
          </button>
          <ThemeToggle />
        </div>
      </header>

      <AnimatePresence mode="wait">
        
        {}
        {/* === HOME VIEW === */}
        {activeView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* HERO SECTION - Now sticky to allow overlapping scroll */}
            <section className="sticky top-0 w-full h-screen overflow-hidden bg-black z-0">
              <AnimatePresence mode="sync">
                <motion.img
                  key={currentImageIndex}
                  src={HERO_IMAGES[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: 1, scale: 1.25 }} // Scale 1.25 hides vimeo letterbox
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover origin-center"
                />
              </AnimatePresence>

              {/* Foreground Links - Using mix-blend-difference so they adapt to ANY image perfectly */}
              <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end pb-[8vh] px-[3vw] mix-blend-difference text-white">
                <div className="flex justify-between items-end w-full">
                  
                  {/* Left side: Direct Navigation Links */}
                  <div className="flex flex-col gap-6 md:gap-8 pointer-events-auto">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={isAppLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: isAppLoaded ? 0.8 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                      className="flex items-center gap-6 cursor-pointer group w-fit"
                      onClick={() => { setActiveView('commercial'); window.scrollTo(0,0); }}
                    >
                      <span className="font-mono text-[clamp(12px,1.5vw,16px)] tracking-[0.3em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-2 text-white">COMMERCIAL</span>
                      <div className="w-12 md:w-24 h-[1px] relative overflow-hidden bg-white/30">
                         <div className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 bg-white" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={isAppLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: isAppLoaded ? 1.0 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                      className="flex items-center gap-6 cursor-pointer group w-fit"
                      onClick={() => { setActiveView('narratives'); window.scrollTo(0,0); }}
                    >
                      <span className="font-mono text-[clamp(12px,1.5vw,16px)] tracking-[0.3em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-2 text-white">NARRATIVES</span>
                      <div className="w-12 md:w-24 h-[1px] relative overflow-hidden bg-white/30">
                         <div className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 bg-white" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {}
            {/* MAIN CONTENT SECTION (This section slides OVER the sticky hero) */}
            <section className={`relative z-30 w-full rounded-t-3xl md:rounded-t-[3rem] -mt-8 pt-16 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}>
              
              {/* === ABOUT SECTION === */}
              <div ref={aboutRef} className="w-full px-[3vw] pt-16 pb-32 md:pb-48">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                  <div className="md:col-span-4 flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                    <h2 className={`font-mono text-xs tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>About</h2>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="text-[clamp(1.5rem,2.5vw,3rem)] font-sans font-light leading-[1.3] tracking-wide">
                      Siddharth Srinivasan is an avant-garde cinematographer crafting imagery that defies convention. Based in Mumbai, he works globally across commercial and narrative formats, exploring the quiet intersections of human emotion and cinematic restraint.
                    </h3>
                  </div>
                </div>
              </div>

              {/* === DIRECTOR'S CUT === */}
              <div className="w-full flex justify-between items-end px-[3vw] mb-12">
                <h2 className="text-[clamp(2rem,4vw,5rem)] font-sans font-light tracking-tighter uppercase leading-[0.85]">
                  Director's<br/><span className={theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}>Cut</span>
                </h2>
                <a href="https://vimeo.com" target="_blank" rel="noreferrer" className="group flex items-center gap-4 cursor-pointer pb-2">
                   <span className="font-mono text-[10px] tracking-[0.2em] uppercase transition-transform duration-500 group-hover:-translate-x-2">Watch on Vimeo</span>
                   <div className={`w-8 h-[1px] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                </a>
              </div>
              <div className="w-full px-[3vw] mb-48">
                <div className={`w-full aspect-video overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                  <iframe src="https://player.vimeo.com/video/824804225?h=02ab566df5&title=0&byline=0&portrait=0" className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>

              {/* === SELECTED WORKS GRID === */}
              <div className="w-full px-[3vw] pb-32">
                <div className={`flex justify-between items-end border-b pb-6 mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                  <h2 className={`font-mono text-xs tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Selected Work</h2>
                  <span className={`font-mono text-[10px] tracking-widest ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>03 / {SELECTED_WORK.length.toString().padStart(2, '0')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-12">
                  {SELECTED_WORK.map((project, i) => (
                    <motion.div 
                      key={project.id} 
                      className={`flex flex-col group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <div className={`w-full aspect-[4/3] overflow-hidden mb-6 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 ease-[0.19,1,0.22,1] group-hover:scale-105" />
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-sans uppercase font-light tracking-wide mb-2">{project.title}</h3>
                          <p className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{project.type}</p>
                        </div>
                        <span className={`font-mono text-[10px] tracking-widest ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>{project.year}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {}
        {/* === COMMERCIALS VIEW === */}
        {activeView === 'commercial' && (
          <motion.div
            key="commercial"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={`pt-40 px-[3vw] min-h-screen pb-32 relative z-30 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Left Sidebar Filter */}
              <div className="md:col-span-3">
                <div className="sticky top-40 flex flex-col gap-6">
                  <h2 className="font-mono text-xs tracking-[0.3em] uppercase mb-4 opacity-50">COMMERCIALS</h2>
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`text-left font-sans text-xl md:text-3xl font-light uppercase tracking-wide transition-colors duration-300 ${activeCategory === category ? (theme === 'dark' ? 'text-white' : 'text-black') : (theme === 'dark' ? 'text-neutral-600 hover:text-white' : 'text-neutral-400 hover:text-black')}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Content Grid */}
              <div className="md:col-span-9 flex flex-col gap-24">
                <AnimatePresence mode="popLayout">
                  {COMMERCIAL_WORK.filter(work => activeCategory === 'ALL' || work.category === activeCategory).map((work) => (
                    <motion.div
                      key={work.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="w-full flex flex-col group cursor-pointer"
                    >
                      <div className={`w-full aspect-video overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                         <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 ease-[0.19,1,0.22,1] group-hover:scale-105" />
                      </div>
                      <div className="flex justify-between items-start mt-6">
                         <h3 className="text-2xl md:text-3xl font-sans uppercase font-light tracking-wide">{work.title}</h3>
                         <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{work.category}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {}
        {/* === NARRATIVES VIEW === */}
        {activeView === 'narratives' && (
          <motion.div
            key="narratives"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={`pt-40 px-[3vw] min-h-screen pb-32 relative z-30 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}
          >
            <div className={`border-b pb-6 mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <h2 className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">NARRATIVES</h2>
            </div>
            
            <div className="flex flex-col gap-32">
              {NARRATIVE_WORK.map((work) => (
                 <div key={work.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
                    <div className={`md:col-span-5 aspect-[3/4] overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                       <img src={work.poster} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 cursor-pointer" />
                    </div>
                    <div className="md:col-span-7 flex flex-col max-w-xl">
                       <h3 className="text-[clamp(2rem,3vw,4rem)] font-sans uppercase font-light tracking-tight leading-none mb-6">{work.title}</h3>
                       <p className={`font-mono text-xs md:text-sm tracking-wide leading-relaxed uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                         {work.info}
                       </p>
                    </div>
                 </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      {/* 
        SEAMLESS UNIFIED FOOTER BLOCK 
        No sticky overlaps. The pre-footer and footer are now one continuous block sharing the exact same background color for a perfect flow.
      */}
      <div className={`relative z-40 w-full flex flex-col transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}>
        
        {/* NORMAL FLOW PRE-FOOTER CALL TO ACTION */}
        <div className="relative w-full pt-48 pb-24 flex flex-col justify-center items-center text-center px-[3vw]">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <a 
              href="mailto:hello@siddharth.com" 
              className="group relative inline-flex flex-col items-center cursor-pointer"
            >
              <span className={`text-[clamp(3rem,8vw,10rem)] font-sans font-light tracking-tight uppercase leading-none transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                LET'S CRAFT
              </span>
              <span className={`text-[clamp(3rem,8vw,10rem)] font-sans font-light tracking-tight uppercase leading-none transition-colors duration-500 italic ${theme === 'dark' ? 'text-neutral-600 group-hover:text-white' : 'text-neutral-300 group-hover:text-black'}`}>
                THE UNSEEN.
              </span>
              <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] transition-all duration-700 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
            </a>
          </motion.div>
        </div>

        {/* TYPOGRAPHIC EDITORIAL FOOTER */}
        <footer ref={footerRef} className={`relative w-full pb-8 px-[3vw] flex flex-col justify-between overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
           <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-4 mb-32 w-full">
              <div className="col-span-1 md:col-span-3 flex flex-col">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Profile</span>
                  <p className={`font-mono text-[10px] md:text-xs tracking-[0.1em] uppercase leading-relaxed pr-8 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      Siddharth Srinivasan is an avant-garde cinematographer crafting imagery that defies convention, working globally across commercial and narrative formats.
                  </p>
              </div>

              <div className="col-span-1 md:col-span-4 flex flex-col">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Direct Inquiries</span>
                  <a href="mailto:hello@siddharth.com" className={`text-[clamp(1.5rem,2.5vw,3rem)] font-sans font-light uppercase leading-[1.1] hover:italic transition-all duration-300 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>HELLO@<br/>SIDDHARTH.COM</a>
                  <a href="tel:+919876543210" className={`text-[clamp(1.5rem,2.5vw,3rem)] font-sans font-light uppercase leading-none hover:italic transition-all duration-300 mt-6 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>+91 98765 43210</a>
              </div>

              <div className="col-span-1 md:col-span-3 flex flex-col">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Network</span>
                  <a href="https://vimeo.com/siddharthdop" target="_blank" rel="noreferrer" className={`text-[clamp(1.5rem,2.5vw,3rem)] font-sans font-light uppercase leading-[1.1] hover:italic transition-all duration-300 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>VIMEO</a>
                  <a href="#" className={`text-[clamp(1.5rem,2.5vw,3rem)] font-sans font-light uppercase leading-none hover:italic transition-all duration-300 mt-6 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>INSTAGRAM</a>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col md:items-end text-left md:text-right">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Base</span>
                  <p className="text-[clamp(1.5rem,2.5vw,3rem)] font-sans font-light uppercase leading-[1.1]">MUMBAI</p>
                  <p className={`text-[clamp(1.5rem,2.5vw,3rem)] font-sans font-light uppercase leading-none mt-2 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>INDIA</p>
                  <div className="mt-8 flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                     <span className={`font-mono text-[9px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Available Worldwide</span>
                  </div>
              </div>
           </div>

           <div className={`w-full flex justify-center items-end border-t pt-8 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'}`}>
              <h1 className="text-[14vw] font-sans font-light tracking-tighter uppercase leading-[0.75] whitespace-nowrap">SIDDHARTH</h1>
           </div>
           <div className="w-full flex justify-between items-center mt-6">
               <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>© {new Date().getFullYear()}</span>
               <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>ALL RIGHTS RESERVED</span>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
