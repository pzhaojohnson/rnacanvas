import { Tasks } from './Tasks';

describe('Tasks class', () => {
  describe('do method', () => {
    test('four tasks', () => {
      let i = 0;

      let encapsulatedTasks = [
        { do: jest.fn(() => expect(i++).toBe(0)) },
        { do: jest.fn(() => expect(i++).toBe(1)) },
        { do: jest.fn(() => expect(i++).toBe(2)) },
        { do: jest.fn(() => expect(i++).toBe(3)) },
      ];

      let tasks = new Tasks(encapsulatedTasks);

      expect(i).toBe(0);
      tasks.do();
      expect(i).toBe(4);
    });

    test('zero tasks', () => {
      let tasks = new Tasks([]);

      expect(() => tasks.do()).not.toThrow();
    });
  });
});
