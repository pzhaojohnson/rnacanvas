export interface Task {
  /**
   * Does the task.
   */
  do(): void;
}

export class Tasks implements Task {
  constructor(private encapsulatedTasks: Task[]) {}

  /**
   * Does the encapsulated tasks (in the order that they were provided in).
   */
  do(): void {
    this.encapsulatedTasks.forEach(task => task.do());
  }
}
