export type Config = {
  /**
   * To be added and removed to the target form's CSS classes list.
   */
  draggableCSSClassName: string;

  targetForm: HTMLElement;
};

/**
 * Adds the provided CSS class name to the target form's CSS classes
 * list when the mouse is directly hovering over the target form
 * (i.e., not hovering over a child node of the form).
 *
 * Removes the provided CSS class name from the target form's CSS
 * classes list when the mouse is not directly hovering over the
 * target form.
 *
 * (The provided CSS class is removed when not hovering directly over
 * the form to prevent inherited styles, such as cursor styles, from
 * affecting user interaction with child nodes of the form.)
 */
export class IsDraggableIndicator {
  constructor(config: Config) {
    config.targetForm.addEventListener('mouseover', event => {
      if (event.target === config.targetForm) {
        config.targetForm.classList.add(config.draggableCSSClassName);
      }
    });

    config.targetForm.addEventListener('mouseout', event => {
      if (event.target === config.targetForm) {
        config.targetForm.classList.remove(config.draggableCSSClassName);
      }
    });
  }
}
