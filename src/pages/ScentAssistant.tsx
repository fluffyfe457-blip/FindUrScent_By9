import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search, History, Trash2, ChevronRight, BookOpen, Layers } from 'lucide-react'
import { perfumes } from '@/data/perfumes'
import { analyzeStory } from '@/lib/scent-ai'
import { Perfume } from '@/types/perfume'
import PerfumeCard from '@/components/PerfumeCard'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'

export default function ScentAssistant() {
  const { t } = useTranslation()
  const [story, setStory] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<{ matches: Perfume[]; detectedNotes: string[]; detectedFamilies: string[] } | null>(null)
  
  // Extract all unique notes for the "Deep Dive" section
  const allNotes = useMemo(() => {
    const noteCounts: Record<string, number> = {}
    perfumes.forEach(p => {
      p.notes.forEach(n => {
        noteCounts[n.name] = (noteCounts[n.name] || 0) + 1
      })
    })
    return Object.entries(noteCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by frequency
      .slice(0, 15) // Top 15 notes
  }, [])

  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const noteMatches = useMemo(() => {
    if (!selectedNote) return []
    return perfumes.filter(p => p.notes.some(n => n.name === selectedNote))
  }, [selectedNote])

  const handleAnalyze = () => {
    if (!story.trim()) return
    
    setIsAnalyzing(true)
    setResults(null)
    
    // Simulate AI "Processing"
    setTimeout(() => {
      const analysis = analyzeStory(story)
      setResults(analysis)
      setIsAnalyzing(false)
    }, 1500)
  }

  const reset = () => {
    setStory('')
    setResults(null)
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] right-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[15%] left-[5%] w-[400px] h-[400px] bg-gold-dark/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] border border-white/10 shadow-lg">
            <Sparkles size={12} className="animate-pulse" />
            <span>{t('assistant.badge')}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl text-white font-bold leading-[1.1]">
            {t('assistant.title_part1')} <br />{t('assistant.title_part3')} <span className="gold-gradient italic font-normal">{t('assistant.title_part2')}</span>.
          </h1>
          <p className="text-foreground/70 font-body text-base max-w-xl mx-auto leading-relaxed">
            {t('assistant.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: AI Narrative Input */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8 sm:p-10 liquid-glass rounded-[2.5rem] border-white/10 space-y-8 shadow-2xl">
                <div className="space-y-4">
                  <label className="text-[10px] font-body font-bold uppercase tracking-[0.3em] text-primary/80 ml-1">{t('assistant.input_label')}</label>
                  <Textarea
                    placeholder={t('assistant.input_placeholder')}
                    className="min-h-[160px] bg-white/5 border-white/10 focus:border-primary/40 focus:bg-white/[0.08] rounded-3xl p-6 text-foreground placeholder:text-muted-foreground resize-none font-body text-base leading-relaxed transition-all duration-300"
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                  />
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground font-body px-1 uppercase tracking-widest font-bold">
                    <p className="opacity-60">{t('assistant.input_hint')}</p>
                    <p className="text-primary/60">{story.length} {t('assistant.characters')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing || !story.trim()}
                    className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground hover:gold-glow hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all duration-500 font-heading text-base shadow-[0_20px_40px_rgba(202,138,4,0.3)] cursor-pointer h-auto"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles size={20} />
                        </motion.div>
                        {t('assistant.cta_analyzing')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Sparkles size={20} />
                        {t('assistant.cta_find')}
                      </div>
                    )}
                  </Button>
                  {results && (
                    <Button 
                      variant="outline" 
                      onClick={reset} 
                      className="px-6 h-auto py-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* AI Results */}
            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="h-[320px] flex flex-col items-center justify-center space-y-6 border border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.02]">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(202,138,4,0.2)]"
                    >
                      <Sparkles size={32} className="text-primary" />
                    </motion.div>
                    <div className="text-center space-y-2">
                      <p className="font-heading text-lg text-white">{t('assistant.reading_lines', 'Reading between the lines...')}</p>
                      <p className="font-body text-[10px] text-muted-foreground uppercase tracking-[0.3em] animate-pulse">{t('assistant.mapping', 'Mapping scent frequencies')}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {results && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-12"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
                    <div className="space-y-2">
                      <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-body font-bold">{t('assistant.results_badge')}</p>
                      <h3 className="font-heading text-4xl text-white font-bold">{t('assistant.results_title')}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {results.detectedFamilies.map(f => (
                        <Badge key={f} className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest">{f}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {results.matches.map((p, i) => (
                      <PerfumeCard key={p.id} perfume={p} index={i} />
                    ))}
                    {results.matches.length === 0 && (
                      <div className="col-span-full py-32 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
                        <div className="max-w-xs mx-auto space-y-4">
                          <Search size={32} className="mx-auto text-muted-foreground/30" />
                          <p className="text-foreground/60 font-body text-sm leading-relaxed">
                            {t('assistant.no_matches')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {results.detectedNotes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="p-8 liquid-glass rounded-3xl border-white/5 shadow-none overflow-hidden relative">
                        {/* Decorative background note */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                          <History size={120} />
                        </div>
                        
                        <h4 className="font-heading text-lg text-white mb-6 flex items-center gap-3">
                           <History size={18} className="text-primary" />
                           {t('assistant.signature_notes')}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {results.detectedNotes.map(n => (
                            <Badge key={n} variant="outline" className="bg-white/5 text-[11px] font-body font-bold uppercase tracking-widest px-4 py-2 border-white/10 text-foreground/80 hover:text-white hover:border-primary/30 transition-all duration-500 cursor-default">
                              {n}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Note Deep-Dive */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <Layers size={18} className="text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl text-white">{t('assistant.explorer_title')}</h2>
                </div>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {t('assistant.explorer_desc')}
                </p>
              </div>
              
              <ScrollArea className="h-[350px] border border-white/10 rounded-[2rem] p-4 bg-white/[0.02] liquid-glass">
                <div className="space-y-1.5 p-1">
                  {allNotes.map(([note, count]) => (
                    <button
                      key={note}
                      onClick={() => setSelectedNote(note === selectedNote ? null : note)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-500 group border ${
                        selectedNote === note 
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[0.98]' 
                          : 'bg-transparent border-transparent hover:bg-white/5 text-muted-foreground hover:text-white'
                      }`}
                    >
                      <span className="font-body text-sm font-bold tracking-wide">{note}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedNote === note ? 'text-primary-foreground/70' : 'text-muted-foreground/30'}`}>
                          {count}
                        </span>
                        <ChevronRight size={14} className={`transition-all duration-500 ${selectedNote === note ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Note Matches Preview */}
            <AnimatePresence mode="wait">
              {selectedNote ? (
                <motion.div
                  key={selectedNote}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between px-2">
                    <h3 className="font-heading text-sm text-white">{t('assistant.classic_note', { note: selectedNote })}</h3>
                    <Badge className="bg-white/5 text-[10px] font-bold border-white/10">{noteMatches.length} {t('assistant.explorer_found')}</Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {noteMatches.slice(0, 4).map((p, i) => (
                      <Link
                        key={p.id}
                        to={`/perfume/${p.id}`}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] transition-all duration-500 cursor-pointer shadow-lg"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/5">
                          <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-heading font-medium text-white truncate group-hover:text-primary transition-colors">{p.name}</h4>
                          <p className="text-[10px] text-muted-foreground font-body font-bold uppercase tracking-widest truncate">{p.brand}</p>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                    {noteMatches.length > 4 && (
                      <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary/5 hover:text-white transition-all py-6 rounded-xl border border-dashed border-primary/20">
                        {t('assistant.explorer_cta', { note: selectedNote })}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center border border-dashed border-white/10 rounded-[2rem] bg-white/[0.02]"
                >
                  <Search size={28} className="mx-auto mb-4 text-primary/20" />
                  <p className="text-[11px] text-muted-foreground/60 font-body font-bold uppercase tracking-[0.2em] leading-relaxed">
                    {t('assistant.explorer_placeholder')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
