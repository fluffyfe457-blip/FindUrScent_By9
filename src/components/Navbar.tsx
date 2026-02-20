import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/guide', label: 'Guide' },
  { to: '/collection', label: 'Collection' },
]

/** Main navigation bar with glass effect */
export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="font-heading text-xl font-bold gold-gradient tracking-wider">ESSENCE</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-0.5">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3.5 py-1.5 text-[13px] font-body transition-colors rounded-md ${
                    location.pathname === link.to
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-secondary/60 rounded-md -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/quiz"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground font-body text-[13px] font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                <Sparkles size={13} />
                Find Your Scent
              </Link>
              <button
                className="md:hidden text-foreground p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-background/95 border-b border-border/50"
          >
            <div className="px-6 py-3 space-y-1">
              {[...links, { to: '/quiz', label: 'Find Your Scent' }].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                    location.pathname === link.to
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
