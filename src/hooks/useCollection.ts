import { useState, useEffect, useCallback } from 'react'
import { CollectionItem, CollectionStatus } from '@/types/perfume'

const STORAGE_KEY = 'perfume-collection'

/** Hook to manage user's perfume collection with localStorage persistence */
export function useCollection() {
  const [items, setItems] = useState<CollectionItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCollection = useCallback((perfumeId: string, status: CollectionStatus) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.perfumeId === perfumeId)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { ...updated[existing], status }
        return updated
      }
      return [...prev, { perfumeId, status, addedAt: new Date().toISOString() }]
    })
  }, [])

  const removeFromCollection = useCallback((perfumeId: string) => {
    setItems(prev => prev.filter(i => i.perfumeId !== perfumeId))
  }, [])

  const getStatus = useCallback((perfumeId: string): CollectionStatus | null => {
    return items.find(i => i.perfumeId === perfumeId)?.status ?? null
  }, [items])

  return { items, addToCollection, removeFromCollection, getStatus }
}
