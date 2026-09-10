import { create } from 'zustand'

export interface ConfirmModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ConfirmState {
  isOpen: boolean;
  options: ConfirmModalOptions | null;
  openConfirmModal: (options: ConfirmModalOptions) => void;
  closeConfirmModal: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  options: null,
  openConfirmModal: (options) => set({ isOpen: true, options }),
  closeConfirmModal: () => set({ isOpen: false, options: null }),
}))
