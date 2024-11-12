import { create } from "zustand";

export type PageState = {
  pageName: string;
};

export type PageActions = {
  setActivePage: (page: string) => void;
};

export type PageStore = PageState & PageActions;

export const defaultPageState: PageState = {
  pageName: "home",
};

export const usePageStore = create<PageStore>((set) => ({
  ...defaultPageState,
  setActivePage: (page: string) =>
    set(() => ({
      pageName: page,
    })),
}));
