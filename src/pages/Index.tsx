import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import { perfumes } from '@/data/perfumes'
import { ArrowRight, Sparkles, Star, Shield, Droplets } from 'lucide-react'
import heroImage from '@/assets/hero-perfume.jpg'

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

const features = [
  { icon: Sparkles, title: 'Personalized Quiz', desc: 'AI-matched to your preferences' },
  { icon: Star, title: 'Expert Curated', desc: '15+ premium fragrances reviewed' },
  { icon: Shield, title: 'Trusted Brands', desc: 'Only authentic luxury houses' },
  { icon: Droplets, title: 'Scent Profiles', desc: 'Detailed note breakdowns' },
]

export default function Index() {
  const { season, picks } = getSeasonalPerfumes()
  const featured = perfumes.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-body tracking-wide uppercase">New — Winter Collection 2026</span>
              </motion.div>

              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light leading-[1] tracking-tight text-foreground">
                Find Your
                <br />
                <span className="gold-gradient font-semibold italic">Perfect</span>
                <br />
                Scent
              </h1>
            </div>

            <p className="text-muted-foreground text-base sm:text-lg max-w-md font-body leading-relaxed">
              Take our personalized quiz and discover fragrances curated for your unique style, mood, and lifestyle.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link to="/quiz">
                <motion.button
                  className="group flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-body font-medium text-sm rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 30px hsl(43 52% 54% / 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                  Take the Quiz
                </motion.button>
              </Link>
              <Link to="/explore">
                <motion.button
                  className="flex items-center gap-2.5 px-7 py-3.5 border border-border text-foreground font-body font-medium text-sm rounded-lg hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore All
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating bottle image */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute -inset-8 bg-primary/[0.08] blur-[60px] rounded-full" />
              <img
                src={heroImage}
                alt="Luxury perfume bottle"
                className="relative w-72 lg:w-80 h-auto rounded-2xl"
              />
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 glass-card px-4 py-2.5 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-xs text-muted-foreground font-body">Top Rated</p>
                <p className="text-sm font-heading text-foreground font-semibold">★ 4.9 / 5.0</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border border-muted-foreground/20 rounded-full flex justify-center pt-1.5">
            <div className="w-0.5 h-1.5 bg-primary/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Strip */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-8 px-6 text-center space-y-2"
              >
                <f.icon size={20} className="mx-auto text-primary" />
                <p className="text-sm font-body font-medium text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground font-body">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Picks */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div className="space-y-1">
            <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Curated for You</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground capitalize">
              {season} Essentials
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {picks.map((p, i) => (
            <PerfumeCard key={p.id} perfume={p} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div className="space-y-1">
            <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Discover</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">Featured Fragrances</h2>
          </div>
          <Link to="/explore" className="hidden sm:flex items-center gap-1.5 text-primary text-sm font-body hover:opacity-80 transition-opacity">
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <PerfumeCard key={p.id} perfume={p} index={i} />
          ))}
        </div>

        <Link to="/explore" className="sm:hidden flex items-center justify-center gap-1.5 text-primary text-sm font-body mt-8 hover:opacity-80">
          View All Fragrances <ArrowRight size={14} />
        </Link>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Personalized</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
            Not Sure Where to Start?
          </h2>
          <p className="text-muted-foreground font-body text-sm max-w-md mx-auto leading-relaxed">
            Answer 5 quick questions and we'll match you with your ideal fragrance based on your preferences.
          </p>
          <Link to="/quiz">
            <motion.button
              className="mt-2 px-7 py-3.5 bg-primary text-primary-foreground font-body font-medium text-sm rounded-lg"
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px hsl(43 52% 54% / 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              Find Your Scent →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-lg gold-gradient font-bold tracking-wide">ESSENCE</span>
          <div className="flex items-center gap-6">
            <Link to="/guide" className="text-muted-foreground text-xs font-body hover:text-foreground transition-colors">Scent Guide</Link>
            <Link to="/explore" className="text-muted-foreground text-xs font-body hover:text-foreground transition-colors">Explore</Link>
            <Link to="/quiz" className="text-muted-foreground text-xs font-body hover:text-foreground transition-colors">Quiz</Link>
          </div>
          <p className="text-muted-foreground text-xs font-body">
            © {new Date().getFullYear()} Essence
          </p>
        </div>
      </footer>
    </div>
  )
}
