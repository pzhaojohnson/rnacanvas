import { BasesShiftingTool } from './BasesShiftingTool';

import { MouseMoveHandler } from './helpers/mouse-move/MouseMoveHandler';

import { InteractionOverlayGetter } from './helpers/mouse-move/InteractionOverlayGetter';

import { GhostInteractionOverlayProvider } from './helpers/mouse-move/GhostInteractionOverlayProvider';

import { InteractionOverlayGhoster } from './helpers/mouse-move/InteractionOverlayGhoster';
import { NodeCloner } from './helpers/mouse-move/NodeCloner';

import { GhostInteractionOverlayShifter } from './helpers/mouse-move/GhostInteractionOverlayShifter';

import { GhostInteractionOverlayShiftCalculator } from './helpers/mouse-move/GhostInteractionOverlayShiftCalculator';

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

import { MouseIsCurrentlyDown } from './helpers/conditions/MouseIsCurrentlyDown';

import type { App } from 'App';

import type { Base } from 'Draw/bases/Base';

class DrawingOriginIsAnRNA2DSchemaBuilder {
  buildFor(app: App) {
    let drawingOriginChecker = new DrawingOriginChecker();

    return new DrawingOriginIsAnRNA2DSchema({
      app,
      drawingOriginChecker,
    });
  }
}

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

class ShouldRespondToMouseMoveDeciderBuilder {
  buildFor(app: App) {
    let drawingOriginIsAnRNA2DSchema = (new DrawingOriginIsAnRNA2DSchemaBuilder()).buildFor(app);

    let currentToolIsTheEditingTool = new CurrentToolIsTheEditingTool({ app });

    let mostRecentMouseDownWasOnASelectedBase = (new MostRecentMouseDownWasOnASelectedBaseBuilder()).buildFor(app);

    let mouseIsCurrentlyDown = new MouseIsCurrentlyDown({ window });

    let conditions = new Conditions({
      conditions: [
        drawingOriginIsAnRNA2DSchema,
        currentToolIsTheEditingTool,
        mostRecentMouseDownWasOnASelectedBase,
        mouseIsCurrentlyDown,
      ],
    });

    return new Decider({ conditions });
  }
}

class GhostInteractionOverlayShifterBuilder {
  buildFor(app: App) {
    let interactionOverlayGetter = new InteractionOverlayGetter({ app });

    let nodeCloner = new NodeCloner();

    let interactionOverlayGhoster = new InteractionOverlayGhoster({
      nodeCloner,
    });

    let ghostInteractionOverlayProvider = new GhostInteractionOverlayProvider({
      interactionOverlayGetter,
      interactionOverlayGhoster,
      window,
    });

    return new GhostInteractionOverlayShifter({
      interactionOverlayGetter,
      ghostInteractionOverlayProvider,
    });
  }
}

class GhostInteractionOverlayShiftCalculatorBuilder {
  build() {
    let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

    return new GhostInteractionOverlayShiftCalculator({
      mostRecentMouseDownTracker,
    });
  }
}

class ShouldRespondToMouseUpDeciderBuilder {
  buildFor(app: App) {
    let drawingOriginIsAnRNA2DSchema = (new DrawingOriginIsAnRNA2DSchemaBuilder()).buildFor(app);

    let currentToolIsTheEditingTool = new CurrentToolIsTheEditingTool({ app });

    let mostRecentMouseDownWasOnASelectedBase = (new MostRecentMouseDownWasOnASelectedBaseBuilder()).buildFor(app);

    let mouseHasMovedSinceMostRecentMouseDown = new MouseHasMovedSinceMostRecentMouseDown({ window });

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
    let basesShifterToDecorate = (new BasesShifterToDecorateBuilder()).buildFor(app.strictDrawing.drawing);

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
    let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

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
    let shouldRespondToMouseMoveDecider = (new ShouldRespondToMouseMoveDeciderBuilder()).buildFor(app);

    let ghostInteractionOverlayShifter = (new GhostInteractionOverlayShifterBuilder()).buildFor(app);

    let ghostInteractionOverlayShiftCalculator = (new GhostInteractionOverlayShiftCalculatorBuilder()).build();

    let mouseMoveHandler = new MouseMoveHandler({
      shouldRespondToMouseMoveDecider,
      ghostInteractionOverlayShifter,
      ghostInteractionOverlayShiftCalculator,
    });

    let selectedBasesGetter = (new SelectedBasesGetterBuilder()).buildFor(app);

    let basesShifter = (new BasesShifterBuilder()).buildFor(app);

    let basesShiftCalculator = (new BasesShiftCalculatorBuilder()).buildFor(app);

    let shouldRespondToMouseUpDecider = (new ShouldRespondToMouseUpDeciderBuilder()).buildFor(app);

    let mouseUpHandler = new MouseUpHandler({
      shouldRespondToMouseUpDecider,
      selectedBasesGetter,
      basesShifter,
      basesShiftCalculator,
    });

    return new BasesShiftingTool({
      window,
      mouseMoveHandler,
      mouseUpHandler,
    });
  }
}
