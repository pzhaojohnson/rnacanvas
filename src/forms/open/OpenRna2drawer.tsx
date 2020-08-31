import * as React from 'react';
import { useState } from 'react';
import { AppInterface as App } from '../../AppInterface';
import { UnclosableFlexContainer } from '../containers/UnclosableFlexContainer';
import { FileInput } from '../fields/FileInput';
import { ErrorMessage } from '../ErrorMessage';
import { ActionButton } from '../buttons/ActionButton';
import { open } from './open';

interface Props {
  app: App;
  close: () => void;
}

export function OpenRna2drawer(props: Props): React.ReactElement {
  let [attemptedFileUpload, setAttemptedFileUpload] = useState(false);
  let [fileExtension, setFileExtension] = useState('');
  let [fileContents, setFileContents] = useState('');
  let [fileUploaded, setFileUploaded] = useState(false);
  let [errorMessage, setErrorMessage] = useState<string[]>([]);
  return (
    <UnclosableFlexContainer
      title={'Open an RNA2Drawer File'}
      contained={
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} >
          <div style={{ margin: '8px 0px 0px 0px' }} >
            <FileInput
              onLoadStart={() => {
                setAttemptedFileUpload(true);
                setErrorMessage([]);
              }}
              onLoad={f => {
                setFileExtension(f.extension.toLowerCase());
                setFileContents(f.contents);
                setFileUploaded(true);
              }}
            />
          </div>
          {fileExtension != 'rna2drawer' ? null : (
            <div style={{ marginTop: '12px', animationName: 'fadein', animationDuration: '0.75s' }} >
              <p className={'unselectable-text'} >
                <b>Note:</b> Not all aspects of a drawing from the first version of RNA2Drawer will be preserved. The following will be preserved:
              </p>
              <div style={{ margin: '6px 0px 0px 12px' }} >
                <p className={'unselectable-text'} >
                  The sequence and its ID, the secondary structure, tertiary interactions and their colors,
                  base numbering and the numbering offset, and base colors and outlines.
                </p>
              </div>
            </div>
          )}
          {!errorMessage.join('') ? null : (
            <div style={{ marginTop: fileExtension == 'rna2drawer' ? '12px' : '20px' }} >
              <ErrorMessage message={errorMessage.join('')} />
            </div>
          )}
          <div style={{ marginTop: errorMessage.join('') ? '6px' : fileExtension == 'rna2drawer' ? '24px' : '32px' }} >
            <ActionButton
              text={'Submit'}
              onClick={() => {
                if (!fileUploaded) {
                  setErrorMessage([attemptedFileUpload ? 'Unable to read selected file.' : 'No file uploaded.']);
                  return;
                }
                let fe = fileExtension.toLowerCase();
                if (fe != 'rna2drawer' && fe != 'rna2drawer2') {
                  setErrorMessage(['File must have .rna2drawer extension.']);
                  return;
                }
                let opened = open(props.app, { extension: fileExtension, contents: fileContents });
                if (!opened) {
                  setErrorMessage(['Invalid RNA2Drawer file.']);
                  return;
                }
                props.close();
                props.app.drawingChangedNotByInteraction();
              }}
            />
          </div>
        </div>
      }
    />
  );
}
