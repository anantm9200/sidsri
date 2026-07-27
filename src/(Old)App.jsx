import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Instagram, Twitter, Mail, 
  MapPin, Calendar, Clock, ChevronRight, CheckCircle2 
} from 'lucide-react';

// --- GLOBAL STYLES & FONTS ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&family=Inter:wght@300;400;500;600&display=swap');
    
    :root {
      --bg-color: #FFFFFF;
      --text-main: #0A0A0A;
      --text-muted: #888888;
      --accent: #D4AF37;
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Repurposing the serif class to serve as our modern display sans-serif */
    h1, h2, h3, h4, h5, h6, .font-serif {
      font-family: 'Archivo', sans-serif !important;
    }

    /* Cinematic Noise Overlay */
    .noise-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-color);
    }
    ::-webkit-scrollbar-thumb {
      background: #E0E0E0;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #0A0A0A;
    }

    /* Selection */
    ::selection {
      background: var(--text-main);
      color: var(--bg-color);
    }

    /* Global Animated Underline (Replaces hover:italic) */
    .anim-underline {
      position: relative;
      display: inline-block;
    }
    .anim-underline::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: currentColor;
      transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .anim-underline:hover::after,
    .group:hover .anim-underline::after {
      width: 100%;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .clip-text {
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}} />
);

// --- DATA ---
const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'booking', label: 'Booking' },
  { id: 'contact', label: 'Contact' }
];

