export type ScentNote = { name: string; type: 'top' | 'middle' | 'base' }

export type Perfume = {
  id: string
  name: string
  brand: string
  price: number
  image_url: string
  description: string
  season: string[]
  occasion: string[]
  gender: 'masculine' | 'feminine' | 'unisex'
  longevity: number // 1-10
  sillage: number // 1-10
  scent_family: string
  notes: ScentNote[]
  similar_ids: string[]
  buy_link: string
}

export type QuizAnswer = { questionId: string; value: string | string[] }

export type CollectionStatus = 'owned' | 'wishlist' | 'tried'

export type CollectionItem = {
  perfumeId: string
  status: CollectionStatus
  addedAt: string
}

export type QuizQuestion = {
  id: string
  question: string
  options: { value: string; label: string; icon?: string }[]
  multiple?: boolean
}
