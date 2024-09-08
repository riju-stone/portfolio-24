const BG_COLORS = {
  light: "#EDEDED",
  dark: "#17181A",
};

const RADIUS_GROWTH_RATE_MS = 0.025;
const CIRCLE_RESOLUTION = 0.3;
const GROWTH_FUNTION_EXPONENTIAL = 2.8;

export default class Circle {
  ctx: CanvasRenderingContext2D | null;
  isDark: boolean | null;
  radiusMultiplier: number | null;
  maxRadiusMultiplier: number | null;
  prevDrawTs: number | null;
  height: number | null;
  width: number | null;

  circleCenterCoordinates: { x: number | null; y: number | null } = {
    x: null,
    y: null,
  };

  constructor() {
    this.ctx = null;
    this.isDark = null;
    this.radiusMultiplier = null;
    this.maxRadiusMultiplier = null;
    this.prevDrawTs = null;
    this.height = null;
    this.width = null;
  }

  setCircleCenterCoordinates(x: number, y: number) {
    this.circleCenterCoordinates.x = x;
    this.circleCenterCoordinates.y = y;
  }

  resetCircleCenterCoordinates() {
    this.circleCenterCoordinates.x = null;
    this.circleCenterCoordinates.y = null;
  }

  intializeCanvas(ctx: CanvasRenderingContext2D, isDark: boolean) {
    this.ctx = ctx;
    this.isDark = isDark;

    this.height = Math.max(window.screen.height, window.innerHeight);
    this.width = Math.max(window.screen.width, window.innerWidth);
    this.maxRadiusMultiplier =
      Math.max(this.width, this.height) ** (1 / GROWTH_FUNTION_EXPONENTIAL);
    this.prevDrawTs = Date.now();

    document.body.style.backgroundColor = this.isDark
      ? BG_COLORS.dark
      : BG_COLORS.light;

    const { width, height } = this.ctx.canvas.getBoundingClientRect();
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;

    if (canvasHeight !== height || canvasWidth != width) {
      const { devicePixelRatio } = window;
      const pixelResolution = devicePixelRatio * CIRCLE_RESOLUTION;
      this.ctx.canvas.height = height * pixelResolution;
      this.ctx.canvas.width = width * pixelResolution;
      this.ctx.scale(pixelResolution, pixelResolution);
    }

    if (
      this.circleCenterCoordinates.x == null ||
      this.circleCenterCoordinates.y == null
    ) {
      this.radiusMultiplier = this.isDark ? 0 : this.maxRadiusMultiplier;
    }

    return this.startAnimation;
  }

  drawCircle() {
    this.ctx!.fillStyle = BG_COLORS.light;
    this.ctx!.beginPath();
    this.ctx!.arc(
      this.circleCenterCoordinates.x!,
      this.circleCenterCoordinates.y!,
      this.radiusMultiplier! ** GROWTH_FUNTION_EXPONENTIAL,
      0,
      2 * Math.PI,
    );
    this.ctx!.fill();
    this.prevDrawTs! = Date.now();

    return new Promise((callback) => {
      const returnAfterAnimation = () => {
        callback(this.startAnimation);
      };

      window.requestAnimationFrame(returnAfterAnimation);
    });
  }

  verifyCircleBounds() {
    if (
      (this.radiusMultiplier! <= 0 && this.isDark) ||
      (this.radiusMultiplier! >= this.maxRadiusMultiplier! && !this.isDark)
    ) {
      this.ctx!.fillStyle = this.isDark ? BG_COLORS.dark : BG_COLORS.light;
      this.ctx!.fillRect(0, 0, this.width!, this.height!);
      this.radiusMultiplier! = this.isDark ? 0 : this.maxRadiusMultiplier!;
      return null;
    }

    this.ctx!.clearRect(0, 0, this.width!, this.height!);
    return this.drawCircle;
  }

  startAnimation() {
    if (this.isDark) {
      return this.shrinkCircle;
    } else {
      return this.growCircle;
    }
  }

  shrinkCircle() {
    this.radiusMultiplier! -=
      RADIUS_GROWTH_RATE_MS * Math.max(1, Date.now() - this.prevDrawTs!);
    return this.verifyCircleBounds;
  }

  growCircle() {
    this.radiusMultiplier! +=
      RADIUS_GROWTH_RATE_MS * Math.max(1, Date.now() - this.prevDrawTs!);
    return this.verifyCircleBounds;
  }
}
