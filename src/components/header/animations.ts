export const headerNameSuffixAnim = {
  collapse: (i: number) => ({
    x: -80,
    transition: {
      duration: 0.2,
      delay: i * 0.08,
    },
  }),
  expand: (i: number) => ({
    x: 0,
    transition: {
      duration: 0.2,
      delay: i * 0.08,
    },
  }),
};

export const headerNameInitialAnim = {
  collapse: {
    x: -2,
    transition: {
      duration: 0.2,
    },
  },
  expand: {
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const headerMenuButtonAnim = {
  collapse: {
    opacity: 1,
    width: 10,
    transition: {
      duration: 0.4,
      delay: 0.2,
    },
  },
  expand: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.2,
    },
  },
};
