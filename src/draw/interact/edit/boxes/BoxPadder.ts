import * as SVG from '@svgdotjs/svg.js';

export type BoxAndPadding = {
  box: SVG.Box;

  padding: number;
};

export class BoxPadder {
  /**
   * Adds the specified padding to all four sides of the box.
   *
   * Returns a new box. (Does not modify the provided box.)
   *
   * The padded box will have the same center coordinates as the
   * provided box.
   */
  paddedBox({ box, padding }: BoxAndPadding): SVG.Box {
    let paddedX = box.x - padding;
    let paddedY = box.y - padding;

    let paddedWidth = box.width + (2 * padding);
    let paddedHeight = box.height + (2 * padding);

    return new SVG.Box(paddedX, paddedY, paddedWidth, paddedHeight);
  }
}
