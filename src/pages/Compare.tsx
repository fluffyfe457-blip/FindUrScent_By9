import { useSearchParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { perfumes } from '@/data/perfumes'
import { ArrowLeft } from 'lucide-react'

const statLabel = (val: number) => {
  if (val >= 8) return 'Strong'
  if (val >= 5) return 'Moderate'
  return 'Light'
}

export default function Compare() {
  const [params] = useSearchParams()
  const ids = params.get('ids')?.split(',') ?? []
  const items = ids.map(id => perfumes.find(p => p.id === id)).filter(Boolean) as typeof perfumes

  if (items.length < 2) return <Navigate to="/explore" replace />

  const [a, b] = items

  const rows: { label: string; a: React.ReactNode; b: React.ReactNode }[] = [
    { label: 'Brand', a: a.brand, b: b.brand },
    { label: 'Price', a: `$${a.price}`, b: `$${b.price}` },
    { label: 'Gender', a: a.gender, b: b.gender },
    { label: 'Scent Family', a: a.scent_family, b: b.scent_family },
    { label: 'Seasons', a: a.season.join(', '), b: b.season.join(', ') },
    { label: 'Occasions', a: a.occasion.join(', '), b: b.occasion.join(', ') },
    {
      label: 'Longevity',
      a: <StatBar value={a.longevity} />,
      b: <StatBar value={b.longevity} />,
    },
    {
      label: 'Sillage',
      a: <StatBar value={a.sillage} />,
      b: <StatBar value={b.sillage} />,
    },
    {
      label: 'Top Notes',
      a: <NotePills notes={a.notes.filter(n => n.type === 'top')} />,
      b: <NotePills notes={b.notes.filter(n => n.type === 'top')} />,
    },
    {
      label: 'Heart Notes',
      a: <NotePills notes={a.notes.filter(n => n.type === 'middle')} />,
      b: <NotePills notes={b.notes.filter(n => n.type === 'middle')} />,
    },
    {
      label: 'Base Notes',
      a: <NotePills notes={a.notes.filter(n => n.type === 'base')} />,
      b: <NotePills notes={b.notes.filter(n => n.type === 'base')} />,
    },
  ]

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-muted-foreground text-xs font-body hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} /> Back to Explore
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-1 mb-10">
        <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Side by Side</p>
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground">Compare Fragrances</h1>
      </motion.div>

      {/* Header images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-10"
      >
        <PerfumeHeader perfume={a} />
        <div className="flex items-end pb-4">
          <span className="text-muted-foreground font-heading text-lg">vs</span>
        </div>
        <PerfumeHeader perfume={b} />
      </motion.div>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl overflow-hidden"
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1fr_auto_1fr] ${i !== rows.length - 1 ? 'border-b border-border' : ''}`}
          >
            <div className="p-2.5 sm:p-4 text-xs sm:text-sm font-body text-foreground capitalize">{row.a}</div>
            <div className="p-2.5 sm:p-4 flex items-center justify-center min-w-[70px] sm:min-w-[110px] bg-secondary/30">
              <span className="text-[8px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-muted-foreground font-body text-center leading-tight">{row.label}</span>
            </div>
            <div className="p-2.5 sm:p-4 text-xs sm:text-sm font-body text-foreground capitalize">{row.b}</div>
          </div>
        ))}
      </motion.div>

      {/* Buy links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 mt-8"
      >
        {[a, b].map(p => (
          <a
            key={p.id}
            href={p.buy_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 rounded-lg bg-primary/10 text-primary text-sm font-body hover:bg-primary/20 transition-colors"
          >
            Buy {p.name}
          </a>
        ))}
      </motion.div>
    </div>
  )
}

function PerfumeHeader({ perfume }: { perfume: typeof perfumes[0] }) {
  return (
    <div className="text-center space-y-3">
      <div className="aspect-[3/4] max-h-48 mx-auto rounded-lg overflow-hidden bg-secondary">
        <img src={perfume.image_url} alt={perfume.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-body">{perfume.brand}</p>
        <h2 className="font-heading text-lg text-foreground">{perfume.name}</h2>
        <p className="text-primary font-heading text-base">${perfume.price}</p>
      </div>
    </div>
  )
}

function StatBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 rounded-[2px] ${i < value ? 'gold-border-gradient' : 'bg-secondary'}`}
          />
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground font-body">{statLabel(value)}</span>
    </div>
  )
}

function NotePills({ notes }: { notes: { name: string }[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {notes.map(n => (
        <span key={n.name} className="px-2 py-0.5 text-[10px] font-body border border-border text-foreground rounded-full">
          {n.name}
        </span>
      ))}
    </div>
  )
}
