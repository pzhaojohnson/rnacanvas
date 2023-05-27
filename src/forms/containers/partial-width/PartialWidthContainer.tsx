import * as React from 'react';
import styles from './PartialWidthContainer.css';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';
import { CloseButton } from './CloseButton';
import { BackwardAndForwardButtons } from './BackwardAndForwardButtons';

export type Props = {
  unmount: () => void;
  history: FormHistoryInterface;

  title: string;
  children: React.ReactNode;

  style?: {
    width?: string;
  }
}

export function PartialWidthContainer(props: Props) {
  return (
    <div
      className={`${styles.partialWidthContainer}`}
      style={{
        position: 'relative',
        width: props.style?.width ?? '360px',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <div style={{ position: 'absolute', top: '0px', right: '0px' }} >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }} >
          <BackwardAndForwardButtons {...props.history} />
          <CloseButton onClick={() => props.unmount()} />
        </div>
      </div>
      <div style={{ margin: '16px 32px 0px 32px' }} >
        <p className={`${styles.title} unselectable`} >
          {props.title}
        </p>
      </div>
      <div style={{ margin: '8px 20px 0px 20px' }} >
        <div className={`${styles.titleUnderline}`} />
      </div>
      <div style={{ margin: '24px 40px 35px 40px' }} >
        {props.children}
      </div>
    </div>
  );
}
