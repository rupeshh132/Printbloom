import { create } from 'zustand'

interface UIState {
  isCartDrawerOpen: boolean;
  isSearchModalOpen: boolean;
  isAuthModalOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartDrawerOpen: false,
  isSearchModalOpen: false,
  isAuthModalOpen: false,
  
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
  
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}))
