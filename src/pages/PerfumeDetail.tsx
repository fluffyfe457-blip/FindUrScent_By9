import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { perfumes } from '@/data/perfumes'
import { useCollection } from '@/hooks/useCollection'
import CollectionButton from '@/components/CollectionButton'
import PerfumeCard from '@/components/PerfumeCard'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default function PerfumeDetail() {
  const { id } = useParams<{ id: string }>()
  const perfume = perfumes.find(p => p.id === id)
  const { getStatus, addToCollection, removeFromCollection } = useCollection()

  if (!perfume) return <Navigate to="/explore" replace />

  const similar = perfumes.filter(p => perfume.similar_ids.includes(p.id))
  const topNotes = perfume.notes.filter(n => n.type === 'top')
  const middleNotes = perfume.notes.filter(n => n.type === 'middle')
  const baseNotes = perfume.notes.filter(n => n.type === 'base')

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-muted-foreground text-xs font-body hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} /> Back to Explore
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-14 mb-24">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary sticky top-20">
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-7"
        >
          {/* Header */}
          <div className="space-y-2">
            <p className="text-primary uppercase tracking-[0.2em] text-xs font-body font-medium">{perfume.brand}</p>
            <h1 className="font-heading text-3xl sm:text-4xl text-foreground">{perfume.name}</h1>
            <p className="text-2xl font-heading text-primary font-semibold">${perfume.price}</p>
          </div>

          <p className="text-muted-foreground font-body text-sm leading-relaxed">{perfume.description}</p>

          {/* Stats - horizontal */}
          <div className="flex gap-6">
            {[
              { label: 'Longevity', value: perfume.longevity },
              { label: 'Sillage', value: perfume.sillage },
            ].map(stat => (
              <div key={stat.label} className="space-y-1.5">
                <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-5 rounded-[2px] ${
                        i < stat.value ? 'gold-border-gradient' : 'bg-secondary'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 text-[10px] font-body font-medium bg-primary/10 text-primary capitalize rounded-full">
              {perfume.gender}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-body font-medium bg-primary/10 text-primary capitalize rounded-full">
              {perfume.scent_family}
            </span>
            {perfume.season.map(s => (
              <span key={s} className="px-2.5 py-1 text-[10px] font-body border border-border text-muted-foreground capitalize rounded-full">
                {s}
              </span>
            ))}
            {perfume.occasion.map(o => (
              <span key={o} className="px-2.5 py-1 text-[10px] font-body border border-border text-muted-foreground capitalize rounded-full">
                {o}
              </span>
            ))}
          </div>

          {/* Collection Buttons */}
          <CollectionButton
            perfumeId={perfume.id}
            perfumeName={perfume.name}
            currentStatus={getStatus(perfume.id)}
            onAdd={addToCollection}
            onRemove={removeFromCollection}
          />

          {/* Buy link */}
          <a
            href={perfume.buy_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-body hover:opacity-80 transition-opacity"
          >
            <ExternalLink size={13} /> Buy Now
          </a>

          {/* Scent Notes Pyramid */}
          <div className="space-y-5 pt-2 border-t border-border">
            <h3 className="font-heading text-lg text-foreground pt-3">Scent Notes</h3>
            {[
              { label: 'Top Notes', notes: topNotes, desc: 'First impression, fades quickly' },
              { label: 'Heart Notes', notes: middleNotes, desc: 'The core of the fragrance' },
              { label: 'Base Notes', notes: baseNotes, desc: 'Long-lasting foundation' },
            ].map(({ label, notes, desc }) => (
              <div key={label} className="space-y-2">
                <div>
                  <p className="text-xs text-primary uppercase tracking-wider font-body font-medium">{label}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {notes.map(n => (
                    <span key={n.name} className="px-2.5 py-1 text-xs font-body border border-border text-foreground rounded-full">
                      {n.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="space-y-6 border-t border-border pt-12">
          <div className="space-y-1">
            <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">You May Also Like</p>
            <h2 className="font-heading text-2xl text-foreground">Similar Fragrances</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {similar.map((p, i) => (
              <PerfumeCard key={p.id} perfume={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
