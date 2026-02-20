import { motion } from 'framer-motion'
import { perfumes } from '@/data/perfumes'
import { useCollection } from '@/hooks/useCollection'
import PerfumeCard from '@/components/PerfumeCard'
import { CollectionStatus } from '@/types/perfume'
import { useState } from 'react'
import { Package, Heart, Eye, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const tabs: { status: CollectionStatus; label: string; icon: typeof Heart }[] = [
  { status: 'owned', label: 'Owned', icon: Package },
  { status: 'wishlist', label: 'Wishlist', icon: Heart },
  { status: 'tried', label: 'Tried', icon: Eye },
]

export default function Collection() {
  const { items } = useCollection()
  const [activeTab, setActiveTab] = useState<CollectionStatus>('owned')

  const filtered = items.filter(i => i.status === activeTab)
  const filteredPerfumes = filtered
    .map(i => perfumes.find(p => p.id === i.perfumeId))
    .filter(Boolean) as typeof perfumes

  const totalCount = items.length

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 mb-8"
      >
        <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Personal</p>
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground">
          My Collection
          {totalCount > 0 && <span className="text-muted-foreground text-lg ml-2">({totalCount})</span>}
        </h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-card rounded-lg border border-border w-fit mb-8">
        {tabs.map(({ status, label, icon: Icon }) => {
          const count = items.filter(i => i.status === status).length
          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-body font-medium transition-colors ${
                activeTab === status
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === status && (
                <motion.div
                  layoutId="collection-tab"
                  className="absolute inset-0 bg-secondary rounded-md"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <Icon size={13} />
                {label}
                <span className="text-[10px] opacity-60">({count})</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filteredPerfumes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredPerfumes.map((p, i) => (
            <PerfumeCard key={p.id} perfume={p} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-28 space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Sparkles size={20} className="text-muted-foreground" />
          </div>
          <p className="text-foreground font-heading text-lg">
            Your {activeTab} list is empty
          </p>
          <p className="text-muted-foreground font-body text-sm">
            Start exploring to build your collection
          </p>
          <Link
            to="/explore"
            className="inline-block mt-2 px-5 py-2.5 bg-primary text-primary-foreground font-body text-sm rounded-lg"
          >
            Explore Fragrances
          </Link>
        </motion.div>
      )}
    </div>
  )
}
