import * as SVG from '@svgdotjs/svg.js';

export type Point = {
  x: number;
  y: number;
};

export type ConstructorArgs = {
  circle?: SVG.Circle;

  baseCenter?: Point;
};

/**
 * Possesses the components that define a circle base outline.
 */
export class CircleBaseOutline {
  /**
   * The actual circle element of the circle base outline.
   *
   * To be centered on the base that the outline is for.
   */
  circle: SVG.Circle;

  /**
   * The most recently provided center coordinates of the base that the
   * circle outline is for.
   *
   * Must be updated manually.
   */
  cachedBaseCenter?: Point;

  constructor(args?: ConstructorArgs) {
    this.circle = args?.circle ?? new SVG.Circle();

    this.cachedBaseCenter = args?.baseCenter;
  }
}
