import { useCompare } from '@/hooks/useCompare'
import { perfumes } from '@/data/perfumes'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRightLeft } from 'lucide-react'

export default function CompareBar() {
  const { selected, toggle, clear } = useCompare()
  const navigate = useNavigate()

  const selectedPerfumes = selected.map(id => perfumes.find(p => p.id === id)!).filter(Boolean)

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-4 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-auto z-50 glass-card gold-glow px-3 sm:px-5 py-3 flex items-center justify-between gap-3"
        >
          {/* Selected chips */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {selectedPerfumes.map(p => (
              <div key={p.id} className="flex items-center gap-1.5 bg-secondary rounded-full pl-1 pr-2 py-1 min-w-0">
                <img src={p.image_url} alt={p.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                <span className="text-[11px] font-body text-foreground truncate max-w-[60px] sm:max-w-[100px]">{p.name}</span>
                <button onClick={() => toggle(p.id)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                  <X size={11} />
                </button>
              </div>
            ))}
            {selected.length < 2 && (
              <div className="w-7 h-7 rounded-full border border-dashed border-border flex items-center justify-center shrink-0">
                <span className="text-[9px] text-muted-foreground">+1</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              disabled={selected.length < 2}
              onClick={() => navigate(`/compare?ids=${selected.join(',')}`)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-body font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              <ArrowRightLeft size={12} /> Compare
            </button>
            <button onClick={clear} className="text-muted-foreground hover:text-foreground text-[11px] font-body transition-colors">
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