const GALLERY_DATA = [
  { id: 1, title: 'Nocturne in Black', category: 'Portraits', year: '2025', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Concrete Symphony', category: 'Personal Work', year: '2024', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'The Met Gala', category: 'Events', year: '2025', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Autumn Fall', category: 'Campaigns', year: '2024', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, title: 'Silent Echoes', category: 'Portraits', year: '2023', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, title: 'Urban Geometry', category: 'Personal Work', year: '2025', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop' },
  { id: 7, title: 'Midnight Premiere', category: 'Events', year: '2024', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop' },
  { id: 8, title: 'Desert Bloom', category: 'Campaigns', year: '2025', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop' },
];

const CATEGORIES = ['All', 'Portraits', 'Events', 'Campaigns', 'Personal Work'];

const BOOKING_TYPES = [
  { id: 'consultation', title: 'Consultation', desc: '1-on-1 strategy & planning session.' },
  { id: 'event', title: 'Event / Show', desc: 'Book for exclusive coverage or direction.' },
  { id: 'creative', title: 'Creative Session', desc: 'Studio or location-based portraiture.' },
  { id: 'collaboration', title: 'Collaboration', desc: 'Brand partnerships and artistic ventures.' }
];

// --- UI COMPONENTS ---

const Marquee = ({ text }) => {
  return (
    <div className="group w-full overflow-hidden whitespace-nowrap py-12 border-b border-neutral-100 flex items-center bg-white hover:bg-neutral-900 transition-colors duration-700 hover-target cursor-default">
      <motion.div
        className="inline-block text-[4vw] md:text-[3vw] font-serif text-neutral-900 group-hover:text-white transition-colors duration-700 uppercase tracking-widest px-4 leading-none"
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp;
      </motion.div>
    </div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
      animate={{
        x: mousePos.x - 8,
        y: mousePos.y - 8,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,1)'
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

const Button = ({ children, variant = 'outline', className = '', onClick, type = 'button' }) => {
  const baseStyle = "group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 font-medium tracking-wide transition-all duration-300 hover-target border";
  const variants = {
    outline: "border-neutral-900 text-neutral-900 hover:text-white",
    filled: "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800",
    light: "border-white bg-white text-neutral-900 hover:bg-neutral-200"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {variant === 'outline' && (
        <span className="absolute left-0 w-full h-0 transition-all duration-300 ease-out bg-neutral-900 top-1/2 group-hover:h-full group-hover:top-0 -z-10"></span>
      )}
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ImageParallax = ({ src, alt, className, imgClassName = "" }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y }}
        className={`w-full h-[120%] object-cover absolute top-0 left-0 ${imgClassName}`}
      />
    </div>
  );
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)' }}
    animate={{ opacity: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, filter: 'blur(10px)' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="min-h-screen pt-24 pb-12 w-full"
  >
    {children}
  </motion.div>
);

// --- LAYOUT COMPONENTS ---

const Header = ({ currentView, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const handleNav = (id) => {
    navigate(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 w-full ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="w-full px-[3vw] flex justify-between items-center">
          
          <div 
            className="flex flex-col cursor-pointer hover-target group"
            onClick={() => handleNav('home')}
          >
            <span className="text-2xl font-serif font-bold tracking-tighter leading-none group-hover:text-neutral-500 transition-colors">SIDDHARTH</span>
            <span className="text-[0.6rem] font-sans uppercase tracking-[0.4em] text-neutral-400 mt-1">Srinivasan</span>
          </div>

          <button 
            className="p-2 hover-target group flex flex-col gap-[5px] items-end" 
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="block w-8 h-[2px] bg-neutral-900 transition-all group-hover:w-6"></span>
            <span className="block w-6 h-[2px] bg-neutral-900 transition-all group-hover:w-8"></span>
          </button>
        </div>
      </header>

      {/* Right Swipe Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%', borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px' }}
              animate={{ x: 0, borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
              exit={{ x: '100%', borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px' }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#0A0A0A] text-white z-[70] shadow-2xl flex flex-col h-[100dvh]"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="p-6 md:p-8 flex justify-between items-center border-b border-white/10 shrink-0"
              >
                <span className="text-xs uppercase tracking-widest text-neutral-400">Menu</span>
                <button className="p-2 hover-target text-white hover:text-neutral-400 transition-transform hover:rotate-90 duration-300" onClick={() => setIsMenuOpen(false)}>
                  <X size={28} strokeWidth={1} />
                </button>
              </motion.div>
              
              <div className="flex-grow flex flex-col justify-center px-6 md:px-8 gap-0 overflow-y-auto hide-scrollbar">
                {NAV_LINKS.map((link, i) => (
                  <div key={link.id} className="overflow-hidden pb-4 pt-1 -mb-2">
                    <motion.button
                      initial={{ y: '130%', skewY: 10, rotateX: 20, opacity: 0 }}
                      animate={{ y: 0, skewY: 0, rotateX: 0, opacity: 1 }}
                      exit={{ y: '100%', opacity: 0 }}
                      transition={{ delay: 0.15 + (0.08 * i), duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                      onClick={() => handleNav(link.id)}
                      className={`text-5xl md:text-6xl font-serif text-left w-fit anim-underline pb-1 transition-colors hover-target leading-tight ${currentView === link.id ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
                    >
                      {link.label}
                    </motion.button>
                  </div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="p-6 md:p-8 border-t border-white/10 shrink-0"
              >
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Socials</p>
                <div className="flex gap-6">
                  <a href="#" className="text-white hover:text-neutral-400 transition-colors hover-target">Instagram</a>
                  <a href="#" className="text-white hover:text-neutral-400 transition-colors hover-target">Twitter</a>
                  <a href="#" className="text-white hover:text-neutral-400 transition-colors hover-target">LinkedIn</a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = ({ navigate }) => (
  <footer className="bg-[#080808] text-[#F7F5F0] pt-32 pb-12 px-[3vw] w-full">
    
    <div className="w-full border-b border-white/10 pb-24 mb-24 flex flex-col items-center justify-center text-center">
        <Reveal>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-neutral-400 mb-8">Next Steps</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-[10vw] md:text-[6vw] font-serif leading-none tracking-tighter mb-12 cursor-default w-fit anim-underline">Let's craft something meaningful.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <Button onClick={() => { navigate('booking'); window.scrollTo(0,0); }} variant="light" className="px-12 py-6 text-sm uppercase tracking-widest">
            Initiate Project
          </Button>
        </Reveal>
    </div>

    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
      <div className="md:col-span-2">
        <h3 className="font-serif text-3xl mb-6">Siddharth Srinivasan</h3>
        <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
          Images, stories, and moments — shaped with intention. Work that feels quiet, precise, and deeply considered. Available for select collaborations, events, and creative projects worldwide.
        </p>
      </div>
      
      <div>
        <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">Explore</h4>
        <ul className="space-y-3 text-sm text-neutral-300">
          {['Home', 'About', 'Gallery', 'Booking'].map(item => (
            <li key={item}>
              <button onClick={() => { navigate(item.toLowerCase()); window.scrollTo(0,0); }} className="hover:text-white transition-colors hover-target">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">Connect</h4>
        <div className="flex gap-4 mb-6">
          <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors hover-target"><Instagram size={18} /></a>
          <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors hover-target"><Twitter size={18} /></a>
          <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors hover-target"><Mail size={18} /></a>
        </div>
        <p className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer hover-target">hello@siddharthsrinivasan.com</p>
        <p className="text-sm text-neutral-400 mt-2">Mumbai / Global</p>
      </div>
    </div>
    
    <div className="w-full mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
      <p>&copy; {new Date().getFullYear()} Siddharth Srinivasan. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <button onClick={() => { navigate('terms'); window.scrollTo(0,0); }} className="hover:text-neutral-300 hover-target">Terms & Conditions</button>
        <button onClick={() => { navigate('refunds'); window.scrollTo(0,0); }} className="hover:text-neutral-300 hover-target">Cancellations & Refunds</button>
      </div>
    </div>
  </footer>
);

// --- PAGE COMPONENTS ---

const Home = ({ navigate, isAppLoaded }) => {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const philosophyText = "Crafting imagery that is quiet, precise, and deeply considered. We strip away the unnecessary to reveal the essential emotion within every frame.";
  const words = philosophyText.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <PageTransition>
      <div className="-mt-24 w-full">
        
        {/* Fixed Hero Section */}
        <section 
          className="fixed top-0 left-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-0 bg-white px-[3vw]"
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
        >
          
          <motion.div 
            initial={{ width: "10vw", height: "10vw", opacity: 0 }}
            animate={{ 
              width: isAppLoaded ? ["10vw", "100vw", "40vw"] : "10vw", 
              height: isAppLoaded ? ["10vw", "100vh", "70vh"] : "10vw",
              opacity: isAppLoaded ? 1 : 0
            }}
            transition={{ 
              duration: 2.5, 
              times: [0, 0.4, 1], 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2
            }}
            className="absolute z-10 overflow-hidden bg-neutral-100"
            style={{ y: heroParallax, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isAppLoaded ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
              className="w-full h-full relative"
            >
               <div className={`absolute inset-0 bg-gradient-to-br from-[#E8F0FE] via-[#F3F4F6] to-[#FCE7F3] transition-opacity duration-1000 ease-in-out ${isHeroHovered ? 'opacity-0' : 'opacity-100'}`}></div>
               <div className={`absolute inset-0 bg-gradient-to-tr from-[#FFF0F5] via-[#E6E6FA] to-[#E0FFFF] transition-opacity duration-1000 ease-in-out ${isHeroHovered ? 'opacity-100' : 'opacity-0'}`}></div>
               <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD1FF]/20 via-transparent to-[#AEE1FF]/20 mix-blend-multiply pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 pointer-events-none"></div>
            </motion.div>
          </motion.div>
          
          <div className="absolute bottom-[10vh] left-0 w-full z-20 flex flex-col items-center justify-center text-center mix-blend-difference text-white pointer-events-none px-[3vw]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isAppLoaded ? 1 : 0, y: isAppLoaded ? 0 : 40 }}
              transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <h1 className="text-[17vw] md:text-[14vw] font-serif tracking-tighter leading-[0.85] mb-4 w-full">
                Siddharth<br/>Srinivasan
              </h1>
              
              <div className="pointer-events-auto mt-4 md:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[3vw] md:text-[1.5vw] lg:text-[1vw] font-sans uppercase tracking-[0.4em] text-neutral-300">
                <span className="relative inline-block group/word cursor-pointer hover-target">
                  Visual Craft
                  <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-neutral-300 transition-all duration-300 ease-out group-hover/word:w-full"></span>
                </span>
                <span>&middot;</span>
                <span className="relative inline-block group/word cursor-pointer hover-target">
                  Director
                  <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-neutral-300 transition-all duration-300 ease-out group-hover/word:w-full"></span>
                </span>
                <span>&middot;</span>
                <span className="relative inline-block group/word cursor-pointer hover-target">
                  Storyteller
                  <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-neutral-300 transition-all duration-300 ease-out group-hover/word:w-full"></span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sliding Content Container */}
        <div className="relative z-10 w-full mt-[100vh] bg-white shadow-[0_-30px_60px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden">
          
          <section className="w-full">
            <Reveal>
               <Marquee text="VISUAL CRAFT • CINEMATIC RESTRAINT • BOLD STORYTELLING" />
            </Reveal>
          </section>

          <section className="py-20 md:py-32 w-full px-[3vw] flex items-center justify-center text-center relative overflow-hidden min-h-[50vh]">
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max pointer-events-none z-0"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 0.015, scale: 1 }}
               viewport={{ once: false, margin: "-100px" }}
               transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="flex gap-[10vw]">
                 <span className="text-[25vw] font-serif font-black uppercase leading-none tracking-tighter">INTENTION &middot; VISION</span>
              </div>
            </motion.div>

            <div className="max-w-5xl relative z-10 w-full flex flex-col items-center justify-center">
              <motion.h2 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-[6vw] md:text-[3.5vw] font-serif leading-[1.3] md:leading-[1.4] tracking-tight text-neutral-900 flex flex-wrap justify-center content-center w-full gap-[1vw] md:gap-[0.5vw]"
              >
                {words.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block pb-2 -mb-2">
                    <motion.span variants={wordVariants} className="inline-block">{word}</motion.span>
                  </span>
                ))}
              </motion.h2>
            </div>
          </section>

          {/* Cinematic Showreel Section */}
          <section className="w-full px-[3vw] py-12 md:py-24">
            <Reveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <h2 className="text-4xl md:text-[4vw] font-serif tracking-tighter leading-none">Director's Reel</h2>
                <p className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-400 mt-4 md:mt-0">Selected Cuts &middot; 2026</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden group cursor-pointer hover-target">
                {/* Simulated Video Poster */}
                <ImageParallax
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop"
                  alt="Director's Showreel"
                  className="w-full h-full"
                  imgClassName="opacity-60 group-hover:opacity-40 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center relative overflow-hidden transition-transform duration-700 group-hover:scale-110"
                  >
                    {/* Hover reveal background */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.19,1,0.22,1]"></div>
                    
                    {/* Play Icon */}
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-black transition-colors duration-700 relative z-10 ml-2"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </motion.div>
                </div>

                {/* Subtitle / Duration */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between text-white/70 text-xs font-sans uppercase tracking-[0.2em]">
                  <span>Play Full Reel</span>
                  <span>02:45</span>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Selected Works Grid */}
          <section className="pt-12 pb-32 w-full px-[3vw]">
            <Reveal>
              <div className="flex justify-between items-end mb-16 md:mb-20 border-b border-neutral-200 pb-8">
                <h2 className="text-5xl md:text-[5vw] font-serif tracking-tighter leading-none">Selected Works</h2>
                <button onClick={() => { navigate('gallery'); window.scrollTo(0,0); }} className="text-xs font-sans uppercase tracking-[0.2em] flex items-center gap-4 hover:text-neutral-500 transition-colors hover-target group">
                  Explore Archive <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {GALLERY_DATA.slice(0, 4).map((item, i) => (
                <Reveal key={item.id} delay={i * 0.1} className={`group cursor-pointer hover-target ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                  <div className="overflow-hidden bg-neutral-100 aspect-[3/4] relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-widest font-sans opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">View Project</span>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-400 mb-2">{item.category} — {item.year}</p>
                  <h3 className="text-3xl font-serif anim-underline w-fit">{item.title}</h3>
                </div>
              </Reveal>
            ))}
            </div>
          </section>

          {/* Disciplines Section */}
          <section className="py-32 bg-[#0A0A0A] text-white px-[3vw] w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
              <Reveal>
                <h2 className="text-[10vw] md:text-[6vw] font-serif leading-none tracking-tighter sticky top-32">Disciplines.</h2>
              </Reveal>
              <div className="flex flex-col gap-12 pt-4">
                {[
                  { title: "Creative Direction", desc: "Guiding the visual language of brands and artists from conception to final execution, ensuring narrative cohesion." },
                  { title: "Editorial Photography", desc: "High-end portraiture and fashion imagery focused on lighting, texture, and capturing authentic human presence." },
                  { title: "Cinematography", desc: "Moving images crafted with intentionality, designed for commercial campaigns, music videos, and short films." }
                ].map((skill, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="border-b border-white/20 pb-12 group cursor-default">
                      <h3 className="text-3xl font-serif mb-4 anim-underline w-fit group-hover:text-neutral-300 transition-colors">{skill.title}</h3>
                      <p className="text-neutral-400 font-light leading-relaxed max-w-md">{skill.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Parallax Image Break */}
          <section className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative">
            <ImageParallax
              src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2000&auto=format&fit=crop"
              alt="Cinematic Lens and Craft"
              className="w-full h-full"
              imgClassName="grayscale opacity-90"
            />
          </section>

          {/* The Approach Section */}
          <section className="py-24 md:py-32 w-full px-[3vw]">
            <Reveal>
              <div className="max-w-7xl mx-auto">
                <h2 className="text-[6vw] md:text-[4vw] font-serif mb-16 tracking-tighter leading-none">The Approach</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                  {[
                    { step: "01", title: "Discovery", text: "Understanding the core narrative. We dissect the objective to build a visual framework that serves the story." },
                    { step: "02", title: "Production", text: "Executing with precision. Utilizing top-tier crew and equipment to capture imagery that aligns with the creative vision." },
                    { step: "03", title: "Post-Craft", text: "The final polish. Rigorous color grading, editing, and formatting to ensure the imagery commands attention in any medium." }
                  ].map((item, idx) => (
                    <Reveal key={idx} delay={idx * 0.15}>
                      <div className="flex flex-col">
                        <span className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-400 mb-6">{item.step}</span>
                        <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                        <p className="text-neutral-500 font-light text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* Selected Partners */}
          <section className="py-24 md:py-32 w-full px-[3vw] bg-[#F7F5F0]">
            <div className="max-w-7xl mx-auto">
               <Reveal>
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-300 pb-8">
                    <h2 className="text-[6vw] md:text-[4vw] font-serif tracking-tighter leading-none">Selected Partners</h2>
                    <p className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-500 mt-4 md:mt-0">Commercial & Editorial</p>
                 </div>
               </Reveal>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                  {[
                    'Vogue', 'GQ', 'Harper\'s Bazaar', 'Apple', 
                    'Nike', 'Sony Music', 'A24 Films', 'LVMH',
                    'Condé Nast', 'The New York Times', 'Porsche', 'SSENSE'
                  ].map((client, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                       <span className="text-xl md:text-2xl font-serif text-neutral-500 hover:text-neutral-900 transition-colors hover-target cursor-default anim-underline w-fit">{client}</span>
                    </Reveal>
                  ))}
               </div>
            </div>
          </section>

          {/* Studio Journal */}
          <section className="py-24 md:py-32 w-full px-[3vw]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
               <Reveal className="w-full md:w-1/2">
                  <ImageParallax
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop"
                    alt="On Set Documentation"
                    className="w-full aspect-square bg-neutral-100"
                    imgClassName="grayscale hover:grayscale-0 transition-all duration-[1500ms]"
                  />
               </Reveal>
               <Reveal className="w-full md:w-1/2 flex flex-col justify-center" delay={0.2}>
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-400 mb-6">Studio Journal</span>
                  <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight tracking-tighter">Documenting the space between frames.</h3>
                  <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed mb-8">
                    True visual storytelling happens in the moments before action is called. We meticulously document our process—from location scouting to the final grade—ensuring every production retains its raw, authentic intention.
                  </p>
                  <Button onClick={() => { navigate('about'); window.scrollTo(0,0); }} variant="outline" className="w-fit">
                    Read Full Biography
                  </Button>
               </Reveal>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

const About = () => {
  return (
    <PageTransition>
      <div className="w-full px-[3vw] py-12 md:py-24">
        
        {/* Core Biography */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal>
            <div className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Siddharth Srinivasan" 
                className="w-full h-full object-cover grayscale" 
              />
            </div>
          </Reveal>
          
          <div className="flex flex-col justify-center">
            <Reveal delay={0.2}>
              <h1 className="text-[8vw] md:text-[5vw] font-serif leading-none tracking-tighter mb-8">
                Visual Art<br/>& Direction.
              </h1>
              <div className="space-y-6 text-neutral-500 font-light leading-relaxed text-sm md:text-base">
                <p>
                  Siddharth Srinivasan is a director and visual storyteller whose work explores the quiet intersections of human emotion and cinematic restraint. With a background rooted in traditional fine art and modern digital execution, he strips away the unnecessary to reveal the essential truth within every frame.
                </p>
                <p>
                  His process is highly collaborative and intensely considered. Whether crafting global commercial campaigns or intimate personal portraits, the approach remains consistent: find the quiet moment, frame it with precision, and let the image speak for itself.
                </p>
              </div>
              
              <div className="mt-12 flex flex-col gap-6">
                 <div>
                   <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-900 mb-2">Based In</h4>
                   <p className="text-neutral-500 font-light text-sm">Mumbai, operating globally.</p>
                 </div>
                 <div>
                   <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-900 mb-2">Specialization</h4>
                   <p className="text-neutral-500 font-light text-sm">Creative Direction, Editorial Photography, Commercial Campaigns.</p>
                 </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The Manifesto / Quote */}
        <section className="my-32 py-20 border-y border-neutral-200">
           <Reveal>
             <h2 className="text-[5vw] md:text-[3vw] font-serif italic text-center text-neutral-900 max-w-5xl mx-auto leading-snug">
               "The most powerful stories aren't shouted. They are felt in the spaces we choose to leave empty."
             </h2>
           </Reveal>
        </section>

        {/* The Studio Break */}
        <section className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative max-w-[100vw] -mx-[3vw] group">
          <ImageParallax
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
            alt="The Studio"
            className="w-full h-full"
            imgClassName="grayscale opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none flex items-center justify-center">
            <Reveal>
               <span className="text-white text-xs md:text-sm font-sans uppercase tracking-[0.5em] opacity-80">The Space Between</span>
            </Reveal>
          </div>
        </section>

        {/* Recognition & Selected Press */}
        <section className="mt-24 md:mt-32 max-w-7xl mx-auto mb-12">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-8">
              <h2 className="text-4xl md:text-5xl font-serif tracking-tighter">Selected Press</h2>
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-400 mt-4 md:mt-0">Exhibitions & Publications</p>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {[
              { year: '2025', title: 'Cinematic Restraint', desc: 'Solo Exhibition', loc: 'Tokyo' },
              { year: '2024', title: 'The Quiet Frame', desc: 'Featured Monograph', loc: 'Modern Photography' },
              { year: '2023', title: 'Director of the Year', desc: 'Visual Arts Awards', loc: 'London' },
              { year: '2022', title: 'Concrete Symphony', desc: 'Group Showcase', loc: 'New York' }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                 <div className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-neutral-200 hover:border-neutral-900 transition-colors cursor-default">
                   <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-auto mb-4 md:mb-0">
                     <span className="text-xs font-sans text-neutral-400 w-12">{item.year}</span>
                     <h3 className="text-2xl md:text-4xl font-serif anim-underline w-fit">{item.title}</h3>
                   </div>
                   <div className="flex items-center justify-between md:justify-end gap-8 md:gap-16 w-full md:w-auto text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-neutral-500">
                     <span>{item.desc}</span>
                     <span className="text-neutral-900">{item.loc}</span>
                   </div>
                 </div>
              </Reveal>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

const Gallery = ({ navigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredData = activeFilter === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === activeFilter);

  return (
    <PageTransition>
      <div className="w-full px-[3vw] py-12 md:py-24">
        
        <Reveal>
          <h1 className="text-[12vw] md:text-[8vw] font-serif leading-none tracking-tighter mb-8">Archive</h1>
          <div className="max-w-2xl mb-24">
            <p className="text-neutral-500 font-light leading-relaxed text-sm md:text-base">
              A curated selection of visual explorations, spanning editorial portraiture, global campaigns, and intimate personal studies. Each frame is a study in light, texture, and cinematic restraint.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-8 gap-8">
            <div className="flex flex-wrap gap-4 md:gap-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-sm uppercase tracking-widest transition-colors hover-target ${activeFilter === cat ? 'text-neutral-900 border-b border-neutral-900' : 'text-neutral-400 hover:text-neutral-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-neutral-400">
              {filteredData.length} Projects Found
            </span>
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group cursor-pointer hover-target"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-[4/5] bg-neutral-200 overflow-hidden relative mb-4">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif">{item.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">{item.category}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{item.year}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <section 
        className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative my-24 group cursor-pointer hover-target" 
        onClick={() => { navigate('contact'); window.scrollTo(0,0); }}
      >
        <ImageParallax
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop"
          alt="Featured Series"
          className="w-full h-full"
          imgClassName="grayscale opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white pointer-events-none transition-colors group-hover:bg-black/20">
          <Reveal>
            <p className="text-xs md:text-sm font-sans uppercase tracking-[0.4em] mb-4">Featured Monograph</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="text-4xl md:text-7xl font-serif italic mb-6">Midnight Premiere</h3>
          </Reveal>
          <Reveal delay={0.3}>
            <span className="text-[10px] md:text-xs uppercase tracking-widest border-b border-white pb-1">Inquire for Prints</span>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 w-full px-[3vw] bg-[#F7F5F0] flex flex-col items-center justify-center text-center">
        <Reveal className="max-w-3xl flex flex-col items-center">
          <h2 className="text-[8vw] md:text-[4vw] font-serif leading-[1.1] text-neutral-900 mb-6 tracking-tighter">
            Fine Art Prints & Licensing
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed text-sm md:text-base mb-10 max-w-xl">
            Selected works from the archive are available as limited edition archival prints. For gallery acquisitions, commercial licensing, or editorial usage, please initiate a formal request.
          </p>
          <Button onClick={() => { navigate('contact'); window.scrollTo(0,0); }} variant="outline">
            Contact Studio
          </Button>
        </Reveal>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#F7F5F0]/95 backdrop-blur-sm flex flex-col justify-center items-center p-6"
          >
            <button 
              className="absolute top-8 right-8 p-4 hover-target text-neutral-900"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="max-w-5xl w-full max-h-[80vh] flex justify-center">
              <img src={selectedImage.img} alt={selectedImage.title} className="max-w-full max-h-[80vh] object-contain shadow-2xl" />
            </div>
            <div className="mt-8 text-center text-neutral-900">
              <h3 className="text-3xl font-serif mb-2">{selectedImage.title}</h3>
              <p className="text-sm uppercase tracking-widest">{selectedImage.category} — {selectedImage.year}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '', date: '', time: '', name: '', email: '', phone: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="w-full px-[3vw] py-12 md:py-24">
        
        <div className="max-w-5xl mx-auto min-h-[60vh] flex flex-col justify-center">
          <Reveal>
            <h1 className="text-[10vw] md:text-[6vw] font-serif mb-4 leading-none tracking-tighter">Request a Booking.</h1>
            <p className="text-neutral-500 font-light text-sm md:text-base max-w-2xl mb-12">
              For commercial projects, private commissions, and event documentation. Please provide as much detail as possible to help us understand your vision and timeline.
            </p>
            
            {step < 4 && (
               <div className="flex gap-2 mb-12 items-center">
                 {[1, 2, 3].map(s => (
                   <React.Fragment key={s}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= s ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                       {s}
                     </div>
                     {s < 3 && <div className={`h-[1px] w-12 ${step > s ? 'bg-neutral-900' : 'bg-neutral-200'}`}></div>}
                   </React.Fragment>
                 ))}
               </div>
            )}
          </Reveal>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif mb-8">What are you looking for?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BOOKING_TYPES.map(type => (
                      <div 
                        key={type.id}
                        onClick={() => updateForm('type', type.id)}
                        className={`p-6 border cursor-pointer transition-all hover-target ${formData.type === type.id ? 'border-neutral-900 bg-white shadow-md' : 'border-neutral-200 hover:border-neutral-400 bg-transparent'}`}
                      >
                        <h4 className="font-medium mb-2">{type.title}</h4>
                        <p className="text-sm text-neutral-500">{type.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-end">
                    <Button variant="filled" onClick={() => setStep(2)} className={!formData.type ? 'opacity-50 pointer-events-none' : ''}>
                      Continue <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif mb-8">Preferred Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2"><Calendar size={16}/> Select Date</label>
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => updateForm('date', e.target.value)}
                        className="w-full p-4 bg-transparent border border-neutral-300 focus:border-neutral-900 outline-none hover-target"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2"><Clock size={16}/> Preferred Time Window</label>
                      <select 
                        value={formData.time}
                        onChange={(e) => updateForm('time', e.target.value)}
                        className="w-full p-4 bg-transparent border border-neutral-300 focus:border-neutral-900 outline-none hover-target appearance-none"
                      >
                        <option value="">Select a window...</option>
                        <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                        <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                        <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-12 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button variant="filled" onClick={() => setStep(3)} className={(!formData.date || !formData.time) ? 'opacity-50 pointer-events-none' : ''}>
                      Continue <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.form key="step3" onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif mb-8">Your Details</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full p-4 bg-transparent border-b border-neutral-300 focus:border-neutral-900 outline-none hover-target placeholder-neutral-400" />
                      <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => updateForm('email', e.target.value)} className="w-full p-4 bg-transparent border-b border-neutral-300 focus:border-neutral-900 outline-none hover-target placeholder-neutral-400" />
                    </div>
                    <input type="tel" placeholder="Phone Number (Optional)" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full p-4 bg-transparent border-b border-neutral-300 focus:border-neutral-900 outline-none hover-target placeholder-neutral-400" />
                    <textarea required placeholder="Briefly describe your requirements..." value={formData.message} onChange={e => updateForm('message', e.target.value)} rows={4} className="w-full p-4 bg-transparent border border-neutral-300 focus:border-neutral-900 outline-none hover-target placeholder-neutral-400 resize-none"></textarea>
                  </div>
                  <div className="mt-12 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                    <Button type="submit" variant="filled" className={isSubmitting ? 'opacity-70 pointer-events-none' : ''}>
                      {isSubmitting ? 'Processing...' : 'Submit Request'}
                    </Button>
                  </div>
                </motion.form>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 border border-neutral-200 bg-neutral-50/50">
                  <CheckCircle2 size={64} className="mx-auto text-green-600 mb-6" />
                  <h3 className="text-4xl font-serif mb-4">Request Received.</h3>
                  <p className="text-neutral-600 mb-8 max-w-md mx-auto">Thank you for your interest, {formData.name}. Our team will review your requirements for the {formData.type} session and contact you shortly to confirm availability.</p>
                  <Button variant="outline" onClick={() => { setStep(1); setFormData({type:'', date:'', time:'', name:'', email:'', phone:'', message:''}); }}>Submit Another Request</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <section className="mt-32 pt-24 border-t border-neutral-200 max-w-7xl mx-auto w-full">
          <Reveal>
            <h2 className="text-[6vw] md:text-[4vw] font-serif mb-16 tracking-tighter leading-none">The Collaborative Process</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
             {[
               { num: '01', title: 'Initial Consultation', desc: 'A thorough discussion to align on creative vision, mood, and logistics before any commitments are finalized.' },
               { num: '02', title: 'Pre-Production', desc: 'Developing the visual treatment, securing locations, styling, and assembling the appropriate technical crew.' },
               { num: '03', title: 'Execution & Delivery', desc: 'The shoot itself, followed by meticulous post-production, color grading, and final asset delivery.' }
             ].map((phase, i) => (
               <Reveal key={i} delay={i * 0.1}>
                 <div className="flex flex-col group">
                   <span className="text-xs font-sans uppercase tracking-[0.2em] text-neutral-400 mb-6 pb-4 border-b border-neutral-200 group-hover:border-neutral-900 transition-colors">{phase.num}</span>
                   <h3 className="text-2xl font-serif mb-4">{phase.title}</h3>
                   <p className="text-neutral-500 font-light text-sm leading-relaxed">{phase.desc}</p>
                 </div>
               </Reveal>
             ))}
          </div>
        </section>

        <section className="w-full h-[50vh] md:h-[60vh] overflow-hidden relative my-32 max-w-7xl mx-auto group">
          <ImageParallax
            src="https://images.unsplash.com/photo-1579294273295-a130f146be28?q=80&w=2000&auto=format&fit=crop"
            alt="On Location"
            className="w-full h-full"
            imgClassName="grayscale opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </section>

        <section className="max-w-4xl mx-auto w-full pb-20">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif mb-12 text-center">Frequently Asked Questions</h2>
          </Reveal>
          <div className="space-y-8">
            {[
              { q: 'How far in advance should I book?', a: 'For commercial campaigns and large-scale events, we recommend booking at least 6-8 weeks in advance. For portrait sessions and consultations, 2-3 weeks is usually sufficient.' },
              { q: 'Do you travel for projects?', a: 'Yes. Siddharth is based in Mumbai but operates globally. Travel and accommodation logistics are factored into the overall project scoping.' },
              { q: 'What is the standard turnaround time?', a: 'Turnaround times vary wildly based on the scope of post-production. Standard editorial deliveries are typically 2-3 weeks, while complex video campaigns may take 4-6 weeks.' }
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.1} className="border-b border-neutral-200 pb-8">
                <h4 className="text-xl font-serif mb-3 text-neutral-900">{faq.q}</h4>
                <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="w-full px-[3vw] py-12 md:py-24">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <Reveal>
            <h1 className="text-[10vw] md:text-[7vw] font-serif mb-8 leading-none tracking-tighter">Let's create <br/><span className="italic text-neutral-500">something meaningful.</span></h1>
            <p className="text-neutral-600 font-light mb-12 max-w-md">For project inquiries, creative collaborations, or general questions, please utilize the secure form or direct contacts below.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-neutral-800">
                <Mail size={20} className="text-neutral-400"/>
                <a href="mailto:hello@siddharthsrinivasan.com" className="hover:text-neutral-500 transition-colors hover-target text-lg md:text-xl font-serif">hello@siddharthsrinivasan.com</a>
              </div>
              <div className="flex items-center gap-4 text-neutral-800">
                <MapPin size={20} className="text-neutral-400"/>
                <span className="text-lg md:text-xl font-serif">Mumbai / Global</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8 bg-[#F7F5F0] p-8 md:p-12 border border-neutral-100">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-neutral-300 py-3 focus:border-neutral-900 outline-none transition-colors hover-target" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email</label>
                  <input required type="email" className="w-full bg-transparent border-b border-neutral-300 py-3 focus:border-neutral-900 outline-none transition-colors hover-target" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Message</label>
                  <textarea required rows={4} className="w-full bg-transparent border-b border-neutral-300 py-3 focus:border-neutral-900 outline-none transition-colors resize-none hover-target"></textarea>
                </div>
                <Button type="submit" variant="filled" className="w-full">Send Message</Button>
              </form>
            ) : (
              <div className="bg-[#F7F5F0] p-12 text-center border border-neutral-100 h-full flex flex-col justify-center items-center">
                <h3 className="text-3xl font-serif mb-4">Message Sent.</h3>
                <p className="text-neutral-600 font-light max-w-xs mx-auto">Thank you for reaching out. The studio will get back to you within 48 hours.</p>
              </div>
            )}
          </Reveal>
        </div>

        <section className="max-w-7xl mx-auto w-full border-t border-neutral-200 pt-24 mb-32">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mb-16">Global Inquiries</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Commercial & Branding", email: "commercial@siddharthsrinivasan.com", desc: "For agency partnerships, brand campaigns, and commercial directing." },
              { title: "Press & Public Relations", email: "pr@siddharthsrinivasan.com", desc: "For interviews, features, speaking engagements, and media access." },
              { title: "Print Sales & Galleries", email: "archive@siddharthsrinivasan.com", desc: "For fine art print acquisitions, gallery licensing, and archival access." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-neutral-200 hover:border-neutral-900 transition-colors cursor-default hover-target">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-auto mb-6 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-serif anim-underline w-fit">{item.title}</h3>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-8 md:gap-16 w-full md:w-auto text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-neutral-500">
                    <a href={`mailto:${item.email}`} className="hover:text-neutral-900 transition-colors hover-target">{item.email}</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="w-full h-[40vh] md:h-[70vh] overflow-hidden relative max-w-[100vw] -mx-[3vw] mb-24 group">
          <ImageParallax
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
            alt="Studio Architecture"
            className="w-full h-full"
            imgClassName="grayscale opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[2000ms]"
          />
        </section>

        <section className="max-w-7xl mx-auto w-full text-center pb-20">
          <Reveal>
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-neutral-400 mb-8">Digital Presence</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {['Instagram', 'Twitter (X)', 'LinkedIn', 'Behance', 'Vimeo'].map((platform, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-2xl md:text-4xl font-serif text-neutral-400 hover:text-neutral-900 anim-underline w-fit transition-colors duration-300 hover-target"
                >
                  {platform}
                </a>
              ))}
            </div>
          </Reveal>
        </section>

      </div>
    </PageTransition>
  );
};

const Terms = () => (
  <PageTransition>
    <div className="w-full max-w-5xl mx-auto px-[3vw] py-20">
      <h1 className="text-[8vw] md:text-[4vw] font-serif mb-8 tracking-tighter leading-none">Terms & Conditions</h1>
      <div className="prose prose-neutral max-w-none text-neutral-600 font-light leading-relaxed space-y-6">
        <p><strong>Disclaimer:</strong> This is placeholder legal copy and should be reviewed by a legal professional before publishing.</p>
        <p>Welcome to the digital portfolio of Siddharth Srinivasan. By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
        <h3 className="text-xl font-serif text-neutral-900 mt-8 mb-4">Intellectual Property</h3>
        <p>All content on this website, including but not limited to photographs, text, graphics, logos, and videos, is the property of Siddharth Srinivasan unless otherwise stated. Unauthorized use, reproduction, or distribution of this material is strictly prohibited.</p>
        <h3 className="text-xl font-serif text-neutral-900 mt-8 mb-4">Client Agreements</h3>
        <p>Any bookings made through this platform constitute a request for service and are subject to final confirmation and a separate formal agreement/contract detailing project specifics, deliverables, and payment schedules.</p>
      </div>
    </div>
  </PageTransition>
);

const Refunds = () => (
  <PageTransition>
    <div className="w-full max-w-5xl mx-auto px-[3vw] py-20">
      <h1 className="text-[8vw] md:text-[4vw] font-serif mb-8 tracking-tighter leading-none">Cancellations & Refunds Policy</h1>
      <div className="prose prose-neutral max-w-none text-neutral-600 font-light leading-relaxed space-y-6">
        <p><strong>Disclaimer:</strong> This is placeholder legal copy and should be reviewed by a legal professional before publishing.</p>
        <h3 className="text-xl font-serif text-neutral-900 mt-8 mb-4">Booking Cancellations</h3>
        <p>We understand that schedules change. For standard creative sessions and consultations, cancellations made 72 hours prior to the scheduled time will receive a full refund of any deposit paid. Cancellations within 72 hours may be subject to a cancellation fee.</p>
        <h3 className="text-xl font-serif text-neutral-900 mt-8 mb-4">Event Coverage</h3>
        <p>For large-scale events and multi-day shoots, cancellation policies will be outlined specifically in your individual contract. Generally, a non-refundable retainer is required to secure these dates.</p>
        <h3 className="text-xl font-serif text-neutral-900 mt-8 mb-4">Refund Process</h3>
        <p>Approved refunds will be processed to the original method of payment within 7-10 business days.</p>
      </div>
    </div>
  </PageTransition>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsAppLoaded(true), 500); 
      }
      setLoadingProgress(progress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home navigate={setCurrentView} isAppLoaded={isAppLoaded} />;
      case 'about': return <About />;
      case 'gallery': return <Gallery navigate={setCurrentView} />;
      case 'booking': return <Booking />;
      case 'contact': return <Contact />;
      case 'terms': return <Terms />;
      case 'refunds': return <Refunds />;
      default: return <Home navigate={setCurrentView} isAppLoaded={isAppLoaded} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#0A0A0A] selection:text-white bg-white">
      <GlobalStyles />
      <div className="noise-overlay" />
      <CustomCursor />
      
      <AnimatePresence>
        {!isAppLoaded && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="text-center">
               <div className="w-16 h-16 border border-neutral-200 mx-auto mb-6 flex items-center justify-center relative overflow-hidden">
                 <motion.div 
                   className="absolute bottom-0 left-0 w-full bg-neutral-900"
                   initial={{ height: "0%" }}
                   animate={{ height: `${loadingProgress}%` }}
                   transition={{ ease: "linear", duration: 0.2 }}
                 />
               </div>
               <p className="text-xs font-sans uppercase tracking-[0.3em] text-neutral-400">Loading / {loadingProgress}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Header currentView={currentView} navigate={setCurrentView} />
      
      <main className="flex-grow flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex flex-col"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {isAppLoaded && currentView !== 'home' && <Footer navigate={setCurrentView} />}
      {isAppLoaded && currentView === 'home' && <Footer navigate={setCurrentView} />}
    </div>
  );
}
