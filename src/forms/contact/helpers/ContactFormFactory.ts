import styles from './ContactForm.css';

import appIconSrc from './appIconSrc.svg';

function createHeader() {
  let appIcon = document.createElement('img');
  appIcon.classList.add(styles.appIcon);
  appIcon.src = appIconSrc;

  let contactText = document.createElement('p');
  contactText.classList.add(styles.headerContactText);
  contactText.textContent = 'Contact';

  let header = document.createElement('div');
  header.classList.add(styles.header);
  header.appendChild(appIcon);
  header.appendChild(contactText);
  return header;
}

function createContactEmailLine() {
  let label = document.createElement('span');
  label.classList.add(styles.linkLabel);
  label.textContent = 'Email: ';

  let contactEmailLink = document.createElement('a');
  contactEmailLink.classList.add(styles.link);
  contactEmailLink.href = 'mailto:contact@rnacanvas.app';
  contactEmailLink.textContent = 'contact@rnacanvas.app';

  let contactEmailLine = document.createElement('p');
  contactEmailLine.classList.add(styles.mainText);
  contactEmailLine.appendChild(label);
  contactEmailLine.appendChild(contactEmailLink);
  return contactEmailLine;
}

/**
 * Returns a dotted line with the provided text content.
 */
function createDottedLine(textContent: string) {
  let dot = document.createElement('div');
  dot.classList.add(styles.dot);

  let text = document.createElement('p');
  text.classList.add(styles.mainText);
  text.classList.add(styles.dottedLineText);
  text.textContent = textContent;

  let dottedLine = document.createElement('div');
  dottedLine.classList.add(styles.dottedLine);
  dottedLine.appendChild(dot);
  dottedLine.appendChild(text);
  return dottedLine;
}

let possibleSubjects = [
  'Questions about how to use RNAcanvas',
  'Feature requests',
  'Technical issues encountered',
  'Questions about how RNAcanvas works',
];

function createPossibleSubjectsSection() {
  let leadingText = document.createElement('p');
  leadingText.classList.add(styles.mainText);
  leadingText.textContent = 'Feel free to email any...';

  let possibleSubjectsList = document.createElement('div');
  possibleSubjectsList.classList.add(styles.possibleSubjectsList);

  possibleSubjects.forEach(possibleSubject => {
    let dottedLine = createDottedLine(possibleSubject);
    possibleSubjectsList.appendChild(dottedLine);
  });

  let trailingText = document.createElement('p');
  trailingText.classList.add(styles.mainText);
  trailingText.classList.add(styles.possibleSubjectsSectionTrailingText);
  trailingText.textContent = '...and anything else related to RNAcanvas';

  let possibleSubjectsSection = document.createElement('div');
  possibleSubjectsSection.classList.add(styles.possibleSubjetsSection);
  possibleSubjectsSection.appendChild(leadingText);
  possibleSubjectsSection.appendChild(possibleSubjectsList);
  possibleSubjectsSection.appendChild(trailingText);
  return possibleSubjectsSection;
}

function createGitHubIssuesLine() {
  let leadingText = document.createElement('span');
  leadingText.textContent = 'Issues can also be raised on the ';

  let gitHubPageLink = document.createElement('a');
  gitHubPageLink.classList.add(styles.link);
  gitHubPageLink.href = 'https://github.com/pzhaojohnson/rnacanvas/blob/main/README.md';
  gitHubPageLink.target = '_blank';
  gitHubPageLink.rel = 'noreferrer noopener';
  gitHubPageLink.textContent = 'GitHub page';

  let gitHubIssuesLine = document.createElement('p');
  gitHubIssuesLine.classList.add(styles.mainText);
  gitHubIssuesLine.classList.add(styles.gitHubIssuesLine);
  gitHubIssuesLine.appendChild(leadingText);
  gitHubIssuesLine.appendChild(gitHubPageLink);
  return gitHubIssuesLine;
}

