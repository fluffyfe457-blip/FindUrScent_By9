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
    <div className="min-h-[100svh] flex flex-col items-center justify-center relative overflow-hidden px-6 pt-32 pb-24">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-gold-dark/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        {/* Step indicators */}
        <div className="w-full max-w-md mb-16 space-y-4">
          <div className="flex gap-2.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                <motion.div
                  className="h-full bg-primary shadow-[0_0_10px_rgba(202,138,4,0.3)]"
                  initial={false}
                  animate={{ width: i <= currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] font-body font-bold uppercase tracking-[0.4em] text-primary/60">
            Phase {currentStep + 1} <span className="mx-2 text-white/20">/</span> {totalSteps}
          </p>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div className="space-y-3">
                <h2 className="font-heading text-2xl sm:text-4xl text-white text-center font-bold leading-[1.1]">
                  {question.question}
                </h2>
                {question.multiple && (
                  <p className="text-center text-primary uppercase tracking-[0.2em] text-[10px] font-body font-bold">
                    Select all that resonate with you
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, i) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSelect(option.value)}
                    className={`relative p-6 rounded-2xl text-center transition-all duration-500 border group cursor-pointer ${
                      isSelected(option.value)
                        ? 'bg-primary/20 border-primary/40 shadow-2xl shadow-primary/20 ring-1 ring-primary/20'
                        : 'bg-white/5 border-white/5 text-foreground/60 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {isSelected(option.value) && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-lg"
                      >
                        <Check size={12} className="text-primary-foreground stroke-[3px]" />
                      </motion.div>
                    )}
                    <span className="text-3xl block mb-4 transition-transform duration-500 group-hover:scale-125 group-active:scale-95">{option.icon}</span>
                    <span className="text-[11px] font-body font-bold uppercase tracking-widest">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-16">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-foreground font-body text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-500 cursor-pointer flex items-center gap-3"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-10 py-4 rounded-xl font-heading text-base font-bold tracking-wide transition-all duration-500 flex items-center gap-3 shadow-xl ${
              canProceed
                ? 'bg-primary text-primary-foreground shadow-primary/20 hover:gold-glow hover:scale-[1.02] active:scale-95 cursor-pointer'
                : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed grayscale'
            }`}
          >
            {currentStep === totalSteps - 1 ? 'Reveal Results' : 'Continue'}
            <ArrowRight size={18} className={canProceed ? 'group-hover:translate-x-1 duration-500' : ''} />
          </button>
        </div>
      </div>
    </div>
  )
}
