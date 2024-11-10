export const headerNameNonInitialsAnim = {
  collapse: (i: number) => ({
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.1,
      delay: i * 0.01,
    },
  }),
  expand: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.4 + i * 0.01,
    },
  }),
};

export const headerNameInitialAnim = {
  collapse: {
    x: -80,
    transition: {
      ease: [0.76, 0, 0.24, 1],
      duration: 0.4,
      delay: 0.1,
    },
  },
  expand: {
    x: 0,
    transition: {
      ease: [0.76, 0, 0.24, 1],
      duration: 0.4,
    },
  },
};

export const headerNameSeparatorAnim = {
  collapse: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  expand: {
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.2,
    },
  },
};

export const headerLinkAnim = {
  collapse: (i: number) => ({
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: i * 0.1,
    },
  }),
  expand: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: i * 0.1,
    },
  }),
};
