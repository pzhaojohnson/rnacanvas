import './global.css';

import { LoadingScreen } from './loading-screen/LoadingScreen';

import { App } from 'App';

import { BasesShiftingToolBuilder } from 'Draw/interact/drag/bases/shift/BasesShiftingToolBuilder';

import { DragOverToSelectBasesToolBuilder } from 'Draw/interact/drag/bases/select/DragOverToSelectBasesToolBuilder';

import * as React from 'react';

import { WelcomePage } from 'Forms/welcome/WelcomePage';

import { OnOpenRNA2DInfoDialogBuilder } from 'Foreign/RNA2D/user-help/on-open/OnOpenRNA2DInfoDialogBuilder';
import { RNA2DOpenErrorDialogBuilder } from 'Foreign/RNA2D/errors/unable-to-open/RNA2DOpenErrorDialogBuilder';

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

let onOpenRNA2DInfoDialogBuilder = new OnOpenRNA2DInfoDialogBuilder();
let onOpenRNA2DInfoDialog = onOpenRNA2DInfoDialogBuilder.build();

let rna2DOpenErrorDialogBuilder = new RNA2DOpenErrorDialogBuilder();
let rna2DOpenErrorDialog = rna2DOpenErrorDialogBuilder.build();

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
      .then(() => waitUntil(() => timeOnPageCalculator.calculate() >= 3500))
      .then(() => app.formContainer.unmountForm());
  };

  let showWelcomePage = async () => {
    return preRenderWelcomePage()
      .then(() => loadingScreen.hideIfBeingShown())
      .then(() => app.formContainer.renderForm(welcomePage));
  };

  let showWelcomePageWithRNA2DOpenErrorDialog = async () => {
    showWelcomePage()
      .then(() => rna2DOpenErrorDialog.show())
  };

  waitMilliseconds(25).then(() => app.appendTo(document.body));

  /**
   * After opening an RNA 2D schema, wait a little bit to allow all
   * resources like images and fonts to load.
   *
   * (Helps prevent flash of unstyled text, for instance.)
   */
  waitMilliseconds(100).then(() => {
    if (urlParameters.rna2DSchemaURL) {
      app.openRNA2DSchema({ url: urlParameters.rna2DSchemaURL })
        .then(() => waitUntil(() => timeOnPageCalculator.calculate() >= 3500))
        .then(() => loadingScreen.hideIfBeingShown())
        .then(() => onOpenRNA2DInfoDialog.show())
        .catch(() => showWelcomePageWithRNA2DOpenErrorDialog());
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

  waitMilliseconds(500).then(() => {
    let basesShiftingTool = (new BasesShiftingToolBuilder()).buildFor(app);
  });

  waitMilliseconds(500).then(() => {
    let dragOverToSelectBasesTool = (new DragOverToSelectBasesToolBuilder()).buildFor(app);
  });
}, 50);

/**
 * Reset document body background color to white as the loading
 * screen is being hidden.
 *
 * (Some browsers like Safari will color the browser UI based on the
 * document body background color.)
 *
 * Timings are meant to be in sync with the loading screen and its
 * fade out animation.
 */
waitMilliseconds(3500).then(() => {
  document.body.style.transition = 'background-color 0.5s';
  document.body.style.backgroundColor = 'white';
});
