import { SelectRequestHandler } from './SelectRequestHandler';

let byTextContentBasesGetter = null;

let basesSelector = null;

let selectRequestHandler = null;

beforeEach(() => {
  byTextContentBasesGetter = {
    getWith: () => ['base1', 'base2', 'base3'],
  };

  basesSelector = {
    select: () => {},
  };

  selectRequestHandler = new SelectRequestHandler({
    byTextContentBasesGetter,
    basesSelector,
  });
});

afterEach(() => {
  selectRequestHandler = null;

  basesSelector = null;

  byTextContentBasesGetter = null;
});

describe('SelectRequestHandler class', () => {
  describe('handle method', () => {
    it('throws if the specified text content is empty', () => {
      expect(() => selectRequestHandler.handle({ textContent: '' }))
        .toThrow();

      // not empty
      expect(() => selectRequestHandler.handle({ textContent: 'A' }))
        .not.toThrow();
    });

    it('throws if the specified text content is entirely whitespace', () => {
      expect(() => selectRequestHandler.handle({ textContent: '  \t \n  ' }))
        .toThrow();

      // not entirely whitespace
      expect(() => selectRequestHandler.handle({ textContent: 'A' }))
        .not.toThrow();
    });

    it('passes the specified text content to the bases getter', () => {
      byTextContentBasesGetter.getWith = jest.fn(() => ['base1', 'base2']);

      selectRequestHandler.handle({ textContent: 'NnRrrr837519' });

      expect(byTextContentBasesGetter.getWith).toHaveBeenCalledTimes(1);

      expect(byTextContentBasesGetter.getWith.mock.calls[0][0]).toBe(
        'NnRrrr837519'
      );
    });

    it('trims leading and trailing whitespace', () => {
      byTextContentBasesGetter.getWith = jest.fn(() => ['base1']);

      selectRequestHandler.handle({ textContent: '  \t\n UuT  \t  ' });

      expect(byTextContentBasesGetter.getWith).toHaveBeenCalledTimes(1);

      expect(byTextContentBasesGetter.getWith.mock.calls[0][0]).toBe('UuT');
    });

    it('throws if no bases have the specified text content', () => {
      byTextContentBasesGetter.getWith = () => [];

      expect(() => selectRequestHandler.handle({ textContent: 'A' }))
        .toThrow();
    });

    it('selects bases with the specified text content', () => {
      byTextContentBasesGetter.getWith = () => (
        ['base-37814812', 'base-389716492', 'base-99291873']
      );

      basesSelector.select = jest.fn();

      selectRequestHandler.handle({ textContent: 'A' });

      expect(basesSelector.select).toHaveBeenCalledTimes(1);

      expect(basesSelector.select.mock.calls[0][0]).toStrictEqual(
        ['base-37814812', 'base-389716492', 'base-99291873']
      );
    });
  });
});
