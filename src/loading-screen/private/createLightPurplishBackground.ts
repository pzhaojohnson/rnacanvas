import styles from './LightPurplishBackground.css';

/**
 * Creates a div element with light purplish background color that
 * when appended to the document body covers the entire window.
 */
export function createLightPurplishBackground() {
  let background = document.createElement('div');
  background.className = styles.lightPurplishBackground;
  return background;
}
