"use client";

import { pp_nekkei, inter, pp_nueue } from "@/utils/fonts";
import { AnimatePresence, m } from "motion/react";
import React, { useMemo, useState } from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { ArrowUpRight, Dot, PlusIcon } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";

const plusIconAnimation = {
  initial: {
    rotate: 0,
  },
  tap: {
    rotate: 45,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const expandedContainerAnimation = {
  collapsed: {
    opacity: 0,
    height: "0px",
    margin: "0",
  },
  expanded: {
    opacity: 1,
    height: "fit-content",
    margin: "1rem 0",
    transition: {
      duration: 0.25,
      ease: "easeInOut",
      opacity: {
        duration: 0.35,
      },
    },
  },
};

function ExpandedDrawerComponent({ metadata, tableData }) {
  const theme = useThemeStore((state) => state.theme);

  const initialState = useMemo(() => {
    let state = {};
    tableData.forEach((r) => {
      state[r._id] = {
        expanded: false,
      };
    });
    return state;
  }, [tableData]);

  const [expanded, setExpanded] = useState(initialState);

  const handleExpand = (r) => {
    let newState = { ...expanded };
    Object.keys(newState).forEach((key) => {
      if (key === r._id) {
        newState[key].expanded = !newState[key].expanded;
      } else {
        newState[key].expanded = false;
      }
    });
    setExpanded(newState);
  };

  return (
    <AnimatePresence>
      {tableData.map((r) => {
        return (
          <div key={r._id} className={styles.rowWrapper}>
            <div className={styles.rowContainer}>
              <div className={styles.rowContent}>
                <Link href={r.link} prefetch={false} target="_blank">
                  <div className={`${styles.dataCol1} ${pp_nekkei.className}`}>
                    <ArrowUpRight />
                    {r[metadata.col1]}
                  </div>
                </Link>
                <m.div
                  className={styles.expandIcon}
                  variants={plusIconAnimation}
                  initial="initial"
                  animate={expanded[r._id].expanded ? "tap" : "initial"}
                  onClick={() => handleExpand(r)}
                >
                  <PlusIcon />
                </m.div>
              </div>
              <m.div
                className={styles.expandedContainer}
                variants={expandedContainerAnimation}
                initial="collapsed"
                animate={expanded[r._id].expanded ? "expanded" : "collapsed"}
              >
                <div
                  className={`${styles.dataCol2} ${pp_nueue.className} ${styles[theme]}`}
                >
                  {r[metadata.col2].split("/").map((s: string, idx: number) => (
                    <span key={`${idx}-${s}`}>
                      {idx !== 0 && <Dot />}
                      {s}
                    </span>
                  ))}
                </div>
                <div className={`${styles.dataCol3} ${inter.className}`}>
                  {r[metadata.col3] as string}
                </div>
              </m.div>
            </div>
          </div>
        );
      })}
    </AnimatePresence>
  );
}

export default ExpandedDrawerComponent;
