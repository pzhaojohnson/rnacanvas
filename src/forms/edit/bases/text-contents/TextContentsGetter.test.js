import { TextContentsGetter } from './TextContentsGetter';

function createBaseMock(textContent) {
  return {
    text: {
      text: () => textContent,
    },
  };
}

describe('TextContentsGetter class', () => {
  describe('get method', () => {
    test('for zero bases', () => {
      let bases = [];

      let getter = new TextContentsGetter({ bases });

      expect(getter.get()).toStrictEqual([]);
    });

    test('for one base', () => {
      let bases = [
        createBaseMock('U'),
      ];

      let getter = new TextContentsGetter({ bases });

      expect(getter.get()).toStrictEqual(
        ['U']
      );
    });

    test('for five bases', () => {
      let bases = [
        createBaseMock('A'),
        createBaseMock('QWer'),
        createBaseMock('aT'),
        createBaseMock('n'),
        createBaseMock(''),
      ];

      let getter = new TextContentsGetter({ bases });

      expect(getter.get()).toStrictEqual(
        ['A', 'QWer', 'aT', 'n', '']
      );
    });
  });
});
