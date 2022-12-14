import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

export type Values = {
  text: {
    'font-family'?: string;
    'font-size'?: number;
    'font-weight'?: string | number;
    'fill'?: string;
    'fill-opacity'?: number;
  }
  line: {
    'stroke'?: string;
    'stroke-width'?: number;
    'stroke-opacity'?: number;
    'stroke-dasharray'?: string;
  }
  basePadding?: number;
  lineLength?: number;
}

export function values(bn: BaseNumbering): Values {
  let textAttrs = {
    'font-family': bn.text.attr('font-family') as unknown,
    'font-size': bn.text.attr('font-size') as unknown,
    'font-weight': bn.text.attr('font-weight') as unknown,
    'fill': bn.text.attr('fill') as unknown,
    'fill-opacity': bn.text.attr('fill-opacity') as unknown,
  };
  let lineAttrs = {
    'stroke': bn.line.attr('stroke') as unknown,
    'stroke-width': bn.line.attr('stroke-width') as unknown,
    'stroke-opacity': bn.line.attr('stroke-opacity') as unknown,
    'stroke-dasharray': bn.line.attr('stroke-dasharray') as unknown,
  };
  let vs: Values = {
    text: {},
    line: {},
  };
  if (typeof textAttrs['font-family'] == 'string') {
    vs.text['font-family'] = textAttrs['font-family'];
  }
  if (typeof textAttrs['font-size'] == 'number') {
    vs.text['font-size'] = textAttrs['font-size'];
  }
  if (typeof textAttrs['font-weight'] == 'string' || typeof textAttrs['font-weight'] == 'number') {
    vs.text['font-weight'] = textAttrs['font-weight'];
  }
  if (typeof textAttrs['fill'] == 'string') {
    vs.text['fill'] = textAttrs['fill'];
  }
  if (typeof textAttrs['fill-opacity'] == 'number') {
    vs.text['fill-opacity'] = textAttrs['fill-opacity'];
  }
  if (typeof lineAttrs['stroke'] == 'string') {
    vs.line['stroke'] = lineAttrs['stroke'];
  }
  if (typeof lineAttrs['stroke-width'] == 'number') {
    vs.line['stroke-width'] = lineAttrs['stroke-width'];
  }
  if (typeof lineAttrs['stroke-opacity'] == 'number') {
    vs.line['stroke-opacity'] = lineAttrs['stroke-opacity'];
  }
  if (typeof lineAttrs['stroke-dasharray'] == 'string') {
    vs.line['stroke-dasharray'] = lineAttrs['stroke-dasharray'];
  }
  vs.basePadding = bn.basePadding;
  vs.lineLength = bn.lineLength;
  return vs;
}

export function setValues(bn: BaseNumbering, vs: Values) {
  if (vs.text) {
    if (typeof vs.text['font-family'] == 'string') {
      bn.text.attr({ 'font-family': vs.text['font-family'] });
    }
    if (typeof vs.text['font-size'] == 'number') {
      bn.text.attr({ 'font-size': vs.text['font-size'] });
    }
    if (typeof vs.text['font-weight'] == 'string' || typeof vs.text['font-weight'] == 'number') {
      bn.text.attr({ 'font-weight': vs.text['font-weight'] });
    }
    if (typeof vs.text['fill'] == 'string') {
      bn.text.attr({ 'fill': vs.text['fill'] });
    }
    if (typeof vs.text['fill-opacity'] == 'number') {
      bn.text.attr({ 'fill-opacity': vs.text['fill-opacity'] });
    }
  }
  if (vs.line) {
    if (typeof vs.line['stroke'] == 'string') {
      bn.line.attr({ 'stroke': vs.line['stroke'] });
    }
    if (typeof vs.line['stroke-width'] == 'number') {
      bn.line.attr({ 'stroke-width': vs.line['stroke-width'] });
    }
    if (typeof vs.line['stroke-opacity'] == 'number') {
      bn.line.attr({ 'stroke-opacity': vs.line['stroke-opacity'] });
    }
    if (typeof vs.line['stroke-dasharray'] == 'string') {
      bn.line.attr({ 'stroke-dasharray': vs.line['stroke-dasharray'] });
    }
  }
  if (typeof vs.basePadding == 'number') {
    bn.basePadding = vs.basePadding;
  }
  if (typeof vs.lineLength == 'number') {
    bn.lineLength = vs.lineLength;
  }
}
