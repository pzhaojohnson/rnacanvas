import { BasesShifter } from './BasesShifter';

import { TasksToDoAfterMovingBasesBuilder } from './follow-up-tasks/TasksToDoAfterMovingBasesBuilder';

import type { Drawing } from 'Draw/Drawing';

export class BasesShifterBuilder {
  /**
   * Builds a bases shifter that can be used to shift bases in the
   * provided drawing (but not in other drawings).
   */
  buildFor(drawing: Drawing): BasesShifter {
    let tasksToDoAfterMovingBasesBuilder = new TasksToDoAfterMovingBasesBuilder();
    let tasksToDoAfterMovingBases = tasksToDoAfterMovingBasesBuilder.buildFor(drawing);

    return new BasesShifter({
      tasksToDoAfterMovingBases,
    });
  }
}
