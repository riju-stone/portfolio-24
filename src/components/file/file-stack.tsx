import React from 'react'
import { motion } from 'motion/react'

import styles from './styles.module.scss'
import { inter, pp_nekkei, pp_nueue } from '@/utils/fonts'

const projectsData = [
  {
    id: "former",
    name: "Former",
    link: "https://www.github.com/riju-stone/former",
    desc: "A simple form builder",
    stack: "next/tailwind/drizzle/redis/postgres"
  },
  {
    id: "chess",
    name: "Chess",
    link: "https://www.github.com/riju-stone/chess",
    desc: "A minimalistic chess engine",
    stack: "js/electron"
  },
  {
    id: "caligator",
    name: "Caligator",
    link: "https://www.github.com/riju-stone/caligator",
    desc: "A simple yet smart calculator",
    stack: "js/electron"
  },
  {
    id: "rss",
    name: "RSS",
    link: "https://www.github.com/riju-stone/go-rss",
    desc: "An RSS aggregator",
    stack: "go/postgres"

  },
  {
    id: "sevin",
    name: "sevin",
    link: "",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
  },
  {
    id: "hostl",
    name: "hostl",
    link: "",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
  },
  {
    id: "wordinary",
    name: "wordinary",
    link: "",
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
    link: "",
    desc: "A distributed task scheduler",
    stack: "go/postgres/redis/aws"
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
          const basePosition = centerOffset + ((index + 1) * 2.5);
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
              <div className={`${styles.fileItemName} ${inter.className}`}
                style={{
                  left: fileTagPositions[(index + 1) % 3]
                }}
              >{project.name}</div>
              <div className={styles.fileStackItemStack}>[{project.stack}]</div>
              <div className={styles.fileStackItemDesc}>{project.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </div >
  )
}

export default FileStackComponent