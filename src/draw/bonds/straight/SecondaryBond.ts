import { StraightBond } from './StraightBond';
import { Values } from './values';

export const secondaryBondTypes = ['AUT', 'GC', 'GUT', 'other'] as const;
export type SecondaryBondType = typeof secondaryBondTypes[number];

export class SecondaryBond extends StraightBond {
  static recommendedDefaults: {
    'AUT': Values,
    'GC': Values,
    'GUT': Values,
    'other': Values,
  }

  get type(): SecondaryBondType {
    let cs = [
      this.base1.character.toUpperCase(),
      this.base2.character.toUpperCase(),
    ];
    cs.sort();
    let t = cs.join('');
    if (t == 'AU' || t == 'AT') {
      return 'AUT';
    } else if (t == 'CG') {
      return 'GC';
    } else if (t == 'GU' || t == 'GT') {
      return 'GUT';
    } else {
      return 'other';
    }
  }
}

SecondaryBond.recommendedDefaults = {
  'AUT': {
    line: {
      'stroke': '#000000',
      'stroke-width': 2,
      'stroke-opacity': 1,
      'stroke-linecap': 'butt',
      'stroke-dasharray': 'none',
    },
    basePadding1: 5.5,
    basePadding2: 5.5,
  },
  'GC': {
    line: {
      'stroke': '#000000',
      'stroke-width': 2,
      'stroke-opacity': 1,
      'stroke-linecap': 'butt',
      'stroke-dasharray': 'none',
    },
    basePadding1: 5.5,
    basePadding2: 5.5,
  },
  'GUT': {
    line: {
      'stroke': '#000000',
      'stroke-width': 2,
      'stroke-opacity': 1,
      'stroke-linecap': 'butt',
      'stroke-dasharray': 'none',
    },
    basePadding1: 5.5,
    basePadding2: 5.5,
  },
  'other': {
    line: {
      'stroke': '#000000',
      'stroke-width': 2,
      'stroke-opacity': 1,
      'stroke-linecap': 'butt',
      'stroke-dasharray': 'none',
    },
    basePadding1: 5.5,
    basePadding2: 5.5,
  },
};
