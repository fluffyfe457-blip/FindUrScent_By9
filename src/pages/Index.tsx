import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import { perfumes } from '@/data/perfumes'
import { ArrowRight, Sparkles } from 'lucide-react'

/** Get seasonal picks based on current month */
function getSeasonalPerfumes() {
  const month = new Date().getMonth()
  let season: string
  if (month >= 2 && month <= 4) season = 'spring'
  else if (month >= 5 && month <= 7) season = 'summer'
  else if (month >= 8 && month <= 10) season = 'fall'
  else season = 'winter'
  return { season, picks: perfumes.filter(p => p.season.includes(season)).slice(0, 4) }
}

export default function Index() {
  const { season, picks } = getSeasonalPerfumes()
  const featured = perfumes.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-primary uppercase tracking-[0.3em] text-sm font-body"
              >
                Discover Your Signature
              </motion.p>
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.9] text-foreground">
                Find Your
                <br />
                <span className="gold-gradient font-semibold">Perfect</span>
                <br />
                Scent
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-md font-body leading-relaxed">
              Take our personalized quiz and discover fragrances that match your style, personality, and every occasion.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/quiz">
                <motion.button
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-md hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Sparkles size={18} />
                  Take the Quiz
                </motion.button>
              </Link>
              <Link to="/explore">
                <motion.button
                  className="flex items-center gap-2 px-8 py-4 glass-card text-foreground font-body font-medium rounded-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore All
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating bottle image */}
          <motion.div
            className="hidden lg:flex justify-center"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80"
                alt="Luxury perfume bottle"
                className="relative w-80 h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Seasonal Picks */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2 mb-12"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-body">Curated for the Season</p>
          <h2 className="font-heading text-4xl sm:text-5xl text-foreground capitalize">
            {season} Picks
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {picks.map((p, i) => (
            <PerfumeCard key={p.id} perfume={p} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div className="space-y-2">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-body">Explore</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground">Featured Fragrances</h2>
          </div>
          <Link to="/explore" className="hidden sm:flex items-center gap-1 text-primary text-sm font-body hover:opacity-80 transition-opacity">
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <PerfumeCard key={p.id} perfume={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center glass-card p-12 sm:p-16 gold-glow space-y-6"
        >
          <h2 className="font-heading text-3xl sm:text-5xl text-foreground">
            Not Sure Where to Start?
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Our personalized quiz analyzes your preferences across seasons, occasions, and scent profiles to find your ideal fragrance.
          </p>
          <Link to="/quiz">
            <motion.button
              className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Discover Your Scent →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-xl gold-gradient font-bold">ESSENCE</span>
          <p className="text-muted-foreground text-sm font-body">
            © {new Date().getFullYear()} Essence. Crafted with passion for fragrance lovers.
          </p>
        </div>
      </footer>
    </div>
  )
}
