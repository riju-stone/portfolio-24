import { create } from "zustand";

export type ThemeState = {
  theme: string;
  themeTogglePos: {
    x: number | null;
    y: number | null;
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
    x: null,
    y: null,
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
};
