import { BasesShiftingTool } from './BasesShiftingTool';

import { MouseUpHandler } from './helpers/mouse-up/MouseUpHandler';

import { MostRecentMouseDownTracker } from './helpers/mouse-down/MostRecentMouseDownTracker';

import { SelectedBasesGetter } from './helpers/SelectedBasesGetter';
import { AllBasesGetter } from 'Draw/bases/AllBasesGetter';
import { BaseIsSelectedChecker } from './helpers/BaseIsSelectedChecker';

import { BasesShifter } from './helpers/BasesShifter';
import { BasesShifterBuilder as BasesShifterToDecorateBuilder } from 'Draw/bases/move/BasesShifterBuilder';

import { Tasks } from './helpers/tasks/Tasks';

import { PushUndoStack } from './helpers/tasks/PushUndoStack';
import { UndoStackPusher } from 'Undo/UndoStackPusher';

import { RefreshApp } from './helpers/tasks/RefreshApp';
import { AppRefresher } from 'Refresh/AppRefresher';

import { BasesShiftCalculator } from './helpers/BasesShiftCalculator';
import { HorizontalZoomFactorCalculator } from 'Draw/zoom/HorizontalZoomFactorCalculator';
import { VerticalZoomFactorCalculator } from 'Draw/zoom/VerticalZoomFactorCalculator';

import { Decider } from './helpers/Decider';

import { Conditions } from './helpers/conditions/Conditions';

import { DrawingOriginIsAnRNA2DSchema } from './helpers/conditions/DrawingOriginIsAnRNA2DSchema';
import { DrawingOriginChecker } from 'Draw/origin/DrawingOriginChecker';

import { CurrentToolIsTheEditingTool } from './helpers/conditions/CurrentToolIsTheEditingTool';

import { MostRecentMouseDownWasOnASelectedBase } from './helpers/conditions/MostRecentMouseDownWasOnASelectedBase';
import { MouseDownWasOnBaseChecker } from './helpers/mouse-down/MouseDownWasOnBaseChecker';

import { MouseHasMovedSinceMostRecentMouseDown } from './helpers/conditions/MouseHasMovedSinceMostRecentMouseDown';

import type { App } from 'App';

import type { Base } from 'Draw/bases/Base';

class SelectedBasesGetterBuilder {
  buildFor(app: App) {
    let allBasesGetter = new AllBasesGetter({
      drawing: app.drawing,
    });

    let baseIsSelectedChecker = new BaseIsSelectedChecker<Base>({
      app,
    });

    return new SelectedBasesGetter({
      allBasesGetter,
      baseIsSelectedChecker,
    });
  }
}

class ShouldRespondToMouseUpDeciderBuilder {
  buildFor(app: App) {
    let drawingOriginChecker = new DrawingOriginChecker();

    let drawingOriginIsAnRNA2DSchema = new DrawingOriginIsAnRNA2DSchema({
      app,
      drawingOriginChecker,
    });

    let currentToolIsTheEditingTool = new CurrentToolIsTheEditingTool({ app });

    let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({
      window,
    });

    let selectedBasesGetterBuilder = new SelectedBasesGetterBuilder();
    let selectedBasesGetter = selectedBasesGetterBuilder.buildFor(app);

    let mouseDownWasOnBaseChecker = new MouseDownWasOnBaseChecker();

    let mostRecentMouseDownWasOnASelectedBase = new MostRecentMouseDownWasOnASelectedBase({
      mostRecentMouseDownTracker,
      selectedBasesGetter,
      mouseDownWasOnBaseChecker,
    });

    let mouseHasMovedSinceMostRecentMouseDown = new MouseHasMovedSinceMostRecentMouseDown({
      window,
    });

    let conditions = new Conditions({
      conditions: [
        drawingOriginIsAnRNA2DSchema,
        currentToolIsTheEditingTool,
        mostRecentMouseDownWasOnASelectedBase,
        mouseHasMovedSinceMostRecentMouseDown,
      ],
    });

    return new Decider({ conditions });
  }
}

class BasesShifterBuilder {
  buildFor(app: App) {
    let basesShifterToDecorateBuilder = new BasesShifterToDecorateBuilder();
    let basesShifterToDecorate = basesShifterToDecorateBuilder.buildFor(app.strictDrawing.drawing);

    let tasksToDoBeforeShiftingBases = new Tasks({
      tasks: [
        new PushUndoStack({ undoStackPusher: new UndoStackPusher({ app }) }),
      ],
    });

    let tasksToDoAfterShiftingBases = new Tasks({
      tasks: [
        new RefreshApp({ appRefresher: new AppRefresher({ app }) }),
      ],
    });

    return new BasesShifter({
      basesShifterToDecorate,
      tasksToDoBeforeShiftingBases,
      tasksToDoAfterShiftingBases,
    });
  }
}

class BasesShiftCalculatorBuilder {
  buildFor(app: App) {
    let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({
      window,
    });

    let horizontalZoomFactorCalculator = new HorizontalZoomFactorCalculator({
      drawing: app.drawing,
    });

    let verticalZoomFactorCalculator = new VerticalZoomFactorCalculator({
      drawing: app.drawing,
    });

    return new BasesShiftCalculator({
      mostRecentMouseDownTracker,
      horizontalZoomFactorCalculator,
      verticalZoomFactorCalculator,
    });
  }
}

export class BasesShiftingToolBuilder {
  buildFor(app: App): BasesShiftingTool {
    let selectedBasesGetterBuilder = new SelectedBasesGetterBuilder();
    let selectedBasesGetter = selectedBasesGetterBuilder.buildFor(app);

    let basesShifterBuilder = new BasesShifterBuilder();
    let basesShifter = basesShifterBuilder.buildFor(app);

    let basesShiftCalculatorBuilder = new BasesShiftCalculatorBuilder();
    let basesShiftCalculator = basesShiftCalculatorBuilder.buildFor(app);

    let shouldRespondToMouseUpDeciderBuilder = new ShouldRespondToMouseUpDeciderBuilder();
    let shouldRespondToMouseUpDecider = shouldRespondToMouseUpDeciderBuilder.buildFor(app);

    let mouseUpHandler = new MouseUpHandler({
      shouldRespondToMouseUpDecider,
      selectedBasesGetter,
      basesShifter,
      basesShiftCalculator,
    });

    return new BasesShiftingTool({
      window,
      mouseUpHandler,
    });
  }
}
