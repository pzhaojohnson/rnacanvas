import { SVGPathWrapper as Path } from 'Draw/svg/path';
import { BaseInterface as Base } from 'Draw/bases/BaseInterface';
import { ControlPointDisplacement } from './positioning';

export interface QuadraticBezierBondInterface {
  readonly id: string;
  readonly path: Path;
  readonly base1: Base;
  readonly base2: Base;
  binds(b: Base): boolean;
  basePadding1: number;
  basePadding2: number;
  controlPointDisplacement(): ControlPointDisplacement;
  setControlPointDisplacement(cpd: ControlPointDisplacement): void;
  reposition(): void;
}
