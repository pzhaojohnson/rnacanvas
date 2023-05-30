import { Base } from 'Draw/bases/Base';

export type Defaults = {
  numberingAnchor: number;
  numberingIncrement: number;
}

export class Sequence {
  static recommendedDefaults: Defaults;

  id: string;
  readonly bases: Base[];

  constructor(id: string) {
    this.id = id;
    this.bases = [];
  }

  get characters(): string {
    let cs = '';
    this.bases.forEach(b => {
      cs += b.character;
    });
    return cs;
  }

  get length(): number {
    return this.bases.length;
  }

  positionOutOfRange(p: number): boolean {
    return p < 1 || p > this.length;
  }

  positionInRange(p: number): boolean {
    return !this.positionOutOfRange(p);
  }

  atPosition(p: number): Base | undefined {
    return this.bases[p - 1];
  }

  getBaseAtPosition(p: number): Base | undefined {
    return this.atPosition(p);
  }

  positionOf(b: Base): number {
    return this.bases.indexOf(b) + 1;
  }

  basesToPositions(): Map<Base, number> {
    let basesToPositions = new Map<Base, number>();
    this.bases.forEach((b, i) => {
      let p = i + 1;
      basesToPositions.set(b, p);
    });
    return basesToPositions;
  }

  /**
   * Appends the base to the sequence.
   */
  append(b: Base) {
    this.bases.push(b);
  }
}
