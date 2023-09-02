export interface Task {
  /**
   * Does the task.
   */
  do(): void;
}

export type TasksConstructorParameters = {
  /**
   * The tasks to encapsulate.
   */
  tasks: Task[];
};

export class Tasks {
  _tasks: Task[];

  constructor(args: TasksConstructorParameters) {
    this._tasks = args.tasks;
  }

  /**
   * Does all the encapsulated tasks.
   */
  do() {
    this._tasks.forEach(task => task.do());
  }
}
