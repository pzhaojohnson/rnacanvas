import * as React from 'react';

import { useState } from 'react';

import { useRef } from 'react';

import styles from './RNA2DSchemaFileInput.css';

export type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RNA2DSchemaFileInput(props: Props) {
  let [textContent, setTextContent] = useState('Upload an RNA 2D JSON schema file...');

  let text = (
    <p className={styles.text} >
      {textContent}
    </p>
  );

  let handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // enclose type casting
    try {
      let firstFileUploaded: File = (event.target.files as FileList)[0];
      setTextContent(firstFileUploaded.name);
      props.onChange(event);
    } catch {}
  };

  let hiddenFileInputRef = useRef<HTMLInputElement>(null);

  // is what actually allows the user to upload a file
  let hiddenFileInput = (
    <input
      ref={hiddenFileInputRef}
      type='file'
      onChange={handleChange}
      style={{ display: 'none' }}
    />
  );

  let onClick = () => hiddenFileInputRef.current?.click();

  return (
    <div className={styles.rna2DSchemaFileInput} {...{ onClick }} >
      {hiddenFileInput}
      {text}
    </div>
  );
}
