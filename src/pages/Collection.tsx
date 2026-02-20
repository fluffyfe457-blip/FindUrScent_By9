import { motion } from 'framer-motion'
import { perfumes } from '@/data/perfumes'
import { useCollection } from '@/hooks/useCollection'
import PerfumeCard from '@/components/PerfumeCard'
import { CollectionStatus } from '@/types/perfume'
import { useState } from 'react'
import { Package, Heart, Eye } from 'lucide-react'
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

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 mb-10"
      >
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-body">Personal</p>
        <h1 className="font-heading text-4xl sm:text-5xl text-foreground">My Collection</h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-10">
        {tabs.map(({ status, label, icon: Icon }) => {
          const count = items.filter(i => i.status === status).length
          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-body transition-colors ${
                activeTab === status
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={16} />
              {label}
              <span className="ml-1 text-xs opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filteredPerfumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPerfumes.map((p, i) => (
            <PerfumeCard key={p.id} perfume={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <p className="text-muted-foreground font-body">
            No fragrances in your {activeTab} list yet.
          </p>
          <Link
            to="/explore"
            className="inline-block px-6 py-2.5 bg-primary text-primary-foreground font-body text-sm rounded-md"
          >
            Explore Fragrances
          </Link>
        </div>
      )}
    </div>
  )
}
