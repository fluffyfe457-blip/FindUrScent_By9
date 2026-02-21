import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'

export default function LanguageLoader() {
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleEnd = () => {
      // Small delay to ensure translations are loaded and user sees the effect
      setTimeout(() => setIsLoading(false), 800)
    }

    window.addEventListener('start-lang-change', handleStart)
    i18n.on('languageChanged', handleEnd)
    
    return () => {
      window.removeEventListener('start-lang-change', handleStart)
      i18n.off('languageChanged', handleEnd)
    }
  }, [i18n])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/40 backdrop-blur-[40px]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Pulsating Logo Container */}
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
              />
              <div className="w-20 h-20 rounded-2xl gold-border-gradient flex items-center justify-center relative z-10 shadow-2xl">
                <span className="text-white font-heading text-4xl font-bold italic">F</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <motion.h2 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-2xl text-white tracking-widest font-bold"
              >
                REFINING
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-[2px] bg-primary/60 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-[10px] text-primary font-body font-bold uppercase tracking-[0.4em] mt-2"
              >
                <Sparkles size={12} className="animate-pulse" />
                <span>Distilling {i18n.language === 'en' ? 'English' : 'Khmer'}</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
