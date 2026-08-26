import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
  "https://static.wixstatic.com/media/548938_68a80886267941c6ba30f54a49a5f89d~mv2.png",
  "https://static.wixstatic.com/media/548938_b26ac6338a6340958f995f2f9139f042~mv2.jpg",
  "https://static.wixstatic.com/media/548938_693235626cde4240a802e8f159816c1e~mv2.jpg",
  "https://static.wixstatic.com/media/548938_6acfc125dd92439cb739c71cfd9fc470~mv2.jpg",
  "https://static.wixstatic.com/media/548938_ab4e6e1e06304510946f3168e92dfc8b~mv2.jpg",
  "https://static.wixstatic.com/media/548938_5c4cda34ef394704b82414d27a95f792~mv2.png",
  "https://static.wixstatic.com/media/548938_1f3d4f5061d44a0d9de2fed17652b6f5~mv2.png",
  "https://static.wixstatic.com/media/548938_878a3abfc96f4b64a9d14d473daba505~mv2.png",
  "https://static.wixstatic.com/media/548938_6c2d0884857a4233abb6ee548efd8fe8~mv2.png",
  "https://static.wixstatic.com/media/548938_dd62cb743bfd408885c6acdad50b67e6~mv2.jpg"
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

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [activeView, setActiveView] = useState('home');
  
  const footerRef = useRef(null);
  const aboutRef = useRef(null); 

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
          {/* Animated Navigation Links */}
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
            {}
            <section className="relative w-full min-h-screen pt-[18vh] pb-[8vh] px-[4vw] flex flex-col justify-between">
              
              {/* Framed Image Container enforcing 16:9 composition without stretching */}
              <div className="w-full md:w-[90%] mx-auto aspect-[16/9] relative overflow-hidden bg-black/5 rounded-sm">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentImageIndex}
                    src={HERO_IMAGES[currentImageIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    /* Simplified animation: Only dissolve, no more zooming/scaling */
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Cinematic Hero"
                  />
                </AnimatePresence>
              </div>

              {/* Foreground Links - Enlarged and placed clearly below the image frame */}
              <div className="w-full flex justify-between items-end mt-12 md:mt-16 md:w-[90%] mx-auto pointer-events-none">
                <div className="flex flex-col gap-6 md:gap-8 pointer-events-auto">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isAppLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: isAppLoaded ? 0.4 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="flex items-center gap-6 cursor-pointer group w-fit"
                    onClick={() => { setActiveView('commercial'); window.scrollTo(0,0); }}
                  >
                    <span className={`font-mono text-[clamp(20px,3vw,32px)] tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>COMMERCIAL</span>
                    <div className={`w-12 md:w-24 h-[1px] relative overflow-hidden ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`}>
                       <div className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isAppLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: isAppLoaded ? 0.6 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="flex items-center gap-6 cursor-pointer group w-fit"
                    onClick={() => { setActiveView('narratives'); window.scrollTo(0,0); }}
                  >
                    <span className={`font-mono text-[clamp(20px,3vw,32px)] tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>NARRATIVES</span>
                    <div className={`w-12 md:w-24 h-[1px] relative overflow-hidden ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`}>
                       <div className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {}
            <section className="relative z-30 w-full pt-16">
              
              {/* ABOUT SECTION - Placeholder ready for client copy */}
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

              {}
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

        {}
        {/* === COMMERCIALS VIEW (Full width grid) === */}
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

        {}
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

      {}
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
