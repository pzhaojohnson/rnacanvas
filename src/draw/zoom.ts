import type { Drawing } from 'Draw/Drawing';
import { interpretNumber } from 'Draw/svg/interpretNumber';

function isFiniteNumber(v: unknown): v is number {
  return typeof v == 'number' && Number.isFinite(v);
}

// Calculates the current zoom of the drawing where 1 corresponds to 100%.
// Returns undefined if unable to calculate the current zoom.
export function zoom(drawing: Drawing): number | undefined {
  let width = interpretNumber(drawing.svg.attr('width'));
  if (!width) {
    console.error(`Unable to parse width attribute: ${drawing.svg.attr('width')}.`);
    return undefined;
  }

  let viewbox = drawing.svg.viewbox();
  if (viewbox.width == 0 || viewbox.height == 0) {
    console.error(`Zoom is undefined for a drawing of zero area.`);
    return undefined;
  }

  // assume that zoom is the same when calculated using width or height
  let z = width.convert('px').valueOf() / viewbox.width;

  // check just to be safe
  if (isFiniteNumber(z)) {
    return z;
  } else {
    console.error(`Calculated value is not a finite number: ${z}.`);
    return undefined;
  }
}

export function setZoom(drawing: Drawing, z: number) {
  if (!Number.isFinite(z) || z <= 0) {
    console.error(`Cannot set zoom to ${z}. Zoom must be a finite positive number.`);
    return;
  }

  // remember previous zoom and center of view
  let prev = {
    z: zoom(drawing),
  };

  let viewbox = drawing.svg.viewbox();
  if (!isFiniteNumber(viewbox.width)) {
    console.error(`Viewbox width is not a finite number: ${viewbox.width}.`);
    return;
  }
  if (!isFiniteNumber(viewbox.height)) {
    console.error(`Viewbox height is not a finite number: ${viewbox.height}.`);
    return;
  }

  // update zoom
  drawing.svg.attr({
    'width': z * viewbox.width,
    'height': z * viewbox.height,
  });

  // the factor that the zoom changed by
  let changeFactor = typeof prev.z == 'number' ? (
    z / prev.z
  ) : undefined;

  // maintain center of view
  if (isFiniteNumber(changeFactor)) {
    let view = drawing.svgContainer.getBoundingClientRect();

    let scrollCenter = {
      x: drawing.svgContainer.scrollLeft + (view.width / 2),
      y: drawing.svgContainer.scrollTop + (view.height / 2),
    };

    scrollCenter.x *= changeFactor;
    scrollCenter.y *= changeFactor;

    drawing.svgContainer.scrollLeft = scrollCenter.x - (view.width / 2);
    drawing.svgContainer.scrollTop = scrollCenter.y - (view.height / 2);
  }
}
