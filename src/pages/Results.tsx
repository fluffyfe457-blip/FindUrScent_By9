import { useLocation, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import MatchBar from '@/components/MatchBar'
import { QuizResult } from '@/hooks/useQuiz'
import { RotateCcw, Trophy } from 'lucide-react'

export default function Results() {
  const location = useLocation()
  const results = (location.state as { results?: QuizResult[] })?.results

  if (!results || results.length === 0) {
    return <Navigate to="/quiz" replace />
  }

  const top3 = results.slice(0, 3)
  const others = results.slice(3)

  return (
    <div className="min-h-screen pt-20 pb-16 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 mb-14"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
        >
          <Trophy size={22} className="text-primary" />
        </motion.div>
        <p className="text-primary uppercase tracking-[0.2em] text-xs font-body">Your Results</p>
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground">
          Your Perfect Matches
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
          Based on your preferences, here are your top recommendations.
        </p>
      </motion.div>

      {/* Top 3 with match bars */}
      <div className="space-y-4 mb-16">
        {top3.map((result, i) => (
          <motion.div
            key={result.perfume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="p-5 sm:p-6 rounded-xl border border-border bg-card/50"
          >
            <div className="flex gap-5">
              <Link to={`/perfume/${result.perfume.id}`} className="shrink-0">
                <img
                  src={result.perfume.image_url}
                  alt={result.perfume.name}
                  className="w-20 sm:w-24 h-28 sm:h-32 object-cover rounded-lg"
                />
              </Link>
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body">{result.perfume.brand}</p>
                  <Link to={`/perfume/${result.perfume.id}`}>
                    <h3 className="font-heading text-xl text-foreground hover:text-primary transition-colors truncate">
                      {result.perfume.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-2">{result.perfume.description}</p>
                </div>
                <MatchBar
                  targetValue={result.matchScore}
                  label="Match"
                  delay={i * 0.2 + 0.4}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other recommendations */}
      {others.length > 0 && (
        <div className="space-y-5 mb-12">
          <h2 className="font-heading text-xl text-foreground">Also Worth Trying</h2>
          <div className="grid grid-cols-2 gap-4">
            {others.map((r, i) => (
              <PerfumeCard key={r.perfume.id} perfume={r.perfume} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Retake */}
      <div className="text-center">
        <Link to="/quiz">
          <motion.button
            className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-border text-foreground font-body text-sm rounded-lg hover:border-primary/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw size={13} /> Retake Quiz
          </motion.button>
        </Link>
      </div>
    </div>
  )
}
