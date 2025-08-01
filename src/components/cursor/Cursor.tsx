"use client"

import { useCursorStore } from '@/stores/cursorStore'
import React, { useEffect, useRef } from 'react'

import styles from './styles.module.scss'
import { useDevice } from '@/hooks/useDevice'

function CursorComponent() {
  const deviceType = useDevice()
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorState = useCursorStore(state => state.cursorStyle)

  useEffect(() => {
    // Follow mouse position
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef && cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return deviceType == "desktop" ?
    <div ref={cursorRef} className={`${styles.cursorStyle} ${styles[cursorState]}`} /> : null
}

export default CursorComponent