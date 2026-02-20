import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions } from '@/data/perfumes'
import { useQuiz } from '@/hooks/useQuiz'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Quiz() {
  const navigate = useNavigate()
  const { answers, currentStep, setCurrentStep, setAnswer, getResults } = useQuiz()
  const question = quizQuestions[currentStep]
  const totalSteps = quizQuestions.length

  // Get current answer for this question
  const currentAnswer = answers.find(a => a.questionId === question.id)?.value

  const handleSelect = (value: string) => {
    if (question.multiple) {
      const current = (currentAnswer as string[]) || []
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      setAnswer(question.id, updated)
    } else {
      setAnswer(question.id, value)
    }
  }

  const isSelected = (value: string) => {
    if (!currentAnswer) return false
    if (question.multiple) return (currentAnswer as string[]).includes(value)
    return currentAnswer === value
  }

  const canProceed = currentAnswer !== undefined && (
    question.multiple ? (currentAnswer as string[]).length > 0 : true
  )

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to results - pass state
      const results = getResults()
      navigate('/results', { state: { results: results.slice(0, 5) } })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      {/* Progress */}
      <div className="w-full max-w-lg mb-12">
        <div className="flex justify-between text-sm text-muted-foreground font-body mb-3">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full gold-border-gradient"
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="space-y-8"
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground text-center">
              {question.question}
            </h2>

            {question.multiple && (
              <p className="text-center text-muted-foreground text-sm font-body">
                Select all that apply
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              {question.options.map(option => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`p-5 rounded-lg text-center font-body transition-colors ${
                    isSelected(option.value)
                      ? 'bg-primary text-primary-foreground gold-glow'
                      : 'glass-card text-foreground hover:border-primary/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl block mb-2">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-12">
        {currentStep > 0 && (
          <motion.button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 glass-card text-foreground rounded-md font-body text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={16} /> Back
          </motion.button>
        )}
        <motion.button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-md font-body text-sm font-medium ${
            canProceed
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-muted-foreground cursor-not-allowed'
          }`}
          whileHover={canProceed ? { scale: 1.03 } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
        >
          {currentStep === totalSteps - 1 ? 'See Results' : 'Next'}
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  )
}
