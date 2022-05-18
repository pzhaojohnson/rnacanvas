import type { App } from 'App';
import * as React from 'react';
import styles from './WelcomePage.css';
import { AppIcon } from './AppIcon';
import { CreateNewDrawing } from '../new/CreateNewDrawing';
import { OpenRna2drawer } from '../open/OpenRna2drawer';
import { DrawingSlideshow } from './drawings/DrawingSlideshow';

interface Props {
  app: App;
}

function Header() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} >
      <div style={{ margin: '0px 64px', display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
        <AppIcon />
        <div style={{ width: '14px' }} />
        <p style={{ fontSize: '32px', fontWeight: 600, color: '#232326' }} >RNA2Drawer</p>
        <div style={{ flexGrow: 1 }} ></div>
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <p style={{ fontSize: '12px', fontStyle: 'italic', fontWeight: 600, color: '#85859c', textAlign: 'right' }} >
            Developed by Philip Johnson and Anne Simon
          </p>
          <div style={{ height: '4px' }} />
          <p style={{ fontSize: '12px', fontStyle: 'italic', fontWeight: 600, color: '#85859c', textAlign: 'right' }} >
            Last Updated on Dec. 14, 2021
          </p>
        </div>
      </div>
      <div style={{ marginTop: '8px' }} >
        <div className={styles.underline} />
      </div>
    </div>
  );
}

function Description() {
  return (
    <p style={{ fontSize: '16px', fontWeight: 500, color: '#6a6a81' }} >
      A web app for drawing and exploring nucleic acid structures...
    </p>
  );
}

function NewLink(props: Props) {
  return (
    <p
      className={styles.newAndOpenLinks}
      onClick={() => props.app.formContainer.renderForm(newFormProps => (
        <CreateNewDrawing app={props.app} close={newFormProps.unmount} />
      ))}
    >
      Create a New Drawing
    </p>
  );
}

function OpenLink(props: Props) {
  return (
    <p
      className={styles.newAndOpenLinks}
      onClick={() => props.app.formContainer.renderForm(openFormProps => (
        <OpenRna2drawer app={props.app} close={openFormProps.unmount} />
      ))}
    >
      Open a Saved Drawing
    </p>
  );
}

function EmailLink() {
  return (
    <a
      className={styles.helpLinks}
      href='mailto:help@rna2drawer.app'
    >
      help@rna2drawer.app
    </a>
  );
}

function GitHubPageLink() {
  return (
    <a
      className={styles.helpLinks}
      href='https://github.com/pzhaojohnson/rna2drawer2/blob/main/README.md'
    >
      GitHub page
    </a>
  );
}

function HelpLinks() {
  return (
    <div style={{ minHeight: '28px' }} >
      <p style={{ fontSize: '16px', fontWeight: 500, color: '#6a6a81' }} >
        Want to learn more? Email <EmailLink /> or visit the <GitHubPageLink /> for the user guide.
      </p>
    </div>
  );
}

function UpdatesLink() {
  return (
    <a
      className={styles.updatesLink}
      href='https://github.com/pzhaojohnson/rna2drawer2/releases'
    >
      Latest Updates
    </a>
  );
}

function UpdatesNotice() {
  return (
    <div
      className={styles.updatesNotice}
      style={{
        border: '3px dotted #e1e1ee',
        borderRadius: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ margin: '10px 28px', fontSize: '14px', fontWeight: 500, color: '#77778a' }} >
        See the <UpdatesLink />! <em style={{ color: '#80809b' }} >(Dec. 14, 2021)</em>
      </p>
    </div>
  );
}

function Slideshow() {
  return (
    <div
      className={styles.slideshow}
      style={{
        width: '960px',
        height: '1520px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <DrawingSlideshow style={{ width: '760px' }} />
    </div>
  );
}

export function WelcomePage(props: Props): React.ReactElement {
  return (
    <div style={{ width: '100vw', height: '100%', overflow: 'auto' }} >
      <div style={{ margin: '0px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <div
          className={styles.onTop}
          style={{ marginTop: '128px', width: '960px', display: 'flex', flexDirection: 'column' }}
        >
          <Header />
          <div style={{ margin: '0px 96px', display: 'flex', flexDirection: 'column' }} >
            <div style={{ marginTop: '32px' }} >
              <Description />
            </div>
            <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'row' }} >
              <div style={{ margin: '0px 48px', flexGrow: 1, display: 'flex', flexDirection: 'row' }} >
                <NewLink {...props} />
                <div style={{ width: '32px' }} ></div>
                <OpenLink {...props} />
              </div>
            </div>
            <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
              <HelpLinks />
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
              <UpdatesNotice />
            </div>
          </div>
        </div>
        <div style={{ height: '48px' }} ></div>
        <Slideshow />
      </div>
    </div>
  );
}
