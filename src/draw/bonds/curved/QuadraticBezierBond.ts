import * as SVG from '@svgdotjs/svg.js';
import type { Base } from 'Draw/bases/Base';
import type { StrungElement } from 'Draw/bonds/strung/StrungElement';
import { strungElementsContainNode } from 'Draw/bonds/strung/strungElementContainsNode';
import { isQuadraticBezierCurve } from './QuadraticBezierCurve';
import { assignUuid } from 'Draw/svg/assignUuid';
import {
  Positioning,
  positioning,
  ControlPointDisplacement,
} from './positioning';
import { position } from './position';

export type NodeLike = (
  Node
  | SVG.Element
  | QuadraticBezierBond
  | StrungElement
);

export class QuadraticBezierBond {
  readonly path: SVG.Path;
  readonly base1: Base;
  readonly base2: Base;

  strungElements: StrungElement[];

  _positioning: Positioning;

  constructor(path: SVG.Path, b1: Base, b2: Base) {
    if (path.type != 'path') {
      throw new Error('Passed element is not a path.');
    }
    if (!isQuadraticBezierCurve(path.array())) {
      throw new Error('Path is not a quadratic bezier curve.');
    }

    this.base1 = b1;
    this.base2 = b2;

    this.path = path;

    this.strungElements = [];

    // use the attr method to check if the ID is already
    // initialized since the id method itself will initialize
    // the ID (to a non-UUID)
    if (!this.path.attr('id')) {
      assignUuid(this.path);
    }

    this._positioning = positioning(this) ?? {
      basePadding1: 8,
      basePadding2: 8,
      controlPointDisplacement: {
        magnitude: 0,
        angle: 0,
      },
    };
  }

  get id(): string {
    return String(this.path.id());
  }

  contains(node: NodeLike): boolean {
    if (node instanceof QuadraticBezierBond) {
      return node == this;
    } else if (strungElementsContainNode(this.strungElements, node)) {
      return true;
    } else if (node instanceof SVG.Element) {
      return node == this.path;
    } else if (node instanceof Node) {
      return this.path.node.contains(node);
    } else {
      return false;
    }
  }

  binds(b: Base): boolean {
    return this.base1.id == b.id || this.base2.id == b.id;
  }

  get basePadding1() {
    return this._positioning.basePadding1;
  }

  set basePadding1(bp1) {
    this._positioning.basePadding1 = bp1;
    this.reposition();
  }

  get basePadding2() {
    return this._positioning.basePadding2;
  }

  set basePadding2(bp2) {
    this._positioning.basePadding2 = bp2;
    this.reposition();
  }

  controlPointDisplacement(): ControlPointDisplacement {
    return { ...this._positioning.controlPointDisplacement };
  }

  setControlPointDisplacement(cpd: ControlPointDisplacement) {
    this._positioning.controlPointDisplacement = { ...cpd };
    this.reposition();
  }

  reposition() {
    position(this, this._positioning);
  }
}

export function isQuadraticBezierBond
(
  value: unknown
): value is QuadraticBezierBond
{
  return value instanceof QuadraticBezierBond;
}
