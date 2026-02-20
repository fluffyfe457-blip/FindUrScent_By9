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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/perfume/${perfume.id}`}>
        <motion.div
          className="glass-card overflow-hidden group cursor-pointer"
          whileHover={{ y: -6, boxShadow: '0 20px 60px hsl(0 0% 0% / 0.5)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="p-4 space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-body">
              {perfume.brand}
            </p>
            <h3 className="font-heading text-xl text-foreground">{perfume.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">{perfume.scent_family}</span>
              <span className="text-primary font-body font-medium">${perfume.price}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
