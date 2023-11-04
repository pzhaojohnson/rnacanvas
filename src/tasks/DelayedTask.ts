export interface Task {
  /**
   * Does the task.
   */
  do(): void;
}

export class DelayedTask implements Task {
  /**
   * Delay is specified in milliseconds.
   */
  constructor(private taskToDo: Task, private delay: number) {}

  /**
   * Does the task-to-do after the specified delay.
   */
  do(): void {
    setTimeout(() => this.taskToDo.do(), this.delay);
  }
}
