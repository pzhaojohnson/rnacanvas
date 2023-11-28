import { ValueHolder } from 'Values/ValueHolder';

import { CallbackCondition } from 'Conditions/CallbackCondition';

import { AllAreTrue } from 'Conditions/AllAreTrue';

import { Tasks } from 'Tasks/Tasks';

import { CallbackTask } from 'Tasks/CallbackTask';

import { ConditionalTask } from 'Tasks/ConditionalTask';

import type { App } from 'App';

import { UserHasADrawingOpen as ADrawingIsOpen } from 'Refresh/UserHasADrawingOpen';

/**
 * Adds pinch-to-zoom functionality to a target app (for zooming in or out of the drawing of the app).
 *
 * (Also allows the user to zoom in or out of the drawing using a mouse scroll wheel while holding the Ctrl key.)
 *
 * Disables all default handling of Ctrl-Wheel events throughout the entire app.
 */
export class PinchToZoomFeature {
  constructor(
    private config: {
      targetApp: App,
      theWindowForTheTargetApp: Window,
    }
  ) {
    let targetApp = new ValueHolder(config.targetApp);

    let theDrawingOfTheApp = new Drawing({ targetApp });

    let drawingUnderlay = new DrawingUnderlay({ targetApp });
    let drawingOverlay = new DrawingOverlay({ targetApp });

    let mostRecentCtrlWheel = new ValueHolder<CtrlWheelLike>(ctrlWheelMock);

    // the time of the most recent Ctrl-Wheel event (in milliseconds)
    let mostRecentCtrlWheelTime = new ValueHolder(Date.now());

    // new attributes for the drawing of the app in response to the most recent Ctrl-Wheel event
    let newDrawingAttributes = new NewDrawingAttributes({
      targetDrawing: theDrawingOfTheApp,
      inResponseTo: mostRecentCtrlWheel,
    });

    // performs the actual operation of updating the drawing zoom
    let actuallyUpdateTheDrawingZoom = new UpdateDrawingAttributes({
      targetDrawing: theDrawingOfTheApp,
      drawingUnderlay, drawingOverlay,
      newAttributes: newDrawingAttributes,
    });

    let needToCleanUpFlag = new ValueHolder(false);

    let needToCleanUp = new CallbackCondition(() => needToCleanUpFlag.get());

    let indicateNeedToCleanUp = new CallbackTask(() => needToCleanUpFlag.set(true));

    let indicateDoNotNeedToCleanUp = new CallbackTask(() => needToCleanUpFlag.set(false));

    // makes zooming in and out feel a lot smoother
    let disableDrawingInteraction = new DisableDrawingInteraction({ targetDrawing: theDrawingOfTheApp });

    let reenableDrawingInteraction = new ReenableDrawingInteraction({ targetDrawing: theDrawingOfTheApp });

    let adjustDrawingZoom = new Tasks([
      disableDrawingInteraction,
      actuallyUpdateTheDrawingZoom,
      indicateNeedToCleanUp,
    ]);

    let aDrawingIsOpen = new ADrawingIsOpen({ targetApp: config.targetApp });

    // don't want to zoom in or out before opening a drawing
    // (otherwise the zoom might be weird when a drawing is opened)
    let adjustDrawingZoomIfADrawingIsOpen = new ConditionalTask(adjustDrawingZoom, aDrawingIsOpen);

    config.theWindowForTheTargetApp.addEventListener('wheel', event => {
      if (event.ctrlKey) {
        // always prevent the default response
        // (completely control the app's response to Ctrl-Wheel events)
        event.preventDefault();

        mostRecentCtrlWheel.set(event);
        mostRecentCtrlWheelTime.set(Date.now());

        adjustDrawingZoomIfADrawingIsOpen.do();
      }
    }, { passive: false });

    let refreshTheApp = new CallbackTask(() => targetApp.get().refresh());

    // things that need to be done after adjusting the drawing zoom
    let cleanUp = new Tasks([
      refreshTheApp,
      reenableDrawingInteraction,
      indicateDoNotNeedToCleanUp,
    ]);

    // wait a little bit before cleaning up after zooming in or out
    // (in milliseconds)
    let cleanUpDelay = new ValueHolder(250);

    let haveWaitedLongEnoughBeforeCleaningUp = new CallbackCondition(
      () => Date.now() - mostRecentCtrlWheelTime.get() > cleanUpDelay.get()
    );

    let shouldCleanUpNow = new AllAreTrue([needToCleanUp, haveWaitedLongEnoughBeforeCleaningUp]);

    setInterval(() => {
      if (shouldCleanUpNow.isTrue()) {
        cleanUp.do();
      }
    }, cleanUpDelay.get());
  }
}

