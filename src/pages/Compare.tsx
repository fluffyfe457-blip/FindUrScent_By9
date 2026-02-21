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
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] bg-gold-dark/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-muted-foreground text-[10px] font-body font-bold uppercase tracking-[0.2em] hover:text-primary transition-all group bg-white/5 px-4 py-2 rounded-full border border-white/5 cursor-pointer"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1.5 transition-transform duration-500" /> Back to Explore
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-12">
          <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-body font-bold">Side by Side</p>
          <h1 className="font-heading text-3xl sm:text-5xl text-white font-bold">Compare Fragrances</h1>
        </motion.div>

        {/* Header images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="grid grid-cols-[1fr_auto_1fr] gap-6 sm:gap-10 mb-16 items-start"
        >
          <PerfumeHeader perfume={a} />
          <div className="flex items-center justify-center pt-24">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl">
              <span className="text-muted-foreground font-heading text-base gold-gradient font-bold italic">vs</span>
            </div>
          </div>
          <PerfumeHeader perfume={b} />
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="liquid-glass rounded-[2rem] border-white/10 overflow-hidden shadow-2xl"
        >
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_auto_1fr] group ${i !== rows.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="p-4 sm:p-6 text-xs sm:text-sm font-body text-foreground/80 capitalize flex items-center transition-colors group-hover:bg-white/[0.01]">
                {row.a}
              </div>
              <div className="p-2.5 sm:p-4 flex items-center justify-center min-w-[80px] sm:min-w-[140px] bg-white/[0.03] border-x border-white/5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-primary/80 font-bold font-body text-center leading-tight">{row.label}</span>
              </div>
              <div className="p-4 sm:p-6 text-xs sm:text-sm font-body text-foreground/80 capitalize flex items-center justify-end transition-colors group-hover:bg-white/[0.01] text-right">
                {row.b}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Buy Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="grid grid-cols-2 gap-4 sm:gap-8 mt-12"
        >
          {[a, b].map(p => (
            <Link
              key={p.id}
              to={`/perfume/${p.id}`}
              className="flex items-center justify-center py-4 rounded-xl bg-primary text-primary-foreground font-heading text-base font-bold hover:gold-glow hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-xl shadow-primary/20 cursor-pointer"
            >
              Experience {p.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function PerfumeHeader({ perfume }: { perfume: typeof perfumes[0] }) {
  return (
    <div className="text-center space-y-6 group">
      <div className="aspect-[3/4] max-h-72 sm:max-h-96 mx-auto rounded-3xl overflow-hidden bg-secondary shadow-2xl border border-white/5 relative">
        <img src={perfume.image_url} alt={perfume.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <motion.div layout className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-body font-bold">{perfume.brand}</p>
        <h2 className="font-heading text-2xl sm:text-3xl text-white font-bold">{perfume.name}</h2>
        <p className="text-white font-heading text-xl sm:text-2xl font-bold opacity-80">${perfume.price}</p>
      </motion.div>
    </div>
  )
}

function StatBar({ value }: { value: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 sm:w-3 sm:h-5 rounded-[2px] transition-all duration-700 ${
              i < value ? 'bg-primary shadow-[0_0_10px_rgba(202,138,4,0.3)]' : 'bg-white/5'
            }`}
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
      <span className="text-[9px] text-muted-foreground font-body font-bold uppercase tracking-widest">{statLabel(value)}</span>
    </div>
  )
}

function NotePills({ notes }: { notes: { name: string }[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-start">
      {notes.map(n => (
        <span key={n.name} className="px-3 py-1 text-[10px] font-body font-bold bg-white/5 border border-white/5 text-foreground/70 rounded-lg hover:border-primary/30 hover:text-white transition-all duration-500">
          {n.name}
        </span>
      ))}
    </div>
  )
}
