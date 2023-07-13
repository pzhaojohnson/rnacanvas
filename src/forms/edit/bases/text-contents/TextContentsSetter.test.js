import { TextContentsSetter } from './TextContentsSetter';

let singleTextContentSetter = null;

let undoStackPusher = null;

let appRefresher = null;

beforeEach(() => {
  singleTextContentSetter = {
    set: () => {},
  };

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

  singleTextContentSetter = null;
});

describe('TextContentsSetter class', () => {
  describe('setTo method', () => {
    it('does not throw for zero bases', () => {
      let bases = [];

      let textContentsSetter = new TextContentsSetter({
        bases, singleTextContentSetter, undoStackPusher, appRefresher,
      });

      expect(() => textContentsSetter.setTo('A')).not.toThrow();
    });

    it('can set the text content of one base', () => {
      let bases = [{}];
      singleTextContentSetter.set = jest.fn();

      let textContentsSetter = new TextContentsSetter({
        bases, singleTextContentSetter, undoStackPusher, appRefresher,
      });

      textContentsSetter.setTo('xuhjkhajkef2891');

      expect(singleTextContentSetter.set).toHaveBeenCalledTimes(1);
      let call = singleTextContentSetter.set.mock.calls[0];

      expect(call[0].base).toBe(bases[0]);
      expect(call[0].textContent).toBe('xuhjkhajkef2891');
    });

    it('can set the text contents of four bases', () => {
      let bases = [{}, {}, {}, {}];
      singleTextContentSetter.set = jest.fn();

      let textContentsSetter = new TextContentsSetter({
        bases, singleTextContentSetter, undoStackPusher, appRefresher,
      });

      textContentsSetter.setTo('KNJUH287YI13E9IJ');

      expect(singleTextContentSetter.set).toHaveBeenCalledTimes(4);
      let calls = singleTextContentSetter.set.mock.calls;

      expect(calls[0][0].base).toBe(bases[0]);
      expect(calls[1][0].base).toBe(bases[1]);
      expect(calls[2][0].base).toBe(bases[2]);
      expect(calls[3][0].base).toBe(bases[3]);

      expect(calls[0][0].textContent).toBe('KNJUH287YI13E9IJ');
      expect(calls[1][0].textContent).toBe('KNJUH287YI13E9IJ');
      expect(calls[2][0].textContent).toBe('KNJUH287YI13E9IJ');
      expect(calls[3][0].textContent).toBe('KNJUH287YI13E9IJ');
    });

    it('pushes the undo stack before setting', () => {
      let bases = [{}];
      singleTextContentSetter.set = jest.fn();

      undoStackPusher.push = jest.fn(() => {
        expect(singleTextContentSetter.set).not.toHaveBeenCalled();
      });

      let textContentsSetter = new TextContentsSetter({
        bases, singleTextContentSetter, undoStackPusher, appRefresher,
      });

      textContentsSetter.setTo('A');

      expect(undoStackPusher.push).toHaveBeenCalledTimes(1);
    });

    it('refreshes the app after setting', () => {
      let bases = [{}];
      singleTextContentSetter.set = jest.fn();

      appRefresher.refresh = jest.fn(() => {
        expect(singleTextContentSetter.set).toHaveBeenCalledTimes(1);
      });

      let textContentsSetter = new TextContentsSetter({
        bases, singleTextContentSetter, undoStackPusher, appRefresher,
      });

      textContentsSetter.setTo('A');

      expect(appRefresher.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
