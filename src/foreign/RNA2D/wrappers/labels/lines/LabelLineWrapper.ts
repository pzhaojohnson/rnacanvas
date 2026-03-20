import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { NonNullObject, isNonNullObject } from '@rnacanvas/value-check';

import { isArray } from '@rnacanvas/value-check';

import { Point, isPoint } from '@rnacanvas/points';

export class LabelLineWrapper {
  readonly wrappee: NonNullObject;

  constructor(wrappee: unknown) {
    this.wrappee = isNonNullObject(wrappee) ? wrappee : {};
  }

  get classes() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('classes');
  }

  get x1(): number | never {
    if (typeof this.wrappee.x1 == 'number') {
      return this.wrappee.x1;
    }

    return this.point1.x;
  }

  get y1(): number | undefined {
    if (typeof this.wrappee.y1 == 'number') {
      return this.wrappee.y1;
    }

    return this.point1.y;
  }

  get x2(): number | never {
    if (typeof this.wrappee.x2 == 'number') {
      return this.wrappee.x2;
    }

    return this.point2.x;
  }

  get y2(): number | never {
    if (typeof this.wrappee.y2 == 'number') {
      return this.wrappee.y2;
    }

    return this.point2.y;
  }

  private get points(): unknown[] {
    if (isArray(this.wrappee.points)) {
      return this.wrappee.points;
    }

    if (!this.wrappee.points) {
      throw new Error('Label line points array is not defined.');
    } else {
      throw new Error(`Label line points property is not an array: ${this.wrappee.points}.`);
    }
  }

  private get point1(): Point | never {
    let points = this.points;

    if (isPoint(points[0])) {
      return points[0];
    } else {
      throw new Error(`Label line point 1 is not a point: ${points[0]}.`);
    }
  }

  private get point2(): Point | never {
    let points = this.points;

    if (isPoint(points[1])) {
      return points[1];
    } else {
      throw new Error(`Label line point 2 is not a point: ${points[1]}.`);
    }
  }
}
