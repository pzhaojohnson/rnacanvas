import type { Base } from './Base';

export type Values = {
  text: {
    'font-family'?: string;
    'font-size'?: number;
    'font-weight'?: string | number;
    'font-style'?: string;
    'fill'?: string;
  }
}

export function values(b: Base): Values {
  let textAttrs = {
    'font-family': b.text.attr('font-family'),
    'font-size': b.text.attr('font-size'),
    'font-weight': b.text.attr('font-weight'),
    'font-style': b.text.attr('font-style'),
  };
  let vs: Values = {
    text: {},
  };
  if (typeof textAttrs['font-family'] == 'string') {
    vs.text['font-family'] = textAttrs['font-family'];
  }
  if (typeof textAttrs['font-size'] == 'number') {
    vs.text['font-size'] = textAttrs['font-size'];
  }
  if (
    typeof textAttrs['font-weight'] == 'string'
    || typeof textAttrs['font-weight'] == 'number'
  ) {
    vs.text['font-weight'] = textAttrs['font-weight'];
  }
  if (typeof textAttrs['font-style'] == 'string') {
    vs.text['font-style'] = textAttrs['font-style'];
  }
  return vs;
}

export function setValues(b: Base, vs: Values) {
  if (vs.text) {
    if (typeof vs.text['font-family'] == 'string') {
      b.text.attr({ 'font-family': vs.text['font-family'] });
    }
    if (typeof vs.text['font-size'] == 'number') {
      b.text.attr({ 'font-size': vs.text['font-size'] });
    }
    if (
      typeof vs.text['font-weight'] == 'string'
      || typeof vs.text['font-weight'] == 'number'
    ) {
      b.text.attr({ 'font-weight': vs.text['font-weight'] });
    }
    if (typeof vs.text['font-style'] == 'string') {
      b.text.attr({ 'font-style': vs.text['font-style'] });
    }
    if (typeof vs.text['fill'] == 'string') {
      b.text.attr({ 'fill': vs.text['fill'] });
    }
  }
}
