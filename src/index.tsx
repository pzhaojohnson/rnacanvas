import './global.css';

import { LoadingScreen } from './loading-screen/LoadingScreen';

import { App } from 'App';

import * as React from 'react';

import { WelcomePage } from 'Forms/welcome/WelcomePage';

import { DragAndDropDisabler } from 'Utilities/DragAndDropDisabler';

import { userIsTyping } from 'Utilities/userIsTyping';

import { BeforeLeavingHandler } from './before-leaving/BeforeLeavingHandler';
import { ShouldAskBeforeLeavingIndicator } from './before-leaving/ShouldAskBeforeLeavingIndicator';
import { NonEmptyDrawingIndicator } from './before-leaving/NonEmptyDrawingIndicator';
import { AskBeforeLeavingSettingIsToggledIndicator } from './before-leaving/AskBeforeLeavingSettingIsToggledIndicator';

let loadingScreen = new LoadingScreen();
loadingScreen.show();

type URLParameters = {
  rna2DSchemaURL: string | null;
};

let urlParameters: URLParameters = {
  rna2DSchemaURL: null,
};

/**
 * Enclose in a timeout just in case trying to parse URL parameters
 * throws.
 */
setTimeout(() => {
  urlParameters.rna2DSchemaURL = (new URL(window.location.href))
    .searchParams
    .get('rna_2d_schema_url');
}, 25);

setTimeout(() => {
  let app = new App();

  let showWelcomePage = () => {
    app.formContainer.renderForm(() => <WelcomePage app={app} />);
  };

  /**
   * Assumes that the loading screen is on top and hides everything
   * else.
   */
  let prerenderWelcomePageUnderLoadingScreen = () => {
    app.formContainer.renderForm(() => <WelcomePage app={app} />);
  };

  /**
   * Assumes that it is the prerendered welcome page that is currently
   * rendered in the form container of the app.
   */
  let unmountPrerenderedWelcomePage = () => {
    app.formContainer.unmountForm();
  };

  let showFirstContent = () => {
    showWelcomePage();
  };

  setTimeout(() => {
    app.appendTo(document.body);
  }, 25);

  /**
   * Seems to help prevent any flashing of unstyled text.
   */
  setTimeout(() => {
    prerenderWelcomePageUnderLoadingScreen();
  }, 50);

  /**
   * Page will probably be fully loaded after 2.75 seconds.
   */
  setTimeout(() => {
    unmountPrerenderedWelcomePage();

    /**
     * Wait a little bit to make sure that the prerendered welcome page
     * has been hidden.
     */
    setTimeout(() => {
      loadingScreen.hide()
        .then(() => showFirstContent());
    }, 25);
  }, 2750);

  /**
   * Disable drag and drop throughout the app.
   *
   * This is meant to prevent the default web browser drag and drop
   * behavior when elements in the drawing of the app are being
   * dragged around.
   */
  setTimeout(() => {
    let dragAndDropDisabler = new DragAndDropDisabler();
    dragAndDropDisabler.applyTo(document.body);
  }, 25);

  // prevent text selection after double-click
  // when the user is not typing
  document.addEventListener('mousedown', event => {
    // cannot simply listen for the dblclick event since text selection
    // seems to happen before dblclick events are dispatched
    if (event.detail > 1 && !userIsTyping()) {
      event.preventDefault();
    }
  }, false);

  setTimeout(() => {
    let beforeLeavingHandler = new BeforeLeavingHandler({
      shouldAskBeforeLeaving: new ShouldAskBeforeLeavingIndicator({
        requirementsIndicators: [
          new NonEmptyDrawingIndicator({ app }),
          new AskBeforeLeavingSettingIsToggledIndicator({ app }),
        ],
      }),
      warningMessage: 'Are you sure?',
    });

    window.addEventListener('beforeunload', event => {
      beforeLeavingHandler.handle(event);
    });
  }, 25);
}, 50);
