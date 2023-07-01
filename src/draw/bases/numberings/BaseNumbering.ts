import * as SVG from '@svgdotjs/svg.js';
import { assignUuid } from 'Draw/svg/assignUuid';

import { Point2D as Point } from 'Math/points/Point';
import { distance2D as distance } from 'Draw/svg/math/distance';
import { displacement2D as displacement } from 'Draw/svg/math/points/displacement';
import { direction2D as direction } from 'Math/points/direction';

import { reposition } from 'Draw/bases/numberings/reposition';

import type { Values } from 'Draw/bases/numberings/values';

import * as AppendTo from './private/appendTo';

export type Repositioning = {
  baseCenter?: Point;
  basePadding?: number;
  lineAngle?: number;
  lineLength?: number;
  textPadding?: number;
}

export class BaseNumbering {
  static recommendedDefaults: Values;

  readonly text: SVG.Text;
  readonly line: SVG.Line;

  _baseCenter: Point;

  /**
   * Defaults to 4.
   *
   * Used to always be 4 before this property was customizable.
   */
  _textPadding = 4;

  constructor(text: SVG.Text, line: SVG.Line, baseCenter: Point) {
    this.text = text;
    this.line = line;

    // use the attr method to check if an ID is initialized
    // since the id method itself will initialize an ID (to
    // a non-UUID)
    if (!this.text.attr('id')) {
      assignUuid(this.text);
    }
    if (!this.line.attr('id')) {
      assignUuid(this.line);
    }

    this._baseCenter = { ...baseCenter };
  }

  get id(): string {
    return String(this.text.id());
  }

  appendTo(
    ...args: Parameters<
      InstanceType<typeof AppendTo.BaseNumberingDecorator>['appendTo']
    >
  ) {
    return (new AppendTo.BaseNumberingDecorator(this))
      .appendTo(...args);
  }

  remove() {
    return (new AppendTo.BaseNumberingDecorator(this))
      .remove();
  }

  get basePadding(): number | undefined {
    let x1 = this.line.attr('x1');
    let y1 = this.line.attr('y1');
    return distance(this._baseCenter.x, this._baseCenter.y, x1, y1);
  }

  set basePadding(bp) {
    if (typeof bp == 'number') {
      this.reposition({ basePadding: bp });
    }
  }

  get lineAngle(): number | undefined {
    let x1 = this.line.attr('x1');
    let y1 = this.line.attr('y1');
    let x2 = this.line.attr('x2');
    let y2 = this.line.attr('y2');
    let d = displacement({ x: x1, y: y1 }, { x: x2, y: y2 });
    return d ? direction(d) : undefined;
  }

  set lineAngle(la) {
    if (typeof la == 'number') {
      this.reposition({ lineAngle: la });
    }
  }

  get lineLength(): number | undefined {
    let x1 = this.line.attr('x1');
    let y1 = this.line.attr('y1');
    let x2 = this.line.attr('x2');
    let y2 = this.line.attr('y2');
    return distance(x1, y1, x2, y2);
  }

  set lineLength(ll) {
    if (typeof ll == 'number') {
      this.reposition({ lineLength: ll });
    }
  }

  /**
   * The distance between the text and line of the base numbering.
   */
  get textPadding(): number {
    return this._textPadding;
  }

  set textPadding(textPadding) {
    this.reposition({ textPadding });
    this._textPadding = textPadding;
  }

  reposition(rp?: Repositioning) {
    let defaults = BaseNumbering.recommendedDefaults;
    reposition(this, {
      baseCenter: rp?.baseCenter ?? this._baseCenter,
      basePadding: rp?.basePadding ?? this.basePadding ?? defaults.basePadding ?? 8,
      lineAngle: rp?.lineAngle ?? this.lineAngle ?? 0,
      lineLength: rp?.lineLength ?? this.lineLength ?? defaults.lineLength ?? 8,
      textPadding: rp?.textPadding ?? this.textPadding,
    });
    if (rp?.baseCenter) {
      this._baseCenter = { ...rp.baseCenter };
    }
  }
}

BaseNumbering.recommendedDefaults = {
  text: {
    'font-family': 'Arial',
    'font-size': 9,
    'font-weight': 'normal',
    'fill': '#525252',
    'fill-opacity': 1,
  },
  line: {
    'stroke': '#525252',
    'stroke-width': 1,
    'stroke-opacity': 1,
    'stroke-dasharray': 'none',
  },
  basePadding: 7,
  lineLength: 9,
};
