import { create } from "zustand";

export type ThemeState = {
  theme: string;
  themeTogglePos: {
    x: number;
    y: number;
  };
};

export type ThemeActions = {
  changeTheme: () => void;
  calibrateThemeTogglePos: (switchPos: ThemeState["themeTogglePos"]) => void;
};

export type ThemeStore = ThemeState & ThemeActions;

export const defaultThemeState: ThemeState = {
  theme: "dark",
  themeTogglePos: {
    x: 0,
    y: 0,
  },
};

export const useThemeStore = create<ThemeStore>((set) => ({
  ...defaultThemeState,
  changeTheme: () =>
    set((state) => ({ theme: state.theme == "light" ? "dark" : "light" })),
  calibrateThemeTogglePos: (switchPos: ThemeState["themeTogglePos"]) =>
    set(() => ({
      themeTogglePos: switchPos,
    })),
}));
