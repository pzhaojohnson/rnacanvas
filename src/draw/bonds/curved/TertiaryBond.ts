import { QuadraticBezierBond } from './QuadraticBezierBond';
import { Values } from './values';

export class TertiaryBond extends QuadraticBezierBond {
  static recommendedDefaults: Values;
}

TertiaryBond.recommendedDefaults = {
  path: {
    'stroke': '#8cd4e8',
    'stroke-width': 1.5,
    'stroke-opacity': 1,
    'stroke-dasharray': '',
    'fill': 'none',
    style: {
      'cursor': '',
    },
  },
};

export function isTertiaryBond(value: unknown): value is TertiaryBond {
  return value instanceof TertiaryBond;
}
