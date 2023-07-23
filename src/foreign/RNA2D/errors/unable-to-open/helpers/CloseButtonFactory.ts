import styles from './CloseButton.css';

export class CloseButtonFactory {
  /**
   * Returns a close button that can be used in an unable-to-open RNA
   * 2D schema error dialog.
   */
  produce() {
    let closeButton = document.createElement('div');
    closeButton.className = styles.closeButton;

    let x = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    x.setAttribute('viewBox', '0 0 11 11');
    x.setAttribute('width', '11px');
    x.setAttribute('height', '11px');
    closeButton.appendChild(x);

    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 0.5 0.5 L 10.5 10.5 M 10.5 0.5 L 0.5 10.5');
    path.setAttribute('stroke', '#9f0d0d');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('stroke-linecap', 'round');
    x.appendChild(path);

    return closeButton;
  }
}
