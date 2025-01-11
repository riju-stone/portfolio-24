import { create } from "zustand";

export type PageState = {
    menuOpen: boolean;
};

export type PageActions = {
    toggleMenu: (open: boolean) => void;
};

export type PageStore = PageState & PageActions;

export const defaultPageState: PageState = {
    menuOpen: false,
};

export const usePageStore = create<PageStore>((set) => ({
    ...defaultPageState,
    toggleMenu: (isOpen: boolean) =>
        set(() => ({
            menuOpen: isOpen,
        })),
}));
