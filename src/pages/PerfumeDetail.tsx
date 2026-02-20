import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { perfumes } from '@/data/perfumes'
import { useCollection } from '@/hooks/useCollection'
import CollectionButton from '@/components/CollectionButton'
import PerfumeCard from '@/components/PerfumeCard'
import { ArrowLeft, Droplets, Wind, Clock } from 'lucide-react'

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
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Link
        to="/explore"
        className="inline-flex items-center gap-1 text-muted-foreground text-sm font-body hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Back to Explore
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-[3/4] rounded-xl overflow-hidden glass-card">
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-body">{perfume.brand}</p>
            <h1 className="font-heading text-4xl sm:text-5xl text-foreground">{perfume.name}</h1>
            <p className="text-3xl font-heading text-primary font-semibold">${perfume.price}</p>
          </div>

          <p className="text-muted-foreground font-body leading-relaxed">{perfume.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center space-y-1">
              <Clock size={18} className="mx-auto text-primary" />
              <p className="text-xs text-muted-foreground font-body">Longevity</p>
              <p className="text-lg font-heading text-foreground">{perfume.longevity}/10</p>
            </div>
            <div className="glass-card p-4 text-center space-y-1">
              <Wind size={18} className="mx-auto text-primary" />
              <p className="text-xs text-muted-foreground font-body">Sillage</p>
              <p className="text-lg font-heading text-foreground">{perfume.sillage}/10</p>
            </div>
            <div className="glass-card p-4 text-center space-y-1">
              <Droplets size={18} className="mx-auto text-primary" />
              <p className="text-xs text-muted-foreground font-body">Family</p>
              <p className="text-lg font-heading text-foreground capitalize">{perfume.scent_family}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {perfume.season.map(s => (
                <span key={s} className="px-3 py-1 text-xs font-body glass-card text-muted-foreground capitalize rounded-full">
                  {s}
                </span>
              ))}
              {perfume.occasion.map(o => (
                <span key={o} className="px-3 py-1 text-xs font-body glass-card text-muted-foreground capitalize rounded-full">
                  {o}
                </span>
              ))}
              <span className="px-3 py-1 text-xs font-body bg-primary/10 text-primary capitalize rounded-full">
                {perfume.gender}
              </span>
            </div>
          </div>

          {/* Collection Buttons */}
          <CollectionButton
            perfumeId={perfume.id}
            perfumeName={perfume.name}
            currentStatus={getStatus(perfume.id)}
            onAdd={addToCollection}
            onRemove={removeFromCollection}
          />

          {/* Notes Pyramid */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl text-foreground">Scent Notes</h3>
            {[
              { label: 'Top Notes', notes: topNotes },
              { label: 'Heart Notes', notes: middleNotes },
              { label: 'Base Notes', notes: baseNotes },
            ].map(({ label, notes }) => (
              <div key={label} className="space-y-1">
                <p className="text-xs text-primary uppercase tracking-wider font-body">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {notes.map(n => (
                    <span key={n.name} className="px-3 py-1 text-sm font-body glass-card text-foreground rounded-full">
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
        <section className="space-y-6">
          <h2 className="font-heading text-3xl text-foreground">Similar Fragrances</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((p, i) => (
              <PerfumeCard key={p.id} perfume={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
