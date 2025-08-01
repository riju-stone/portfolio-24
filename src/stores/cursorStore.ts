import { create } from "zustand";
export type CursorState = {
    cursorStyle: "default" | "focused" | "expanded";
};

export type CursorActions = {
    defaultCursor: () => void;
    focusCursor: () => void;
    expandCursor: () => void;
};

export type CursorStore = CursorState & CursorActions;

export const defaultCursorState: CursorState = {
    cursorStyle: "default",
};

export const useCursorStore = create<CursorStore>((set) => ({
    ...defaultCursorState,
    defaultCursor: () => set(() => ({ cursorStyle: "default" })),
    focusCursor: () => set(() => ({ cursorStyle: "focused" })),
    expandCursor: () => set(() => ({ cursorStyle: "expanded" })),
}));
