import LazyTextComponent from "@/components/lazy-loader/lazy-loader";

import styles from "./page.module.scss"

export default function Loading() {
  return (
    <main key="blog-page" className={styles.blogMessageWrapper}>
      <LazyTextComponent text="Collecting my thoughts." />
    </main>
  );
}