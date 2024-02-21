import * as SVG from '@svgdotjs/svg.js';

import type { StrungElement } from 'Draw/bonds/strung/StrungElement';

import { isNullish } from '@rnacanvas/value-check';

/**
 * Meant to be able to be directly input to the attr method of SVG elements.
 */
export type SVGElementAttributes = { [attributeName: string]: unknown };

export type DefaultStrungTextValues = {
  text: SVGElementAttributes;
};

export const defaultStrungTextValues: DefaultStrungTextValues = {
  text: {
    'font-family': 'Arial',
    'font-size': 8,
    'font-weight': 700,
    'fill': '#000000',
    'fill-opacity': 1,
  },
};

export type DefaultStrungCircleValues = {
  circle: SVGElementAttributes;
};

export const defaultStrungCircleValues: DefaultStrungCircleValues = {
  circle: {
    'r': 3,
    'stroke': '#000000',
    'stroke-width': 1,
    'stroke-opacity': 1,
    'fill': '#000000',
    'fill-opacity': 1,
  },
};

export type DefaultStrungTriangleValues = {
  path: SVGElementAttributes;
  width: number;
  height: number;
  tailsHeight: number;
};

export const defaultStrungTriangleValues: DefaultStrungTriangleValues = {
  path: {
    'stroke': '#000000',
    'stroke-width': 1,
    'stroke-opacity': 1,
    'fill': '#000000',
    'fill-opacity': 1,
  },
  width: 6.5,
  height: 6.5,
  tailsHeight: 0,
};

export type DefaultStrungRectangleValues = {
  path: SVGElementAttributes;
  width: number;
  height: number;
  borderRadius: number;
};

export const defaultStrungRectangleValues: DefaultStrungRectangleValues = {
  path: {
    'stroke': '#000000',
    'stroke-width': 1,
    'stroke-opacity': 1,
    'fill': '#000000',
    'fill-opacity': 1,
  },
  width: 5.5,
  height: 5.5,
  borderRadius: 0,
};

/**
 * Sets the default values for the type of provided strung element to the
 * values of the provided strung element.
 *
 * Ignores any nullish SVG element attributes that the provided strung element
 * has.
 */
export function updateDefaultValues(ele: StrungElement) {
  let svgElement: SVG.Element;
  if (ele.type == 'StrungText') {
    svgElement = ele.text;
  } else if (ele.type == 'StrungCircle') {
    svgElement = ele.circle;
  } else {
    svgElement = ele.path;
  }

  let defaultSVGElementAttributes: SVGElementAttributes;
  if (ele.type == 'StrungText') {
    defaultSVGElementAttributes = defaultStrungTextValues.text;
  } else if (ele.type == 'StrungCircle') {
    defaultSVGElementAttributes = defaultStrungCircleValues.circle;
  } else if (ele.type == 'StrungTriangle') {
    defaultSVGElementAttributes = defaultStrungTriangleValues.path;
  } else {
    defaultSVGElementAttributes = defaultStrungRectangleValues.path;
  }

  Object.keys(defaultSVGElementAttributes).forEach((name: string) => {
    let value: unknown = svgElement.attr(name);
    if (!isNullish(value)) {
      defaultSVGElementAttributes[name] = value;
    }
  });

  if (ele.type == 'StrungTriangle') {
    let defaultValues = defaultStrungTriangleValues;
    defaultValues.width = ele.width;
    defaultValues.height = ele.height;
    defaultValues.tailsHeight = ele.tailsHeight;
  }

  if (ele.type == 'StrungRectangle') {
    let defaultValues = defaultStrungRectangleValues;
    defaultValues.width = ele.width;
    defaultValues.height = ele.height;
    defaultValues.borderRadius = ele.borderRadius;
  }
}