export interface LiveValue<T> {
  get(): T;
}

export interface SVGDoc {
  /**
   * The actual DOM node of the SVG document.
   */
  node: SVGElement;

  /**
   * Gets an attribute by name.
   */
  attr(name: string): unknown;

  /**
   * Sets an attribute by name.
   */
  attr(name: string, value: unknown): void;

  /**
   * Returns the view box of the SVG document.
   */
  viewbox(): {
    width: number;
    height: number;
  };
}

export interface DrawingLike {
  /**
   * The actual DOM node of the drawing.
   */
  node: HTMLElement;

  /**
   * The SVG document of the drawing.
   */
  svg: SVGDoc;
}

export interface HasAnSVGDoc {
  svg: SVGDoc;
}

/**
 * Like a wheel event during which the Ctrl key was held down.
 */
export type CtrlWheelLike = {
  deltaY: number;
};

const ctrlWheelMock: CtrlWheelLike = {
  deltaY: 0,
};

/**
 * The drawing of a target app.
 */
class Drawing {
  constructor(private config: { targetApp: LiveValue<App> }) {}

  get() {
    return this.config.targetApp.get().drawing;
  }
}

/**
 * The drawing underlay of a target app.
 */
class DrawingUnderlay {
  constructor(private config: { targetApp: LiveValue<App> }) {}

  get() {
    return this.config.targetApp.get().drawingInteraction.drawingUnderlay;
  }
}

/**
 * The drawing overlay of a target app.
 */
class DrawingOverlay {
  constructor(private config: { targetApp: LiveValue<App> }) {}

  get() {
    return this.config.targetApp.get().drawingInteraction.drawingOverlay;
  }
}

type DrawingAttributes = {
  svgDocWidth: number;
  svgDocHeight: number;

  scrollLeft: number;
  scrollTop: number;
};

/**
 * New attributes for a target drawing in response to a Ctrl-Wheel event.
 */
class NewDrawingAttributes {
  private newSVGDocDimensions: LiveValue<{ svgDocWidth: number; svgDocHeight: number; }>;

  private newScrollPositions: LiveValue<{ scrollLeft: number; scrollTop: number; }>;

  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
      inResponseTo: LiveValue<CtrlWheelLike>,
    }
  ) {
    let { targetDrawing, inResponseTo } = config;

    this.newSVGDocDimensions = new NewSVGDocDimensions({ targetDrawing, inResponseTo });

    this.newScrollPositions = new NewScrollPositions({ targetDrawing, inResponseTo });
  }

  get(): DrawingAttributes {
    return {
      ...this.newSVGDocDimensions.get(),
      ...this.newScrollPositions.get(),
    };
  }
}

/**
 * New SVG document dimensions for a target drawing in response to a Ctrl-Wheel event.
 */
class NewSVGDocDimensions {
  private newZoomFactor: LiveValue<number>;

  private svgDocViewBox: LiveValue<{ width: number; height: number; }>;

  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
      inResponseTo: LiveValue<CtrlWheelLike>,
    }
  ) {
    let { targetDrawing, inResponseTo } = config;

    this.newZoomFactor = new NewZoomFactor({ targetDrawing, inResponseTo });

    this.svgDocViewBox = new SVGDocViewBox({ targetDrawing });
  }

  get() {
    let newZoomFactor = this.newZoomFactor.get();

    let svgDocViewBox = this.svgDocViewBox.get();

    return {
      svgDocWidth: newZoomFactor * svgDocViewBox.width,
      svgDocHeight: newZoomFactor * svgDocViewBox.height,
    };
  }
}

/**
 * New scroll positions for a target drawing in response to a Ctrl-Wheel event.
 */
class NewScrollPositions {
  private zoomChangeFactor: LiveValue<number>;

