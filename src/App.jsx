import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
  "https://static.wixstatic.com/media/548938_f62846ba164e46ef9c722e67b3ae2076~mv2.jpg",
  "https://static.wixstatic.com/media/548938_995acf11ce4d45b3a3f9138bee23e6c1~mv2.jpg",
  "https://static.wixstatic.com/media/548938_e391b9d5756a4477b2211a2fc3dd03ae~mv2.jpg",
  "https://static.wixstatic.com/media/548938_5ecc695809b948df9069a41fdf9b30b7~mv2.jpg",
  "https://static.wixstatic.com/media/548938_2df5e88fe8bc4d94b08813b66e64735a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_45d7534b0f0b4479a1266b8ad050fd80~mv2.jpg",
  "https://static.wixstatic.com/media/548938_5473e8fd41ec4eefb537b72fa37de320~mv2.jpg",
  "https://static.wixstatic.com/media/548938_8ce2bc9c3b8743698d5bf83607b0a9c1~mv2.jpg",
  "https://static.wixstatic.com/media/548938_183660d8ee1c407ca2b61c65f2f09e33~mv2.jpg",
  "https://static.wixstatic.com/media/548938_1b29c53bb37940488f781b277b235d4d~mv2.jpg",
  "https://static.wixstatic.com/media/548938_aad3e1b45dfd47ff89cbdcd39c156264~mv2.jpg",
  "https://static.wixstatic.com/media/548938_3f6d40bd67aa4ea495d8922d6f73214a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_00fc91a3e95149d09ce2064f4ebbf149~mv2.jpg",
  "https://static.wixstatic.com/media/548938_3a0fb42b407d40f691ae9bb59fd51d5a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_d515d2de1ed045ef92b955c14d6753df~mv2.jpg",
  "https://static.wixstatic.com/media/548938_0a940d6217ad436faab14175cc4bb5b2~mv2.jpg"
];

const VIMEO_PROFILE = 'https://vimeo.com/siddharthdop';

const SELECTED_WORK = [
  {
    id: '01',
    title: 'KAALA TRAILER',
    year: '2023',
    type: 'WEBSERIES',
    image: 'https://i.vimeocdn.com/video/2157760051-1d42c761e02d837191c4c011e9474b278ffbf80fe14c91c264fae945ecb5e05c-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/874840844',
  },
  {
    id: '02',
    title: 'DUET — TRAILER',
    year: '2026',
    type: 'SHORT FILM',
    image: 'https://i.vimeocdn.com/video/2183812349-79b371485af04b26078db91c7de4eb4f22468ac342bd837df1d789e91b2644cb-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1213203318',
  },
  {
    id: '03',
    title: 'SBI X R ASHWIN',
    year: '2025',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2073749699-293d89dc66bcc482a9b7d878b2a490097059ef54864b4b4fd585feb96f2c0fbc-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1130153129',
  },
];

const NARRATIVE_WORK = [
  {
    id: 1,
    title: 'KAALA',
    info: 'HOTSTAR | WEBSERIES TEASER',
    poster: 'https://i.vimeocdn.com/video/1739105513-07073d98c87993ef1f14236f4c23a6aca90335e583316bbe1904a8f7d072d253-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/874827009',
  },
  {
    id: 2,
    title: 'GUILTY MINDS',
    info: 'AMAZON PRIME | SERIES TRAILER',
    poster: 'https://i.vimeocdn.com/video/2157761084-c2f60fd7c587780f435c296d53c045b9cfddced4366831012a8fe7ff1bd0c0e2-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1076651680',
  },
];

const COMMERCIAL_WORK = [
  {
    id: 1,
    title: 'ORALAND X SKY',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2170653403-84eeea23fd2d8be3dc278abfcac15edfad3d352f622b8b28f3076307faeb5473-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1202805509',
  },
  {
    id: 2,
    title: 'SONY SPORTS — RAKESH BEDI',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2167617865-d6b4b183cb7a204692d40356c570a47d4162c448de3705e68ab90157a4312c75-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1200507675',
  },
  {
    id: 3,
    title: 'VIVO V50',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1985808395-d239c3e4048ba9119ef969c823a2479f92bab1f95b8fee960b8c740490ee2b45-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1059452766',
  },
  {
    id: 4,
    title: 'AMAZON MX PLAYER',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1981624915-e4b17936c1a6856f46d62e6b43f845e37264b2230aa37543c87b02f6b7db79fd-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1054564777',
  },
];

