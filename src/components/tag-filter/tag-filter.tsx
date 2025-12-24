"use client";

import React from "react";
import { m } from "motion/react";
import styles from "./styles.module.scss";
import { pp_nekkei } from "@/utils/fonts";
import { useThemeStore } from "@/stores/themeStore";
import { useBlogStore } from "@/stores/blogStore";
import { X } from "lucide-react";

function TagFilterComponent() {
  const theme = useThemeStore((state) => state.theme);
  const tagFilter = useBlogStore((state) => state.tagFilter);
  const setTagFilter = useBlogStore((state) => state.setTagFilter);
  const tagsCount = useBlogStore((state) => state.postCountsByTag);

  return (
    <m.div
      className={styles.tagsWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <button
        onClick={() => setTagFilter(null)}
        className={`${styles.tagClearButton} ${styles[theme]} ${pp_nekkei.className}`}
      >
        <X />
      </button>
      <div className={styles.tagsList}>
        {tagsCount.map((tag: any) => {
          return (
            tag.count > 0 && (
              <button
                key={tag.name}
                onClick={() => setTagFilter(tag.name)}
                className={`${styles.tagItem} ${styles[theme]} ${pp_nekkei.className} ${
                  tagFilter === tag.name ? styles.activeTag : ""
                }`}
              >
                {tag.name} ({tag.count})
              </button>
            )
          );
        })}
      </div>
    </m.div>
  );
}

export default TagFilterComponent;
