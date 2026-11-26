import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      view: 'grid',
      search: '',

      setView: (view) => set({ view }),
      setSearch: (search) => set({ search }),
    }),
    {
      name: 'ui-preferences',
      partialize: (state) => ({
        view: state.view,
      }),
    }
  )
);
