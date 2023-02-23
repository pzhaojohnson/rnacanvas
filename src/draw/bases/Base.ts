import * as Svg from '@svgdotjs/svg.js';
import { assignUuid } from 'Draw/svg/assignUuid';
import { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';
import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';
import { Values, setValues } from './values';
import { Point2D as Point } from 'Math/points/Point';
import { deepCopyPoint2D as deepCopyPoint } from 'Math/points/Point';

export type ConstructorArgs = (
  Svg.Text
  | {
    text: Svg.Text,
    center?: Point,
  }
);

export class Base {
  static recommendedDefaults: Values;

  readonly text: Svg.Text;
  highlighting?: CircleBaseOutline;
  outline?: CircleBaseOutline;
  numbering?: BaseNumbering;

  _center: Point;

  static create(svg: Svg.Svg, character: string, xCenter: number, yCenter: number): (Base | never) {
    let text = svg.text((add) => add.tspan(character));
    text.id();
    let b = new Base(text);
    setValues(b, Base.recommendedDefaults);
    b.recenter({ x: xCenter, y: yCenter });
    return b;
  }

  /**
   * Throws if the content of the text element is not a single character.
   */
  constructor(args: ConstructorArgs) {
    if (args instanceof Svg.Text) {
      this.text = args;
    } else {
      this.text = args.text;
    }

    // use the attr method to check if the ID is already initialized
    // since the id method itself will initialize the ID (to a non-UUID)
    if (!this.text.attr('id')) {
      assignUuid(this.text);
    }

    if (!(args instanceof Svg.Text) && args.center) {
      this._center = deepCopyPoint(args.center);
    } else {
      let bbox = this.text.bbox();
      this._center = { x: bbox.cx, y: bbox.cy };
    }
  }

  get id(): string {
    return this.text.id();
  }

  get character(): string {
    return this.text.text();
  }

  /**
   * Has no effect if the given string is not a single character.
   */
  set character(c: string) {
    if (c.length !== 1) {
      return;
    }
    let bbox = this.text.bbox();
    let center = { x: bbox.cx, y: bbox.cy };
    this.text.clear();
    this.text.tspan(c);
    this.text.center(center.x, center.y);
  }

  center(): Point {
    return { ...this._center };
  }

  get xCenter(): number {
    return this._center.x;
  }

  get yCenter(): number {
    return this._center.y;
  }

  recenter(p: { x: number, y: number }) {
    this.text.center(p.x, p.y);
    this._center = { ...p };
    if (this.highlighting) {
      this.highlighting.reposition({ baseCenter: p });
    }
    if (this.outline) {
      this.outline.reposition({ baseCenter: p });
    }
    if (this.numbering) {
      this.numbering.reposition({ baseCenter: p });
    }
  }
}

Base.recommendedDefaults = {
  text: {
    'font-family': 'Arial',
    'font-size': 9,
    'font-weight': 'bold',
    'font-style': 'normal',
  },
};
