import styles from './DOMNodeFactory.css';

export class DOMNodeFactory {
  _closeButton: HTMLElement = document.createElement('div');

  /**
   * Produces the actual DOM node for an unable-to-open error dialog
   * that can be shown when the app fails to open an RNA 2D schema.
   *
   * The returned DOM node will already have CSS styles to position it
   * on the screen and place it on top of all other app content.
   *
   * (To be shown to the user, the returned DOM node would only have
   * to be added to the document body.)
   */
  produce() {
    let domNode = document.createElement('div');
    domNode.className = styles.domNode;

    let text = document.createElement('p');
    text.className = styles.text;

    let sentence1 = document.createElement('span');
    sentence1.textContent = 'Unable to open RNA 2D schema...';
    text.appendChild(sentence1);

    let sentence2 = document.createElement('span');
    sentence2.className = styles.sentence2;
    sentence2.textContent = 'Technical details in the developer console...';
    text.appendChild(sentence2);

    domNode.appendChild(text);

    let closeButtonContainer = document.createElement('div');
    closeButtonContainer.className = styles.closeButtonContainer;
    closeButtonContainer.appendChild(this._closeButton);

    // append last to keep close button on top and clickable
    domNode.appendChild(closeButtonContainer);

    return domNode;
  }

  /**
   * Use to specify the close button element that will be included
   * inside error dialog DOM nodes produced by the factory class
   * instance.
   *
   * (The specified close button element will be included as a child
   * element of produced error dialog DOM nodes.)
   */
  useThisCloseButton(closeButton: HTMLElement) {
    this._closeButton = closeButton;
  }
}
