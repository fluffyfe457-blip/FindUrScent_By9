import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  targetValue: number
  label: string
  delay?: number
}

/** Animated match percentage bar that counts up */
export default function MatchBar({ targetValue, label, delay = 0 }: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0
      const step = Math.ceil(targetValue / 40)
      const interval = setInterval(() => {
        start += step
        if (start >= targetValue) {
          setCount(targetValue)
          clearInterval(interval)
        } else {
          setCount(start)
        }
      }, 25)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [targetValue, delay])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground font-body">{label}</span>
        <span className="text-primary font-heading text-2xl font-bold">{count}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full gold-border-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${targetValue}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