function createR2DTContactEmailLine() {
  let label = document.createElement('span');
  label.classList.add(styles.linkLabel);
  label.textContent = 'Email: ';

  let r2dtContactEmailLink = document.createElement('a');
  r2dtContactEmailLink.classList.add(styles.link);

  // TBD
  //r2dtContactEmailLink.href = 'mailto:';
  //r2dtContactEmailLink.textContent = '';

  let r2dtContactEmailLine = document.createElement('p');
  r2dtContactEmailLine.classList.add(styles.mainText);
  r2dtContactEmailLine.classList.add(styles.r2dtContactEmailLine);
  r2dtContactEmailLine.appendChild(label);
  r2dtContactEmailLine.appendChild(r2dtContactEmailLink);
  return r2dtContactEmailLine;
}

function createR2DTGitHubPageLine() {
  let label = document.createElement('span');
  label.classList.add(styles.linkLabel);
  label.textContent = 'GitHub page: ';

  let r2dtGitHubPageLink = document.createElement('a');
  r2dtGitHubPageLink.classList.add(styles.link);
  r2dtGitHubPageLink.href = 'https://github.com/rnacentral/R2DT';
  r2dtGitHubPageLink.target = '_blank';
  r2dtGitHubPageLink.rel = 'noreferrer noopener';
  r2dtGitHubPageLink.textContent = 'https://github.com/rnacentral/R2DT';

  let r2dtGitHubPageLine = document.createElement('p');
  r2dtGitHubPageLine.classList.add(styles.r2dtGitHubPageLine);
  r2dtGitHubPageLine.appendChild(label);
  r2dtGitHubPageLine.appendChild(r2dtGitHubPageLink);
  return r2dtGitHubPageLine;
}

function createR2DTSection() {
  let leadingText = document.createElement('p');
  leadingText.classList.add(styles.mainText);
  leadingText.textContent = 'For questions specific to R2DT...';

  let r2dtContactEmailLine = createR2DTContactEmailLine();

  let r2dtGitHubPageLine = createR2DTGitHubPageLine();

  let r2dtContactSection = document.createElement('div');
  r2dtContactSection.classList.add(styles.r2dtSection);
  r2dtContactSection.appendChild(leadingText);
  r2dtContactSection.appendChild(r2dtContactEmailLine);
  r2dtContactSection.appendChild(r2dtGitHubPageLine);
  return r2dtContactSection;
}

/**
 * Creates the main content of a contact form.
 */
function createMainContent() {
  let contactEmailLine = createContactEmailLine();

  let possibleSubjectsSection = createPossibleSubjectsSection();

  let gitHubIssuesLine = createGitHubIssuesLine();

  let mainContent = document.createElement('div');
  mainContent.classList.add(styles.mainContent);
  mainContent.appendChild(contactEmailLine);
  mainContent.appendChild(possibleSubjectsSection);
  mainContent.appendChild(gitHubIssuesLine);
  return mainContent;
}

function createCloseButtonContainer() {
  let closeButtonContainer = document.createElement('div');
  closeButtonContainer.classList.add(styles.closeButtonContainer);
  return closeButtonContainer;
}

export type Config = {
  /**
   * The close button to be included in produced contact forms.
   *
   * The close button will be positioned within the contact form by
   * being placed inside of a positioned container element.
   */
  closeButton: HTMLElement;
};

export class ContactFormFactory {
  _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  /**
   * Returns a contact form DOM node that already has CSS styles to
   * position it on screen in an absolute manner and on top of
   * everything else when added to the document body.
   */
  producePositioned(): HTMLElement {
    let header = createHeader();

    let mainContent = createMainContent();

    let closeButtonContainer = createCloseButtonContainer();
    closeButtonContainer.appendChild(this._config.closeButton);

    let contactForm = document.createElement('div');
    contactForm.classList.add(styles.positionedContactForm);

    contactForm.appendChild(header);
    contactForm.appendChild(mainContent);

    // append last
    // (to make sure the close button is on top and clickable)
    contactForm.appendChild(closeButtonContainer);

    return contactForm;
  }
}
