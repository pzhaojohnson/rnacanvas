import { Tasks } from './helpers/Tasks';

import { RepositionAllBonds } from './helpers/RepositionAllBonds';

import { AllBondsGetter } from 'Draw/bonds/AllBondsGetter';

import { ReorientAllBaseNumberings } from './helpers/ReorientAllBaseNumberings';

import { orientBaseNumberings as reorientAllBaseNumberingsFn } from 'Draw/bases/numberings/orient';

import type { Drawing } from 'Draw/Drawing';

export class TasksToDoAfterMovingBasesBuilder {
  /**
   * Builds the follow-up tasks to be done after moving bases in the
   * provided drawing.
   */
  buildFor(drawing: Drawing): Tasks {
    let allBondsGetter = new AllBondsGetter({
      drawing,
    });

    let repositionAllBonds = new RepositionAllBonds({
      allBondsGetter,
    });

    let reorientAllBaseNumberings = new ReorientAllBaseNumberings({
      drawing,
      reorientAllBaseNumberingsFn,
    });

    return new Tasks({
      tasks: [
        repositionAllBonds,
        reorientAllBaseNumberings,
      ],
    });
  }
}