const getPagination = (current, total, windowSize = 5) => {
  const start = Math.floor(current / windowSize) * windowSize;
  const visibleCount = Math.min(windowSize, total - start);

  return Array.from({ length: visibleCount }, (_, index) => start + index);
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
  }, []);

  useEffect(() => {
    if (activeView !== 'home') return;

    // Keep every hero image on screen for 9 seconds.
    // This timeout restarts after manual navigation so no slide changes early.
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 9000);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, activeView]);

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
  
  return (
    <div className={`siddharth-site min-h-screen overflow-x-clip selection:bg-neutral-500/30 font-sans transition-colors duration-1000 ease-in-out ${theme === 'dark' ? 'bg-[#050505] text-[#ededed]' : 'bg-[#f4f4f4] text-[#111111]'}`}>
      <style>{`
        :root {
          --site-gutter: clamp(1rem, 4vw, 6rem);
        }

        html,
        body,
        #root {
          min-width: 0;
          overflow-x: clip;
        }

        .site-frame {
          width: min(100%, 2400px);
          margin-inline: auto;
        }

        .site-gutter {
          padding-left: max(var(--site-gutter), env(safe-area-inset-left));
          padding-right: max(var(--site-gutter), env(safe-area-inset-right));
        }

        .site-header {
          padding-top: max(clamp(1rem, 3vh, 2.5rem), env(safe-area-inset-top));
        }

        .hero-section {
          min-height: 100svh;
          padding-top: clamp(6.75rem, 12vh, 10rem);
          padding-bottom: max(clamp(2rem, 6vh, 5rem), env(safe-area-inset-bottom));
        }

        .hero-stage {
          height: clamp(20rem, 68svh, 75rem);
        }

        .footer-wordmark {
          font-size: clamp(2.25rem, 5.5vw, 7rem);
        }

        @media (max-width: 359px) {
          :root {
            --site-gutter: 0.75rem;
          }

          .brand-title {
            max-width: 7rem;
            font-size: 9px;
            line-height: 1.15;
          }

          .header-nav-label {
            font-size: 8px;
            letter-spacing: 0.12em;
          }

          .hero-page-button:not([aria-current='true']) {
            display: none;
          }

          .hero-stage {
            height: 58svh;
          }
        }

        @media (orientation: landscape) and (max-height: 600px) {
          .site-header {
            padding-top: max(0.75rem, env(safe-area-inset-top));
          }

          .hero-section {
            min-height: 100dvh;
            padding-top: 4.75rem;
            padding-bottom: max(1rem, env(safe-area-inset-bottom));
          }

          .hero-stage {
            height: 58dvh;
            min-height: 13rem;
          }

          .hero-lower-nav {
            margin-top: 0.75rem;
          }
        }

        @media (min-width: 1800px) {
          .hero-stage {
            width: min(92vw, 2200px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .siddharth-site *,
          .siddharth-site *::before,
          .siddharth-site *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      {/* Fixed Header */}
      <header className={`site-frame site-gutter site-header fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 pb-4 sm:pb-6 flex justify-between items-start gap-3 pointer-events-none transition-colors duration-1000 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <div 
          onClick={() => { setActiveView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
          className="min-w-0 flex flex-col items-center cursor-pointer pointer-events-auto group w-fit"
        >
          <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-2 text-center">
            <h1 className="brand-title font-sans text-[clamp(10px,1.5vw,18px)] tracking-[0.12em] sm:tracking-widest uppercase font-semibold leading-none whitespace-normal sm:whitespace-nowrap">Siddharth Srinivasan</h1>
            <p className="font-mono text-[8px] sm:text-[10px] md:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase mt-1.5 sm:mt-2 opacity-80">DOP</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-6 lg:gap-12 pointer-events-auto">
          <button onClick={scrollToAbout} className="group cursor-pointer w-fit overflow-hidden py-2 px-1">
             <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-4">
               <span className="header-nav-label font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase">ABOUT</span>
             </div>
          </button>
          <button onClick={scrollToFooter} className="group cursor-pointer w-fit overflow-hidden py-2 px-1">
             <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-4">
               <span className="header-nav-label font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase">CONTACT</span>
             </div>
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`relative flex shrink-0 items-center w-12 h-6 sm:w-14 sm:h-7 rounded-full p-1 transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#e5e5e5]'}`}
            aria-label="Toggle Theme"
            aria-pressed={theme === 'dark'}
          >
            <div 
              className={`absolute left-1 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm overflow-hidden transition-all duration-700 ease-[0.19,1,0.22,1] ${
                theme === 'dark' ? 'translate-x-6 sm:translate-x-7 rotate-[360deg] bg-black' : 'translate-x-0 rotate-0 bg-white'
              }`}
            >
              {/* Light Mode Icon (f/2.8) */}
              <svg className={`absolute w-3 h-3 text-black transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12,4 18.9,8 18.9,16 12,20 5.1,16 5.1,8" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="20.7" y1="7" x2="18.9" y2="8" />
                <line x1="20.7" y1="17" x2="18.9" y2="16" />
                <line x1="12" y1="22" x2="12" y2="20" />
                <line x1="3.3" y1="17" x2="5.1" y2="16" />
                <line x1="3.3" y1="7" x2="5.1" y2="8" />
              </svg>

              {/* Dark Mode Icon (f/8) */}
              <svg className={`absolute w-3 h-3 text-white transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12,8 15.5,10 15.5,14 12,16 8.5,14 8.5,10" />
                <line x1="12" y1="2" x2="12" y2="8" />
                <line x1="20.5" y1="7" x2="15.5" y2="10" />
                <line x1="20.5" y1="17" x2="15.5" y2="14" />
                <line x1="12" y1="22" x2="12" y2="16" />
                <line x1="3.5" y1="17" x2="8.5" y2="14" />
                <line x1="3.5" y1="7" x2="8.5" y2="10" />
              </svg>
            </div>
          </button>
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
            <section className="site-frame hero-section relative w-full flex flex-col items-center justify-center">
              
              {/* Viewport-aware stage: contained on phones, tablets and ultra-wide screens. */}
              <div className="hero-stage w-[calc(100%_-_2rem)] sm:w-[94vw] max-w-[2200px] min-h-0 relative flex flex-col pointer-events-auto justify-center items-center">
                
                <div className="w-full min-h-0 flex-1 relative flex justify-center items-center overflow-hidden">
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={currentImageIndex}
                      src={HERO_IMAGES[currentImageIndex]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      // Increased transition duration to 2.5s for a much slower, softer dissolve
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                      className="absolute w-full h-full object-contain"
                      alt={`Cinematic still ${currentImageIndex + 1} of ${HERO_IMAGES.length}`}
                    />
                  </AnimatePresence>
                </div>

                <div className="w-full mt-4 sm:mt-6 lg:mt-8 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-4">
                   
                   {/* Left-aligned Previous Button */}
                   <button 
                     onClick={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
                     disabled={currentImageIndex === 0}
                     aria-label="Show previous image"
                     className={`font-mono text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap disabled:opacity-25 disabled:cursor-not-allowed ${
                       theme === 'dark' ? 'text-neutral-400 enabled:hover:text-white' : 'text-neutral-500 enabled:hover:text-black'
                     }`}
                   >
                     <span className="text-[10px] md:text-xs mb-[2px]">←</span>
                     <span className="hidden sm:inline">PREV</span>
                   </button>

                   {/* Center-aligned Numbers */}
                   <div className="min-w-0 flex justify-center gap-1 sm:gap-2 md:gap-4 items-center">
                      {getPagination(currentImageIndex, HERO_IMAGES.length).map((page, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(page)}
                          aria-label={`Show image ${page + 1}`}
                          aria-current={page === currentImageIndex ? 'true' : undefined}
                          className={`hero-page-button font-mono text-[10px] sm:text-[11px] md:text-sm tracking-widest transition-colors duration-300 min-w-[20px] sm:min-w-[24px] text-center ${
                            page === currentImageIndex 
                              ? (theme === 'dark' ? 'text-white font-bold' : 'text-black font-bold') 
                              : (theme === 'dark' ? 'text-neutral-600 hover:text-white' : 'text-neutral-400 hover:text-black')
                          }`}
                        >
                          {page + 1}
                        </button>
                      ))}
                   </div>
                   
                   {/* Right-aligned Next Button */}
                   <button 
                     onClick={() => setCurrentImageIndex((prev) => Math.min(prev + 1, HERO_IMAGES.length - 1))}
                     disabled={currentImageIndex === HERO_IMAGES.length - 1}
                     aria-label="Show next image"
                     className={`font-mono text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap disabled:opacity-25 disabled:cursor-not-allowed ${
                       theme === 'dark' ? 'text-neutral-400 enabled:hover:text-white' : 'text-neutral-500 enabled:hover:text-black'
                     }`}
                   >
                     <span className="hidden sm:inline">NEXT</span>
                     <span className="text-[10px] md:text-xs mb-[2px]">→</span>
                   </button>
                </div>
              </div>

              {/* Normal-flow positioning prevents overlap on short landscape screens. */}
              <div className="site-gutter hero-lower-nav w-full mt-8 sm:mt-10 flex justify-between items-end gap-4 pointer-events-none z-40">
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
                            {/* Updated to "COMMERCIALS" */}
                            <span className={`font-mono text-[clamp(11px,2vw,20px)] tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>COMMERCIALS</span>
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
                            <span className={`font-mono text-[clamp(11px,2vw,20px)] tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:-translate-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>NARRATIVES</span>
                        </div>
                        <div className={`w-full h-[1px] mt-1 relative overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                           <div className={`absolute inset-0 origin-right scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 ${theme === 'dark' ? 'bg-white/50' : 'bg-black/50'}`} />
                        </div>
                    </div>
                  </motion.div>
              </div>
            </section>

            <section ref={nextSectionRef} className="site-frame relative z-30 w-full pt-12 sm:pt-20 lg:pt-32">
              
              {/* ABOUT SECTION */}
              <div ref={aboutRef} className="site-gutter w-full pt-6 sm:pt-8 pb-20 sm:pb-28 lg:pb-48 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">
                  <div className="lg:col-span-4 flex items-center gap-3 sm:gap-4">
                    <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                    <h2 className={`font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>About</h2>
                  </div>
                  <div className="lg:col-span-8">
                    <h3 className="max-w-6xl text-[clamp(1.25rem,2.5vw,3rem)] font-sans font-light leading-[1.3] tracking-wide">
                      Siddharth Srinivasan is a cinematographer crafting imagery that defies convention. Based in Mumbai, he works globally across commercial and narrative formats, exploring the quiet intersections of human emotion and cinematic restraint.
                    </h3>
                  </div>
                </div>
              </div>

              {/* SELECTED WORKS GRID */}
              <div className="site-gutter w-full pb-20 sm:pb-28 lg:pb-32">
                <div className={`flex justify-between items-end gap-4 border-b pb-4 sm:pb-6 mb-10 sm:mb-14 lg:mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                  <h2 className={`font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Selected Work</h2>
                  <span className={`font-mono text-[10px] tracking-widest ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>03 / {SELECTED_WORK.length.toString().padStart(2, '0')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 sm:gap-y-20 lg:gap-y-32 gap-x-6 lg:gap-x-12">
                  {SELECTED_WORK.map((project, i) => (
                    <motion.a 
                      key={project.id} 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${project.title} on Vimeo`}
                      className={`min-w-0 flex flex-col group cursor-pointer ${i % 2 !== 0 ? 'md:mt-20 lg:mt-32' : ''}`}
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <div className={`w-full aspect-[4/3] overflow-hidden mb-4 sm:mb-6 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 ease-[0.19,1,0.22,1] group-hover:scale-105" />
                      </div>
                      <div className="min-w-0 flex justify-between items-start gap-4">
                        <div className="min-w-0">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans uppercase font-light tracking-wide leading-tight mb-2 break-words">{project.title}</h3>
                          <p className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{project.type}</p>
                        </div>
                        <span className={`font-mono text-[10px] tracking-widest ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>{project.year}</span>
                      </div>
                    </motion.a>
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
            className="site-frame site-gutter pt-28 sm:pt-32 lg:pt-40 min-h-[100svh] pb-20 sm:pb-28 lg:pb-32"
          >
            <div className={`border-b pb-4 sm:pb-6 mb-10 sm:mb-14 lg:mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <h2 className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">COMMERCIALS</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-14 sm:gap-y-20 lg:gap-y-24 gap-x-5 md:gap-x-8 lg:gap-x-12">
              <AnimatePresence mode="popLayout">
                {COMMERCIAL_WORK.map((work) => (
                  <motion.a
                    key={work.id}
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${work.title} on Vimeo`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="min-w-0 w-full flex flex-col group cursor-pointer"
                  >
                    <div className={`w-full aspect-video overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                       <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 ease-[0.19,1,0.22,1] group-hover:scale-105" />
                    </div>
                    <div className="min-w-0 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:gap-4 mt-4 sm:mt-6">
                       <h3 className="min-w-0 text-xl sm:text-2xl lg:text-3xl font-sans uppercase font-light tracking-wide leading-tight break-words">{work.title}</h3>
                       <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{work.category}</span>
                    </div>
                  </motion.a>
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
            className={`site-frame site-gutter pt-28 sm:pt-32 lg:pt-40 min-h-[100svh] pb-20 sm:pb-28 lg:pb-32 relative z-30 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}
          >
            <div className={`border-b pb-4 sm:pb-6 mb-10 sm:mb-14 lg:mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <h2 className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">NARRATIVES</h2>
            </div>
            
            <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
              {NARRATIVE_WORK.map((work) => (
                 <motion.a
                    key={work.id}
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${work.title} on Vimeo`}
                    className="min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center group"
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                 >
                    <div className={`lg:col-span-5 aspect-video lg:aspect-[3/4] overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                       <img src={work.poster} alt={work.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="lg:col-span-7 min-w-0 flex flex-col max-w-2xl">
                       <h3 className="text-[clamp(1.75rem,3vw,4rem)] font-sans uppercase font-light tracking-tight leading-none mb-4 sm:mb-6 break-words">{work.title}</h3>
                       <p className={`font-mono text-xs md:text-sm tracking-wide leading-relaxed uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                         {work.info}
                       </p>
                    </div>
                 </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEAMLESS UNIFIED FOOTER BLOCK */}
      <div className={`relative z-40 w-full flex flex-col transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}>
        
        {/* TYPOGRAPHIC EDITORIAL FOOTER */}
        <footer ref={footerRef} className={`site-frame site-gutter relative w-full pt-20 sm:pt-24 lg:pt-32 pb-6 sm:pb-8 flex flex-col justify-between overflow-hidden transition-colors duration-1000 scroll-mt-20 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-10 sm:gap-12 xl:gap-6 mb-16 sm:mb-24 lg:mb-28 w-full">
              <div className="sm:col-span-1 xl:col-span-3 min-w-0 flex flex-col">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Profile</span>
                  <p className={`max-w-md font-mono text-[10px] md:text-xs tracking-[0.08em] sm:tracking-[0.1em] uppercase leading-relaxed xl:pr-6 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      Siddharth Srinivasan is a cinematographer crafting imagery that defies convention, working globally across commercial and narrative formats.
                  </p>
              </div>

              <div className="sm:col-span-1 xl:col-span-4 min-w-0 flex flex-col">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Direct Inquiries</span>
                  <a href="mailto:hello@siddharth.com" className={`max-w-full text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-[1.1] break-words hover:italic transition-all duration-300 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>HELLO@SIDDHARTH.COM</a>
                  <a href="tel:+919876543210" className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-none whitespace-nowrap hover:italic transition-all duration-300 mt-4 sm:mt-6 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>+91 98765 43210</a>
              </div>

              <div className="sm:col-span-1 xl:col-span-3 min-w-0 flex flex-col">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Network</span>
                  <a href={VIMEO_PROFILE} target="_blank" rel="noopener noreferrer" className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-[1.1] hover:italic transition-all duration-300 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>VIMEO</a>
                  <a href="#" className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-none hover:italic transition-all duration-300 mt-4 sm:mt-6 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>INSTAGRAM</a>
              </div>

              <div className="sm:col-span-1 xl:col-span-2 min-w-0 flex flex-col xl:items-end text-left xl:text-right">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Base</span>
                  <p className="text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-[1.1]">MUMBAI</p>
                  <p className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-none mt-2 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>INDIA</p>
                  <div className="mt-5 sm:mt-8 flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                     <span className={`font-mono text-[9px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Available Worldwide</span>
                  </div>
              </div>
           </div>

           <div className={`w-full flex justify-center items-end border-t pt-6 sm:pt-8 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'}`}>
              <h1 className="footer-wordmark max-w-full text-center font-sans font-light tracking-[-0.055em] uppercase leading-[0.9] whitespace-nowrap">SIDDHARTH</h1>
           </div>
           <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-6 mt-5 sm:mt-6 pb-[env(safe-area-inset-bottom)]">
               <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>© {new Date().getFullYear()}</span>
               <span className={`font-mono text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>ALL RIGHTS RESERVED</span>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
