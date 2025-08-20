"use client";

import { useState, useEffect } from "react";

export const useDevice = () => {
  const [device, setDevice] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
    const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
    setDevice(isMobile ? "mobile" : isTablet ? "tablet" : "desktop");
  }, []);

  return device;
};