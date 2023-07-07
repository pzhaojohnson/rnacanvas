import * as React from 'react';
import styles from './AppIcon.css';
import type { App } from 'App';
import { WelcomePage } from 'Forms/welcome/WelcomePage';

import { NewAppTabOpenerBuilder } from 'Utilities/URLs/NewAppTabOpenerBuilder';

let newAppTabOpenerBuilder = new NewAppTabOpenerBuilder();
let newAppTabOpener = newAppTabOpenerBuilder.build();

const svg = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 192 192" style="enable-background:new 0 0 192 192;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:none;stroke:#8781BD;stroke-width:12;stroke-miterlimit:8;}
    .st1{fill:#161138;}
    .st2{fill:#8781BD;}
  </style>
  <line class="st0" x1="16" y1="96" x2="96" y2="96"/>
  <line class="st0" x1="96" y1="96" x2="176" y2="96"/>
  <line class="st0" x1="96" y1="96" x2="96" y2="176"/>
  <line class="st0" x1="96" y1="16" x2="96" y2="96"/>
  <line class="st0" x1="39.4" y1="39.4" x2="96" y2="96"/>
  <line class="st0" x1="152.6" y1="39.4" x2="96" y2="96"/>
  <circle class="st1" cx="16" cy="96" r="16"/>
  <circle class="st1" cx="96" cy="16" r="16"/>
  <circle class="st1" cx="39.4" cy="39.4" r="16"/>
  <circle class="st1" cx="152.6" cy="39.4" r="16"/>
  <circle class="st1" cx="176" cy="96" r="16"/>
  <circle class="st1" cx="96" cy="176" r="16"/>
  <circle class="st2" cx="96" cy="96" r="16"/>
  </svg>
`;

// necessary for unit testing with Jest
if (URL.createObjectURL == undefined) {
  console.error('URL.createObjectURL static method is undefined.');
  Object.defineProperty(URL, 'createObjectURL', { value: () => {} });
  console.error('Placeholder function assigned to URL.createObjectURL.');
}

const url = URL.createObjectURL(
  new Blob([svg], { type: 'image/svg+xml' })
);

export type Props = {
  app: App;
}

export function AppIcon(props: Props) {
  return (
    <img
      className={styles.appIcon}
      src={url}
      alt='Icon'
      onClick={() => {
        if (props.app.strictDrawing.isEmpty()) {
          props.app.formContainer.renderForm(() => (
            <WelcomePage app={props.app} />
          ));
        } else {
          newAppTabOpener.openANewTabOfTheApp();
        }
      }}
    />
  );
}
