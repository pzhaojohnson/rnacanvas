import { ValueToDisplayProvider } from './ValueToDisplayProvider';

let textContentsGetter = null;

let valueToDisplayProvider = null;

beforeEach(() => {
  textContentsGetter = {
    get: () => [],
  };

  valueToDisplayProvider = new ValueToDisplayProvider({
    textContentsGetter,
  });
});

afterEach(() => {
  valueToDisplayProvider = null;

  textContentsGetter = null;
});

describe('ValueToDisplayProvider class', () => {
  describe('provide method', () => {
    test('for zero text contents', () => {
      textContentsGetter.get = () => [];

      expect(valueToDisplayProvider.provide()).toBe('');
    });

    test('for one text content', () => {
      textContentsGetter.get = () => ['R'];

      expect(valueToDisplayProvider.provide()).toBe('R');
    });

    test('for four text contents that are all the same', () => {
      textContentsGetter.get = () => ['pt', 'pt', 'pt', 'pt'];

      expect(valueToDisplayProvider.provide()).toBe('pt');
    });

    test('for four text contents with only one that is different', () => {
      textContentsGetter.get = () => ['q', 'w', 'q', 'q'];

      expect(valueToDisplayProvider.provide()).toBe('');
    });

    test('for three text contents that are all different', () => {
      textContentsGetter.get = () => ['a', 'b', 'c'];

      expect(valueToDisplayProvider.provide()).toBe('');
    });
  });
});
