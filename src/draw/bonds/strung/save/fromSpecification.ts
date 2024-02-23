import * as SVG from '@svgdotjs/svg.js';

import type { StrungElement } from 'Draw/bonds/strung/StrungElement';
import type { StrungText } from 'Draw/bonds/strung/StrungElement';
import type { StrungCircle } from 'Draw/bonds/strung/StrungElement';
import type { StrungTriangle } from 'Draw/bonds/strung/StrungElement';
import type { StrungRectangle } from 'Draw/bonds/strung/StrungElement';

import { isNumber } from '@rnacanvas/value-check';
import { isPoint2D as isVector } from 'Math/points/Point';

function findSVGElement(svg: SVG.Svg, id: unknown): SVG.Element | never {
  if (typeof id != 'string') {
    throw new Error(`SVG element ID is not a string: ${id}.`);
  }
  let ele = svg.findOne('#' + id);
  if (!(ele instanceof SVG.Element)) {
    throw new Error(`Unable to find SVG element with ID "${id}".`);
  }
  return ele;
}

function findSVGText(svg: SVG.Svg, id: unknown): SVG.Text | never {
  let ele = findSVGElement(svg, id);
  if (!(ele instanceof SVG.Text)) {
    throw new Error(`SVG element with ID "${id}" is not a text.`);
  }
  return ele;
}

function findSVGCircle(svg: SVG.Svg, id: unknown): SVG.Circle | never {
  let ele = findSVGElement(svg, id);
  if (!(ele instanceof SVG.Circle)) {
    throw new Error(`SVG element with ID "${id}" is not a circle.`);
  }
  return ele;
}

function findSVGPath(svg: SVG.Svg, id: unknown): SVG.Path | never {
  let ele = findSVGElement(svg, id);
  if (!(ele instanceof SVG.Path)) {
    throw new Error(`SVG element with ID "${id}" is not a path.`);
  }
  return ele;
}

export type Args = {
  /**
   * The SVG document that the specified strung element is in.
   */
  svg: SVG.Svg;

  /**
   * The specification for the strung element.
   */
  specification: { [key: string]: unknown };
};

/**
 * May throw if unable to create a strung element from the specification.
 */
export function fromSpecification(args: Args): StrungElement | never {
  let svg = args.svg;
  let spec = args.specification;

  let width = isNumber(spec.width) ? spec.width : 9;
  let height = isNumber(spec.height) ? spec.height : 9;
  let tailsHeight = isNumber(spec.tailsHeight) ? spec.tailsHeight : 0;
  let borderRadius = isNumber(spec.borderRadius) ? spec.borderRadius : 0;
  let rotation = isNumber(spec.rotation) ? spec.rotation : 0;

  let displacementFromCenter = 0;
  if (isNumber(spec.displacementFromCenter)) {
    displacementFromCenter = spec.displacementFromCenter;
  }

  let displacementFromCurve = { x: 0, y: 0 };
  if (isVector(spec.displacementFromCurve)) {
    displacementFromCurve = spec.displacementFromCurve;
  }

  if (spec.type == 'StrungText') {
    let text: StrungText = {
      type: 'StrungText',
      text: findSVGText(svg, spec.textId),
      displacementFromCenter,
      displacementFromCurve,
    };
    return text;
  }

  if (spec.type == 'StrungCircle') {
    let circle: StrungCircle = {
      type: 'StrungCircle',
      circle: findSVGCircle(svg, spec.circleId),
      displacementFromCenter,
      displacementFromCurve,
    };
    return circle;
  }

  if (spec.type == 'StrungTriangle') {
    let triangle: StrungTriangle = {
      type: 'StrungTriangle',
      path: findSVGPath(svg, spec.pathId),
      width,
      height,
      tailsHeight,
      rotation,
      displacementFromCenter,
      displacementFromCurve,
    };
    return triangle;
  }

  if (spec.type == 'StrungRectangle') {
    let rectangle: StrungRectangle = {
      type: 'StrungRectangle',
      path: findSVGPath(svg, spec.pathId),
      width,
      height,
      borderRadius,
      rotation,
      displacementFromCenter,
      displacementFromCurve,
    };
    return rectangle;
  }

  throw new Error(`Unrecognized strung element type: ${spec.type}.`);
}
