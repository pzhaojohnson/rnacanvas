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

import { waitMilliseconds } from 'Time/waitMilliseconds';
import { waitUntil } from 'Time/waitUntil';
import { ElapsedTimeCalculator } from 'Time/ElapsedTimeCalculator';

let timeOnPageCalculator = new ElapsedTimeCalculator();
timeOnPageCalculator.restartCounting();

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

  let welcomePage = () => <WelcomePage app={app} />;

  /**
   * Renders the welcome page and then unmounts the welcome page after
   * a short delay.
   *
   * (Seems to help prevent flashing of unstyled text when showing the
   * welcome page afterwards.)
   */
  let preRenderWelcomePage = async () => {
    app.formContainer.renderForm(welcomePage);

    // wait at least 100 milliseconds
    return waitMilliseconds(100)
      .then(() => waitUntil(() => timeOnPageCalculator.calculate() >= 2500))
      .then(() => app.formContainer.unmountForm());
  };

  let showWelcomePage = async () => {
    return preRenderWelcomePage()
      .then(() => loadingScreen.hideIfBeingShown())
      .then(() => app.formContainer.renderForm(welcomePage));
  };

  waitMilliseconds(25).then(() => app.appendTo(document.body));

  waitMilliseconds(100).then(() => {
    if (urlParameters.rna2DSchemaURL) {
      app.openRNA2DSchema({ url: urlParameters.rna2DSchemaURL })
        .then(() => loadingScreen.hideIfBeingShown())
        .catch(() => showWelcomePage());
    } else {
      showWelcomePage();
    }
  });

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
