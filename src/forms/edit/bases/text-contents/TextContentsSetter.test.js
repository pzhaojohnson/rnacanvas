import { TextContentsSetter } from './TextContentsSetter';

let undoStackPusher = null;

let appRefresher = null;

beforeEach(() => {
  undoStackPusher = {
    push: () => {},
  };

  appRefresher = {
    refresh: () => {},
  };
});

afterEach(() => {
  appRefresher = null;

  undoStackPusher = null;
});

describe('TextContentsSetter class', () => {
  describe('set method', () => {
    test('for zero bases', () => {
      let bases = [];

      let setter = (
        new TextContentsSetter({ bases, undoStackPusher, appRefresher })
      );

      expect(() => setter.set('A')).not.toThrow();
    });

    test('for one base', () => {
      let bases = [
        { text: { text: jest.fn() } },
      ];

      let setter = (
        new TextContentsSetter({ bases, undoStackPusher, appRefresher })
      );

      setter.set('xuhjkhajkef2891');

      expect(bases[0].text.text).toHaveBeenCalledTimes(1);
      expect(bases[0].text.text.mock.calls[0][0]).toBe('xuhjkhajkef2891');
    });

    test('for four bases', () => {
      let bases = [
        { text: { text: jest.fn() } },
        { text: { text: jest.fn() } },
        { text: { text: jest.fn() } },
        { text: { text: jest.fn() } },
      ];

      let setter = (
        new TextContentsSetter({ bases, undoStackPusher, appRefresher })
      );

      setter.set('KNJUH287YI13E9IJ');

      expect(bases[0].text.text).toHaveBeenCalledTimes(1);
      expect(bases[1].text.text).toHaveBeenCalledTimes(1);
      expect(bases[2].text.text).toHaveBeenCalledTimes(1);
      expect(bases[3].text.text).toHaveBeenCalledTimes(1);

      expect(bases[0].text.text.mock.calls[0][0]).toBe('KNJUH287YI13E9IJ');
      expect(bases[1].text.text.mock.calls[0][0]).toBe('KNJUH287YI13E9IJ');
      expect(bases[2].text.text.mock.calls[0][0]).toBe('KNJUH287YI13E9IJ');
      expect(bases[3].text.text.mock.calls[0][0]).toBe('KNJUH287YI13E9IJ');
    });

    it('removes leading and trailing whitespace before setting', () => {
      let bases = [
        { text: { text: jest.fn() } },
      ];

      let setter = (
        new TextContentsSetter({ bases, undoStackPusher, appRefresher })
      );

      setter.set('   G');
      setter.set('Nn \t\n');
      setter.set(' \t\tY\t\n   ');
      setter.set('  Y  \tr  ');

      expect(bases[0].text.text).toHaveBeenCalledTimes(4);

      expect(bases[0].text.text.mock.calls[0][0]).toBe('G');
      expect(bases[0].text.text.mock.calls[1][0]).toBe('Nn');
      expect(bases[0].text.text.mock.calls[2][0]).toBe('Y');
      expect(bases[0].text.text.mock.calls[3][0]).toBe('Y  \tr');
    });

    it('pushes the undo stack before setting', () => {
      let bases = [
        { text: { text: jest.fn() } },
      ];

      undoStackPusher.push = jest.fn(() => {
        expect(bases[0].text.text).not.toHaveBeenCalled();
      });

      let setter = (
        new TextContentsSetter({ bases, undoStackPusher, appRefresher })
      );

      setter.set('A');

      expect(undoStackPusher.push).toHaveBeenCalledTimes(1);
    });

    it('refreshes the app after setting', () => {
      let bases = [
        { text: { text: jest.fn() } },
      ];

      appRefresher.refresh = jest.fn(() => {
        expect(bases[0].text.text).toHaveBeenCalledTimes(1);
      });

      let setter = (
        new TextContentsSetter({ bases, undoStackPusher, appRefresher })
      );

      setter.set('A');

      expect(appRefresher.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
