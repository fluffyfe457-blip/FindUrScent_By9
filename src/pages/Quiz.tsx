import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions } from '@/data/perfumes'
import { useQuiz } from '@/hooks/useQuiz'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export default function Quiz() {
  const navigate = useNavigate()
  const { answers, currentStep, setCurrentStep, setAnswer, getResults } = useQuiz()
  const question = quizQuestions[currentStep]
  const totalSteps = quizQuestions.length

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
      const results = getResults()
      navigate('/results', { state: { results: results.slice(0, 5) } })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center px-6 py-24">
      {/* Step indicators */}
      <div className="w-full max-w-md mb-14">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-secondary">
              <motion.div
                className="h-full gold-border-gradient"
                initial={false}
                animate={{ width: i <= currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground font-body mt-3">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-foreground text-center leading-tight">
              {question.question}
            </h2>

            {question.multiple && (
              <p className="text-center text-muted-foreground text-xs font-body">
                Select all that apply
              </p>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              {question.options.map(option => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`relative p-4 rounded-xl text-center font-body transition-all duration-200 border ${
                    isSelected(option.value)
                      ? 'bg-primary/10 border-primary/40 text-foreground'
                      : 'bg-card/50 border-border/50 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSelected(option.value) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check size={10} className="text-primary-foreground" />
                    </motion.div>
                  )}
                  <span className="text-xl block mb-1.5">{option.icon}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-10">
        {currentStep > 0 && (
          <motion.button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-5 py-2.5 border border-border text-foreground rounded-lg font-body text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={14} /> Back
          </motion.button>
        )}
        <motion.button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${
            canProceed
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-muted-foreground cursor-not-allowed opacity-50'
          }`}
          whileHover={canProceed ? { scale: 1.02 } : {}}
          whileTap={canProceed ? { scale: 0.98 } : {}}
        >
          {currentStep === totalSteps - 1 ? 'See Results' : 'Continue'}
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </div>
  )
}
