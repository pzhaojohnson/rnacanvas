export interface Task {
  /**
   * Does the task.
   */
  do(): void;
}

export interface Condition {
  /**
   * Returns true if the represented condition holds true.
   *
   * Returns false otherwise.
   */
  isTrue(): boolean;
}

export class ConditionalTask implements Task {
  constructor(private task: Task, private condition: Condition) {}

  /**
   * Does the provided task if the provided condition is true.
   */
  do(): void {
    if (this.condition.isTrue()) {
      this.task.do();
    }
  }
}
