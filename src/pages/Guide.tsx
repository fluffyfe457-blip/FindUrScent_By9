import { motion } from 'framer-motion'
import { scentFamilies } from '@/data/perfumes'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Guide() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 mb-14 text-center"
      >
        <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Learn</p>
        <h1 className="font-heading text-3xl sm:text-5xl text-foreground">
          The Scent Family Guide
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
          Understanding scent families is the first step to finding your signature fragrance.
        </p>
      </motion.div>

      <div className="space-y-4">
        {scentFamilies.map((family, i) => (
          <motion.div
            key={family.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <div className={`p-6 rounded-xl border border-border bg-gradient-to-r ${family.color} space-y-3`}>
              <h2 className="font-heading text-2xl text-foreground">{family.name}</h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl">
                {family.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {family.examples.map(ex => (
                  <span
                    key={ex}
                    className="px-2.5 py-1 text-[10px] font-body border border-border/50 text-foreground/80 rounded-full"
                  >
                    {ex}
                  </span>
                ))}
              </div>
              <Link
                to={`/explore?family=${family.key}`}
                className="inline-flex items-center gap-1 text-primary text-xs font-body hover:opacity-80 transition-opacity"
              >
                Browse {family.name} <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16 space-y-3"
      >
        <h3 className="font-heading text-xl text-foreground">Ready to find your scent?</h3>
        <Link to="/quiz">
          <motion.button
            className="px-7 py-3 bg-primary text-primary-foreground font-body font-medium text-sm rounded-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Take the Quiz →
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
