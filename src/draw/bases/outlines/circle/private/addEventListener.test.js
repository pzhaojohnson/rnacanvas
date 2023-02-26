import { CircleBaseOutline } from './CircleBaseOutline';

import { CircleBaseOutlineDecorator } from './addEventListener';

let circleBaseOutline = null;
let decorator = null;

beforeEach(() => {
  circleBaseOutline = new CircleBaseOutline();
  decorator = new CircleBaseOutlineDecorator(circleBaseOutline);
});

afterEach(() => {
  decorator = null;
  circleBaseOutline = null;
});

describe('CircleBaseOutlineDecorator class', () => {
  describe('addEventListener method', () => {
    test('adding move event listeners', () => {
      expect(circleBaseOutline.eventListeners['move']).toEqual([]);

      let listener1 = jest.fn();
      let listener2 = jest.fn();
      let listener3 = jest.fn();

      decorator.addEventListener('move', listener1);
      decorator.addEventListener('move', listener2);
      decorator.addEventListener('move', listener3);

      expect(circleBaseOutline.eventListeners['move'])
        .toEqual([listener1, listener2, listener3]);
    });

    test('adding remove event listeners', () => {
      expect(circleBaseOutline.eventListeners['remove']).toEqual([]);

      let listener1 = jest.fn();
      let listener2 = jest.fn();
      let listener3 = jest.fn();

      decorator.addEventListener('remove', listener1);
      decorator.addEventListener('remove', listener2);
      decorator.addEventListener('remove', listener3);

      expect(circleBaseOutline.eventListeners['remove'])
        .toEqual([listener1, listener2, listener3]);
    });
  });
});
