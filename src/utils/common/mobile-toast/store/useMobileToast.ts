import create from "zustand/react";

interface MobileToastState {
  isOpen: boolean;
  children: React.ReactNode;
  currentTimeout: NodeJS.Timeout | null;
  open: (children: React.ReactNode, duration?: number) => void;
}

const useMobileToast = create<MobileToastState>((set, get) => ({
  isOpen: false,
  children: "test",
  currentTimeout: null,
  open: (children, duration) => {
    const state = get();

    !!state.currentTimeout && clearTimeout(state.currentTimeout);

    duration = duration ?? 1_000;

    set({ children, isOpen: true });

    const currentTimeout = setTimeout(() => {
      set({ children: "", isOpen: false });
    }, duration);

    set({ currentTimeout });
  },
}));

export default useMobileToast;
