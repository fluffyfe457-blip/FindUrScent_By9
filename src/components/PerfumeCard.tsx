import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Perfume } from "@/types/perfume";
import { useCompare } from "@/hooks/useCompare";
import { useQuickBuy } from "@/hooks/useQuickBuy";
import { ArrowRightLeft, Check, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  perfume: Perfume;
  index?: number;
};

/** Animated perfume card with hover lift effect and compare toggle */
export default function PerfumeCard({ perfume, index = 0 }: Props) {
  const { t } = useTranslation();
  const { isSelected, toggle, isFull } = useCompare();
  const { openQuickBuy } = useQuickBuy();
  const selected = isSelected(perfume.id);

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickBuy(perfume);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Compare checkbox */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(perfume.id);
        }}
        disabled={!selected && isFull}
        className={`absolute top-3 left-3 z-10 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
          selected
            ? "bg-primary border-primary text-primary-foreground"
            : "border-border bg-background/60 backdrop-blur-sm text-transparent hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed"
        }`}
        title={
          selected
            ? t('common.remove_compare')
            : isFull
              ? t('common.max_compare')
              : t('common.add_compare')
        }
      >
        <ArrowRightLeft size={12} />
        {selected && <Check size={10} />}
      </button>

      <Link to={`/perfume/${perfume.id}`} className="block group">
        <motion.div
          className={`glass-card overflow-hidden rounded-xl transition-all ${selected ? "ring-1 ring-primary/40" : ""}`}
          whileHover={{ y: -4, boxShadow: "0 16px 50px hsl(0 0% 0% / 0.4)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Image with dark overlay for consistency */}
          <div className="aspect-[4/5] overflow-hidden relative bg-secondary">
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
            
            {/* Quick Buy Overlay Button */}
            <motion.button
              onClick={handleQuickBuy}
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 py-2.5 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 text-xs font-heading font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-xl shadow-black/20"
            >
              <ShoppingBag size={14} />
              {t('common.contact_buy')}
            </motion.button>

            {/* Price badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm">
              <span className="text-xs font-body font-semibold text-primary">
                ${perfume.price}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 space-y-1.5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-body font-medium">
              {perfume.brand}
            </p>
            <h3 className="font-heading text-base text-white font-medium leading-tight">
              {perfume.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-body capitalize">
                {t(`explore.filter_${perfume.scent_family}`, perfume.scent_family)}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs text-muted-foreground font-body capitalize">
                {t(`gender.${perfume.gender}`, perfume.gender)}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
