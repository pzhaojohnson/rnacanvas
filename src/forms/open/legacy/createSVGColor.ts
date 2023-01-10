import * as SVG from '@svgdotjs/svg.js';

/**
 * A color name supported by CSS.
 */
export type CSSColorName = string;

export type Color = (
  { cssName: CSSColorName }
);

/**
 * Returns undefined if the provided value is not a recognized color.
 */
export function createSVGColor(color: Color): SVG.Color | undefined {
  let div = document.createElement('div');

  // prevents computed colors from being "transparent"
  div.style.opacity = '1';

  div.style.height = '0px'; // make invisible
  document.body.appendChild(div);

  let svgColor: SVG.Color | undefined = undefined;

  try {
    let { cssName } = color;
    div.style.color = cssName;
    let computedStyle = window.getComputedStyle(div);
    svgColor = new SVG.Color(computedStyle.color);
  } catch {}

  document.body.removeChild(div); // don't forget to remove
  return svgColor;
}
