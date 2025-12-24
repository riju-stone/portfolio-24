import { create } from "zustand";

export type BlogState = {
  totalPosts: number;
  currentBlogPage: number;
  totalBlogPages: number;
  currentPageBlogData: Array<any>;
  postCountsByTag: Array<Record<string, number>>;
  tagFilter?: string | null;
  blogError?: string | null;
};

export type BlogActions = {
  setTotalPosts: (count: number) => void;
  setCurrentBlogPage: (page: number) => void;
  setTotalBlogPages: (pages: number) => void;
  setCurrentPageBlogData: (data: Array<any>) => void;
  setPostCountsByTag: (counts: Array<Record<string, number>>) => void;
  setTagFilter: (tag: string | null) => void;
  setBlogError: (error: string) => void;
};

export type BlogStore = BlogState & BlogActions;

export const defaultBlogState: BlogState = {
  totalPosts: 0,
  currentBlogPage: 0,
  totalBlogPages: 0,
  tagFilter: null,
  currentPageBlogData: [],
  postCountsByTag: [],
  blogError: null,
};

export const useBlogStore = create<BlogStore>((set) => ({
  ...defaultBlogState,
  setTotalPosts: (count: number) => set(() => ({ totalPosts: count })),
  setCurrentBlogPage: (page: number) => set(() => ({ currentBlogPage: page })),
  setTotalBlogPages: (pages: number) => set(() => ({ totalBlogPages: pages })),
  setCurrentPageBlogData: (data: Array<any>) =>
    set(() => ({ currentPageBlogData: data })),
  setPostCountsByTag: (counts: Array<Record<string, number>>) =>
    set(() => ({ postCountsByTag: counts })),
  setTagFilter: (tag: string | null) => set(() => ({ tagFilter: tag })),
  setBlogError: (error: string) => set(() => ({ blogError: error })),
}));
