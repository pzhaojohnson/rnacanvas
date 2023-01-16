import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

// the underlying function to outline bases
import { addCircleOutline as outlineBase } from 'Draw/bases/annotate/circle/add';

export type OutlineSpec = {
  stroke?: SVG.Color;
  fill?: SVG.Color;
};

export class BaseWrapper {
  /**
   * The wrapped base.
   */
  readonly base: Base;

  constructor(base: Base) {
    this.base = base;
  }

  /**
   * When stroke and fill are both left unspecified, outlines the base
   * with default stroke and fill colors.
   *
   * When only stroke is left unspecified, sets stroke opacity to zero.
   *
   * When only fill is left unspecified, sets fill opacity to zero.
   */
  outline(outlineSpec?: OutlineSpec) {
    outlineBase(this.base);
    let outline = this.base.outline;

    if (!outline) {
      return; // should never happen
    }

    let stroke = outlineSpec?.stroke?.toHex() ?? '#00ffff';
    let fill = outlineSpec?.fill?.toHex() ?? '#c3ffff';

    let strokeOpacity = 1;
    let fillOpacity = 1;

    // don't make stroke invisible if fill is also unspecified
    if (!outlineSpec?.stroke && outlineSpec?.fill) {
      strokeOpacity = 0;
    }

    // don't make fill invisible if stroke is also unspecified
    if (outlineSpec?.stroke && !outlineSpec?.fill) {
      fillOpacity = 0;
    }

    outline.circle.attr({
      'r': 7,
      'fill': fill,
      'fill-opacity': fillOpacity,
      'stroke': stroke,
      'stroke-opacity': strokeOpacity,
      'stroke-width': 1,
    });

    // don't cover the text of the base
    outline.circle.back();
  }
}
