"use client";

import { pp_nekkei, space_grotesk } from "@/utils/fonts";
import { m } from "motion/react";
import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { useThemeStore } from "@/stores/themeStore";
import { useDevice } from "@/hooks/useDevice";

const clipAnimation = {
  initial: {
    opacity: 0,
  },
  unhovered: {
    opacity: 1,
    clipPath: "inset(100% 0px 0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    opacity: 1,
    clipPath: "inset(0% 0px 0px)",
    transition: {
      duration: 0.5,
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FancyTableComponent({
  metadata,
  tableData,
  linksStyle = "_self",
  prefetch = false,
}) {
  const theme = useThemeStore((state) => state.theme);
  const deviceType = useDevice();
  return (
    <m.div
      className={styles.tableWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.75 }}
    >
      <div className={`${styles.tableHeader} ${space_grotesk.className}`}>
        <div className={styles.tableHeaderContent}>
          <span className={styles.tableHeaderCol1}>/{metadata.col1}</span>
          <span className={styles.tableHeaderCol2}>/{metadata.col2}</span>
        </div>
      </div>
      {tableData.map((r) => {
        return (
          <m.div
            key={r._id}
            className={`${styles.rowWrapper} ${pp_nekkei.className}`}
            initial="unhovered"
            whileHover="hover"
          >
            <Link href={r.link} prefetch={prefetch} target={linksStyle}>
              <div className={styles.rowContainer}>
                <div className={styles.rowContent}>
                  <div className={styles.dataCol1}>{r[metadata.col1]}</div>
                  <div className={styles.dataCol2}>{r[metadata.col2]}</div>
                </div>
                <div className={styles.dataCol3}>{r[metadata.col3]}</div>
              </div>
              {deviceType === "desktop" && (
                <m.div
                  className={styles.maskRowContainer}
                  variants={clipAnimation}
                >
                  <div className={styles.rowContent}>
                    <div className={`${styles.dataMaskCol1} ${styles[theme]}`}>
                      {r[metadata.col1]}
                    </div>
                    <div className={styles.dataMaskCol2}>
                      {r[metadata.col2]}
                    </div>
                  </div>
                  <div className={styles.dataMaskCol3}>{r[metadata.col3]}</div>
                </m.div>
              )}
            </Link>
          </m.div>
        );
      })}
    </m.div>
  );
}

export default React.memo(FancyTableComponent);
