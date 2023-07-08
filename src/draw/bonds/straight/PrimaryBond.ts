import { StraightBond } from './StraightBond';
import { Values } from './values';

export class PrimaryBond extends StraightBond {
  static recommendedDefaults: Values;
}

PrimaryBond.recommendedDefaults = {
  line: {
    'stroke': '#515151',
    'stroke-width': 1.25,
    'stroke-opacity': 1,
    'stroke-linecap': 'butt',
    'stroke-dasharray': 'none',
  },
};
