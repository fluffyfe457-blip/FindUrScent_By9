import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import { perfumes } from '@/data/perfumes'
import { Search } from 'lucide-react'

const genderOptions = ['all', 'masculine', 'feminine', 'unisex'] as const
const familyOptions = ['all', 'woody', 'floral', 'fresh', 'oriental', 'fruity', 'aquatic'] as const
const priceRanges = [
  { label: 'All', min: 0, max: 9999 },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 – $200', min: 100, max: 200 },
  { label: '$200 – $350', min: 200, max: 350 },
  { label: '$350+', min: 350, max: 9999 },
]

export default function Explore() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState<string>('all')
  const [family, setFamily] = useState<string>('all')
  const [priceIdx, setPriceIdx] = useState(0)

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

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 mb-10"
      >
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-body">Browse</p>
        <h1 className="font-heading text-4xl sm:text-5xl text-foreground">Explore Fragrances</h1>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 sm:p-6 mb-10 space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-secondary text-foreground rounded-md font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Filter Rows */}
        <div className="flex flex-wrap gap-6">
          {/* Gender */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Gender</p>
            <div className="flex gap-1.5">
              {genderOptions.map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-3 py-1.5 rounded-md text-xs font-body capitalize transition-colors ${
                    gender === g ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Family */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Scent Family</p>
            <div className="flex flex-wrap gap-1.5">
              {familyOptions.map(f => (
                <button
                  key={f}
                  onClick={() => setFamily(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-body capitalize transition-colors ${
                    family === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Price</p>
            <div className="flex flex-wrap gap-1.5">
              {priceRanges.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setPriceIdx(i)}
                  className={`px-3 py-1.5 rounded-md text-xs font-body transition-colors ${
                    priceIdx === i ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <p className="text-sm text-muted-foreground font-body mb-6">{filtered.length} fragrances found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p, i) => (
          <PerfumeCard key={p.id} perfume={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-body">No fragrances match your filters.</p>
        </div>
      )}
    </div>
  )
}
