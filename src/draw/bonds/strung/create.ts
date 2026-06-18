import * as SVG from '@svgdotjs/svg.js';
import { assignUuid } from 'Draw/svg/assignUuid';

import type { StrungElement, StrungText } from 'Draw/bonds/strung/StrungElement';
import type { StrungCircle } from 'Draw/bonds/strung/StrungElement';
import type { StrungTriangle } from 'Draw/bonds/strung/StrungElement';
import type { StrungRectangle } from 'Draw/bonds/strung/StrungElement';

import { defaultStrungTextValues } from 'Draw/bonds/strung/defaults';
import { defaultStrungCircleValues } from 'Draw/bonds/strung/defaults';
import { defaultStrungTriangleValues } from 'Draw/bonds/strung/defaults';
import { defaultStrungRectangleValues } from 'Draw/bonds/strung/defaults';

import { repositionStrungElement } from 'Draw/bonds/strung/repositionStrungElement';
import type { BezierCurve } from 'Draw/bonds/strung/BezierCurve';

export type StrungElementOptions = {
  /**
   * The curve that the element is to be strung on.
   */
  curve: BezierCurve;
  curveLength: number;
};

export type StrungTextOptions = StrungElementOptions & {
  text: string;
};

export function createStrungText(options: StrungTextOptions): StrungText {
  let text: StrungText = {
    type: 'StrungText',
    text: new SVG.Text(),
    displacementFromCenter: 0,
    displacementFromCurve: { x: 0, y: 0 },
  };
  assignUuid(text.text);
  text.text.attr(defaultStrungTextValues.text);
  text.text.text(options.text);
  // reposition after setting the text content
  repositionStrungElement(text, {
    curve: options.curve,
    curveLength: options.curveLength,
  });
  return text;
}

export function createStrungCircle(options: StrungElementOptions): StrungCircle {
  let circle: StrungCircle = {
    type: 'StrungCircle',
    circle: new SVG.Circle(),
    displacementFromCenter: 0,
    displacementFromCurve: { x: 0, y: 0 },
  };
  assignUuid(circle.circle);
  circle.circle.attr(defaultStrungCircleValues.circle);
  repositionStrungElement(circle, {
    curve: options.curve,
    curveLength: options.curveLength,
  });
  return circle;
}

export function createStrungTriangle(options: StrungElementOptions): StrungTriangle {
  let triangle: StrungTriangle = {
    type: 'StrungTriangle',
    path: new SVG.Path(),
    width: defaultStrungTriangleValues.width,
    height: defaultStrungTriangleValues.height,
    tailsHeight: defaultStrungTriangleValues.tailsHeight,
    rotation: 0,
    displacementFromCenter: 0,
    displacementFromCurve: { x: 0, y: 0 },
  };
  assignUuid(triangle.path);
  triangle.path.attr(defaultStrungTriangleValues.path);
  repositionStrungElement(triangle, {
    curve: options.curve,
    curveLength: options.curveLength,
  });
  return triangle;
}

export function createStrungRectangle(options: StrungElementOptions): StrungRectangle {
  let rectangle: StrungRectangle = {
    type: 'StrungRectangle',
    path: new SVG.Path(),
    width: defaultStrungRectangleValues.width,
    height: defaultStrungRectangleValues.height,
    borderRadius: defaultStrungRectangleValues.borderRadius,
    rotation: 0,
    displacementFromCenter: 0,
    displacementFromCurve: { x: 0, y: 0 },
  };
  assignUuid(rectangle.path);
  rectangle.path.attr(defaultStrungRectangleValues.path);
  repositionStrungElement(rectangle, {
    curve: options.curve,
    curveLength: options.curveLength,
  });
  return rectangle;
}

export function createStrungFromStrung(strung: StrungElement, options: StrungElementOptions): StrungElement {
  let newStrung: StrungElement | undefined = undefined;
  if (strung.type == 'StrungText') {
    newStrung =  createStrungText({
      ...options,
      text: strung.text.text(),
    });
  } else if (strung.type == 'StrungCircle') {
    newStrung = createStrungCircle(options);

  } else if (strung.type == 'StrungTriangle') {
    newStrung =  createStrungTriangle(options);
    newStrung.width = strung.width;
    newStrung.height = strung.height;
    newStrung.tailsHeight = strung.tailsHeight;
    newStrung.rotation = strung.rotation;

  } else if (strung.type == 'StrungRectangle') {
    newStrung =  createStrungRectangle(options);
    newStrung.width = strung.width;
    newStrung.height = strung.height;
    newStrung.borderRadius = strung.borderRadius;
    newStrung.rotation = strung.rotation;
  }

  if (!newStrung) {
    throw new Error(`Cannot create strung element from strung element of type '${strung.type}'.`);
  }
  
  newStrung.displacementFromCenter = strung.displacementFromCenter;
  newStrung.displacementFromCurve = strung.displacementFromCurve;
  repositionStrungElement(newStrung, {
    curve: options.curve,
    curveLength: options.curveLength,
  });
  return newStrung;
}