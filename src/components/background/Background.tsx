"use client";

import React, { useLayoutEffect, useRef } from "react";
import Circle from "@/utils/circle";
import { ThemeState, useThemeStore } from "@/stores/themeStore";
import { debounce, throttle } from "@/utils/limitors";

import styles from "./styles.module.scss";

function BackgroundComponent() {
  const currTheme: string = useThemeStore((state: ThemeState) => state.theme);

  const themeSwitchPos: ThemeState["themeTogglePos"] = useThemeStore(
    (state: ThemeState) => state.themeTogglePos,
  );

  const canvasRef = useRef(null);
  const isDark: boolean = currTheme === "dark";

  useLayoutEffect(() => {
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

    const handleResize = () => {
      Circle.resetCircleCenterCoordinates();
      initializeAnimation();
      circleAnimationRunner();
    };

    window.addEventListener("resize", throttle(debounce(handleResize)), false);

    return () => {
      shouldStartAnimation = false;
      window.removeEventListener(
        "resize",
        throttle(debounce(handleResize)),
        false,
      );
    };
  }, [isDark, themeSwitchPos]);

  return <canvas ref={canvasRef} className={styles.circleBackgroundWrapper} />;
}

export default BackgroundComponent;
