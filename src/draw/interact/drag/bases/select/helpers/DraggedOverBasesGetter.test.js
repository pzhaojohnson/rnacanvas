import { DraggedOverBasesGetter } from './DraggedOverBasesGetter';

let mostRecentMouseDownTracker = null;

let targetBaseOfMouseEventGetter = null;

let spannedBasesGetter = null;

let draggedOverBasesGetter = null;

beforeEach(() => {
  mostRecentMouseDownTracker = {
    provide: () => undefined,
  };

  targetBaseOfMouseEventGetter = {
    getFor: () => undefined,
  };

  spannedBasesGetter = {
    getFor: () => [],
  };

  draggedOverBasesGetter = new DraggedOverBasesGetter({
    mostRecentMouseDownTracker,
    targetBaseOfMouseEventGetter,
    spannedBasesGetter,
  });
});

afterEach(() => {
  draggedOverBasesGetter = null;

  spannedBasesGetter = null;

  targetBaseOfMouseEventGetter = null;

  mostRecentMouseDownTracker = null;
});

describe('DraggedOverBasesGetter class', () => {
  describe('getFor method', () => {
    it('returns an empty array if there have not been any mouse down events', () => {
      mostRecentMouseDownTracker.provide = () => undefined;

      // should not also be a reason to return an empty array
      targetBaseOfMouseEventGetter.getFor = () => 'A base';

      spannedBasesGetter.getFor = () => ['Base 1', 'Base 2'];

      expect(draggedOverBasesGetter.getFor('A mouse over event')).toStrictEqual([]);
    });

    it('passes the most recent mouse down event to the target-base-of-mouse-event getter', () => {
      mostRecentMouseDownTracker.provide = () => 'Mouse down - 23984u2984rqidl29';

      targetBaseOfMouseEventGetter.getFor = jest.fn(() => 'A base');

      draggedOverBasesGetter.getFor('A mouse over event');

      expect(targetBaseOfMouseEventGetter.getFor.mock.calls[0][0]).toBe('Mouse down - 23984u2984rqidl29');
    });

    it('returns an empty array if the most recent mouse down event was not on a base', () => {
      // should not also be a reason to return an empty array
      mostRecentMouseDownTracker.provide = () => 'Mouse down - 2893rqe93';

      targetBaseOfMouseEventGetter.getFor = event => {
        if (event === 'Mouse down - 2893rqe93') {
          return undefined;
        } else {
          // should not also be a reason to return an empty array
          return 'A base';
        }
      };

      spannedBasesGetter.getFor = () => ['Base 1', 'Base 2', 'Base 3'];

      expect(draggedOverBasesGetter.getFor('A mouse over event')).toStrictEqual([]);
    });

    it('passes the mouse over event to the target-base-of-mouse-event getter', () => {
      mostRecentMouseDownTracker.provide = () => 'The most recent mouse down event';

      targetBaseOfMouseEventGetter.getFor = jest.fn(() => 'A base');

      draggedOverBasesGetter.getFor('Mouse over - jd8a9suf824ur3ojq');

      expect(targetBaseOfMouseEventGetter.getFor.mock.calls[1][0]).toBe('Mouse over - jd8a9suf824ur3ojq');
    });

    it('returns an empty array if the mouse over event was not on a base', () => {
      // should not also be a reason to return an empty array
      mostRecentMouseDownTracker.provide = () => 'The most recent mouse down event';

      targetBaseOfMouseEventGetter.getFor = event => {
        if (event === 'Mouse over - 3982ruweoid') {
          return undefined;
        } else {
          // should not also be a reason to return an empty array
          return 'A base';
        }
      };

      spannedBasesGetter.getFor = () => ['Base 1', 'Base 2', 'Base 3'];

      expect(draggedOverBasesGetter.getFor('Mouse over - 3982ruweoid')).toStrictEqual([]);
    });

    it('passes the most recently mouse downed and mouse overed bases to the spanned bases getter', () => {
      mostRecentMouseDownTracker.provide = () => 'Mouse down - ajdkfj8942';

      targetBaseOfMouseEventGetter.getFor = event => {
        if (event === 'Mouse down - ajdkfj8942') {
          return 'Base - 2398rywafiuhlsd';
        } else if (event === 'Mouse over - 5u4htg8w9es') {
          return 'Base - saidfh249q8re';
        } else {
          throw new Error(`Unexpected event: ${event}.`);
        }
      };

      spannedBasesGetter.getFor = jest.fn(() => []);

      draggedOverBasesGetter.getFor('Mouse over - 5u4htg8w9es');

      expect(spannedBasesGetter.getFor).toHaveBeenCalledTimes(1);

      expect(spannedBasesGetter.getFor.mock.calls[0][0]).toBe('Base - 2398rywafiuhlsd');
      expect(spannedBasesGetter.getFor.mock.calls[0][1]).toBe('Base - saidfh249q8re');
    });

    it('returns the bases spanned by the most recently mouse downed and mouse overed bases', () => {
      mostRecentMouseDownTracker.provide = () => 'The most recent mouse down event';

      targetBaseOfMouseEventGetter.getFor = () => 'A base';

      spannedBasesGetter.getFor = () => ['Base - 237r7', 'Base - dhs783', 'Base - r876gdu', 'Base - hfa7843'];

      expect(draggedOverBasesGetter.getFor('A mouse over event')).toStrictEqual(
        ['Base - 237r7', 'Base - dhs783', 'Base - r876gdu', 'Base - hfa7843']
      );
    });
  });
});
