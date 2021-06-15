import { BaseInterface as Base } from 'Draw/BaseInterface';
import * as SVG from '@svgdotjs/svg.js';
import { BaseNumbering } from './BaseNumbering';

export function addNumbering(b: Base, n: number) {
  removeNumbering(b);
  let svg = b.text.root();
  if (typeof svg == 'object' && svg.constructor == SVG.Svg) {
    let text = svg.text(n.toString());
    let line = svg.line(0, 0, 1, 1);
    let bn = new BaseNumbering(text, line, { x: b.xCenter, y: b.yCenter });
    BaseNumbering.applyDefaults(bn); // also positions numbering
    b.numbering = bn;
  } else {
    console.error('Unable to retrieve root SVG element of base.');
  }
}

export function removeNumbering(b: Base) {
  if (b.numbering) {
    b.numbering.text.remove();
    b.numbering.line.remove();
    b.numbering = undefined;
  }
}
