import { SingleTextContentSetter } from './SingleTextContentSetter';

function createBaseMock() {
  return {
    text: {
      text: () => {},
      bbox: () => ({
        cx: 0,
        cy: 0,
      }),
      center: () => {},
    },
  };
}

let setter = null;

let base = null;

beforeEach(() => {
  setter = new SingleTextContentSetter();

  base = createBaseMock();
});

afterEach(() => {
  base = null;

  setter = null;
});

describe('SingleTextContentSetter class', () => {
  describe('set method', () => {
    it('sets the text content of the base', () => {
      base.text.text = jest.fn();

      setter.set({ base, textContent: '893bdjksfad' });

      expect(base.text.text).toHaveBeenCalledTimes(1);
      expect(base.text.text.mock.calls[0][0]).toBe('893bdjksfad');
    });

    it('recenters text element after setting text content', () => {
      base.text.text = jest.fn();

      base.text.bbox = () => ({ cx: 114.163176, cy: 7318.3716811 });

      base.text.center = jest.fn(() => {
        expect(base.text.text).toHaveBeenCalledTimes(1);
        expect(base.text.text.mock.calls[0][0]).toBe('172rhijkfaksd');
      });

      setter.set({ base, textContent: '172rhijkfaksd' });

      expect(base.text.center).toHaveBeenCalledTimes(1);
      expect(base.text.center.mock.calls[0][0]).toBe(114.163176);
      expect(base.text.center.mock.calls[0][1]).toBe(7318.3716811);
    });

    it('caches center text coordinates before setting text content', () => {
      base.text.text = jest.fn();

      // setting the text content may change center coordinates
      // (so need to cache the previous center coordinates beforehand)
      base.text.bbox = jest.fn(() => {
        expect(base.text.text).not.toHaveBeenCalled();
        return { cx: 0, cy: 0 };
      });

      setter.set({ base, textContent: 'A' });

      expect(base.text.bbox).toHaveBeenCalledTimes(1);
    });
  });
});
