import * as SVG from '@svgdotjs/svg.js';

import { v4 as uuidv4 } from 'uuid';

export type Point = {
  x: number;
  y: number;
};

/**
 * To be dispatched whenever the circle base outline moves.
 */
export type MoveEvent = {
  target: CircleBaseOutline;
};

/**
 * To be dispatched whenever the circle base outline is removed from its
 * parent.
 */
export type RemoveEvent = {
  target: CircleBaseOutline;
};

/**
 * Possesses the components that define a circle base outline.
 */
export class CircleBaseOutline {
  /**
   * The actual circle element of the circle base outline.
   *
   * To be centered on the base that the outline is for.
   */
  readonly circle: SVG.Circle;

  /**
   * The most recently provided center coordinates of the base that the
   * circle outline is for.
   *
   * Must be updated manually.
   */
  cachedBaseCenter?: Point;

  eventListeners: {
    'move': ((event: MoveEvent) => void)[];
    'remove': ((event: RemoveEvent) => void)[];
  };

  /**
   * Will initialize the ID of the provided circle element with a UUID
   * if it does not already have an ID.
   *
   * (The circle element of a circle base outline must have a unique ID
   * for the circle element to be retrieved when recreating a circle
   * base outline, such as when opening a saved drawing.)
   */
  constructor(
    args?: {
      circle?: SVG.Circle,
      baseCenter?: Point,
    },
  ) {
    this.circle = args?.circle ?? new SVG.Circle();

    // use the attr method instead of the id method
    // (the id method will initialize the ID to a non-UUID)
    if (!this.circle.attr('id')) {
      let id = 'uuid-' + uuidv4(); // must start with a letter in SVG
      this.circle.attr('id', id);
    }

    this.cachedBaseCenter = args?.baseCenter;

    this.eventListeners = {
      'move': [],
      'remove': [],
    };
  }
}
