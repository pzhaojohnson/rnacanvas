import { Tasks } from './Tasks';

describe('Tasks class', () => {
  describe('do method', () => {
    it('does all the tasks', () => {
      let tasksArray = [
        { do: jest.fn() },
        { do: jest.fn() },
        { do: jest.fn() },
        { do: jest.fn() },
      ];

      let tasks = new Tasks({ tasks: tasksArray });

      tasksArray.forEach(task => expect(task.do).not.toHaveBeenCalled());
      tasks.do();
      tasksArray.forEach(task => expect(task.do).toHaveBeenCalledTimes(1));
    });

    it('does nothing when there are no tasks to do', () => {
      let tasksArray = [];
      let tasks = new Tasks({ tasks: tasksArray });
      expect(() => tasks.do()).not.toThrow();
    });
  });
});
