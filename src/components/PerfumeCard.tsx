import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Perfume } from '@/types/perfume'

type Props = {
  perfume: Perfume
  index?: number
}

/** Animated perfume card with hover lift effect */
export default function PerfumeCard({ perfume, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/perfume/${perfume.id}`} className="block group">
        <motion.div
          className="glass-card overflow-hidden rounded-xl"
          whileHover={{ y: -4, boxShadow: '0 16px 50px hsl(0 0% 0% / 0.4)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Image with dark overlay for consistency */}
          <div className="aspect-[4/5] overflow-hidden relative bg-secondary">
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
            {/* Price badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm">
              <span className="text-xs font-body font-semibold text-primary">${perfume.price}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 space-y-1.5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-body font-medium">
              {perfume.brand}
            </p>
            <h3 className="font-heading text-lg text-foreground leading-tight">{perfume.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-body capitalize">{perfume.scent_family}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs text-muted-foreground font-body capitalize">{perfume.gender}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
