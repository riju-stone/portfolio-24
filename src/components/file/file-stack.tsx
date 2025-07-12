import React from 'react'
import { motion } from 'motion/react'

import styles from './styles.module.scss'
import { inter, pp_nueue, space_grotesk } from '@/utils/fonts'
import { Dot } from "lucide-react"
import Link from 'next/link'

const projectsData = [
  {
    id: "chess",
    name: "Chess",
    link: "https://www.github.com/riju-stone/chess",
    desc: `A minimalistic chess engine. 
    It's a simple chess engine that can be used to play chess against a computer.
    Uses the Minimax algorithm to make moves and the Alpha-Beta pruning algorithm to improve the performance.`,
    stack: "js/electron"
  },
  {
    id: "caligator",
    name: "Caligator",
    link: "https://www.github.com/riju-stone/caligator",
    desc: `A simple yet smart calculator. It understands natural language and can perform complex calculations.
    Inspired from the likes of Numi.`,
    stack: "js/electron"
  },
  {
    id: "rss",
    name: "RSS",
    link: "https://www.github.com/riju-stone/go-rss",
    desc: `A simple RSS aggregator. It fetches RSS feeds and displays them in a readable format, 
    by authenticating with users and storing their following feeds.`,
    stack: "go/postgres"

  },
  {
    id: "sevin",
    name: "sevin",
    link: "https://www.github.com/riju-stone/sevin",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
  },
  {
    id: "hostl",
    name: "hostl",
    link: "https://www.github.com/riju-stone/hostl",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
  },
  {
    id: "wordinary",
    name: "wordinary",
    link: "https://www.github.com/riju-stone/wordinary",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
  },
  {
    id: "ask",
    name: "ask",
    link: "",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
  },
  {
    id: "synk",
    name: "synk",
    link: "https://www.github.com/riju-stone/synk",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
  },
  {
    id: "former",
    name: "Former",
    link: "https://www.github.com/riju-stone/former",
    desc: `A modular form builder, with extensive customizability and a powerful validation system. 
    It offers granular control over the form fields, including the ability to add custom fields and validation rules and
    a detailed analytics dashboard. Inspired from the likes of Google Forms and Typeform.`,
    stack: "next/tailwind/drizzle/redis/postgres"
  },
]

const fileTagPositions = {
  0: "15%",
  1: "85%",
  2: "50%",
}

function FileStackComponent() {
  const topIndex = projectsData.length - 1; // Index of the topmost file
  const totalItems = projectsData.length;

  // Calculate base offset to center the stack
  const stackHeight = totalItems * 8; // Total height of the stack in percentage
  const centerOffset = 50 - (stackHeight / 2.5); // Offset to center the stack

  return (
    <div className={styles.fileStackWrapper}>
      <div className={styles.fileStackContainer}>
        {projectsData.map((project, index) => {

          // Calculate centered position for each item
          const basePosition = centerOffset + ((index + 1) * 2.85);
          const hoverPosition = basePosition - ((index * 1.2) + 20);

          return (
            <motion.div
              key={project.id}
              className={styles.fileItemContainer}
              style={{
                zIndex: index * 20,
                transform: `scale(${(0.75 + (index * 0.02))}) rotateX(0deg)`
              }}
              whileHover={index !== topIndex ? {
                top: `${hoverPosition}%`,
                transition: {
                  delay: 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }
              } : undefined}
              whileTap={index !== topIndex ? {
                top: `${hoverPosition}%`,
                transition: {
                  delay: 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }
              } : undefined}
              initial={{
                top: `${basePosition}%`,
              }}
            >

              <div className={`${styles.fileItemName} ${pp_nueue.className}`}
                style={{
                  left: fileTagPositions[(index + 1) % 3],
                }}
              >{project.name}</div>
              <div className={`${styles.fileStackItemStack} ${space_grotesk.className}`}>
                {project.stack.split("/").map((stackName, index) => (
                  <div key={`${project.id}-stack-${index}`} className={styles.fileItemStackContainer}>
                    {index > 0 ? <Dot /> : null}
                    <div className={styles.fileStackItemStackItem}>{stackName}</div>
                  </div>
                ))}
              </div>
              <div className={`${styles.fileStackItemDesc} ${inter.className}`}>{project.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </div >
  )
}

export default FileStackComponent