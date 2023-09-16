import { MostRecentMouseDownWasOnASelectedBase } from './MostRecentMouseDownWasOnASelectedBase';

let mostRecentMouseDownTracker = null;

let selectedBasesGetter = null;

let mouseDownWasOnBaseChecker = null;

let mostRecentMouseDownWasOnASelectedBase = null;

beforeEach(() => {
  mostRecentMouseDownTracker = {
    provide: () => 'A mouse down event',
  };

  selectedBasesGetter = {
    get: () => [],
  };

  mouseDownWasOnBaseChecker = {
    checkFor: () => false,
  };

  mostRecentMouseDownWasOnASelectedBase = new MostRecentMouseDownWasOnASelectedBase({
    mostRecentMouseDownTracker,
    selectedBasesGetter,
    mouseDownWasOnBaseChecker,
  });
});

afterEach(() => {
  mostRecentMouseDownWasOnASelectedBase = null;

  mouseDownWasOnBaseChecker = null;

  selectedBasesGetter = null;

  mostRecentMouseDownTracker = null;
});

describe('MostRecentMouseDownWasOnASelectedBase class', () => {
  describe('isTrue method', () => {
    it('returns false if there have not been any mouse down events', () => {
      mostRecentMouseDownTracker.provide = () => undefined;

      selectedBasesGetter.get = () => ['base 1', 'base 2'];

      mouseDownWasOnBaseChecker.checkFor = () => true;

      expect(mostRecentMouseDownWasOnASelectedBase.isTrue()).toBe(false);
    });

    it('checks each selected base to see if the most recent mouse down event was on it', () => {
      mostRecentMouseDownTracker.provide = () => 'Mouse down - 2938urq3';

      selectedBasesGetter.get = () => ['base - 2938qw', 'base - 98udi', 'base - 8943uf', 'base - i3hri'];

      mouseDownWasOnBaseChecker.checkFor = jest.fn(() => false);

      mostRecentMouseDownWasOnASelectedBase.isTrue();

      expect(mouseDownWasOnBaseChecker.checkFor).toHaveBeenCalledTimes(4);

      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[0][0].base).toBe('base - 2938qw');
      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[1][0].base).toBe('base - 98udi');
      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[2][0].base).toBe('base - 8943uf');
      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[3][0].base).toBe('base - i3hri');

      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[0][0].mouseDown).toBe('Mouse down - 2938urq3');
      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[1][0].mouseDown).toBe('Mouse down - 2938urq3');
      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[2][0].mouseDown).toBe('Mouse down - 2938urq3');
      expect(mouseDownWasOnBaseChecker.checkFor.mock.calls[3][0].mouseDown).toBe('Mouse down - 2938urq3');
    });

    it('returns false if the most recent mouse down event was not on a selected base', () => {
      mostRecentMouseDownTracker.provide = () => 'A mouse down event';

      selectedBasesGetter.get = () => ['base 1', 'base 2', 'base 3', 'base 4', 'base 5'];

      mouseDownWasOnBaseChecker.checkFor = () => false;

      expect(mostRecentMouseDownWasOnASelectedBase.isTrue()).toBe(false);
    });

    it('returns true if the most recent mouse down event was on a selected base', () => {
      mostRecentMouseDownTracker.provide = () => 'A mouse down event';

      selectedBasesGetter.get = () => ['base 1', 'base 2', 'base 3', 'base 4', 'base 5', 'base 6'];

      mouseDownWasOnBaseChecker.checkFor = (args) => {
        return args.base === 'base 3';
      };

      expect(mostRecentMouseDownWasOnASelectedBase.isTrue()).toBe(true);
    });

    it('returns false when no bases are selected', () => {
      mostRecentMouseDownTracker.provide = () => 'A mouse down event';

      selectedBasesGetter.get = () => [];

      mouseDownWasOnBaseChecker.checkFor = () => true;

      expect(mostRecentMouseDownWasOnASelectedBase.isTrue()).toBe(false);
    });
  });
});
