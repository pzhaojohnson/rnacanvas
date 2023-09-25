import * as React from 'react';
import styles from './ExampleSelect.css';

function LabelSpacer() {
  return <div style={{ flexGrow: 2 }} />;
}

function ExamplesSpacer() {
  return <div style={{ flexGrow: 3 }} />;
}

function EndSpacer() {
  return <div style={{ flexGrow: 2 }} />
}

export type Props = {
  examples: string[];
  select: (example: string) => void;
}

export function ExampleSelect(props: Props): React.ReactElement {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
      <p
        className='unselectable'
        style={{ fontSize: '14px', fontWeight: 600, fontStyle: 'italic', color: 'rgb(46, 46, 52)' }}
      >
        Examples...
      </p>
      <LabelSpacer />
      {props.examples.map((e, i) => [
        <button
          key={2 * i}
          className={`${styles.option}`}
          onClick={() => props.select(e)}
        >
          {e}
        </button>,
        i == props.examples.length - 1 ? null : <ExamplesSpacer key={(2 * i) + 1} />,
      ])}
      <EndSpacer />
    </div>
  );
}
