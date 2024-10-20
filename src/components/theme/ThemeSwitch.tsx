"use client";

import { useThemeStore } from "@/stores/themeStore";
import React, { useEffect, useRef } from "react";

function ThemeSwitchComponent() {
  const switchRef = useRef(null);
  const toggleTheme = useThemeStore((state) => state.changeTheme);
  const setSwitchPos = useThemeStore((state) => state.calibrateThemeTogglePos);
  useEffect(() => {
    const switchPos = switchRef.current.getBoundingClientRect();
    setSwitchPos(switchPos);
  }, []);

  return (
    <div ref={switchRef} onClick={toggleTheme}>
      Theme
    </div>
  );
}

export default ThemeSwitchComponent;
