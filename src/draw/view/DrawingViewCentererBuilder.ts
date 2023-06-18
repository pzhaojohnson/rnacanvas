import { DrawingViewCenterer } from './DrawingViewCenterer';

import type { ScrollBarCenterer } from './DrawingViewCenterer';

import { XScrollBarCenterer } from './XScrollBarCenterer';

import { YScrollBarCenterer } from './YScrollBarCenterer';

export class DrawingViewCentererBuilder {
  _xScrollBarCenterer: ScrollBarCenterer = new XScrollBarCenterer();
  _yScrollBarCenterer: ScrollBarCenterer = new YScrollBarCenterer();

  build() {
    return new DrawingViewCenterer({
      xScrollBarCenterer: this._xScrollBarCenterer,
      yScrollBarCenterer: this._yScrollBarCenterer,
    });
  }

  xScrollBarCenterer(xScrollBarCenterer: ScrollBarCenterer) {
    this._xScrollBarCenterer = xScrollBarCenterer;
  }

  yScrollBarCenterer(yScrollBarCenterer: ScrollBarCenterer) {
    this._yScrollBarCenterer = yScrollBarCenterer;
  }
}
