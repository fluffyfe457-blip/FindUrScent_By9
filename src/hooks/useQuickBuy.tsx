import { createContext, useContext, useState, ReactNode } from 'react';
import { Perfume } from '@/types/perfume';
import { toast } from 'sonner';

interface QuickBuyContextType {
  isOpen: boolean;
  selectedPerfume: Perfume | null;
  openQuickBuy: (perfume: Perfume) => void;
  closeQuickBuy: () => void;
  handlePurchase: (details: any) => void;
}

const QuickBuyContext = createContext<QuickBuyContextType | undefined>(undefined);

export function QuickBuyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const openQuickBuy = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsOpen(true);
  };

  const closeQuickBuy = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedPerfume(null), 300); // Clear after animation
  };

  const handlePurchase = (details: any) => {
    // Simulate API call
    console.log('Purchase Details:', details);
    toast.success("Order Placed Successfully!", {
      description: `Your bottle of ${selectedPerfume?.name} is being prepared.`,
    });
    closeQuickBuy();
  };

  return (
    <QuickBuyContext.Provider value={{ isOpen, selectedPerfume, openQuickBuy, closeQuickBuy, handlePurchase }}>
      {children}
    </QuickBuyContext.Provider>
  );
}

export function useQuickBuy() {
  const context = useContext(QuickBuyContext);
  if (context === undefined) {
    throw new Error('useQuickBuy must be used within a QuickBuyProvider');
  }
  return context;
}
