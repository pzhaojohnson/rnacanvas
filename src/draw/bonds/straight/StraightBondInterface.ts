import * as SVG from '@svgdotjs/svg.js';
import { BaseInterface as Base } from 'Draw/BaseInterface'

export interface StraightBondInterface {
  readonly line: SVG.Line;
  readonly base1: Base;
  readonly base2: Base;
  id: string;
  contains(b: Base): boolean;
  basePadding1: number;
  basePadding2: number;
  reposition(): void;
  bringToFront(): void;
  sendToBack(): void;
  refreshIds(): void;
}
