import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
  "https://i.vimeocdn.com/video/2170653403-84eeea23fd2d8be3dc278abfcac15edfad3d352f622b8b28f3076307faeb5473-d_590x332?region=us",
  "https://i.vimeocdn.com/video/2033495672-f363e28eae56363a29efccc37fc0373957dbe99b9dc99364c5f346c59b33f573-d_590x332?region=us",
  "https://i.vimeocdn.com/video/2167617865-d6b4b183cb7a204692d40356c570a47d4162c448de3705e68ab90157a4312c75-d_590x332?region=us"
];

const HERO_CAPTIONS = [
  "CRAFTING AVANT GARDE IMAGERY FOR BRANDS, FILMS AND STORIES THAT DEFY CONVENTION.",
  "EXPLORING THE QUIET INTERSECTIONS OF HUMAN EMOTION AND CINEMATIC RESTRAINT.",
  "DOCUMENTING THE SPACE BETWEEN FRAMES WITH RAW, UNFILTERED AUTHENTICITY."
];

const COMMERCIAL_PROJECTS = [
  { id: '01', title: 'VIVO V27', type: 'COMMERCIAL', year: '2023', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
  { id: '02', title: 'NIKE - BEYOND', type: 'PROMO', year: '2023', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
  { id: '03', title: 'VOGUE INDIA', type: 'FASHION', year: '2022', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
  { id: '04', title: 'ROYAL ENFIELD', type: 'AUTOMOBILE', year: '2022', image: 'https://images.unsplash.com/photo-1470229722913-7c092fb6224d?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
];

const NARRATIVE_PROJECTS = [
  { id: '01', title: 'KAALA', type: 'WEB SERIES', year: '2023', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
  { id: '02', title: 'GUILTY MINDS', type: 'SERIES', year: '2022', image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
  { id: '03', title: 'INERTIA', type: 'SHORT FILM', year: '2021', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
  { id: '04', title: 'THE ABSENCE', type: 'SHORT FILM', year: '2020', image: 'https://images.unsplash.com/photo-1518131672697-613bc04af255?q=80&w=2000&auto=format&fit=crop', link: 'https://vimeo.com/siddharthdop' },
];

const RECOGNITION = [
  { year: '2023', title: 'CANNES LIONS', category: 'SHORTLIST - CINEMATOGRAPHY' },
  { year: '2022', title: 'VIMEO STAFF PICK', category: 'BEST NARRATIVE SHORT' },
  { year: '2022', title: 'BERLINALE', category: 'OFFICIAL SELECTION' },
  { year: '2021', title: 'KODAK FILM AWARDS', category: 'EMERGING CINEMATOGRAPHER' },
];

const CLIENTS = ["NIKE", "VOGUE", "ROYAL ENFIELD", "VIVO", "NETFLIX", "AMAZON PRIME", "GQ", "PORSCHE", "SONY MUSIC"];

const STILLS_GALLERY = [
  { type: 'portrait', src: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1200&auto=format&fit=crop' },
  { type: 'landscape', src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop' },
  { type: 'portrait', src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop' },
  { type: 'ultrawide', src: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop' },
];

const NavBar = ({ currentView, setCurrentView, isAppLoaded, theme, setTheme }) => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={isAppLoaded ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
      transition={{ duration: 1, delay: isAppLoaded ? 0.8 : 0, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-[3vw] py-8 flex justify-between items-start pointer-events-auto mix-blend-difference text-white"
    >
      <div className="flex flex-col cursor-pointer" onClick={() => setCurrentView('home')}>
        <span className="font-sans font-medium text-[clamp(12px,1.2vw,16px)] tracking-[0.2em] uppercase">Siddharth Srinivasan</span>
        <span className="font-mono text-[clamp(8px,0.8vw,10px)] tracking-widest mt-1 uppercase text-neutral-400">DOP</span>
      </div>
      
      <div className="flex items-center gap-12">
        {/* Menu items temporarily hidden 
        {['COMMERCIAL', 'NARRATIVES', 'ABOUT', 'CONTACT'].map((item) => (
          <button 
            key={item}
            onClick={() => setCurrentView(item.toLowerCase())}
            className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${currentView === item.toLowerCase() ? 'border-b pb-1 border-current' : 'text-neutral-500 hover:text-white'}`}
          >
            {item}
          </button>
        ))}
        */}

        {/* Premium Pill Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`relative w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-500 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}
          aria-label="Toggle Theme"
        >
          <div className={`absolute w-4 h-4 rounded-full shadow-md transform transition-transform duration-500 ease-[0.19,1,0.22,1] flex items-center justify-center ${theme === 'dark' ? 'translate-x-6 bg-white text-black' : 'translate-x-0 bg-white text-black'}`}>
              {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-2.5 h-2.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-2.5 h-2.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
          </div>
        </button>
      </div>
    </motion.nav>
  );
};

const Home = ({ navigate, isAppLoaded, theme }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const words = ["SCULPTING", "LIGHT", "AND TIME."];

  useEffect(() => {
    if (!isAppLoaded) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 10000); 
    return () => clearInterval(timer);
  }, [isAppLoaded]);

  return (
    <div className={`w-full min-h-screen transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-[#f4f4f4] text-[#0A0A0A]'}`}>
      
      {/* 1. STICKY HERO SECTION */}
      <section className={`sticky top-0 w-full h-[100dvh] overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-[#e5e5e5]'}`}>
        
        {/* Cinematic Slideshow Background - 100% Color */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 1.5 } }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute inset-0 z-0 origin-center bg-black"
          >
            <motion.div 
               initial={{ scale: 1 }}
               animate={{ scale: 1.15 }}
               transition={{ duration: 10, ease: 'linear' }}
               className="w-full h-full"
            >
                <img 
                  src={HERO_IMAGES[currentSlide]} 
                  alt="Cinematic frame" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${theme === 'dark' ? 'opacity-90' : 'opacity-60'}`}
                />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* OVERLAYS: Deep Cinematic Gradients */}
        <div className={`absolute inset-0 z-10 pointer-events-none transition-colors duration-1000 ${theme === 'dark' ? 'bg-gradient-to-r from-black via-black/40 to-transparent' : 'bg-gradient-to-r from-[#f4f4f4] via-[#f4f4f4]/80 to-transparent'}`} />
        <div className={`absolute inset-0 z-10 pointer-events-none transition-colors duration-1000 ${theme === 'dark' ? 'bg-gradient-to-t from-black via-black/20 to-transparent' : 'bg-gradient-to-t from-[#f4f4f4] via-[#f4f4f4]/60 to-transparent'}`} />
        
        {/* LIGHT MODE MASK: Hides the baked-in Vimeo letterbox at the top */}
        {theme === 'light' && (
            <div className="absolute top-0 left-0 w-full h-[30vh] z-10 pointer-events-none bg-gradient-to-b from-[#f4f4f4] via-[#f4f4f4]/80 to-transparent transition-opacity duration-1000" />
        )}

        {/* Foreground Content - Absolute Positioning for perfect centering */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          {/* Vertically Centered Title Area - TRUE DEAD CENTER */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[3vw] w-full md:w-3/5 lg:w-2/3 flex flex-col leading-[1.05]">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden pb-1 md:pb-2">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={isAppLoaded ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 1.2, delay: isAppLoaded ? (0.8 + (i * 0.1)) : 0, ease: [0.19, 1, 0.22, 1] }}
                  className="text-[clamp(3rem,8.5vw,9rem)] font-sans font-light tracking-[0.1em] uppercase pointer-events-auto whitespace-nowrap"
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Strict Bottom Row Alignment */}
          <div className="absolute bottom-[8vh] left-[3vw] right-[3vw] flex justify-between items-end">
            
            {/* LEFT: Bottom Aligned View Reel Button */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isAppLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: isAppLoaded ? 1.6 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="flex items-center gap-4 md:gap-6 cursor-pointer group pointer-events-auto h-8"
              onClick={() => navigate('commercial')}
            >
              <span className={`font-mono text-[clamp(8px,1vw,12px)] tracking-[0.3em] uppercase transition-colors ${theme === 'dark' ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-500 group-hover:text-black'}`}>VIEW REEL</span>
              <div className={`w-12 md:w-24 h-[1px] transition-all duration-500 ${theme === 'dark' ? 'bg-neutral-700 group-hover:bg-white' : 'bg-neutral-400 group-hover:bg-black'}`} />
            </motion.div>

            {/* RIGHT: Dynamic Text & Pagination */}
            <div className="hidden md:flex flex-col items-end text-right">
                
                {/* Fixed Height Caption Container to prevent text clipping */}
                <div className="overflow-hidden mb-6 h-24 relative w-full flex justify-end items-end">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentSlide}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`font-mono text-[clamp(9px,1vw,12px)] tracking-[0.3em] uppercase leading-[1.6] max-w-xs md:max-w-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}
                        >
                            {HERO_CAPTIONS[currentSlide]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isAppLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: isAppLoaded ? 1.4 : 0, duration: 1 }}
                    className={`flex items-center justify-end w-full gap-4 md:gap-6 font-mono text-[clamp(9px,1vw,12px)] tracking-[0.2em] h-8 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}
                >
                    <div className="overflow-hidden h-4 relative w-4">
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={currentSlide}
                                initial={{ y: '100%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                exit={{ y: '-100%', opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className={`absolute inset-0 flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                            >
                                0{currentSlide + 1}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    
                    <div className={`w-[10vw] md:w-[15vw] max-w-[150px] h-[1px] relative overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-300'}`}>
                        <motion.div 
                            key={`progress-${currentSlide}`}
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 10, ease: 'linear' }}
                            className={`absolute top-0 left-0 w-full h-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                        />
                    </div>
                    
                    <span>0{HERO_IMAGES.length}</span>
                </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overlapping Scroll Section (Content layer) */}
      <section className={`relative z-20 w-full pt-32 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}>
        
        {/* DIRECTOR'S CUT / SHOWREEL */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="w-full flex flex-col mb-48 px-[3vw]"
        >
          <div className="flex justify-between items-end mb-12">
            <h2 className={`font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Director's Cut</h2>
          </div>
          <a href="https://vimeo.com/siddharthdop" target="_blank" rel="noreferrer" className="w-full aspect-video md:aspect-[21/9] bg-neutral-900 overflow-hidden relative group cursor-pointer block">
            <img src={HERO_IMAGES[1]} alt="Showreel" className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-700">
               <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-white text-white group-hover:text-black transition-all duration-500">
                  <span className="font-mono text-[10px] tracking-widest uppercase ml-1">Play</span>
               </div>
            </div>
          </a>
        </motion.div>

        {/* SELECTED WORK - Minimalist Staggered Grid */}
        <div className="w-full flex flex-col px-[3vw] mb-48">
          <div className="flex justify-between items-end mb-24">
            <h2 className={`font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Selected Work</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {COMMERCIAL_PROJECTS.slice(0, 4).map((project, i) => (
              <motion.div 
                key={i} 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: i % 2 === 0 ? 0 : 0.2, ease: [0.19, 1, 0.22, 1] }}
                className={`w-full flex flex-col ${i % 2 !== 0 ? 'md:mt-48' : ''}`} 
              >
                <a href={project.link} target="_blank" rel="noreferrer" className={`w-full aspect-[4/5] overflow-hidden group mb-8 block ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-200'}`}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1.5s] ease-[0.19,1,0.22,1]" />
                </a>
                <div className="flex flex-col gap-2">
                   <h3 className={`font-sans text-2xl md:text-4xl font-light uppercase tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                   <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>{project.type} &mdash; {project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RECOGNITION / AWARDS */}
        <div className="w-full px-[3vw] mb-48">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={`flex justify-between items-end border-b pb-6 mb-12 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}
          >
            <h2 className={`font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Recognition</h2>
          </motion.div>
          <div className="flex flex-col">
             {RECOGNITION.map((award, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row justify-between py-6 md:py-8 border-b group transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800 hover:border-white' : 'border-neutral-200 hover:border-black'}`}
                >
                  <div className="flex gap-12 md:gap-24 items-center">
                     <span className={`font-mono text-[10px] tracking-widest ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{award.year}</span>
                     <h3 className={`font-sans text-xl md:text-3xl font-light uppercase tracking-wide transition-colors duration-500 ${theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-neutral-600 group-hover:text-black'}`}>{award.title}</h3>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right flex items-center pl-[3.5rem] md:pl-0">
                     <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{award.category}</span>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* STILLS ARCHIVE - Visual Gallery */}
        <div className="w-full flex flex-col px-[3vw] pb-32">
          <div className="flex justify-between items-end mb-24">
            <h2 className={`font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Visual Archive</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {STILLS_GALLERY.map((still, i) => (
               <motion.div
                 key={i}
                 initial={{ y: 50, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ duration: 0.8, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                 className="break-inside-avoid overflow-hidden group cursor-pointer"
               >
                 <img src={still.src} alt="Archive Still" className={`w-full h-auto object-cover transition-all duration-1000 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
               </motion.div>
            ))}
          </div>
        </div>

        {/* INFINITE CLIENTS MARQUEE */}
        <div className={`w-full overflow-hidden py-16 md:py-32 border-y transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800 bg-[#070707]' : 'border-neutral-200 bg-[#ebebeb]'}`}>
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
             <div className="flex gap-16 md:gap-32 px-8 items-center">
               {/* Duplicate array for seamless loop */}
               {[...CLIENTS, ...CLIENTS].map((client, i) => (
                  <span key={i} className={`text-[clamp(3rem,6vw,7rem)] font-sans font-light tracking-tighter uppercase ${theme === 'dark' ? 'text-neutral-800' : 'text-neutral-300'}`}>
                     {client}
                  </span>
               ))}
             </div>
          </motion.div>
        </div>

      </section>

      {/* 3. STICKY PRE-FOOTER */}
      <section className={`sticky top-0 z-20 w-full h-[100dvh] px-[3vw] flex flex-col items-center justify-center transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#f4f4f4]'}`}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="w-full flex flex-col items-center text-center"
        >
          <p className={`font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-12 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Available for Global Commissions
          </p>
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
      </section>

      {/* 4. BRUTALIST TYPOGRAPHIC FOOTER */}
      <footer className={`relative z-30 w-full pt-32 pb-8 px-[3vw] flex flex-col justify-between overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#ebebeb] text-black'}`}>
         
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
  );
};

const ListView = ({ title, projects, description, navigate, theme }) => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`min-h-screen pt-40 px-[3vw] pb-24 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-[#f4f4f4] text-[#0A0A0A]'}`}
    >
      <div className={`flex flex-col md:flex-row justify-between items-start mb-24 gap-12 border-b pb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-sans font-light tracking-[0.2em] uppercase leading-none">{title}</h1>
        <p className={`font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase leading-relaxed max-w-xs pt-4 md:text-right ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
          {description}
        </p>
      </div>

      <div className="flex flex-col w-full">
        {projects.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noreferrer" className={`flex flex-col md:flex-row border-b py-8 md:py-16 group cursor-pointer transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800 hover:bg-neutral-900/50' : 'border-neutral-200 hover:bg-neutral-200/50'}`}>
            
            <div className="w-full md:w-1/4 flex flex-col justify-center mb-6 md:mb-0">
               <span className={`font-mono text-xs md:text-sm tracking-[0.3em] uppercase transition-colors ${theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-neutral-600 group-hover:text-black'}`}>{item.title}</span>
               {item.type && <span className={`font-mono text-[10px] tracking-[0.2em] mt-4 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>{item.type} • {item.year}</span>}
            </div>
            
            <div className="w-full md:w-2/4 flex justify-center items-center">
              <div className={`w-full md:w-[85%] aspect-[21/9] md:aspect-[3/1] overflow-hidden relative ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-200'}`}>
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-[1500ms] ease-out group-hover:scale-110" />
                 <div className={`absolute inset-0 transition-colors duration-700 ${theme === 'dark' ? 'bg-black/20 group-hover:bg-transparent' : 'bg-white/20 group-hover:bg-transparent'}`} />
              </div>
            </div>

            <div className="w-full md:w-1/4 flex justify-start md:justify-end items-center mt-6 md:mt-0">
               <span className={`font-mono text-xs md:text-sm tracking-[0.3em] transition-colors ${theme === 'dark' ? 'text-neutral-600 group-hover:text-neutral-400' : 'text-neutral-400 group-hover:text-neutral-600'}`}>{item.id}</span>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-24">
         <button onClick={() => navigate('home')} className={`font-mono text-[10px] tracking-[0.3em] flex items-center gap-4 group transition-colors ${theme === 'dark' ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'}`}>
            <span className="group-hover:-translate-x-2 transition-transform duration-300">←</span> BACK TO HOME
         </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [theme, setTheme] = useState('dark'); 

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsAppLoaded(true), 800);
      }
      setLoadingProgress(progress);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden font-sans transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0A0A0A] text-white selection:bg-white selection:text-black' : 'bg-[#f4f4f4] text-[#0A0A0A] selection:bg-black selection:text-white'}`}>
      
      <NavBar currentView={currentView} setCurrentView={setCurrentView} isAppLoaded={isAppLoaded} theme={theme} setTheme={setTheme} />
      
      <div className={`w-full h-[100dvh] flex items-center justify-center fixed inset-0 z-0 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#f4f4f4]'}`}>
          <motion.div 
            initial={{ scale: 0.9, borderRadius: '40px' }}
            animate={{ 
                scale: isAppLoaded ? 1 : 0.9, 
                borderRadius: isAppLoaded ? '0px' : '40px'
            }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            className={`w-full h-full overflow-hidden relative shadow-2xl transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#f4f4f4]'}`}
          >
              
              <AnimatePresence>
                {!isAppLoaded && (
                  <motion.div
                    key="preloader"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className={`absolute inset-0 z-[60] flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-[#f4f4f4] text-[#0A0A0A]'}`}
                  >
                     <motion.div 
                       exit={{ opacity: 0, scale: 0.95 }}
                       transition={{ duration: 0.4 }}
                       className="flex flex-col items-center gap-8"
                     >
                        <div className="overflow-hidden">
                            <motion.span 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`block font-mono text-[10px] tracking-[0.4em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}
                            >
                                Loading Archive
                            </motion.span>
                        </div>
                        
                        <div className={`w-64 h-[1px] relative overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-300'}`}>
                            <motion.div 
                                className={`absolute top-0 left-0 h-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                                initial={{ width: '0%' }}
                                animate={{ width: `${loadingProgress}%` }}
                                transition={{ ease: "linear", duration: 0.2 }}
                            />
                        </div>
                        
                        <span className={`font-mono text-[10px] tracking-[0.3em] ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                            {loadingProgress.toString().padStart(3, '0')}
                        </span>
                     </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`w-full h-full overflow-y-auto hide-scrollbar relative z-10 transition-colors duration-1000 ${theme === 'dark' ? 'bg-black' : 'bg-[#e5e5e5]'}`}>
                  <AnimatePresence mode="wait">
                      {currentView === 'home' && (
                          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <Home navigate={setCurrentView} isAppLoaded={isAppLoaded} theme={theme} />
                          </motion.div>
                      )}
                      {currentView === 'commercial' && (
                          <ListView 
                            key="commercial"
                            navigate={setCurrentView}
                            title="Commercial" 
                            description="A curated selection of commercial work exploring concept, composition and craft across different formats."
                            projects={COMMERCIAL_PROJECTS} 
                            theme={theme}
                          />
                      )}
                      {currentView === 'narratives' && (
                          <ListView 
                            key="narratives"
                            navigate={setCurrentView}
                            title="Narratives" 
                            description="Fictional worlds, raw emotion, visual poetry. A selection of narrative works across short films and episodic series."
                            projects={NARRATIVE_PROJECTS}
                            theme={theme}
                          />
                      )}
                      {(currentView === 'about' || currentView === 'contact') && (
                        <motion.div 
                            key="placeholder"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="min-h-screen pt-40 px-[3vw] flex items-center justify-center flex-col gap-8"
                        >
                          <p className={`font-mono tracking-[0.3em] uppercase text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>Please refer to the footer on the home view.</p>
                          <button onClick={() => setCurrentView('home')} className={`font-mono text-[10px] tracking-[0.3em] transition-colors border-b pb-1 ${theme === 'dark' ? 'text-white hover:text-neutral-500 border-white hover:border-neutral-500' : 'text-black hover:text-neutral-500 border-black hover:border-neutral-500'}`}>RETURN HOME</button>
                        </motion.div>
                      )}
                  </AnimatePresence>
              </div>

          </motion.div>
      </div>
    </div>
  );
}
