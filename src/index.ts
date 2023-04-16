import './global.css';

import { LoadingScreen } from './loading-screen/LoadingScreen';

import { App } from 'App';
import { userIsTyping } from 'Utilities/userIsTyping';

let loadingScreen = new LoadingScreen();
loadingScreen.show();

let app = new App();

loadingScreen.hideOncePageHasFullyLoaded().then(() => {
  app.appendTo(document.body);
});

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
