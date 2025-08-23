export const headerNameNonInitialsAnim = {
	collapse: (i: number) => ({
		x: -10,
		opacity: 0,
		transition: {
			duration: 0.15,
			delay: i * 0.015,
			ease: [0.83, 0, 0.17, 1],
		},
	}),
	expand: (i: number) => ({
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.15,
			delay: 0.3 + i * 0.018,
			ease: [0.83, 0, 0.17, 1],
		},
	}),
};

export const headerNameInitialAnim = {
	initial: {
		y: -15,
		x: 0,
		opacity: 0,
	},
	expand: {
		y: 0,
		x: 0,
		opacity: 1,
		transition: {
			ease: [0.76, 0, 0.24, 1],
			duration: 0.4,
		},
	},
};

export const headerNameSeparatorAnim = {
	initial: {
		scale: 0,
		opacity: 0,
		rotateZ: 180,
	},
	expand: {
		scale: 1,
		opacity: 1,
		rotateZ: 0,
		transition: {
			delay: 0.4,
			duration: 0.3,
		},
	},
	hover: {
		rotate: 90,
	},
};

export const headerLinkAnim = {
	initial: {
		y: -20,
		opacity: 0,
	},
	expand: (i: number) => ({
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: 0.2 + i * 0.05,
			ease: [0.68, -0.6, 0.32, 1.6],
		},
	}),
};
