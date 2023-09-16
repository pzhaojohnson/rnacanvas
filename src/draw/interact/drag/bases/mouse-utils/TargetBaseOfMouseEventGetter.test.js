import { TargetBaseOfMouseEventGetter } from './TargetBaseOfMouseEventGetter';

let allBasesGetter = null;

let mouseEventWasOnBaseChecker = null;

let targetBaseOfMouseEventGetter = null;

beforeEach(() => {
  allBasesGetter = {
    get: () => [],
  };

  mouseEventWasOnBaseChecker = {
    checkFor: () => false,
  };

  targetBaseOfMouseEventGetter = new TargetBaseOfMouseEventGetter({
    allBasesGetter,
    mouseEventWasOnBaseChecker,
  });
});

afterEach(() => {
  targetBaseOfMouseEventGetter = null;

  mouseEventWasOnBaseChecker = null;

  allBasesGetter = null;
});

describe('TargetBaseOfMouseEventGetter class', () => {
  describe('getFor method', () => {
    it('checks each base to see if the mouse event was on it', () => {
      allBasesGetter.get = () => ['Base - 3982', 'Base - dja89', 'Base - 289ur', 'Base - jd8293'];

      // later bases might not actually get checked
      // (if this were to return true for a base)
      mouseEventWasOnBaseChecker.checkFor = jest.fn(() => false);

      targetBaseOfMouseEventGetter.getFor('Mouse event - knj54i3');

      expect(mouseEventWasOnBaseChecker.checkFor).toHaveBeenCalledTimes(4);

      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[0][0].base).toBe('Base - 3982');
      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[1][0].base).toBe('Base - dja89');
      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[2][0].base).toBe('Base - 289ur');
      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[3][0].base).toBe('Base - jd8293');

      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[0][0].mouseEvent).toBe('Mouse event - knj54i3');
      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[1][0].mouseEvent).toBe('Mouse event - knj54i3');
      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[2][0].mouseEvent).toBe('Mouse event - knj54i3');
      expect(mouseEventWasOnBaseChecker.checkFor.mock.calls[3][0].mouseEvent).toBe('Mouse event - knj54i3');
    });

    test('a mouse event that was on a base', () => {
      allBasesGetter.get = () => ['Base A', 'Base B', 'Base C', 'Base D', 'Base E', 'Base F', 'Base G', 'Base H'];

      mouseEventWasOnBaseChecker.checkFor = ({ base, mouseEvent }) => {
        return base === 'Base F';
      };

      expect(targetBaseOfMouseEventGetter.getFor('A mouse event')).toBe('Base F');
    });

    test('a mouse event that was not on a base', () => {
      allBasesGetter.get = () => ['Base 1', 'Base 2', 'Base 3', 'Base 4'];

      mouseEventWasOnBaseChecker.checkFor = () => false;

      expect(targetBaseOfMouseEventGetter.getFor('A mouse event')).toBeUndefined();
    });

    test('there are no bases in the drawing', () => {
      allBasesGetter.get = () => [];

      // return true
      // (otherwise would also cause the method to return undefined)
      mouseEventWasOnBaseChecker.checkFor = () => true;

      expect(targetBaseOfMouseEventGetter.getFor('A mouse event')).toBeUndefined();
    });
  });
});
