import { create } from "zustand";

export const useErrorContext = create((set) => ({
  error: null,
  setError: (error) => set(() => ({ error })),
  clear: () => set({ error: null }),
}))