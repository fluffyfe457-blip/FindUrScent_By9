import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickBuy } from '@/hooks/useQuickBuy'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Truck, Package, CheckCircle2, ShoppingBag, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function QuickBuyDrawer() {
  const { t, i18n } = useTranslation()
  const { isOpen, closeQuickBuy, selectedPerfume } = useQuickBuy()
  const [isRedirecting, setIsRedirecting] = useState(false)

  if (!selectedPerfume) return null

  const contactSeller = () => {
    setIsRedirecting(true)
    const englishMsg = `Hi! I'm interested in purchasing ${selectedPerfume.name} by ${selectedPerfume.brand} which I found on FindUrScent!`
    const khmerMsg = `សួស្តី! ខ្ញុំមានចំណាប់អារម្មណ៍ចង់ទិញ ${selectedPerfume.name} របស់ ${selectedPerfume.brand} ដែលខ្ញុំបានរកឃើញនៅលើ FindUrScent!`
    
    const message = encodeURIComponent(i18n.language === 'km' ? khmerMsg : englishMsg)
    window.open(`https://t.me/sxngtri?text=${message}`, '_blank')
    setTimeout(() => {
      setIsRedirecting(false)
      closeQuickBuy()
    }, 1000)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeQuickBuy()}>
      <SheetContent className="sm:max-w-md w-full border-l border-border/40 bg-background/95 backdrop-blur-xl flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-border/50">
          <div className="flex items-center gap-2 text-primary mb-1">
            <ShoppingBag size={16} />
            <span className="text-[10px] uppercase tracking-widest font-body font-bold">{t('inquiry.title')}</span>
          </div>
          <SheetTitle className="font-heading text-2xl">{t('inquiry.header')}</SheetTitle>
          <SheetDescription className="font-body text-xs">
            {t('inquiry.desc')}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Product Summary */}
          <div className="flex gap-4 items-center p-4 rounded-2xl bg-secondary/5 border border-border/50">
            <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 shadow-lg shadow-black/20">
              <img 
                src={selectedPerfume.image_url} 
                alt={selectedPerfume.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-[10px] uppercase text-primary font-bold tracking-wider">{selectedPerfume.brand}</p>
              <h4 className="font-heading text-lg leading-tight truncate">{selectedPerfume.name}</h4>
              <p className="text-xl font-heading text-foreground">${selectedPerfume.price}</p>
              <Badge variant="secondary" className="text-[9px] h-5 bg-primary/10 text-primary border-none">
                {selectedPerfume.scent_family}
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-2xl border border-dashed border-border/50 bg-secondary/5 space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles size={16} />
                <p className="text-sm font-heading font-medium">{t('inquiry.vibe_match')}</p>
              </div>
              <p className="text-[12px] text-muted-foreground font-body leading-relaxed">
                {t('inquiry.vibe_desc', { 
                  top: selectedPerfume.notes.find(n => n.type === 'top')?.name || '',
                  base: selectedPerfume.notes.find(n => n.type === 'base')?.name || ''
                })}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-heading">{t('inquiry.verified')}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{t('inquiry.verified_desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Truck size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-heading">{t('inquiry.shipping')}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{t('inquiry.shipping_desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="p-6 border-t border-border/50 bg-card/30">
          <div className="w-full space-y-4">
            <Button 
              onClick={contactSeller} 
              disabled={isRedirecting}
              className="w-full py-7 rounded-xl font-heading text-sm tracking-wide bg-primary hover:opacity-90 transition-all gap-3 shadow-xl shadow-primary/20 font-bold"
            >
              {isRedirecting ? (
                <div className="flex items-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Sparkles size={16} />
                  </motion.div>
                  {t('inquiry.opening')}
                </div>
              ) : (
                <>
                  <CreditCard size={18} />
                  {t('inquiry.contact_btn')}
                </>
              )}
            </Button>
            <p className="text-[10px] text-center text-muted-foreground font-body">
              {t('inquiry.footer_note')} <strong>@sxngtri</strong>
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
