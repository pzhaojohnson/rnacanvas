export interface Task {
  /**
   * Does the task.
   */
  do(): void;
}

export interface Condition {
  /**
   * Returns true if the condition is true and false otherwise.
   */
  isTrue(): boolean;
}

export class ConditionalTask2 implements Task {
  constructor(private task1: Task, private condition: Condition, private task2: Task) {}

  /**
   * Does task 1 if the condition is true.
   *
   * Otherwise does task 2.
   */
  do(): void {
    if (this.condition.isTrue()) {
      this.task1.do();
    } else {
      this.task2.do();
    }
  }
}
