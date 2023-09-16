import { MostRecentMouseDownTracker } from './MostRecentMouseDownTracker';

let window = null;

let mostRecentMouseDownTracker = null;

beforeEach(() => {
  window = {
    addEventListener: () => {},
  };

  mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });
});

afterEach(() => {
  mostRecentMouseDownTracker = null;

  window = null;
});

describe('MostRecentMouseDownTracker class', () => {
  describe('constructor', () => {
    it('binds a listener to mouse down events on the window object', () => {
      let window = {
        addEventListener: jest.fn(),
      };

      let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

      expect(window.addEventListener).toHaveBeenCalledTimes(1);
      let call = window.addEventListener.mock.calls[0];

      expect(call[0]).toBe('mousedown');

      let listener = call[1];

      // is callable
      expect(() => listener('A mouse down event')).not.toThrow();
    });
  });

  describe('provide method', () => {
    it('returns undefined if there have not been any mouse down events', () => {
      expect(mostRecentMouseDownTracker.provide()).toBeUndefined();
    });

    it('returns the most recent of four mouse down events', () => {
      let mouseDownListener = null;

      let window = {
        addEventListener: (name, listener) => {
          expect(name).toBe('mousedown');
          mouseDownListener = listener;
        },
      };

      let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

      mouseDownListener('Mouse down - 104u893');
      mouseDownListener('Mouse down - qjiaud8');
      mouseDownListener('Mouse down - 13489t');
      mouseDownListener('Mouse down - 24tguy1t');

      expect(mostRecentMouseDownTracker.provide()).toBe('Mouse down - 24tguy1t');
    });

    it('can be called multiple times between mouse down events', () => {
      let mouseDownListener = null;

      let window = {
        addEventListener: (name, listener) => {
          expect(name).toBe('mousedown');
          mouseDownListener = listener;
        },
      };

      let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

      mouseDownListener('Mouse down - 289ur');
      mouseDownListener('Mouse down - 2u8rihwef');

      expect(mostRecentMouseDownTracker.provide()).toBe('Mouse down - 2u8rihwef');
      expect(mostRecentMouseDownTracker.provide()).toBe('Mouse down - 2u8rihwef');
      expect(mostRecentMouseDownTracker.provide()).toBe('Mouse down - 2u8rihwef');
    });
  });
});
