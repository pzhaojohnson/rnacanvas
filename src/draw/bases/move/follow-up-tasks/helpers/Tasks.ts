export interface Task {
  /**
   * Does the task.
   */
  do(): void;
}

export class Tasks {
  _tasks: Task[];

  constructor(args: { tasks: Task[] }) {
    let { tasks } = args;

    this._tasks = tasks;
  }

  /**
   * Does all the tasks encapsulated by this tasks instance.
   */
  do() {
    this._tasks.forEach(task => task.do());
  }
}
