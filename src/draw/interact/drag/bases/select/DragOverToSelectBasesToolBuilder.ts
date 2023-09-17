import { MostRecentMouseDownTracker } from 'Draw/interact/drag/bases/mouse-utils/MostRecentMouseDownTracker';

import { AllBasesGetter } from 'Draw/bases/AllBasesGetter';

import { SelectedBasesGetter } from 'Draw/interact/drag/bases/selected/SelectedBasesGetter';
import { BaseIsSelectedChecker } from 'Draw/interact/drag/bases/selected/BaseIsSelectedChecker';

import { MouseEventWasOnBaseChecker } from 'Draw/interact/drag/bases/mouse-utils/MouseEventWasOnBaseChecker';
import { MouseDownWasOnBaseChecker } from 'Draw/interact/drag/bases/mouse-utils/MouseDownWasOnBaseChecker';

import { TargetBaseOfMouseEventGetter } from 'Draw/interact/drag/bases/mouse-utils/TargetBaseOfMouseEventGetter';

import { SpannedBasesGetter } from './helpers/SpannedBasesGetter';

import { DraggedOverBasesGetter } from './helpers/DraggedOverBasesGetter';

import { BasesSelector } from './helpers/BasesSelector';

import { Decider } from 'Conditions/deciders/Decider';

import { Conditions } from 'Conditions/Conditions';

import { ConditionIsFalse } from 'Conditions/ConditionIsFalse';

import { DrawingOriginIsAnRNA2DSchema } from 'Draw/origin/DrawingOriginIsAnRNA2DSchema';
import { DrawingOriginChecker } from 'Draw/origin/DrawingOriginChecker';

import { CurrentToolIsTheEditingTool } from 'Draw/interact/drag/bases/CurrentToolIsTheEditingTool';

import { MostRecentMouseDownWasOnASelectedBase } from 'Draw/interact/drag/bases/mouse-utils/MostRecentMouseDownWasOnASelectedBase';

import { MouseIsCurrentlyDown } from 'Draw/interact/drag/bases/mouse-utils/MouseIsCurrentlyDown';

import { MouseOverHandler } from './helpers/MouseOverHandler';

import { DragOverToSelectBasesTool } from './DragOverToSelectBasesTool';

import type { App } from 'App';

import type { Base } from 'Draw/bases/Base';

class DrawingOriginIsNotAnRNA2DSchemaBuilder {
  buildFor(app: App) {
    let drawingOriginChecker = new DrawingOriginChecker();

    return new ConditionIsFalse(
      new DrawingOriginIsAnRNA2DSchema({
        drawingOriginChecker,
        app,
      })
    );
  }
}

class AllBasesGetterBuilder {
  buildFor(app: App) {
    return new AllBasesGetter({
      drawing: app.drawing,
    });
  }
}

class SelectedBasesGetterBuilder {
  buildFor(app: App) {
    let allBasesGetter = (new AllBasesGetterBuilder()).buildFor(app);

    let baseIsSelectedChecker = new BaseIsSelectedChecker<Base>({ app });

    return new SelectedBasesGetter({
      allBasesGetter,
      baseIsSelectedChecker,
    });
  }
}

class MostRecentMouseDownWasOnASelectedBaseBuilder {
  buildFor(app: App) {
    let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

    let selectedBasesGetter = (new SelectedBasesGetterBuilder()).buildFor(app);

    let mouseDownWasOnBaseChecker = new MouseDownWasOnBaseChecker();

    return new MostRecentMouseDownWasOnASelectedBase({
      mostRecentMouseDownTracker,
      selectedBasesGetter,
      mouseDownWasOnBaseChecker,
    });
  }
}

class ShouldRespondToMouseOverDeciderBuilder {
  buildFor(app: App) {
    // to prevent conflict with the bases-shifting tool
    // (which is active when the drawing origin is an RNA 2D schema)
    let drawingOriginIsNotAnRNA2DSchema = (new DrawingOriginIsNotAnRNA2DSchemaBuilder()).buildFor(app);

    let currentToolIsTheEditingTool = new CurrentToolIsTheEditingTool({ app });

    // must be a selected base and not just any base
    // (to allow for deselecting bases on shift-click)
    let mostRecentMouseDownWasOnASelectedBase = (new MostRecentMouseDownWasOnASelectedBaseBuilder()).buildFor(app);

    let mouseIsCurrentlyDown = new MouseIsCurrentlyDown({ window });

    return new Decider({
      conditions: new Conditions({
        conditions: [
          drawingOriginIsNotAnRNA2DSchema,
          currentToolIsTheEditingTool,
          mostRecentMouseDownWasOnASelectedBase,
          mouseIsCurrentlyDown,
        ],
      }),
    });
  }
}

class TargetBaseOfMouseEventGetterBuilder {
  buildFor(app: App) {
    let allBasesGetter = (new AllBasesGetterBuilder()).buildFor(app);

    let mouseEventWasOnBaseChecker = new MouseEventWasOnBaseChecker();

    return new TargetBaseOfMouseEventGetter({
      allBasesGetter,
      mouseEventWasOnBaseChecker,
    });
  }
}

class SpannedBasesGetterBuilder {
  buildFor(app: App) {
    // just use the default order of bases that gets returned
    let allBasesGetter = (new AllBasesGetterBuilder()).buildFor(app);

    return new SpannedBasesGetter({
      allBasesInOrderGetter: allBasesGetter,
    });
  }
}

class DraggedOverBasesGetterBuilder {
  buildFor(app: App) {
    let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

    let targetBaseOfMouseEventGetter = (new TargetBaseOfMouseEventGetterBuilder()).buildFor(app);

    let spannedBasesGetter = (new SpannedBasesGetterBuilder()).buildFor(app);

    return new DraggedOverBasesGetter({
      mostRecentMouseDownTracker,
      targetBaseOfMouseEventGetter,
      spannedBasesGetter,
    });
  }
}

class MouseOverHandlerBuilder {
  buildFor(app: App) {
    let shouldRespondToMouseOverDecider = (new ShouldRespondToMouseOverDeciderBuilder()).buildFor(app);

    let draggedOverBasesGetter = (new DraggedOverBasesGetterBuilder()).buildFor(app);

    let basesSelector = new BasesSelector<Base>({ app });

    return new MouseOverHandler({
      shouldRespondToMouseOverDecider,
      draggedOverBasesGetter,
      basesSelector,
    });
  }
}

export class DragOverToSelectBasesToolBuilder {
  buildFor(app: App): DragOverToSelectBasesTool {
    let mouseOverHandler = (new MouseOverHandlerBuilder()).buildFor(app);

    return new DragOverToSelectBasesTool({
      window,
      mouseOverHandler,
    });
  }
}
