import * as SVG from '@svgdotjs/svg.js';
import { interpretNumber } from 'Draw/svg/interpretNumber';

export type Shift = {
  x: number;
  y: number;
}

function shiftText(text: SVG.Text, s: Shift) {
  let x = interpretNumber(text.attr('x'));
  let y = interpretNumber(text.attr('y'));
  if (x && y) {
    // faster than using the dmove method
    text.attr({
      'x': x.convert('px').valueOf() + s.x,
      'y': y.convert('px').valueOf() + s.y,
    });
  } else {
    text.dmove(s.x, s.y);
  }
}

export function shift(eles: SVG.Element[], s: Shift) {
  eles.forEach(ele => {
    if (ele instanceof SVG.Text) {
      shiftText(ele, s);
    } else {
      ele.dmove(s.x, s.y);
    }
  });
}
