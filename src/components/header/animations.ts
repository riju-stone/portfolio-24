export const headerNameNonInitialsAnim = {
    collapse: (i: number) => ({
        x: -10,
        opacity: 0,
        transition: {
            duration: 0.2,
            delay: i * 0.02,
            ease: [0.83, 0, 0.17, 1],
        },
    }),
    expand: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            delay: 0.9 + i * 0.02,
            ease: [0.83, 0, 0.17, 1],
        },
    }),
};

export const headerNameInitialAnim = {
    initial: {
        x: 0,
        opacity: 0,
        y: -20,
    },
    hidden1: {
        y: 0,
        x: -40,
        opacity: 0,
        transition: {
            duration: 0.4,
        },
    },
    hidden2: {
        y: 0,
        x: 0,
        opacity: 0,
        transition: {
            duration: 0.4,
        },
    },
    collapse: {
        x: -40,
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.76, 0, 0.24, 1],
            duration: 0.8,
            delay: 0.1,
        },
    },
    expand: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.76, 0, 0.24, 1],
            duration: 0.8,
        },
    },
};

export const headerNameSeparatorAnim = {
    initial: {
        scale: 0,
        opacity: 0,
        rotateZ: 180,
    },
    collapse: {
        scale: 0,
        opacity: 0,
        rotateZ: 180,
        transition: {
            duration: 0.4,
        },
    },
    expand: {
        scale: 1,
        opacity: 1,
        rotateZ: 0,
        transition: {
            delay: 1,
            duration: 0.5,
        },
    },
    hover: {
        rotate: 90,
    }
};

export const headerNameMenuButtonAnim = {
    collapse: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.4,
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
    initial: {
        y: -20,
        opacity: 0,
    },
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
            delay: 0.5 + i * 0.1,
            ease: [0.68, -0.6, 0.32, 1.6],
        },
    }),
};

export const menuButtonAnimation = {
    open: {
        scale: 2,
        transition: {
            type: "spring",
            duration: 0.6,
            delay: 0.5,
        },
    },
    close: {
        scale: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            delay: 0.1,
        },
    },
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
