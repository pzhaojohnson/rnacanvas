/** @jsx h */

import { h } from 'dom-chef';

import styles from './EditButton.css';

import type { App } from 'App';

import { OpenTheEditingForm } from './OpenTheEditingForm';

export type Props = {
  targetApp: App;
};

export function EditButton(props: Props) {
  let { targetApp } = props;

  let className = styles.editButton;

  let editButton = (
    <button {...{ className }} >
      Edit
    </button>
  );

  let openTheEditingForm = new OpenTheEditingForm({ targetApp });

  editButton.addEventListener('click', () => openTheEditingForm.do());

  let container = (
    <div className={styles.container} >
      {editButton}
      {Tooltip()}
    </div>
  );

  return container;
}

function Tooltip() {
  let text = (
    <p className={styles.tooltipText} >
      Open the Editing form (on the right-side of the app).
    </p>
  );

  let triangle = <div className={styles.tooltipTriangle} />;

  return (
    <div className={styles.tooltip} >
      {text}
      {triangle}
    </div>
  );
}
