import * as SVG from '@svgdotjs/svg.js';

export type BoxAndScalingFactor = {
  box: SVG.Box;

  factor: number;
};

export class BoxScaler {
  /**
   * Scales the box by the given factor (i.e., a factor of 1 would
   * result in no change in size.)
   *
   * Returns a new box. (Does not modify the provided box.)
   *
   * The scaled box will have the same center coordinates as the
   * provided box.
   */
  scaledBox({ box, factor }: BoxAndScalingFactor): SVG.Box {
    let scaledWidth = factor * box.width;
    let scaledHeight = factor * box.height;

    let scaledX = box.cx - (scaledWidth / 2);
    let scaledY = box.cy - (scaledHeight / 2);

    return new SVG.Box(scaledX, scaledY, scaledWidth, scaledHeight);
  }
}
