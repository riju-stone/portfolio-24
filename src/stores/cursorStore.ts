import { create } from "zustand";
export type CursorState = {
    cursorStyle: string;
};

export type CursorActions = {
    defaultCursor: () => void;
    focusCursor: () => void;
    maskCursor: () => void;
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
    maskCursor: () => set(() => ({ cursorStyle: "masked" })),
    expandCursor: () => set(() => ({ cursorStyle: "expanded" })),
}));
