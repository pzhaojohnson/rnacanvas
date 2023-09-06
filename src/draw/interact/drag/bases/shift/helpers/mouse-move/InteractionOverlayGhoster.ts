export type InteractionOverlay = HTMLElement | SVGElement;

export interface NodeCloner {
  deepClone<T extends Node>(node: T): T;
}

export type InteractionOverlayGhosterCtorParams = {
  /**
   * To be used to deep clone interaction overlays.
   */
  nodeCloner: NodeCloner;
};

export class InteractionOverlayGhoster {
  _nodeCloner: NodeCloner;

  constructor(args: InteractionOverlayGhosterCtorParams) {
    this._nodeCloner = args.nodeCloner;
  }

  /**
   * Creates a ghost deep copy version of an interaction overlay
   * with 50% opacity and that will be inserted into the document
   * immediately after the interaction overlay as its sibling.
   *
   * The created ghost interaction overlay will have fixed
   * positioning and will be positioned directly on top of the
   * interaction overlay.
   *
   * The ghost interaction overlay is meant to be shifted around
   * according to mouse movement when the user is dragging bases
   * with the mouse.
   */
  ghost(interactionOverlay: InteractionOverlay): InteractionOverlay {
    let ghost = this._nodeCloner.deepClone(interactionOverlay);

    ghost.style.opacity = '0.5';
    ghost.style.pointerEvents = 'none';

    ghost.style.position = 'fixed';

    let boundingClientRect = interactionOverlay.getBoundingClientRect();
    ghost.style.left = boundingClientRect.x + 'px';
    ghost.style.top = boundingClientRect.y + 'px';

    interactionOverlay.after(ghost);

    return ghost;
  }
}
