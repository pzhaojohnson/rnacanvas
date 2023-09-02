import { Tasks } from './Tasks';

describe('Tasks class', () => {
  describe('do method', () => {
    it('does all the tasks', () => {
      let componentTasks = [
        { do: jest.fn() },
        { do: jest.fn() },
        { do: jest.fn() },
        { do: jest.fn() },
      ];

      let tasksObject = new Tasks({ tasks: componentTasks });

      componentTasks.forEach(task => expect(task.do).not.toHaveBeenCalled());
      tasksObject.do();
      componentTasks.forEach(task => expect(task.do).toHaveBeenCalledTimes(1));
    });

    it('does nothing when there are no tasks to do', () => {
      let tasks = new Tasks({ tasks: [] });
      expect(() => tasks.do()).not.toThrow();
    });
  });
});
