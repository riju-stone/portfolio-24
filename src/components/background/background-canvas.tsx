"use client";

import React, { useEffect, useRef } from "react";
import Circle from "@/utils/circle";
import { ThemeState, useThemeStore } from "@/stores/themeStore";
import { throttle } from "@/utils/limitors";

import styles from "./styles.module.scss";

function BackgroundComponent() {
  const currTheme: string = useThemeStore((state: ThemeState) => state.theme);

  const themeSwitchPos: ThemeState["themeTogglePos"] = useThemeStore(
    (state: ThemeState) => state.themeTogglePos,
  );

  const canvasRef = useRef(null);
  const isDark: boolean = currTheme === "dark";

  useEffect(() => {
    Circle.setCircleCenterCoordinates(themeSwitchPos.x, themeSwitchPos.y);
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");

    let circleAnimation: any = null;
    let shouldStartAnimation = true;

    const initializeAnimation = () => {
      circleAnimation = Circle.initializeCanvas(ctx, isDark);
    };

    initializeAnimation();

    const circleAnimationRunner = async () => {
      if (circleAnimation !== null && shouldStartAnimation) {
        if (circleAnimation instanceof Function) {
          circleAnimation = await circleAnimation();
          circleAnimationRunner();
        }
      }
    };

    circleAnimationRunner();

    const handleResize = throttle(() => {
      Circle.resetCircleCenterCoordinates();
      initializeAnimation();
      circleAnimationRunner();
    }, 250);

    window.addEventListener("resize", handleResize, false);

    return () => {
      shouldStartAnimation = false;
      window.removeEventListener("resize", handleResize, false);
    };
  }, [isDark, themeSwitchPos]);

  return <canvas ref={canvasRef} className={styles.circleBackgroundWrapper} />;
}

export default BackgroundComponent;
