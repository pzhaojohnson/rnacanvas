import { ChainedDerivers } from './ChainedDerivers';

let firstDeriver = null;

let secondDeriver = null;

let chainedDerivers = null;

beforeEach(() => {
  firstDeriver = {
    deriveFrom: () => {},
  };

  secondDeriver = {
    deriveFrom: () => {},
  };

  chainedDerivers = new ChainedDerivers(firstDeriver, secondDeriver);
});

afterEach(() => {
  chainedDerivers = null;

  secondDeriver = null;

  firstDeriver = null;
});

describe('ChainedDerivers class', () => {
  describe('deriveFrom method', () => {
    it('passes the value-to-derive-from to the first deriver', () => {
      firstDeriver.deriveFrom = jest.fn();

      chainedDerivers.deriveFrom('9v982h  riknsjdn923rowejsd');

      expect(firstDeriver.deriveFrom).toHaveBeenCalledTimes(1);
      expect(firstDeriver.deriveFrom.mock.calls[0][0]).toBe('9v982h  riknsjdn923rowejsd');
    });

    it('passes the value derived by the first deriver to the second deriver', () => {
      firstDeriver.deriveFrom = () => 'ij9s0ujf0921ojriqleljdo';

      secondDeriver.deriveFrom = jest.fn();

      chainedDerivers.deriveFrom('asdf');

      expect(secondDeriver.deriveFrom).toHaveBeenCalledTimes(1);
      expect(secondDeriver.deriveFrom.mock.calls[0][0]).toBe('ij9s0ujf0921ojriqleljdo');
    });

    it('returns the value derived by the second deriver', () => {
      secondDeriver.deriveFrom = () => 'sljfo92u903urjo2iwlskd';

      expect(chainedDerivers.deriveFrom('asdf')).toBe('sljfo92u903urjo2iwlskd');
    });
  });
});
