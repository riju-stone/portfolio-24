export const themeSwitchAnim = {
  initial: {
    x: 0,
    y: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.6,
    },
  },
  hidden: {
    y: 0,
    x: 20,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  view: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.5,
    },
  },
};

export const themeToggleAnim = {
  sunBeams: {
    light: {
      rotate: -120,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    dark: {
      rotate: 0,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
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
