import { useState, useCallback } from 'react'
import { QuizAnswer, Perfume } from '@/types/perfume'
import { perfumes } from '@/data/perfumes'

const STORAGE_KEY = 'perfume-quiz-results'

/** Score a perfume against quiz answers. Returns 0-100 match percentage. */
function scorePerfume(perfume: Perfume, answers: QuizAnswer[]): number {
  let score = 0
  let maxScore = 0

  for (const answer of answers) {
    switch (answer.questionId) {
      case 'gender': {
        maxScore += 25
        const val = answer.value as string
        if (perfume.gender === val || perfume.gender === 'unisex') score += 25
        else if (val === 'unisex') score += 15
        break
      }
      case 'season': {
        maxScore += 20
        const vals = answer.value as string[]
        const overlap = vals.filter(v => perfume.season.includes(v)).length
        score += (overlap / Math.max(vals.length, 1)) * 20
        break
      }
      case 'occasion': {
        maxScore += 20
        const val = answer.value as string
        if (perfume.occasion.includes(val)) score += 20
        break
      }
      case 'scent_family': {
        maxScore += 25
        const val = answer.value as string
        if (perfume.scent_family === val) score += 25
        else {
          // Partial match for related families
          const related: Record<string, string[]> = {
            woody: ['oriental'],
            oriental: ['woody', 'floral'],
            floral: ['oriental', 'fruity'],
            fresh: ['aquatic', 'fruity'],
            fruity: ['fresh', 'floral'],
            aquatic: ['fresh'],
          }
          if (related[val]?.includes(perfume.scent_family)) score += 10
        }
        break
      }
      case 'budget': {
        maxScore += 10
        const val = answer.value as string
        const ranges: Record<string, [number, number]> = {
          budget: [0, 100],
          mid: [100, 200],
          premium: [200, 350],
          luxury: [350, 9999],
        }
        const [min, max] = ranges[val] ?? [0, 9999]
        if (perfume.price >= min && perfume.price <= max) score += 10
        else if (Math.abs(perfume.price - (min + max) / 2) < 80) score += 5
        break
      }
    }
  }

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
}

export type QuizResult = { perfume: Perfume; matchScore: number }

export function useQuiz() {
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  const setAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers(prev => {
      const idx = prev.findIndex(a => a.questionId === questionId)
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = { questionId, value }
        return updated
      }
      return [...prev, { questionId, value }]
    })
  }, [])

  const getResults = useCallback((): QuizResult[] => {
    const scored = perfumes.map(p => ({
      perfume: p,
      matchScore: scorePerfume(p, answers),
    }))
    scored.sort((a, b) => b.matchScore - a.matchScore)

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers,
        topResults: scored.slice(0, 5).map(r => ({ id: r.perfume.id, score: r.matchScore })),
      }))
    } catch { /* ignore */ }

    return scored
  }, [answers])

  const reset = useCallback(() => {
    setAnswers([])
    setCurrentStep(0)
  }, [])

  return { answers, currentStep, setCurrentStep, setAnswer, getResults, reset }
}
