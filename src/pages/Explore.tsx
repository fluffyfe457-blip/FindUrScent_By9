import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import { perfumes } from '@/data/perfumes'
import { Search, X } from 'lucide-react'

const genderOptions = ['all', 'masculine', 'feminine', 'unisex'] as const
const familyOptions = ['all', 'woody', 'floral', 'fresh', 'oriental', 'fruity', 'aquatic'] as const
const priceRanges = [
  { label: 'All', min: 0, max: 9999 },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 – $200', min: 100, max: 200 },
  { label: '$200+', min: 200, max: 9999 },
]

export default function Explore() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState<string>('all')
  const [family, setFamily] = useState<string>('all')
  const [priceIdx, setPriceIdx] = useState(0)

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
  }, [search, gender, family, priceIdx])

  const clearFilters = () => {
    setSearch('')
    setGender('all')
    setFamily('all')
    setPriceIdx(0)
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 mb-8"
      >
        <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Browse</p>
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground">Explore Fragrances</h1>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-4 mb-8"
      >
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-card border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters in a single row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gender pills */}
          {genderOptions.map(g => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-body capitalize transition-all ${
                gender === g
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/20'
              }`}
            >
              {g}
            </button>
          ))}

          <span className="w-px h-5 bg-border mx-1" />

          {/* Family pills */}
          {familyOptions.map(f => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-body capitalize transition-all ${
                family === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/20'
              }`}
            >
              {f}
            </button>
          ))}

          <span className="w-px h-5 bg-border mx-1 hidden sm:block" />

          {/* Price pills */}
          {priceRanges.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setPriceIdx(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-body transition-all ${
                priceIdx === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/20'
              }`}
            >
              {r.label}
            </button>
          ))}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-xs font-body text-primary hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground font-body mb-5">
        {filtered.length} fragrance{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {filtered.map((p, i) => (
          <PerfumeCard key={p.id} perfume={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 space-y-3">
          <p className="text-foreground font-heading text-xl">No matches found</p>
          <p className="text-muted-foreground font-body text-sm">Try adjusting your filters</p>
          <button
            onClick={clearFilters}
            className="mt-2 px-5 py-2 bg-primary text-primary-foreground font-body text-sm rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
