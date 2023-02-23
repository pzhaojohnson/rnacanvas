import type { CircleBaseOutline as CircleBaseAnnotation } from './CircleBaseOutline';

export type Values = {
  circle: {
    'r'?: number;
    'stroke'?: string;
    'stroke-width'?: number;
    'stroke-opacity'?: number;
    'fill'?: string;
    'fill-opacity'?: number;
  }
}

export function values(cba: CircleBaseAnnotation): Values {
  let circleAttrs = {
    'r': cba.circle.attr('r'),
    'stroke': cba.circle.attr('stroke'),
    'stroke-width': cba.circle.attr('stroke-width'),
    'stroke-opacity': cba.circle.attr('stroke-opacity'),
    'fill': cba.circle.attr('fill'),
    'fill-opacity': cba.circle.attr('fill-opacity'),
  };
  let vs: Values = {
    circle: {},
  };
  if (typeof circleAttrs['r'] == 'number') {
    vs.circle['r'] = circleAttrs['r'];
  }
  if (typeof circleAttrs['stroke'] == 'string') {
    vs.circle['stroke'] = circleAttrs['stroke'];
  }
  if (typeof circleAttrs['stroke-width'] == 'number') {
    vs.circle['stroke-width'] = circleAttrs['stroke-width'];
  }
  if (typeof circleAttrs['stroke-opacity'] == 'number') {
    vs.circle['stroke-opacity'] = circleAttrs['stroke-opacity'];
  }
  if (typeof circleAttrs['fill'] == 'string') {
    vs.circle['fill'] = circleAttrs['fill'];
  }
  if (typeof circleAttrs['fill-opacity'] == 'number') {
    vs.circle['fill-opacity'] = circleAttrs['fill-opacity'];
  }
  return vs;
}

export function setValues(cba: CircleBaseAnnotation, vs: Values) {
  if (vs.circle) {
    if (typeof vs.circle['r'] == 'number') {
      cba.circle.attr({ 'r': vs.circle['r'] });
    }
    if (typeof vs.circle['stroke'] == 'string') {
      cba.circle.attr({ 'stroke': vs.circle['stroke'] });
    }
    if (typeof vs.circle['stroke-width'] == 'number') {
      cba.circle.attr({ 'stroke-width': vs.circle['stroke-width'] });
    }
    if (typeof vs.circle['stroke-opacity'] == 'number') {
      cba.circle.attr({ 'stroke-opacity': vs.circle['stroke-opacity'] });
    }
    if (typeof vs.circle['fill'] == 'string') {
      cba.circle.attr({ 'fill': vs.circle['fill'] });
    }
    if (typeof vs.circle['fill-opacity'] == 'number') {
      cba.circle.attr({ 'fill-opacity': vs.circle['fill-opacity'] });
    }
  }
}
