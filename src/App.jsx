import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* STREAMING_CHUNK:Updating Hero Images with the new uniform aspect ratio .jpeg links */
const HERO_IMAGES = [
  "https://static.wixstatic.com/media/548938_6d8f377d7f2445c19fb52f19f17ac89d~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_55c7bdc92e504069ab34dd0277a85997~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_39cb30299b7148f9985b1e6bebfc070e~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_95f181bc9f2741ca8cf62e6fa73d864c~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_44e9e85a12ef4de9b6f9da62be5cf2e5~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_3d1f72fdec51489890f13e44a3efc387~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_1b8f8c6d08b34a1a99d84d2ac44c1683~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_8fd10d8c65474c448858dd460e445512~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_35fb702748e04958bf7df2efd19299b9~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_a23dc6a28ec04a1cb6382542866f9a2d~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_2aa9e63357724f2da0b435dcd31af612~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_e0812f1a567944c2b91ebb7d0bd262e2~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_bd8380d3a9474a13bfe1380b36505459~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_471503fd385a41e3841e14a22c31e2c5~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_d44bc0816c2f4e478610607211f6c9b8~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_90b16d4d2b1c4147b957a8af163fb8bd~mv2.jpeg",
  "https://static.wixstatic.com/media/548938_de942c33b1ab467e860231d76d32b3b1~mv2.jpeg"
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

const getPagination = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);
  if (current <= 3) return [0, 1, 2, 3, 4, '...', total - 1];
  if (current >= total - 4) return [0, '...', total - 5, total - 4, total - 3, total - 2, total - 1];
  return [0, '...', current - 1, current, current + 1, '...', total - 1];
};

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [activeView, setActiveView] = useState('home');
  
  const footerRef = useRef(null);
  const aboutRef = useRef(null); 
  const nextSectionRef = useRef(null);

  useEffect(() => {
    setIsAppLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollDown = () => {
      nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const ThemeToggle = () => (
    <button 
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-7 rounded-full p-1 transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#e5e5e5]'}`}
      aria-label="Toggle Theme"
    >
      <motion.div 
        className={`w-5 h-5 rounded-full flex items-center justify-center absolute shadow-sm ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
        layout
        initial={false}
        animate={{ 
          x: theme === 'dark' ? 28 : 0, 
          rotate: theme === 'dark' ? 180 : 0 
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        {theme === 'dark' ? (
          // f/8 (Closed Aperture for Dark Mode)
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="12,8 15.5,10 15.5,14 12,16 8.5,14 8.5,10" />
            <line x1="12" y1="2" x2="12" y2="8" />
            <line x1="20.5" y1="7" x2="15.5" y2="10" />
            <line x1="20.5" y1="17" x2="15.5" y2="14" />
            <line x1="12" y1="22" x2="12" y2="16" />
            <line x1="3.5" y1="17" x2="8.5" y2="14" />
            <line x1="3.5" y1="7" x2="8.5" y2="10" />
          </svg>
        ) : (
          // f/2.8 (Open Aperture for Light Mode)
          <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="12,4 18.9,8 18.9,16 12,20 5.1,16 5.1,8" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="20.7" y1="7" x2="18.9" y2="8" />
            <line x1="20.7" y1="17" x2="18.9" y2="16" />
            <line x1="12" y1="22" x2="12" y2="20" />
            <line x1="3.3" y1="17" x2="5.1" y2="16" />
            <line x1="3.3" y1="7" x2="5.1" y2="8" />
          </svg>
        )}
      </motion.div>
    </button>
  );

  return (
    <div className={`min-h-screen selection:bg-neutral-500/30 font-sans transition-colors duration-1000 ease-in-out ${theme === 'dark' ? 'bg-[#050505] text-[#ededed]' : 'bg-[#f4f4f4] text-[#111111]'}`}>
      
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 w-full z-50 px-[4vw] py-[4vh] flex justify-between items-start pointer-events-none transition-colors duration-1000 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <div 
          onClick={() => { setActiveView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
          className="flex flex-col cursor-pointer pointer-events-auto group w-fit"
        >
          <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-2">
            <h1 className="font-sans text-[clamp(14px,1.5vw,18px)] tracking-widest uppercase font-semibold leading-none">Siddharth Srinivasan</h1>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mt-2 opacity-70">DOP</p>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
          <button onClick={scrollToAbout} className="group cursor-pointer w-fit overflow-hidden py-2">
             <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-4">
               <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">ABOUT</span>
             </div>
          </button>
          <button onClick={scrollToFooter} className="group cursor-pointer w-fit overflow-hidden py-2">
             <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-4">
               <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">CONTACT</span>
             </div>
          </button>
          <ThemeToggle />
        </div>
      </header>

      <AnimatePresence mode="wait">
        
        {/* === HOME VIEW === */}
        {activeView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
           {/* HERO SECTION */}
            <section className="relative w-full h-[100svh] flex flex-col items-center justify-center pt-[12vh] pb-[4vh]">
              
              {/* Framed Image Container enforcing 16:9 composition without stretching */}
              <div className="w-[92vw] md:w-[85vw] mx-auto aspect-[16/9] relative overflow-hidden bg-black/5 rounded-sm">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentImageIndex}
                    src={HERO_IMAGES[currentImageIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Cinematic Hero"
                  />
                </AnimatePresence>
              </div>

              {/* STREAMING_CHUNK:Center-aligned Pagination Configuration */}
              {/* Centralized Pagination & Controls */}
              <div className="w-[92vw] md:w-[85vw] mx-auto mt-4 md:mt-8 flex justify-center items-center pointer-events-auto relative">
                 
                 {/* Left-aligned Previous Button */}
                 <button 
                   onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1))}
                   className={`absolute left-0 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-2 whitespace-nowrap pr-4 ${
                     theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
                   }`}
                 >
                   <span className="text-[10px] md:text-xs mb-[2px]">←</span>
                   PREV
                 </button>

                 {/* Center-aligned Numbers */}
                 <div className="flex gap-2 md:gap-4 items-center">
                    {getPagination(currentImageIndex, HERO_IMAGES.length).map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === 'number' && setCurrentImageIndex(page)}
                        disabled={typeof page !== 'number'}
                        className={`font-mono text-[11px] md:text-sm tracking-widest transition-colors duration-300 min-w-[24px] text-center ${
                          page === currentImageIndex 
                            ? (theme === 'dark' ? 'text-white font-bold' : 'text-black font-bold') 
                            : typeof page === 'number' 
                              ? (theme === 'dark' ? 'text-neutral-600 hover:text-white' : 'text-neutral-400 hover:text-black')
                              : (theme === 'dark' ? 'text-neutral-700 cursor-default' : 'text-neutral-300 cursor-default')
                        }`}
                      >
                        {typeof page === 'number' ? (page + 1).toString() : page}
                      </button>
                    ))}
                 </div>
                 
                 {/* Right-aligned Next Button within the pagination row */}
                 <button 
                   onClick={() => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)}
                   className={`absolute right-0 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-2 whitespace-nowrap pl-4 ${
                     theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
                   }`}
                 >
                   NEXT
                   <span className="text-[10px] md:text-xs mb-[2px]">→</span>
                 </button>
              </div>

              {/* STREAMING_CHUNK:Floating Navigation Links */}
              {/* Floating Bottom Navigation Links */}
              <div className="absolute bottom-6 left-0 w-full px-[4vw] flex justify-between items-end pointer-events-none z-40">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAppLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: isAppLoaded ? 0.4 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="pointer-events-auto"
                  >
                    <div 
                        className="flex flex-col cursor-pointer group w-fit"
                        onClick={() => { setActiveView('commercial'); window.scrollTo(0,0); }}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`font-mono text-[clamp(14px,2vw,20px)] tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>COMMERCIAL</span>
                        </div>
                        <div className={`w-full h-[1px] mt-1 relative overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                           <div className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 ${theme === 'dark' ? 'bg-white/50' : 'bg-black/50'}`} />
                        </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAppLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: isAppLoaded ? 0.6 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="pointer-events-auto"
                  >
                     <div 
                        className="flex flex-col items-end cursor-pointer group w-fit"
                        onClick={() => { setActiveView('narratives'); window.scrollTo(0,0); }}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`font-mono text-[clamp(14px,2vw,20px)] tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:-translate-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>NARRATIVES</span>
                        </div>
                        <div className={`w-full h-[1px] mt-1 relative overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                           <div className={`absolute inset-0 origin-right scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 ${theme === 'dark' ? 'bg-white/50' : 'bg-black/50'}`} />
                        </div>
                    </div>
                  </motion.div>
              </div>
            </section>

            <section ref={nextSectionRef} className="relative z-30 w-full pt-16 md:pt-32">
              
              {/* ABOUT SECTION */}
              <div ref={aboutRef} className="w-full px-[4vw] pt-8 pb-32 md:pb-48">
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

              {/* SELECTED WORKS GRID */}
              <div className="w-full px-[4vw] pb-32">
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

        {/* === COMMERCIALS VIEW === */}
        {activeView === 'commercial' && (
          <motion.div
            key="commercial"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="pt-40 px-[4vw] min-h-screen pb-32"
          >
            <div className={`border-b pb-6 mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <h2 className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">COMMERCIALS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12">
              <AnimatePresence mode="popLayout">
                {COMMERCIAL_WORK.map((work) => (
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
          </motion.div>
        )}

        {/* === NARRATIVES VIEW === */}
        {activeView === 'narratives' && (
          <motion.div
            key="narratives"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={`pt-40 px-[4vw] min-h-screen pb-32 relative z-30 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}
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

      {/* SEAMLESS UNIFIED FOOTER BLOCK */}
      <div className={`relative z-40 w-full flex flex-col transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}>
        
        {/* TYPOGRAPHIC EDITORIAL FOOTER */}
        <footer ref={footerRef} className={`relative w-full pt-32 pb-8 px-[4vw] flex flex-col justify-between overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
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
