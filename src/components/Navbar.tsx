import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, ArrowRightLeft, Globe, Home, Compass, Library, User } from 'lucide-react'
import { useCompare } from '@/hooks/useCompare'
import { useTranslation } from 'react-i18next'

/** Main navigation bar with liquid glass effect */
export default function Navbar() {
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const { selected } = useCompare()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langHover, setLangHover] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    // Show loader immediately
    window.dispatchEvent(new CustomEvent('start-lang-change'))
    
    // Artificial delay for luxury feel
    setTimeout(() => {
      i18n.changeLanguage(i18n.language === 'en' ? 'km' : 'en')
    }, 600)
  }

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.explore'), path: '/explore' },
    { name: t('nav.collection'), path: '/collection' },
    { name: t('nav.assistant'), path: '/assistant' },
    { name: t('nav.compare'), path: '/compare' },
  ]

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-4 flex justify-center pointer-events-none">
      <nav className={`
        pointer-events-auto
        flex items-center justify-between
        w-full max-w-6xl px-6 py-2.5 rounded-2xl
        transition-all duration-500 cubic-bezier-standard
        ${scrolled 
          ? 'liquid-glass shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[0.98]' 
          : 'bg-transparent border-transparent'
        }
      `}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gold-border-gradient flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
            <span className="text-white font-heading text-xl font-bold italic">F</span>
          </div>
          <span className="font-heading text-xl tracking-wide font-bold hidden sm:block">
            FindUr<span className="gold-gradient italic">Scent</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] font-body font-bold uppercase tracking-[0.2em] transition-all relative group ${
                location.pathname === link.path ? 'text-primary' : 'text-foreground/70 hover:text-primary'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Comparison Badge */}
          {selected.length > 0 && (
            <Link 
              to={`/compare?ids=${selected.join(',')}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-primary hidden md:flex"
            >
              <ArrowRightLeft size={14} />
              <span className="text-[10px] font-bold">{selected.length}</span>
            </Link>
          )}

          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            onMouseEnter={() => setLangHover(true)}
            onMouseLeave={() => setLangHover(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group"
            title="Switch Language"
          >
            <motion.div animate={langHover ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.8, ease: "circOut" }}>
              <Globe size={14} className="text-primary" />
            </motion.div>
            <span className="text-[10px] font-body font-bold uppercase tracking-widest min-w-[18px]">
              {i18n.language === 'en' ? 'KH' : 'EN'}
            </span>
          </button>

          <Link 
            to="/assistant"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-[11px] font-body font-bold uppercase tracking-widest hover:gold-glow hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <Sparkles size={14} />
            {t('nav.find_scent')}
          </Link>
        </div>
      </nav>
    </header>

    {/* Mobile Bottom Navigation Bar */}
    <nav className="fixed bottom-6 left-6 right-6 z-50 lg:hidden px-4 py-3 liquid-glass rounded-3xl shadow-2xl border-white/10 flex items-center justify-between pointer-events-auto">
      <Link 
        to="/" 
        className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/' ? 'text-primary scale-110' : 'text-foreground/40'}`}
      >
        <div className={`p-2 rounded-xl scale-75 transition-all ${location.pathname === '/' ? 'bg-primary/10 text-primary' : ''}`}>
          <Home size={20} />
        </div>
        <span className="text-[8px] font-bold uppercase tracking-[0.1em]">{t('nav.home')}</span>
      </Link>

      <Link 
        to="/explore" 
        className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/explore' ? 'text-primary scale-110' : 'text-foreground/40'}`}
      >
        <div className={`p-2 rounded-xl scale-75 transition-all ${location.pathname === '/explore' ? 'bg-primary/10 text-primary' : ''}`}>
          <Compass size={20} />
        </div>
        <span className="text-[8px] font-bold uppercase tracking-[0.1em]">{t('nav.explore')}</span>
      </Link>

      {/* Special AI Assistant Button */}
      <Link 
        to="/assistant" 
        className="relative -top-3"
      >
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500
          ${location.pathname === '/assistant' 
            ? 'bg-primary text-primary-foreground shadow-[0_15px_30px_rgba(202,138,4,0.4)] rotate-12 scale-110' 
            : 'bg-white/5 text-primary border border-white/10 shadow-xl'
          }
        `}>
          <Sparkles size={24} className={location.pathname === '/assistant' ? 'animate-pulse' : ''} />
        </div>
        <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-center mt-3 block">{t('nav.assistant')}</span>
      </Link>

      <Link 
        to="/collection" 
        className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/collection' ? 'text-primary scale-110' : 'text-foreground/40'}`}
      >
        <div className={`p-2 rounded-xl scale-75 transition-all ${location.pathname === '/collection' ? 'bg-primary/10 text-primary' : ''}`}>
          <Library size={20} />
        </div>
        <span className="text-[8px] font-bold uppercase tracking-[0.1em]">{t('nav.collection')}</span>
      </Link>

      <Link 
        to="/compare" 
        className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/compare' ? 'text-primary scale-110' : 'text-foreground/40'}`}
      >
        <div className={`p-2 rounded-xl scale-75 transition-all ${location.pathname === '/compare' ? 'bg-primary/10 text-primary' : ''}`}>
          <ArrowRightLeft size={20} />
        </div>
        <span className="text-[8px] font-bold uppercase tracking-[0.1em]">{t('nav.compare')}</span>
      </Link>
    </nav>
    </>
  )
}
