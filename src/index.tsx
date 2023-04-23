import './global.css';

import { LoadingScreen } from './loading-screen/LoadingScreen';

import { App } from 'App';

import * as React from 'react';

import { WelcomePage } from 'Forms/welcome/WelcomePage';

import { userIsTyping } from 'Utilities/userIsTyping';

let loadingScreen = new LoadingScreen();
loadingScreen.show();

setTimeout(() => {
  let app = new App();

  setTimeout(() => {
    app.appendTo(document.body);
  }, 25);

  // seems to help prevent flash of unstyled text (FOUT)
  // (prerenders the welcome page under the loading screen)
  setTimeout(() => {
    app.formContainer.renderForm(() => <WelcomePage app={app} />);
  }, 50);

  // page will probably be fully loaded after 2.5 seconds
  setTimeout(() => {
    // hide prerendered welcome page
    app.formContainer.unmountForm();

    // wait a little bit
    // (to make sure prerendered welcome page has been hidden)
    setTimeout(() => {
      loadingScreen.hide().then(() => {
        app.formContainer.renderForm(() => <WelcomePage app={app} />);
      });
    }, 25);
  }, 2500);

  // disable drag and drop
  document.body.ondragstart = () => false;
  document.body.ondrop = () => false;

  // prevent text selection after double-click
  // when the user is not typing
  document.addEventListener('mousedown', event => {
    // cannot simply listen for the dblclick event since text selection
    // seems to happen before dblclick events are dispatched
    if (event.detail > 1 && !userIsTyping()) {
      event.preventDefault();
    }
  }, false);

  // ask for confirmation before leaving if the drawing is nonempty
  // and the app setting is set to do so
  window.addEventListener('beforeunload', event => {
    if (app.drawing.isEmpty()) {
      return;
    }

    let askBeforeLeaving = app.settings.askBeforeLeaving;
    if (askBeforeLeaving != undefined && !askBeforeLeaving) {
      // only if explicitly set to false
      return;
    }

    let message = 'Are you sure?';
    (event || window.event).returnValue = message;
    return message;
  });
}, 50);
