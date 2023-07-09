import { TextPaddingsSetter } from './TextPaddingsSetter';

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

describe('TextPaddingsSetter class', () => {
  describe('set method', () => {
    test('with zero base numberings', () => {
      let baseNumberings = [];

      let setter = new TextPaddingsSetter({
        baseNumberings, undoStackPusher, appRefresher,
      });

      expect(() => setter.set(1)).not.toThrow();
    });

    test('with one base numbering', () => {
      let baseNumberings = [
        { textPadding: 9 },
      ];

      let setter = new TextPaddingsSetter({
        baseNumberings, undoStackPusher, appRefresher,
      });

      setter.set(12);

      expect(baseNumberings[0].textPadding).toBe(12);
    });

    test('with four base numberings', () => {
      let baseNumberings = [
        { textPadding: 3 },
        { textPadding: 9.8 },
        { textPadding: 12 },
        { textPadding: 30 },
      ];

      let setter = new TextPaddingsSetter({
        baseNumberings, undoStackPusher, appRefresher,
      });

      setter.set(6.07);

      expect(baseNumberings[0].textPadding).toBe(6.07);
      expect(baseNumberings[1].textPadding).toBe(6.07);
      expect(baseNumberings[2].textPadding).toBe(6.07);
      expect(baseNumberings[3].textPadding).toBe(6.07);
    });

    it('pushes the undo stack before setting text paddings', () => {
      let baseNumberings = [
        { textPadding: 5 },
      ];

      undoStackPusher.push = jest.fn(() => {
        expect(baseNumberings[0].textPadding).toBe(5);
      });

      let setter = new TextPaddingsSetter({
        baseNumberings, undoStackPusher, appRefresher,
      });

      expect(undoStackPusher.push).not.toHaveBeenCalled();
      setter.set(8);
      expect(undoStackPusher.push).toHaveBeenCalledTimes(1);

      expect(baseNumberings[0].textPadding).toBe(8);
    });

    it('refreshes the app after setting text paddings', () => {
      let baseNumberings = [
        { textPadding: 3 },
      ];

      appRefresher.refresh = jest.fn(() => {
        expect(baseNumberings[0].textPadding).toBe(7);
      });

      let setter = new TextPaddingsSetter({
        baseNumberings, undoStackPusher, appRefresher,
      });

      expect(appRefresher.refresh).not.toHaveBeenCalled();
      setter.set(7);
      expect(appRefresher.refresh).toHaveBeenCalledTimes(1);

      expect(baseNumberings[0].textPadding).toBe(7);
    });
  });
});