  private drawingClientRect: LiveValue<{ width: number; height: number; }>;

  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
      inResponseTo: LiveValue<CtrlWheelLike>,
    }
  ) {
    let { targetDrawing, inResponseTo } = config;

    let currentZoomFactor = new CurrentZoomFactor({ targetDrawing });

    let newZoomFactor = new NewZoomFactor({ targetDrawing, inResponseTo });

    this.zoomChangeFactor = new ChangeFactor({
      currentValue: currentZoomFactor,
      newValue: newZoomFactor,
    });

    this.drawingClientRect = new DrawingClientRect({ targetDrawing });
  }

  get() {
    let zoomChangeFactor = this.zoomChangeFactor.get();

    let drawingClientRect = this.drawingClientRect.get();

    let scrollLeft = this.config.targetDrawing.get().node.scrollLeft;
    let scrollTop = this.config.targetDrawing.get().node.scrollTop;

    let clientHalfWidth = drawingClientRect.width / 2;
    let clientHalfHeight = drawingClientRect.height / 2;

    // want to maintain the center coordinates of the user's view of the drawing
    let scrollCenterX = scrollLeft + clientHalfWidth;
    let scrollCenterY = scrollTop + clientHalfHeight;

    return {
      scrollLeft: (zoomChangeFactor * scrollCenterX) - clientHalfWidth,
      scrollTop: (zoomChangeFactor * scrollCenterY) - clientHalfHeight,
    };
  }
}

/**
 * Assigns new attributes to a target drawing.
 *
 * Also updates SVG document dimensions for the drawing underlay and overlay
 * to match those of the target drawing.
 */
class UpdateDrawingAttributes {
  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
      drawingUnderlay: LiveValue<HasAnSVGDoc>,
      drawingOverlay: LiveValue<HasAnSVGDoc>,
      newAttributes: LiveValue<DrawingAttributes>,
    }
  ) {}

  do(): void {
    let targetDrawing = this.config.targetDrawing.get();

    let drawingUnderlay = this.config.drawingUnderlay.get();
    let drawingOverlay = this.config.drawingOverlay.get();

    let newAttributes = this.config.newAttributes.get();

    // might be safest to explicitly specify pixel units
    // (rather than just assign number values)
    let newSVGDocWidth = newAttributes.svgDocWidth + 'px';
    let newSVGDocHeight = newAttributes.svgDocHeight + 'px';

    targetDrawing.svg.attr('width', newSVGDocWidth);
    targetDrawing.svg.attr('height', newSVGDocHeight);

    drawingUnderlay.svg.attr('width', newSVGDocWidth);
    drawingUnderlay.svg.attr('height', newSVGDocHeight);

    drawingOverlay.svg.attr('width', newSVGDocWidth);
    drawingOverlay.svg.attr('height', newSVGDocHeight);

    targetDrawing.node.scrollLeft = newAttributes.scrollLeft;
    targetDrawing.node.scrollTop = newAttributes.scrollTop;
  }
}

/**
 * What the new zoom factor for a target drawing should be in response to a Ctrl-Wheel event.
 */
class NewZoomFactor {
  private newUnclampedZoomFactor: LiveValue<number>;

  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
      inResponseTo: LiveValue<CtrlWheelLike>,
    }
  ) {
    let { targetDrawing, inResponseTo } = config;

    this.newUnclampedZoomFactor = new NewUnclampedZoomFactor({ targetDrawing, inResponseTo });
  }

  get(): number {
    let newUnclampedZoomFactor = this.newUnclampedZoomFactor.get();

    let minZoomFactor = 1e-2;
    let maxZoomFactor = 500;

    if (!Number.isFinite(newUnclampedZoomFactor)) {
      return 1;
    } else if (newUnclampedZoomFactor < minZoomFactor) {
      return minZoomFactor;
    } else if (newUnclampedZoomFactor > maxZoomFactor) {
      return maxZoomFactor;
    } else {
      return newUnclampedZoomFactor;
    }
  }
}

/**
 * A new unconstrained zoom factor for a target drawing in response to a Ctrl-Wheel event.
 */
class NewUnclampedZoomFactor {
  private currentZoomFactor: LiveValue<number>;

  private unclampedZoomChangeFactor: LiveValue<number>;

  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
      inResponseTo: LiveValue<CtrlWheelLike>,
    }
  ) {
    let { targetDrawing, inResponseTo } = config;

    this.currentZoomFactor = new CurrentZoomFactor({ targetDrawing });

    this.unclampedZoomChangeFactor = new UnclampedZoomChangeFactor({ targetDrawing, inResponseTo });
  }

  get(): number {
    return this.currentZoomFactor.get() * this.unclampedZoomChangeFactor.get();
  }
}

