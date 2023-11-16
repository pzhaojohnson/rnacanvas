import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import styles from './CTFileInput.css';

function DefaultText() {
  let CT = (
    <span className={styles.CT} >.ct</span>
  );

  return (
    <p className={styles.defaultText} >
      Upload a {CT} file...
    </p>
  );
}

function FileName(
  props: {
    children: string,
  },
) {
  return (
    <p className={styles.fileName} >
      {props.children}
    </p>
  );
}

export type ChangeEvent = {
  target: {
    /**
     * The file uploaded by the user.
     *
     * Is undefined if no file is uploaded.
     */
    file?: File;
  }
};

export type Props = {
  onChange: (event: ChangeEvent) => void;
};

export function CTFileInput(props: Props) {
  let [fileName, setFileName] = useState('');

  let handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files ? event.target.files[0] : undefined;
    setFileName(file?.name ?? '');
    props.onChange({ target: { file } });
  };

  let hiddenFileInputRef = useRef<HTMLInputElement>(null);

  let hiddenFileInput = (
    <input
      ref={hiddenFileInputRef}
      type='file'
      onChange={handleChange}
      style={{ display: 'none' }}
    />
  );

  return (
    <div
      className={styles.ctFileInput}
      onClick={() => hiddenFileInputRef.current?.click()}
    >
      {hiddenFileInput}
      {fileName ? (
        <FileName>{fileName}</FileName>
      ) : (
        <DefaultText />
      )}
    </div>
  );
}
