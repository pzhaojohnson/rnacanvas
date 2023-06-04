import { createBase } from 'Draw/bases/createBase';

import * as SVG from 'Draw/svg/NodeSVG';

import { uuidRegex } from 'Utilities/uuidRegex';

import { StraightBond } from './StraightBond';

let base1 = null;
let base2 = null;

let svg = null;

let line = null;

beforeEach(() => {
  base1 = createBase('A');
  base2 = createBase('U');

  base1.setCenter({ x: 139, y: 1247 });
  base2.setCenter({ x: 3589, y: 1 });

  svg = SVG.SVG();
  svg.addTo(document.body);

  line = svg.line(
    base1.getCenter().x,
    base1.getCenter().y,
    base2.getCenter().x,
    base2.getCenter().y,
  );
});

afterEach(() => {
  line = null;

  svg.remove();
  svg = null;

  base1 = null;
  base2 = null;
});

describe('StraightBond class', () => {
  describe('constructor', () => {
    it('stores bases 1 and 2', () => {
      let sb = new StraightBond({ base1, base2, line });
      expect(sb.base1).toBe(base1);
      expect(sb.base2).toBe(base2);

      expect(base1).toBeTruthy();
      expect(base2).toBeTruthy();
      expect(base1).not.toBe(base2);
    });

    it('stores line', () => {
      let sb = new StraightBond({ base1, base2, line });
      expect(sb.line).toBe(line);

      expect(line).toBeTruthy();
    });

    it('sets line ID to a UUID if undefined', () => {
      expect(line.attr('id')).toBeUndefined();
      let sb = new StraightBond({ base1, base2, line });

      let lineId = line.attr('id');

      expect(lineId.length).toBeGreaterThanOrEqual(36);
      expect(lineId).toMatch(uuidRegex);

      // must start with a letter per HTML rules
      expect(lineId.startsWith('uuid-')).toBeTruthy();
    });

    it('does not overwrite line ID if already defined', () => {
      line.attr('id', 'id-187159');
      let sb = new StraightBond({ base1, base2, line });
      expect(sb.line).toBe(line);

      // did not change
      expect(line.attr('id')).toBe('id-187159');
    });

    it('initializes strung elements array', () => {
      let sb = new StraightBond({ base1, base2, line });
      expect(sb.strungElements).toStrictEqual([]);
    });
  });
});
