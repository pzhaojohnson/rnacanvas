import type { App } from 'App';

import * as React from 'react';
import styles from './WelcomePage.css';

import { LatestUpdatesNotice } from './helpers/LatestUpdatesNotice';

import { Header } from './Header';
import { DrawingSlideshow } from './drawings/DrawingSlideshow';

import { CreateNewDrawingForm } from 'Forms/new/CreateNewDrawingForm';
import { OpenDrawingForm } from 'Forms/open/OpenDrawingForm';

import { PreviousVersionsForm } from 'Forms/previous-versions/PreviousVersionsForm';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;
}

function AppDescription() {
  return (
    <p className={styles.appDescription} >
      A web app for drawing and exploring nucleic acid structures...
    </p>
  );
}

function NewButton(props: Props) {
  return (
    <p
      className={styles.newAndOpenButtons}
      onClick={() => props.app.formContainer.renderForm(formProps => (
        <CreateNewDrawingForm app={props.app} close={formProps.unmount} />
      ))}
    >
      Create a New Drawing
    </p>
  );
}

function OpenButton(props: Props) {
  return (
    <p
      className={styles.newAndOpenButtons}
      onClick={() => props.app.formContainer.renderForm(formProps => (
        <OpenDrawingForm app={props.app} close={formProps.unmount} />
      ))}
    >
      Open a Saved Drawing
    </p>
  );
}

function ContactEmailLink() {
  return (
    <a
      className={styles.moreInfoLinks}
      href='mailto:contact@rnacanvas.app'
    >
      contact@rnacanvas.app
    </a>
  );
}

function GitHubLink() {
  return (
    <a
      className={styles.moreInfoLinks}
      href='https://github.com/pzhaojohnson/rnacanvas/blob/main/README.md'
      target='_blank'
      rel='noreferrer noopener'
    >
      GitHub page
    </a>
  );
}

function MoreInfo() {
  let contactEmailLink = <ContactEmailLink />;
  let gitHubLink = <GitHubLink />;
  return (
    <p className={styles.moreInfo} >
      Want to learn more? Email {contactEmailLink} or visit the {gitHubLink}.
    </p>
  );
}

function LinkToPreviousVersionsFormArrow() {
  let head = (
    <path
      className={styles.linkToPreviousVersionsFormArrowHead}
      d="M 8.75 0.75 L 13.25 0.75 L 13.25 5.75"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
  );

  let shaft = (
    <line
      className={styles.linkToPreviousVersionsFormArrowShaft}
      x1="6.75" y1="7.25" x2="13.25" y2="0.75"
      strokeWidth="1.5" strokeLinecap="round"
    />
  );

  return (
    <svg className={styles.linkToPreviousVersionsFormArrow} viewBox="0 0 14 12" >
      {head}
      {shaft}
    </svg>
  );
}

function LinkToPreviousVersionsForm(props: Props) {
  let { app } = props;

  let text = (
    <p className={styles.linkToPreviousVersionsFormText} >
      To use a previous version of the app
    </p>
  );

  let className = styles.linkToPreviousVersionsForm;

  let goBack = () => {
    app.formContainer.renderForm(
      () => <WelcomePage {...{ app }} />
    );
  };

  let onClick = () => {
    app.formContainer.renderForm(
      () => <PreviousVersionsForm {...{ goBack }} />
    );
  };

  return (
    <div {...{ className, onClick }} >
      {text}
      <LinkToPreviousVersionsFormArrow />
    </div>
  );
}

export function WelcomePage(props: Props) {
  return (
    <div style={{ width: '100vw', height: '100%', overflow: 'auto', position: 'relative' }} >
      <LatestUpdatesNotice />
      <LinkToPreviousVersionsForm {...props} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <div className={styles.topSection} >
          <Header />
          <div style={{ margin: '0px 95px', display: 'flex', flexDirection: 'column' }} >
            <AppDescription />
            <div style={{ margin: '61px 35px 0', display: 'flex', flexDirection: 'row' }} >
              <NewButton {...props} />
              <div style={{ width: '45px' }} />
              <OpenButton {...props} />
            </div>
            <MoreInfo />
          </div>
        </div>
        <DrawingSlideshow />
      </div>
    </div>
  );
}
