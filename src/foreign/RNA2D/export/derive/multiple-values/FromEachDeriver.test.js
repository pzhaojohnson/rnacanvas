import { FromEachDeriver } from './FromEachDeriver';

let deriverToEncapsulate = null;

let fromEachDeriver = null;

beforeEach(() => {
  deriverToEncapsulate = {
    deriveFrom: () => {},
  };

  fromEachDeriver = new FromEachDeriver(deriverToEncapsulate);
});

afterEach(() => {
  fromEachDeriver = null;

  deriverToEncapsulate = null;
});

describe('FromEachDeriver class', () => {
  describe('deriveFrom method', () => {
    it('passes each value-to-derive-from to the encapsulated deriver', () => {
      let valuesToDeriveFrom = ['ajosf902u3r', 59319, 'skdjhf982u90ru', false];

      deriverToEncapsulate.deriveFrom = jest.fn();

      fromEachDeriver.deriveFrom(valuesToDeriveFrom);

      expect(deriverToEncapsulate.deriveFrom).toHaveBeenCalledTimes(4);

      expect(deriverToEncapsulate.deriveFrom.mock.calls[0][0]).toBe('ajosf902u3r');
      expect(deriverToEncapsulate.deriveFrom.mock.calls[1][0]).toBe(59319);
      expect(deriverToEncapsulate.deriveFrom.mock.calls[2][0]).toBe('skdjhf982u90ru');
      expect(deriverToEncapsulate.deriveFrom.mock.calls[3][0]).toBe(false);
    });

    it('returns all derived values (in the correct order)', () => {
      let valuesToDerive = ['jjdhfh249', -72.4872, true, 'sjs0fu23', 'cnksheio2'];

      deriverToEncapsulate.deriveFrom = index => valuesToDerive[index];

      expect(fromEachDeriver.deriveFrom([0, 1, 2, 3, 4])).toStrictEqual(
        ['jjdhfh249', -72.4872, true, 'sjs0fu23', 'cnksheio2']
      );
    });
  });
});
