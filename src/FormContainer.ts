import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';
import { TrackedOptionalValue } from 'History/TrackedOptionalValue';

type ScrollPositions = {
  scrollLeft: number;
  scrollTop: number;
};

/**
 * Returns undefined if the element argument is not actually an element.
 */
function scrollPositionsOfElement(
  element: unknown,
): ScrollPositions | undefined
{
  if (!(element instanceof Element)) {
    return undefined;
  } else {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }
}

/**
 * Sets the scroll positions of the element to the provided scroll
 * positions.
 */
function setScrollPositionsOfElement(
  element: Element,
  scrollPositions: ScrollPositions,
) {
  element.scrollLeft = scrollPositions.scrollLeft;
  element.scrollTop = scrollPositions.scrollTop;
}

export type FormProps = {
  unmount: () => void;
  history: FormHistoryInterface;
}

export type FormFactory = (props: FormProps) => React.ReactElement;

export type RenderFormOptions = {
  // may be used to specify when two different form factories
  // produce the same form (i.e., by giving them the same key)
  key?: string;

  /**
   * A callback function to be called after rendering the form.
   */
  callback?: () => void;
}

type RerenderFormOptions = {
  /**
   * A callback function to be called after rerendering the form.
   */
  callback?: () => void;
}

type RenderedForm = {
  formFactory: FormFactory;
  key?: string;
}

function renderedFormsAreEqual(rf1: RenderedForm, rf2: RenderedForm): boolean {
  if (rf1.key != undefined && rf2.key != undefined) {
    return rf1.key == rf2.key;
  } else {
    return rf1.formFactory == rf2.formFactory;
  }
}

// the maximum number of previous forms to remember
// (effectively controls the maximum number of more recent forms to remember)
const maxPreviousStackSize = 100;

export class FormContainer {
  readonly node: HTMLDivElement;

  _renderedForm: TrackedOptionalValue<RenderedForm>;

  readonly history: FormHistoryInterface;

  constructor() {
    this.node = document.createElement('div');
    this.node.style.zIndex = '2';

    this._renderedForm = new TrackedOptionalValue<RenderedForm>({
      areEqual: renderedFormsAreEqual,
      maxPreviousStackSize,
    });

    this.history = {
      goBackward: () => this._goBackward(),
      canGoBackward: () => this._canGoBackward(),
      goForward: () => this._goForward(),
      canGoForward: () => this._canGoForward(),
    };
  }

  appendTo(container: Node) {
    container.appendChild(this.node);
  }

  remove() {
    this.node.remove();
  }

  get activeElement() {
    let activeElement = document.activeElement;
    if (activeElement && this.node.contains(activeElement)) {
      return activeElement;
    } else {
      return null;
    }
  }

  focusElementById(id?: string) {
    if (!id) return; // ignore undefined and empty IDs

    let ele = document.getElementById(id);
    if (ele && this.node.contains(ele)) {
      ele.focus();
    }
  }

  renderForm(formFactory: FormFactory, options?: RenderFormOptions) {
    // seems to be necessary to update the displayed values of input elements
    ReactDOM.unmountComponentAtNode(this.node);

    let props = {
      unmount: () => {
        // do not unmount other forms
        if (formFactory == this._renderedForm.current?.formFactory) {
          this.unmountForm();
        }
      },
      history: this.history,
    };

    // set before rendering so that the form history is
    // up-to-date when rendering
    this._renderedForm.current = { formFactory, key: options?.key };

    ReactDOM.render(formFactory(props), this.node, options?.callback);
  }

  // helps make code for going backward and forward and refreshing simpler
  _rerenderForm(rf: RenderedForm, options?: RerenderFormOptions) {
    let key = rf.key;
    let callback = options?.callback;
    this.renderForm(rf.formFactory, { key, callback });
  }

  unmountForm() {
    ReactDOM.unmountComponentAtNode(this.node);
    this._renderedForm.current = undefined;
  }

  refresh() {
    if (!this._renderedForm.current) {
      // form should already be unmounted but can call just to be safe
      this.unmountForm();
      return;
    }

    // remember scroll positions of form
    let scrollPositions = scrollPositionsOfElement(this.node.firstChild);

    let activeElementId = this.activeElement?.id;

    let callback = () => {
      // restore scroll positions of form
      if (this.node.firstChild instanceof Element && scrollPositions) {
        setScrollPositionsOfElement(this.node.firstChild, scrollPositions);
      }

      this.focusElementById(activeElementId); // refocus
    };

    this._rerenderForm(this._renderedForm.current, { callback });
  }

  _goBackward() {
    if (this._renderedForm.canGoBackward()) {
      this._renderedForm.goBackward();
      if (this._renderedForm.current) {
        this._rerenderForm(this._renderedForm.current);
      }
    }
  }

  _canGoBackward(): boolean {
    return this._renderedForm.canGoBackward();
  }

  _goForward() {
    if (this._renderedForm.canGoForward()) {
      this._renderedForm.goForward();
      if (this._renderedForm.current) {
        this._rerenderForm(this._renderedForm.current);
      }
    }
  }

  _canGoForward(): boolean {
    return this._renderedForm.canGoForward();
  }

  clearHistory() {
    let current = this._renderedForm.current;
    this._renderedForm = new TrackedOptionalValue<RenderedForm>({
      areEqual: renderedFormsAreEqual,
      maxPreviousStackSize,
    });
    this._renderedForm.current = current;
  }
}
