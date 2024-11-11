const initialCurvePath = `M0 0 L${window.innerWidth} 0 Q ${window.innerWidth / 2} 200 0 0`;
const targetCurvePath = `M0 0 L${window.innerWidth} 0 Q ${window.innerWidth / 2} 0 0 0`;

export const hamburgerMenuAnim = {
  initial: {
    y: -600,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: -600,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const hamburgerCurveAnim = {
  initial: {
    d: initialCurvePath,
  },
  animate: {
    d: targetCurvePath,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    d: initialCurvePath,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
