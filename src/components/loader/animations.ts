export const loadingScreenAnim = {
  show: {
    transition: {
      when: "afterChildren",
    },
  },
  exit: {
    transition: {
      when: "afterChildren",
    },
  },
};

export const progressAnim = {
  hidden: {
    x: -window.screen.width,
  },
  show: {
    x: 0,
    transition: {
      ease: [0.5, 0.001, 0.08, 0.95],
      duration: 6,
    },
  },
  exit: {
    height: "100vh",
    width: "100vw",
    borderRadius: 0,
    transition: {
      ease: [0.5, 0.001, 0.08, 0.95],
      duration: 0.8,
      delay: 0.5,
    },
  },
};