/**
 * The factor by which the zoom factor of a target drawing should change in response to a Ctrl-Wheel event.
 *
 * This value is not constrained in any way (and might be impractically large or small).
 */
class UnclampedZoomChangeFactor {
  private clampedDeltaY: LiveValue<number>;

  private targetDrawingClientRect: LiveValue<{ height: number; }>;

  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
      inResponseTo: LiveValue<CtrlWheelLike>,
    }
  ) {
    let { targetDrawing, inResponseTo } = config;

    let deltaY = new DeltaY({ targetCtrlWheelEvent: inResponseTo });

    this.clampedDeltaY = new ClampedDeltaY({ deltaY });

    this.targetDrawingClientRect = new DrawingClientRect({ targetDrawing });
  }

  get(): number {
    let clampedDeltaY = this.clampedDeltaY.get();

    let drawingClientHeight = this.targetDrawingClientRect.get().height;

    // multiplying by 5 feels good in testing
    return 1 - (5 * clampedDeltaY / drawingClientHeight);
  }
}

/**
 * A constrained delta Y value.
 *
 * (Delta Y values when using a mouse scroll wheel are often too big in magnitude.)
 */
class ClampedDeltaY {
  constructor(
    private config: {
      deltaY: LiveValue<number>,
    }
  ) {}

  get(): number {
    let value = this.config.deltaY.get();

    let minValue = -25;
    let maxValue = 25;

    if (value < minValue) {
      return minValue;
    } else if (value > maxValue) {
      return maxValue;
    } else {
      return value;
    }
  }
}

/**
 * The delta Y value of a target Ctrl-Wheel event.
 */
class DeltaY {
  constructor(
    private config: {
      targetCtrlWheelEvent: LiveValue<CtrlWheelLike>,
    }
  ) {}

  get(): number {
    return this.config.targetCtrlWheelEvent.get().deltaY;
  }
}

/**
 * The current zoom factor of a target drawing.
 *
 * (Technically just calculates the horizontal zoom factor of the target drawing
 * and assumes that it is the same as the vertical zoom factor.)
 */
class CurrentZoomFactor {
  private svgDocClientRect: LiveValue<{ width: number; }>;

  private svgDocViewBox: LiveValue<{ width: number; }>;

  constructor(
    private config: {
      targetDrawing: LiveValue<DrawingLike>,
    }
  ) {
    let { targetDrawing } = config;

    this.svgDocClientRect = new SVGDocClientRect({ targetDrawing });

    this.svgDocViewBox = new SVGDocViewBox({ targetDrawing });
  }

  get(): number {
    return this.svgDocClientRect.get().width / this.svgDocViewBox.get().width;
  }
}

class ChangeFactor {
  constructor(
    private config: {
      currentValue: LiveValue<number>,
      newValue: LiveValue<number>,
    }
  ) {}

  get(): number {
    return this.config.newValue.get() / this.config.currentValue.get();
  }
}

/**
 * The bounding client rect of the SVG document of a target drawing.
 */
class SVGDocClientRect {
  constructor(private config: { targetDrawing: LiveValue<DrawingLike> }) {}

  get() {
    return this.config.targetDrawing.get().svg.node.getBoundingClientRect();
  }
}

/**
 * The view box of the SVG document of a target drawing.
 */
class SVGDocViewBox {
  constructor(private config: { targetDrawing: LiveValue<DrawingLike> }) {}

  get() {
    return this.config.targetDrawing.get().svg.viewbox();
  }
}

/**
 * The bounding client rect of a target drawing.
 *
 * (Not to be confused with the bounding client rect of the SVG document of a target drawing.)
 */
class DrawingClientRect {
  constructor(private config: { targetDrawing: LiveValue<DrawingLike> }) {}

  get() {
    return this.config.targetDrawing.get().node.getBoundingClientRect();
  }
}

class DisableDrawingInteraction {
  constructor(private config: { targetDrawing: LiveValue<DrawingLike> }) {}

  do(): void {
    this.config.targetDrawing.get().node.style.pointerEvents = 'none';
  }
}

class ReenableDrawingInteraction {
  constructor(private config: { targetDrawing: LiveValue<DrawingLike> }) {}

  do(): void {
    this.config.targetDrawing.get().node.style.pointerEvents = 'auto';
  }
}
