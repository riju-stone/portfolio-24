export const themeToggleAnim = {
  sunBeams: {
    light: {
      rotateZ: -120,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
    dark: {
      rotateZ: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
  },
  moonCircle: {
    light: {
      x: 1,
      transition: {
        duration: 0.8,
      },
    },
    dark: {
      x: -7,
      transition: {
        duration: 0.8,
      },
    },
  },
};
