import { motion } from 'framer-motion'
import { scentFamilies } from '@/data/perfumes'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Guide() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 mb-16 text-center"
      >
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-body">Learn</p>
        <h1 className="font-heading text-4xl sm:text-6xl text-foreground">
          The Scent Family Guide
        </h1>
        <p className="text-muted-foreground font-body max-w-xl mx-auto">
          Understanding scent families is the first step to finding your signature fragrance.
          Each family has a distinct personality and mood.
        </p>
      </motion.div>

      <div className="space-y-6">
        {scentFamilies.map((family, i) => (
          <motion.div
            key={family.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-6 sm:p-8 bg-gradient-to-r ${family.color}`}
          >
            <div className="space-y-4">
              <h2 className="font-heading text-3xl text-foreground">{family.name}</h2>
              <p className="text-muted-foreground font-body leading-relaxed max-w-2xl">
                {family.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {family.examples.map(ex => (
                  <span
                    key={ex}
                    className="px-3 py-1 text-xs font-body glass-card text-foreground rounded-full"
                  >
                    {ex}
                  </span>
                ))}
              </div>
              <Link
                to={`/explore?family=${family.key}`}
                className="inline-flex items-center gap-1 text-primary text-sm font-body mt-2 hover:opacity-80 transition-opacity"
              >
                Browse {family.name} fragrances <ArrowRight size={14} />
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
        className="text-center mt-20 space-y-4"
      >
        <h3 className="font-heading text-2xl text-foreground">Ready to find your scent?</h3>
        <Link to="/quiz">
          <motion.button
            className="px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Take the Quiz →
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
