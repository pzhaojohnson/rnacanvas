import styles from './RNAcanvasReferencesDialog.css';

import appIconSrc from './appIconSrc.svg';

class HeaderFactory {
  produce() {
    let appIcon = document.createElement('img');
    appIcon.classList.add(styles.appIcon);
    appIcon.src = appIconSrc;

    let headerText = document.createElement('p');
    headerText.classList.add(styles.headerText);
    headerText.textContent = 'Cite';

    let header = document.createElement('div');
    header.classList.add(styles.header);
    header.appendChild(appIcon);
    header.appendChild(headerText);
    return header;
  }
}

class RNAcanvasJournalLineFactory {
  produce() {
    let leadingText = document.createElement('span');
    leadingText.textContent = 'Article in ';

    let journalName = document.createElement('span');
    journalName.classList.add(styles.journalName);
    journalName.textContent = 'Nucleic Acids Research';

    let line = document.createElement('p');
    line.classList.add(styles.mainText);
    line.classList.add(styles.rnaCanvasJournalLine);
    line.appendChild(leadingText);
    line.appendChild(journalName);
    return line;
  }
}

class RNAcanvasDOILineFactory {
  produce() {
    let doiLabel = document.createElement('span');
    doiLabel.classList.add(styles.doiLabel);
    doiLabel.textContent = 'DOI: ';

    let doiLink = document.createElement('a');
    doiLink.classList.add(styles.referenceLink);
    doiLink.href = 'https://doi.org/10.1093/nar/gkad302';
    doiLink.textContent = '10.1093/nar/gkad302';
    doiLink.target = '_blank';
    doiLink.rel = 'noreferrer noopener';

    let line = document.createElement('p');
    line.classList.add(styles.mainText);
    line.classList.add(styles.rnaCanvasDOILine);
    line.appendChild(doiLabel);
    line.appendChild(doiLink);
    return line;
  }
}

class ExplanatoryTextFactory {
  produce() {
    let firstLine = document.createElement('p');
    firstLine.classList.add(styles.mainText);
    firstLine.textContent = 'Citations are greatly appreciated!';

    let secondLine = document.createElement('p');
    secondLine.classList.add(styles.mainText);
    secondLine.textContent = '(If you use RNAcanvas to draw structures in publications.)';

    let explanatoryText = document.createElement('div');
    explanatoryText.classList.add(styles.explanatoryText);
    explanatoryText.appendChild(firstLine);
    explanatoryText.appendChild(secondLine);
    return explanatoryText;
  }
}

class R2DTIntroLineFactory {
  produce() {
    let leadingText = document.createElement('span');
    leadingText.textContent = 'Also cite ';

    let r2dtName = document.createElement('span');
    r2dtName.classList.add(styles.r2dtName);
    r2dtName.textContent = 'R2DT';

    let trailingText = document.createElement('span');
    trailingText.textContent = ' if you used it too!';

    let line = document.createElement('p');
    line.classList.add(styles.mainText);
    line.classList.add(styles.r2dtIntroLine);
    line.appendChild(leadingText);
    line.appendChild(r2dtName);
    line.appendChild(trailingText);
    return line;
  }
}

class R2DTJournalLineFactory {
  produce() {
    let leadingText = document.createElement('span');
    leadingText.textContent = 'Article in ';

    let journalName = document.createElement('span');
    journalName.classList.add(styles.journalName);
    journalName.textContent = 'Nature Communications';

    let line = document.createElement('p');
    line.classList.add(styles.mainText);
    line.classList.add(styles.r2dtJournalLine);
    line.appendChild(leadingText);
    line.appendChild(journalName);
    return line;
  }
}

class R2DTDOILineFactory {
  produce() {
    let doiLabel = document.createElement('span');
    doiLabel.classList.add(styles.doiLabel);
    doiLabel.textContent = 'DOI: ';

    let doiLink = document.createElement('a');
    doiLink.classList.add(styles.referenceLink);
    doiLink.href = 'https://doi.org/10.1038/s41467-021-23555-5';
    doiLink.textContent = '10.1038/s41467-021-23555-5';
    doiLink.target = '_blank';
    doiLink.rel = 'noreferrer noopener';

    let line = document.createElement('p');
    line.classList.add(styles.mainText);
    line.classList.add(styles.r2dtDOILine);
    line.appendChild(doiLabel);
    line.appendChild(doiLink);
    return line;
  }
}

class R2DTWebServerLineFactory {
  produce() {
    let webServerLabel = document.createElement('span');
    webServerLabel.classList.add(styles.r2dtWebServerLabel);
    webServerLabel.textContent = 'Web Server: ';

    let webServerLink = document.createElement('a');
    webServerLink.classList.add(styles.referenceLink);
    webServerLink.href = 'https://rnacentral.org/r2dt';
    webServerLink.textContent = 'rnacentral.org/r2dt';
    webServerLink.target = '_blank';
    webServerLink.rel = 'noreferrer noopener';

    let line = document.createElement('p');
    line.classList.add(styles.mainText);
    line.classList.add(styles.r2dtWebServerLine);
    line.appendChild(webServerLabel);
    line.appendChild(webServerLink);
    return line;
  }
}

class MainContentFactory {
  produce() {
    let componentFactories = [
      new RNAcanvasJournalLineFactory(),
      new RNAcanvasDOILineFactory(),
      new ExplanatoryTextFactory(),
      new R2DTIntroLineFactory(),
      new R2DTJournalLineFactory(),
      new R2DTDOILineFactory(),
      new R2DTWebServerLineFactory(),
    ];

    let components = componentFactories.map(factory => factory.produce());

    let mainContent = document.createElement('div');
    mainContent.classList.add(styles.mainContent);
    components.forEach(c => mainContent.appendChild(c));
    return mainContent;
  }
}

export type ConstructorArgs = {
  /**
   * A close button that will be included inside produced dialog
   * elements.
   */
  closeButton: HTMLElement;
};

export class RNAcanvasReferencesDialogFactory {
  _closeButton: HTMLElement;

  constructor(args: ConstructorArgs) {
    let { closeButton } = args;

    this._closeButton = closeButton;
  }

  /**
   * Produces a dialog-like element containing references to the
   * RNAcanvas publication and related publications (such as for
   * R2DT).
   *
   * The produced element will already have CSS styles to position
   * it on the screen in an absolute manner and on top of everything
   * else.
   */
  produce(): HTMLElement {
    let headerFactory = new HeaderFactory();
    let header = headerFactory.produce();

    let mainContentFactory = new MainContentFactory();
    let mainContent = mainContentFactory.produce();

    let closeButtonContainer = document.createElement('div');
    closeButtonContainer.classList.add(styles.closeButtonContainer);
    closeButtonContainer.appendChild(this._closeButton);

    let dialog = document.createElement('div');
    dialog.classList.add(styles.rnaCanvasReferencesDialog);

    dialog.appendChild(header);
    dialog.appendChild(mainContent);

    // append last to keep close button on top and clickable
    dialog.appendChild(closeButtonContainer);

    return dialog;
  }
}
