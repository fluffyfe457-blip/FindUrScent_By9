import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import { perfumes } from '@/data/perfumes'
import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const genderOptions = ['all', 'masculine', 'feminine', 'unisex'] as const
const familyOptions = ['all', 'woody', 'floral', 'fresh', 'oriental', 'fruity', 'aquatic'] as const

export default function Explore() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState<string>('all')
  const [family, setFamily] = useState<string>('all')
  const [priceIdx, setPriceIdx] = useState(0)

  const priceRanges = useMemo(() => [
    { label: t('price.all', 'All'), min: 0, max: 9999 },
    { label: t('price.under_100', 'Under $100'), min: 0, max: 100 },
    { label: t('price.100_200', '$100 – $200'), min: 100, max: 200 },
    { label: t('price.over_200', '$200+'), min: 200, max: 9999 },
  ], [t])

  const hasFilters = gender !== 'all' || family !== 'all' || priceIdx !== 0 || search !== ''

  const filtered = useMemo(() => {
    return perfumes.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false
      if (gender !== 'all' && p.gender !== gender) return false
      if (family !== 'all' && p.scent_family !== family) return false
      const { min, max } = priceRanges[priceIdx]
      if (p.price < min || p.price > max) return false
      return true
    })
  }, [search, gender, family, priceIdx, priceRanges])

  const clearFilters = () => {
    setSearch('')
    setGender('all')
    setFamily('all')
    setPriceIdx(0)
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-body font-bold">{t('nav.explore')}</p>
            <h1 className="font-heading text-4xl sm:text-6xl text-white font-bold">{t('explore.title')}</h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground font-body uppercase tracking-widest bg-white/5 border border-white/5 px-4 py-2 rounded-full"
          >
            {t('explore.count', { count: filtered.length })}
          </motion.p>
        </div>

        {/* Search & Filters Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass p-6 sm:p-8 rounded-[2rem] border-white/10 mb-16 space-y-8 shadow-2xl"
        >
          {/* Search */}
          <div className="relative group max-w-2xl">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform duration-300" />
            <input
              type="text"
              placeholder={t('explore.search_placeholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-body text-base text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all duration-300"
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filter Rows */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-primary/80 ml-1">Refine Presence</p>
              <div className="flex flex-wrap items-center gap-3">
                {genderOptions.map(g => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-body font-bold uppercase tracking-widest transition-all duration-500 cursor-pointer ${
                      gender === g
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 hover:bg-white/10'
                    }`}
                  >
                    {t(`gender.${g}`, g)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-primary/80 ml-1">Scent Identity</p>
              <div className="flex flex-wrap items-center gap-3">
                {familyOptions.map(f => (
                  <button
                    key={f}
                    onClick={() => setFamily(f)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-body font-bold uppercase tracking-widest transition-all duration-500 cursor-pointer ${
                      family === f
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 hover:bg-white/10'
                    }`}
                  >
                    {t(`explore.filter_${f}`, f)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pr-2">
                <p className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-primary/80 ml-1">Invest Range</p>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-body font-bold uppercase tracking-widest text-primary hover:text-white transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    {t('common.clear_all')}
                    <X size={12} className="group-hover:rotate-90 transition-transform duration-500" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setPriceIdx(i)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-body font-bold uppercase tracking-widest transition-all duration-500 cursor-pointer ${
                      priceIdx === i
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-primary/30 hover:bg-white/10'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 min-h-[400px]"
        >
          <AnimatePresence mode='popLayout'>
            {filtered.map((p, i) => (
              <PerfumeCard key={p.id} perfume={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10"
          >
            <div className="max-w-xs mx-auto space-y-6">
              <div className="p-6 rounded-full bg-white/5 border border-white/5 inline-block mb-4">
                <Search size={40} className="text-primary/40" />
              </div>
              <div className="space-y-2">
                <p className="text-white font-heading text-2xl font-medium">{t('common.no_matches')}</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{t('common.adjust_filters')}</p>
              </div>
              <button
                onClick={clearFilters}
                className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-body font-bold uppercase tracking-widest rounded-xl hover:gold-glow hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl shadow-primary/20"
              >
                {t('common.clear_filters')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
