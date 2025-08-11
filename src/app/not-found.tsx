"use client"
import React from 'react'
import LazyTextComponent from '@/components/lazy-loader/lazy-loader'
import styles from "./page.module.scss"

function NotFound() {
  return (
    <main className={styles.notFoundPage}>
      <LazyTextComponent text="You sure you came here on purpose?" />
    </main>
  )
}

export default NotFound