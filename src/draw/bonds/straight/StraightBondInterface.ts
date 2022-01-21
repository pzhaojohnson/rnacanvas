import { SVGLineWrapper as Line } from 'Draw/svg/SVGLineWrapper';
import { BaseInterface as Base } from 'Draw/bases/BaseInterface'

export interface StraightBondInterface {
  readonly line: Line;
  readonly base1: Base;
  readonly base2: Base;
  id: string;
  binds(b: Base): boolean;
  basePadding1: number;
  basePadding2: number;
  reposition(): void;
}
