import { DrawingElementInterface as DrawingElement } from './DrawingElementInterface';
import { highlightingBox } from './highlightingBox';

import * as SVG from '@svgdotjs/svg.js';

export class ElementHighlighting {

  // the element being highlighted
  readonly element: DrawingElement;

  readonly rect: SVG.Rect;

  constructor(element: DrawingElement) {
    this.element = element;

    this.rect = new SVG.Rect();

    this.rect.attr({
      'stroke': 'blue',
      'stroke-width': 0.5,
      'stroke-dasharray': '1.75 0.75',
      'fill-opacity': 0,
    });

    this.refit();
  }

  appendTo(parent: SVG.Element) {
    this.rect.addTo(parent);
  }

  remove() {
    this.rect.remove();
  }

  refit() {
    let box = highlightingBox(this.element);
    if (!box) {
      console.error(`Unrecognized element type ${this.element.constructor.name}.`);
      return;
    }
    this.rect.attr({
      'x': box.x,
      'y': box.y,
      'width': box.width,
      'height': box.height,
    });
  }
}
