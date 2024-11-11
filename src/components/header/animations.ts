export const headerNameNonInitialsAnim = {
  collapse: (i: number) => ({
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.1,
      delay: i * 0.01,
      ease: [0.68, -0.6, 0.32, 1.6],
    },
  }),
  expand: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.4 + i * 0.01,
      ease: [0.68, -0.6, 0.32, 1.6],
    },
  }),
};

export const headerNameInitialAnim = {
  collapse: {
    x: -58,
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
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.2,
    },
  },
  expand: {
    scale: 0.1,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const headerLinkAnim = {
  collapse: (i: number) => ({
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: [0.68, -0.6, 0.32, 1.6],
    },
  }),
  expand: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: [0.68, -0.6, 0.32, 1.6],
    },
  }),
};

export const menuUpperAnim = {
  open: {
    rotate: 0,
    y: 0,
  },
  close: {
    rotate: 45,
    y: 6,
    transition: {
      type: "spring",
      duration: 0.6,
      delay: 0.1,
    },
  },
};

export const menuMiddleAnim = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  close: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const menuLowerAnim = {
  open: {
    rotate: 0,
    y: 0,
  },
  close: {
    rotate: -45,
    y: -6,
    transition: {
      type: "spring",
      duration: 0.6,
      delay: 0.1,
    },
  },
};