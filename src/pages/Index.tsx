import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import { perfumes } from '@/data/perfumes'
import { ArrowRight, Sparkles, Star, Shield, Droplets } from 'lucide-react'
import heroImage from '@/assets/hero-perfume.jpg'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const seasonal = getSeasonalPerfumes()
  const featured = perfumes.slice(0, 4)

  const featuresList = [
    { icon: Sparkles, title: t('features.ai.title'), desc: t('features.ai.desc'), color: "text-amber-400" },
    { icon: Star, title: t('features.expert.title'), desc: t('features.expert.desc'), color: "text-amber-500" },
    { icon: Shield, title: t('features.trust.title'), desc: t('features.trust.desc'), color: "text-amber-600" },
    { icon: Droplets, title: t('features.deep_dive.title'), desc: t('features.deep_dive.desc'), color: "text-amber-700" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Parallax Image */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImage} 
            alt="Perfume Hero" 
            className="w-full h-full object-cover opacity-50 grayscale-[0.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Floating Blobs for Liquid Glass vibe */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 40, 0], 
              y: [0, -40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -60, 0], 
              y: [0, 60, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-gold-dark/10 rounded-full blur-[150px]" 
          />
        </div>

        <div className="container relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-center liquid-glass px-8 py-16 sm:px-16 sm:py-24 rounded-[3rem] border-white/10"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-body font-bold tracking-[0.3em] uppercase text-cream leading-none pt-0.5">
                {t('hero.badge')}
              </span>
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading leading-[1.1] sm:leading-[0.95] tracking-tight text-white mb-6">
                {t('hero.title_part1')} <br />
                <span className="gold-gradient italic font-normal inline-block mt-2">{t('hero.title_part2')}</span> <br />
                <span className="block mt-2">{t('hero.title_part3')}</span>
              </h1>
              <p className="text-sm sm:text-base text-foreground/80 font-body max-w-lg mx-auto leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <Link
                to="/quiz"
                className="group px-8 py-3.5 bg-primary text-primary-foreground font-heading text-base rounded-xl hover:gold-glow hover:opacity-95 transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(202,138,4,0.3)] active:scale-95 cursor-pointer"
              >
                {t('hero.cta_quiz')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
              <Link
                to="/assistant"
                className="px-8 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all rounded-xl font-heading text-base flex items-center gap-3 text-white active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                {t('hero.cta_ai')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-20 relative overflow-hidden">
        <div className="container px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {featuresList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group shadow-lg"
              >
                <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500 mb-6 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-lg text-white font-medium">{item.title}</h3>
                  <p className="text-[11px] text-muted-foreground font-body leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Picks */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-body font-bold">{t('sections.seasonal')}</p>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">{t('sections.seasonal_picks')}</h2>
          </div>
          <Link to="/explore" className="group flex items-center gap-3 text-xs font-body font-bold uppercase tracking-widest text-primary hover:text-white transition-all pb-1 cursor-pointer">
            {t('sections.view_all')}
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
            <div className="h-px w-0 group-hover:w-full bg-primary transition-all duration-500 absolute bottom-0 left-0" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {seasonal.picks.map((perfume, i) => (
            <PerfumeCard key={perfume.id} perfume={perfume} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-4 mb-20">
            <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-body font-bold leading-none">{t('sections.discover')}</p>
            <h2 className="text-4xl sm:text-6xl font-heading text-white">{t('sections.featured')}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-10 gap-y-16">
            {featured.map((perfume, i) => (
              <PerfumeCard key={perfume.id} perfume={perfume} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-6xl font-heading text-white leading-[1.1]">{t('sections.not_sure')}</h2>
              <p className="text-muted-foreground font-body text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                {t('sections.not_sure_desc')}
              </p>
            </div>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-4 px-10 py-4 bg-primary text-primary-foreground font-heading text-lg rounded-xl shadow-[0_20px_50px_rgba(202,138,4,0.3)] hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer"
            >
              {t('sections.cta_start')}
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 px-6 sm:px-8 lg:px-12 bg-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gold-border-gradient flex items-center justify-center">
                <span className="text-white font-heading text-xl font-bold italic">F</span>
              </div>
              <span className="font-heading text-2xl gold-gradient font-bold tracking-wider">ESSENCE</span>
            </Link>
            
            <div className="flex flex-wrap items-center justify-center gap-8">
              <Link to="/guide" className="text-muted-foreground text-[10px] font-body font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">{t('nav.guide')}</Link>
              <Link to="/explore" className="text-muted-foreground text-[10px] font-body font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">{t('nav.explore')}</Link>
              <Link to="/assistant" className="text-muted-foreground text-[10px] font-body font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">{t('nav.assistant')}</Link>
              <Link to="/collection" className="text-muted-foreground text-[10px] font-body font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">{t('nav.collection')}</Link>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
            <p className="text-muted-foreground text-[10px] font-body uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Essence Fragrances. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Telegram', 'Twitter'].map(social => (
                <a key={social} href="#" className="text-muted-foreground text-[10px] font-body uppercase tracking-[0.2em] hover:text-white transition-colors cursor-pointer">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
