import { create } from "zustand";

export type PageState = {
  menuOpen: boolean;
};

export type PageActions = {
  toggleMenu: () => void;
};

export type PageStore = PageState & PageActions;

export const defaultPageState: PageState = {
  menuOpen: false,
};

export const usePageStore = create<PageStore>((set) => ({
  ...defaultPageState,
  toggleMenu: () =>
    set((state) => ({
      menuOpen: !state.menuOpen,
    })),
}));
