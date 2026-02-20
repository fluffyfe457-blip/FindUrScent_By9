import { motion } from 'framer-motion'
import { CollectionStatus } from '@/types/perfume'
import { Heart, Check, Eye } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  perfumeId: string
  perfumeName: string
  currentStatus: CollectionStatus | null
  onAdd: (id: string, status: CollectionStatus) => void
  onRemove: (id: string) => void
}

const statusConfig: Record<CollectionStatus, { label: string; icon: typeof Heart }> = {
  owned: { label: 'Owned', icon: Check },
  wishlist: { label: 'Wishlist', icon: Heart },
  tried: { label: 'Tried', icon: Eye },
}

/** Collection status buttons with spring scale animation */
export default function CollectionButton({ perfumeId, perfumeName, currentStatus, onAdd, onRemove }: Props) {
  const handleClick = (status: CollectionStatus) => {
    if (currentStatus === status) {
      onRemove(perfumeId)
      toast(`Removed ${perfumeName} from collection`)
    } else {
      onAdd(perfumeId, status)
      toast.success(`Added ${perfumeName} to ${status}`)
    }
  }

  return (
    <div className="flex gap-2">
      {(Object.keys(statusConfig) as CollectionStatus[]).map(status => {
        const { label, icon: Icon } = statusConfig[status]
        const isActive = currentStatus === status

        return (
          <motion.button
            key={status}
            onClick={() => handleClick(status)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-body transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'glass-card text-muted-foreground hover:text-foreground'
            }`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Icon size={14} />
            {label}
          </motion.button>
        )
      })}
    </div>
  )
}
