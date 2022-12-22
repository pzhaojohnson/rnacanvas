import * as React from 'react';

import { useState } from 'react';
import { useRef } from 'react';

import styles from './DrawingFileInput.css';

type Nullish = null | undefined;

class FileListWrapper {
  /**
   * The wrapped file list.
   *
   * (Is allowed to be nullish.)
   */
  readonly fileList: FileList | Nullish;

  constructor(fileList: FileList | Nullish) {
    this.fileList = fileList;
  }

  /**
   * Adds possibly undefined type annotation to the retrieved file.
   *
   * Returns undefined if the wrapped file list is nullish.
   */
  get firstFile(): File | undefined {
    if (!this.fileList) {
      return undefined;
    }

    return this.fileList[0];
  }
}

export type ChangeEvent = {
  target: {
    /**
     * The file that has been uploaded.
     */
    file?: File;
  }
};

export type Props = {
  onChange?: (event: ChangeEvent) => void;
};

export function DrawingFileInput(props: Props) {
  let [fileNameString, setFileNameString] = useState('');

  let hiddenFileInputRef = useRef<HTMLInputElement>(null);

  let onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = new FileListWrapper(event.target.files);
    let file = files.firstFile; // ignore trailing files

    setFileNameString(file?.name ?? '');

    if (props.onChange) {
      props.onChange({ target: { file } });
    }
  }

  let hiddenFileInput = (
    <input
      ref={hiddenFileInputRef}
      type='file'
      onChange={onChange}
      style={{ display: 'none' }} // make hidden
    />
  );

  let dotRNA2Drawer = (
    <span className={styles.dotRNA2Drawer} >
      .rna2drawer
    </span>
  );

  let fileName = (
    <span className={styles.fileName} >
      {fileNameString}
    </span>
  );

  let text = (
    <p className={styles.text} >
      {fileNameString ? (
        fileName
      ) : (
        <span>
          Upload a drawing file...
        </span>
      )}
    </p>
  );

  let onClick = () => hiddenFileInputRef?.current?.click();

  return (
    <div className={styles.drawingFileInput} onClick={onClick} >
      {hiddenFileInput}
      {text}
    </div>
  );
}
