import type { StraightBond } from './StraightBond';

export type Values = {
  line: {
    'stroke'?: string;
    'stroke-width'?: number;
    'stroke-opacity'?: number;
    'stroke-linecap'?: string;
    'stroke-dasharray'?: string;
  },
  basePadding1?: number;
  basePadding2?: number;
}

export function values(sb: StraightBond): Values {
  let vs: Values = {
    line: {},
  };
  let lineAttrs = {
    'stroke': sb.line.attr('stroke'),
    'stroke-width': sb.line.attr('stroke-width'),
    'stroke-opacity': sb.line.attr('stroke-opacity'),
    'stroke-linecap': sb.line.attr('stroke-linecap'),
    'stroke-dasharray': sb.line.attr('stroke-dasharray'),
  };
  if (typeof lineAttrs['stroke'] == 'string') {
    vs.line['stroke'] = lineAttrs['stroke'];
  }
  if (typeof lineAttrs['stroke-width'] == 'number') {
    vs.line['stroke-width'] = lineAttrs['stroke-width'];
  }
  if (typeof lineAttrs['stroke-opacity'] == 'number') {
    vs.line['stroke-opacity'] = lineAttrs['stroke-opacity'];
  }
  if (typeof lineAttrs['stroke-linecap'] == 'string') {
    vs.line['stroke-linecap'] = lineAttrs['stroke-linecap'];
  }
  if (typeof lineAttrs['stroke-dasharray'] == 'string') {
    vs.line['stroke-dasharray'] = lineAttrs['stroke-dasharray'];
  }
  let basePadding1 = sb.basePadding1;
  let basePadding2 = sb.basePadding2;
  if (typeof basePadding1 == 'number') {
    vs.basePadding1 = basePadding1;
  }
  if (typeof basePadding2 == 'number') {
    vs.basePadding2 = basePadding2;
  }
  return vs;
}

export function setValues(sb: StraightBond, vs: Values) {
  if (vs.line) {
    if (typeof vs.line['stroke'] == 'string') {
      sb.line.attr({ 'stroke': vs.line['stroke'] });
    }
    if (typeof vs.line['stroke-width'] == 'number') {
      sb.line.attr({ 'stroke-width': vs.line['stroke-width'] });
    }
    if (typeof vs.line['stroke-opacity'] == 'number') {
      sb.line.attr({ 'stroke-opacity': vs.line['stroke-opacity'] });
    }
    if (typeof vs.line['stroke-linecap'] == 'string') {
      sb.line.attr({ 'stroke-linecap': vs.line['stroke-linecap'] });
    }
    if (typeof vs.line['stroke-dasharray'] == 'string') {
      sb.line.attr({ 'stroke-dasharray': vs.line['stroke-dasharray'] });
    }
  }
  if (typeof vs.basePadding1 == 'number') {
    sb.basePadding1 = vs.basePadding1;
  }
  if (typeof vs.basePadding2 == 'number') {
    sb.basePadding2 = vs.basePadding2;
  }
}
