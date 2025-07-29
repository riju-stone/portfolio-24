import React, { useState } from 'react'
import { motion } from 'motion/react'

import styles from './styles.module.scss'
import { inter, pp_nueue, space_grotesk } from '@/utils/fonts'
import { Dot } from "lucide-react"
import Link from 'next/link'
import { useDevice } from '@/hooks/useDevice'

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
    desc: `An RSS aggregator capable of fetching RSS feeds and displaying them in a readable format. 
    Users can authenticate into the system and store their followed RSS feeds.`,
    stack: "go/postgres"

  },
  {
    id: "sevin",
    name: "sevin",
    link: "https://www.github.com/riju-stone/sevin",
    desc: `An asynchronous coding agent that can plan, run, debug and create 
    appropriate PRs for any given task. It supports local LLMs like Ollama and HuggingFace models, hence
    all your data stays with you. Inspired from Google Jules and OAI Codex.`,
    stack: "go/postgres/redis/rabbitmq"
  },
  {
    id: "hostl",
    name: "hostl",
    link: "https://www.github.com/riju-stone/hostl",
    desc: `A minimlistic hosting platform. It's a simple hosting platform that can be used to host static websites.
    Since, vercel openly admitted itself as an AWS wrapper, why not create something of our own?`,
    stack: "go/postgres/redis/rabbitmq"
  },
  {
    id: "wordinary",
    name: "wordinary",
    link: "https://www.github.com/riju-stone/wordinary",
    desc: `A beautiful, minimalistic dictionary app. 
    You can look up words and get their definitions, synonyms, antonyms, and more.
    It also serves you a few words of the day, just to keep you smart and soophisticated.`,
    stack: "expo/react-native/reanimated/sqlite"
  },
  {
    id: "ask",
    name: "ask",
    link: "https://www.github.com/riju-stone/ask",
    desc: `A beautiful cross-pllatform LLM chat app capable of utilising both Local and Online LLMs.
    This app is also designed to be able to hide from any screen sharing app, including Google Meet, Zoom, MS Teams and you name it.
    Inspired from Raycast.`,
    stack: "typescript/rust/tauri"
  },
  {
    id: "synk",
    name: "synk",
    link: "https://www.github.com/riju-stone/synk",
    desc: `A self-hostable service to sync clipboard and files across all your devices.
    It's like air drop for all your devices.`,
    stack: "go/postgres/redis"
  },
  {
    id: "former",
    name: "Former",
    link: "https://www.github.com/riju-stone/former",
    desc: `A modular form builder, with extensive customizability and a powerful validation system. 
    It offers granular control over the form fields, including the ability to add custom fields and validation rules and
    a detailed analytics dashboard. Inspired from the likes of Google Forms and Typeform.`,
    stack: "next/tailwind/drizzle/postgres"
  },
]

const fileTagPositions = {
  0: "15%",
  1: "85%",
  2: "50%",
}

function FileStackComponent() {
  const device = useDevice();
  const [tappedItem, setTappedItem] = useState<string | null>(null);
  const topIndex = projectsData.length - 1; // Index of the topmost file
  const totalItems = projectsData.length;

  // Calculate base offset to center the stack
  const stackHeight = totalItems * 8; // Total height of the stack in percentage
  const centerOffset = 50 - (stackHeight / 2.5); // Offset to center the stack

  const isTouchDevice = device === 'mobile' || device === 'tablet';

  const handleTap = (projectId: string) => {
    if (isTouchDevice) {
      setTappedItem(prev => {
        if (prev === projectId) {
          return null;
        }
        return projectId;
      });
    }
  };

  return (
    <div className={styles.fileStackWrapper} >
      <div className={styles.fileStackContainer}>
        {projectsData.map((project, index) => {

          // Calculate centered position for each item
          const basePosition = Number(centerOffset + ((index + 1) * 2.85));
          const hoverPosition = Number(basePosition - ((index * 1.2) + 16));

          const isTapped = tappedItem === project.id;
          const shouldAnimate = isTouchDevice ? isTapped : undefined;

          const fileItemAnimation = {
            inactive: {
              top: `${basePosition}%`,
            },
            active: {
              top: `${hoverPosition}%`,
              transition: {
                delay: 0.02,
                type: "spring",
              }
            }
          }

          return (
            <motion.div
              key={project.id}
              className={styles.fileItemContainer}
              style={{
                zIndex: index * 20,
                transform: `scale(${(0.75 + (index * 0.02))}) rotateX(0deg)`
              }}
              whileHover={index !== topIndex && !isTouchDevice ? fileItemAnimation.active : undefined}
              animate={index !== topIndex && shouldAnimate ? fileItemAnimation.active : fileItemAnimation.inactive}
              initial={fileItemAnimation.inactive}
              onTap={() => handleTap(project.id)}>
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
              <Link href={project.link} target='_blank' className={styles.fileStackItemLink}>
                <div className={`${styles.fileStackItemDesc} ${inter.className}`}>{project.desc}</div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div >
  )
}

export default FileStackComponent