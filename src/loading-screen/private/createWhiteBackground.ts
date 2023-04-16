import styles from './WhiteBackground.css';

/**
 * Creates a div element with white background color that when appended
 * to the document body covers the entire window.
 */
export function createWhiteBackground() {
  let whiteBackground = document.createElement('div');
  whiteBackground.className = styles.whiteBackground;
  return whiteBackground;
}
