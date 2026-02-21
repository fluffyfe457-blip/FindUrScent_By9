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
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-card gold-glow px-5 py-3 flex items-center gap-4"
        >
          {/* Selected chips */}
          <div className="flex items-center gap-2">
            {selectedPerfumes.map(p => (
              <div key={p.id} className="flex items-center gap-2 bg-secondary rounded-full pl-1 pr-2 py-1">
                <img src={p.image_url} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-xs font-body text-foreground max-w-[100px] truncate">{p.name}</span>
                <button onClick={() => toggle(p.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={12} />
                </button>
              </div>
            ))}
            {selected.length < 2 && (
              <div className="w-9 h-9 rounded-full border border-dashed border-border flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground">+1</span>
              </div>
            )}
          </div>

          {/* Compare button */}
          <button
            disabled={selected.length < 2}
            onClick={() => navigate(`/compare?ids=${selected.join(',')}`)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-body font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <ArrowRightLeft size={13} /> Compare
          </button>

          {/* Clear */}
          <button onClick={clear} className="text-muted-foreground hover:text-foreground text-xs font-body transition-colors">
            Clear
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
