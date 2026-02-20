import { useLocation, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PerfumeCard from '@/components/PerfumeCard'
import MatchBar from '@/components/MatchBar'
import { QuizResult } from '@/hooks/useQuiz'
import { RotateCcw } from 'lucide-react'

export default function Results() {
  const location = useLocation()
  const results = (location.state as { results?: QuizResult[] })?.results

  if (!results || results.length === 0) {
    return <Navigate to="/quiz" replace />
  }

  const top3 = results.slice(0, 3)
  const others = results.slice(3)

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-16"
      >
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-body">Your Results</p>
        <h1 className="font-heading text-4xl sm:text-6xl text-foreground">
          Your Perfect Matches
        </h1>
        <p className="text-muted-foreground font-body max-w-md mx-auto">
          Based on your preferences, here are the fragrances we recommend for you.
        </p>
      </motion.div>

      {/* Top 3 with match bars */}
      <div className="space-y-8 mb-16">
        {top3.map((result, i) => (
          <motion.div
            key={result.perfume.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to={`/perfume/${result.perfume.id}`} className="shrink-0">
                <img
                  src={result.perfume.image_url}
                  alt={result.perfume.name}
                  className="w-full sm:w-32 h-40 object-cover rounded-lg"
                />
              </Link>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-body">{result.perfume.brand}</p>
                  <Link to={`/perfume/${result.perfume.id}`}>
                    <h3 className="font-heading text-2xl text-foreground hover:text-primary transition-colors">
                      {result.perfume.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground font-body mt-1">{result.perfume.description}</p>
                </div>
                <MatchBar
                  targetValue={result.matchScore}
                  label="Match Score"
                  delay={i * 0.3 + 0.5}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other recommendations */}
      {others.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-heading text-2xl text-foreground">Also Worth Trying</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {others.map((r, i) => (
              <PerfumeCard key={r.perfume.id} perfume={r.perfume} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Retake */}
      <div className="text-center mt-16">
        <Link to="/quiz">
          <motion.button
            className="flex items-center gap-2 mx-auto px-6 py-3 glass-card text-foreground font-body text-sm rounded-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={16} /> Retake Quiz
          </motion.button>
        </Link>
      </div>
    </div>
  )
}
