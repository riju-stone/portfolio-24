const BGCOLORS = {
	light: "#EDEDED",
	dark: "#17181a",
};

const RADIUS_GROWTH_RATE_MS = 0.025;
const CIRCLE_RESOLUTION = 0.3;
const GROWTH_FUNCTION_EXPONENTIAL = 2.8;

const circleCenterCoordinates: { x: number | null; y: number | null } = {
	x: null,
	y: null,
};

type CircleState = {
	ctx: CanvasRenderingContext2D | null;
	isDark: boolean | null;
	radiusMultiplier: number | null;
	maxRadiusMultiplier: number | null;
	prevDrawTS: number | null;
	height: number | null;
	width: number | null;
};

type CircleActions = {
	setCircleCenterCoordinates: (x: number, y: number) => void;
	resetCircleCenterCoordinates: () => void;
	initializeCanvas: (ctx: CanvasRenderingContext2D, isDark: boolean) => void;
	startAnimation: () => void;
	shrinkCircle: () => void;
	growCircle: () => void;
	verifyCircleBounds: () => void;
	drawCircle: () => void;
};

type CircleStore = CircleState & CircleActions;

const Circle: CircleStore = {
	ctx: null,
	isDark: null,
	radiusMultiplier: null,
	maxRadiusMultiplier: null,
	prevDrawTS: null,
	height: null,
	width: null,

	setCircleCenterCoordinates: (x: number, y: number) => {
		circleCenterCoordinates.x = x;
		circleCenterCoordinates.y = y;
	},

	resetCircleCenterCoordinates: () => {
		circleCenterCoordinates.x = null;
		circleCenterCoordinates.y = null;
	},

	initializeCanvas: (ctx: CanvasRenderingContext2D, isDark: boolean) => {
		Circle.ctx = ctx;
		Circle.isDark = isDark;

		Circle.height = Math.max(window.screen.height, window.innerHeight);
		Circle.width = Math.max(window.screen.width, window.innerWidth);
		Circle.maxRadiusMultiplier =
			Math.max(Circle.width, Circle.height) **
			(1.0 / GROWTH_FUNCTION_EXPONENTIAL);
		Circle.prevDrawTS = Date.now();

		document.body.style.backgroundColor = Circle.isDark
			? BGCOLORS.dark
			: BGCOLORS.light;

		const { width, height } = Circle.ctx.canvas.getBoundingClientRect();
		const canvasWidth = Circle.ctx.canvas.width;
		const canvasHeight = Circle.ctx.canvas.height;
		if (canvasHeight !== height || canvasWidth !== width) {
			const { devicePixelRatio } = window;
			const lowerResolutionRatio = devicePixelRatio * CIRCLE_RESOLUTION;
			Circle.ctx.canvas.width = width * lowerResolutionRatio;
			Circle.ctx.canvas.height = height * lowerResolutionRatio;
			Circle.ctx.scale(lowerResolutionRatio, lowerResolutionRatio);
		}

		if (
			circleCenterCoordinates.x == null ||
			circleCenterCoordinates.y == null
		) {
			Circle.radiusMultiplier = Circle.isDark ? 0 : Circle.maxRadiusMultiplier;
		}

		return Circle.startAnimation;
	},

	startAnimation: () =>
		Circle.isDark ? Circle.shrinkCircle : Circle.growCircle,

	shrinkCircle: () => {
		console.log("Shrinking Circle...");
		Circle.radiusMultiplier! -=
			RADIUS_GROWTH_RATE_MS * Math.max(1, Date.now() - Circle.prevDrawTS!);
		return Circle.verifyCircleBounds;
	},

	growCircle: () => {
		console.log("Expanding Circle...");
		Circle.radiusMultiplier! +=
			RADIUS_GROWTH_RATE_MS * Math.max(1, Date.now() - Circle.prevDrawTS!);
		return Circle.verifyCircleBounds;
	},

	verifyCircleBounds: () => {
		if (
			(Circle.radiusMultiplier! <= 0 && Circle.isDark!) ||
			(Circle.radiusMultiplier! >= Circle.maxRadiusMultiplier! &&
				!Circle.isDark!)
		) {
			Circle.ctx!.fillStyle = Circle.isDark ? BGCOLORS.dark : BGCOLORS.light;
			Circle.ctx!.fillRect(0, 0, Circle.width!, Circle.height!);
			Circle.radiusMultiplier! = Circle.isDark!
				? 0
				: Circle.maxRadiusMultiplier!;
			return null;
		}

		Circle.ctx!.clearRect(0, 0, Circle.width!, Circle.height!);
		return Circle.drawCircle;
	},

	drawCircle: () => {
		Circle.ctx!.fillStyle = BGCOLORS.light;
		Circle.ctx!.beginPath();
		Circle.ctx!.arc(
			circleCenterCoordinates.x!,
			circleCenterCoordinates.y!,
			Circle.radiusMultiplier! ** GROWTH_FUNCTION_EXPONENTIAL,
			0,
			2 * Math.PI
		);
		Circle.ctx!.fill();
		Circle.prevDrawTS = Date.now();

		console.log("Drawing");

		return new Promise((callback) => {
			const returnAfterAnimating = () => {
				callback(Circle.startAnimation);
			};
			window.requestAnimationFrame(returnAfterAnimating);
		});
	},
};

export default Circle;
