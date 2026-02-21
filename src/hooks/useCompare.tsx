import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

type CompareContextType = {
  selected: string[]
  toggle: (id: string) => void
  clear: () => void
  isSelected: (id: string) => boolean
  isFull: boolean
}

const CompareContext = createContext<CompareContextType | null>(null)

const MAX = 2

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = useCallback((id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < MAX ? [...prev, id] : prev
    )
  }, [])

  const clear = useCallback(() => setSelected([]), [])
  const isSelected = useCallback((id: string) => selected.includes(id), [selected])
  const isFull = selected.length >= MAX

  return (
    <CompareContext.Provider value={{ selected, toggle, clear, isSelected, isFull }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
