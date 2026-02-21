import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { perfumes } from '@/data/perfumes'
import { useCollection } from '@/hooks/useCollection'
import CollectionButton from '@/components/CollectionButton'
import PerfumeCard from '@/components/PerfumeCard'
import { useQuickBuy } from '@/hooks/useQuickBuy'
import { ArrowLeft, ExternalLink, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function PerfumeDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const perfume = perfumes.find(p => p.id === id)
  const { getStatus, addToCollection, removeFromCollection } = useCollection()
  const { openQuickBuy } = useQuickBuy()

  if (!perfume) return <Navigate to="/explore" replace />

  const similar = perfumes.filter(p => perfume.similar_ids.includes(p.id))
  const topNotes = perfume.notes.filter(n => n.type === 'top')
  const middleNotes = perfume.notes.filter(n => n.type === 'middle')
  const baseNotes = perfume.notes.filter(n => n.type === 'base')

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Blobs for consistency */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-gold-dark/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-muted-foreground text-[10px] font-body font-bold uppercase tracking-[0.2em] hover:text-primary transition-all group cursor-pointer bg-white/5 px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1.5 transition-transform duration-500" /> 
            {t('detail.back')}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-20 mb-32">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-secondary sticky top-32 shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/5 group">
              <img
                src={perfume.image_url}
                alt={perfume.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Header */}
            <div className="space-y-4">
              <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-body font-bold">{perfume.brand}</p>
              <h1 className="font-heading text-4xl sm:text-6xl text-white font-bold leading-[1.1]">{perfume.name}</h1>
              <div className="flex items-center gap-6 pt-2">
                <p className="text-3xl font-heading text-white font-bold">${perfume.price}</p>
                <span className="px-3 py-1 rounded-full text-[9px] bg-primary/10 text-primary border border-primary/20 font-bold uppercase tracking-[0.2em]">
                  {t(`gender.${perfume.gender}`, perfume.gender)}
                </span>
              </div>
            </div>

            <p className="text-foreground/70 font-body text-base leading-relaxed max-w-xl">{perfume.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-12">
              {[
                { label: t('detail.longevity'), value: perfume.longevity },
                { label: t('detail.sillage'), value: perfume.sillage },
              ].map(stat => (
                <div key={stat.label} className="space-y-4">
                  <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-body font-bold">{stat.label}</p>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3.5 h-6 rounded-[3px] transition-all duration-700 ${
                          i < stat.value 
                            ? 'bg-primary shadow-[0_0_15px_rgba(202,138,4,0.3)]' 
                            : 'bg-white/[0.05]'
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Collection Buttons */}
            <div className="flex items-center gap-4">
              <CollectionButton
                perfumeId={perfume.id}
                perfumeName={perfume.name}
                currentStatus={getStatus(perfume.id)}
                onAdd={addToCollection}
                onRemove={removeFromCollection}
              />
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 text-[10px] font-body font-bold bg-white/5 border border-white/5 text-foreground/60 uppercase tracking-widest rounded-full">
                  {t(`explore.filter_${perfume.scent_family}`, perfume.scent_family)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => openQuickBuy(perfume)}
                className="flex-1 py-4 h-auto bg-primary text-primary-foreground font-heading text-base rounded-xl shadow-[0_20px_40px_rgba(202,138,4,0.3)] hover:opacity-95 hover:gold-glow hover:scale-[1.02] active:scale-95 transition-all duration-500 gap-3 cursor-pointer"
              >
                <ShoppingBag size={18} />
                {t('detail.buy_telegram')}
              </Button>
              <a
                href={perfume.buy_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
                title={t('detail.official_link')}
              >
                <ExternalLink size={18} />
              </a>
            </div>

            {/* Scent Notes Pyramid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-8 pt-10 border-t border-white/10"
            >
              <h3 className="font-heading text-2xl text-white">{t('detail.scent_notes')}</h3>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { label: t('detail.top_notes'), notes: topNotes, desc: t('detail.top_desc') },
                  { label: t('detail.heart_notes'), notes: middleNotes, desc: t('detail.heart_desc') },
                  { label: t('detail.base_notes'), notes: baseNotes, desc: t('detail.base_desc') },
                ].map(({ label, notes, desc }) => (
                  <div key={label} className="space-y-4 liquid-glass p-5 rounded-2xl border-white/5 shadow-none">
                    <div>
                      <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-body font-bold">{label}</p>
                      <p className="text-[10px] text-muted-foreground font-body mt-1 leading-tight">{desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {notes.map(n => (
                        <span key={n.name} className="px-3 py-1.5 text-xs font-body font-medium bg-white/5 border border-white/5 text-foreground/80 hover:border-primary/30 hover:text-white transition-all duration-500 rounded-xl cursor-default">
                          {n.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="space-y-12 border-t border-white/10 pt-24">
            <div className="space-y-3">
              <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-body font-bold">{t('detail.also_like')}</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-white font-bold">{t('detail.similar')}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {similar.map((p, i) => (
                <PerfumeCard key={p.id} perfume={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
