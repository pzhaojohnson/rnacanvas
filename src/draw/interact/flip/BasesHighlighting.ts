import type { Base } from 'Draw/bases/Base';
import { BasesTrace } from 'Draw/interact/highlight/BasesTrace';
import * as SVG from '@svgdotjs/svg.js';
import { mean } from '@rnacanvas/math';

export type Options = {

  // the bases to highlight
  // (should be in ascending order by base position in the layout sequence
  // and should contain at least two bases)
  readonly bases: Base[];

  // the dimensions of bases
  readonly baseWidth: number;
  readonly baseHeight: number;
};

export class BasesHighlighting {
  readonly options: Options;

  readonly borderTrace: BasesTrace;
  readonly fillTrace: BasesTrace;

  constructor(options: Options) {
    this.options = options;

    this.borderTrace = new BasesTrace({ bases: options.bases, close: true });
    this.fillTrace = new BasesTrace({ bases: options.bases, close: true });

    this.borderTrace.path.attr({
      'stroke': '#89A2EE',
      'stroke-opacity': 1,
      'stroke-linejoin': 'round',
      'fill': '#89A2EE',
      'fill-opacity': 1,
    });

    this.fillTrace.path.attr({
      'stroke': 'white',
      'stroke-opacity': 1,
      'stroke-linejoin': 'round',
      'fill': 'white',
      'fill-opacity': 1,
    });

    this.refit();
  }

  appendTo(svg: SVG.Svg) {
    this.borderTrace.appendTo(svg);
    this.fillTrace.appendTo(svg);
  }

  remove() {
    this.fillTrace.remove();
    this.borderTrace.remove();
  }

  refit() {
    let baseSize = mean([this.options.baseWidth, this.options.baseHeight]);
    this.borderTrace.path.attr('stroke-width', 2.33 * baseSize);
    this.fillTrace.path.attr('stroke-width', 1.33 * baseSize);

    this.borderTrace.retrace();
    this.fillTrace.retrace();
  }
}
