import type { App } from 'App';

import type { Bond } from 'Forms/edit/bonds/strung/Bond';

import { removeStrungElementsAtIndex } from 'Forms/edit/bonds/strung/removeStrungElementsAtIndex';

import * as React from 'react';
import styles from './StrungElementsSection.css';

import { IndexSection } from 'Forms/edit/bonds/strung/IndexSection';

import { AddStrungElementButton } from 'Forms/edit/bonds/strung/AddStrungElementButton';

import { isNullish } from '@rnacanvas/value-check';
import { atIndex } from 'Array/at';

// specifies which index sections are collapsed
let collapsedIndices = new Set<number>();

let smushAnimation = document.createElement('style');
document.head.appendChild(smushAnimation);

// include a trailing UUID to ensure uniqueness
let smushAnimationName = 'smush_7d94a751fdde4ca49fe4664f09d7fbe5';

let smushAnimationDuration = 0.75; // in seconds

let smushAnimationKeyFrames = `
  @keyframes ${smushAnimationName} {
    0% {
      max-height: START_HEIGHT;
    }
    66% {
      max-height: 0px;
    }
    100% {
      max-height: 0px;
    }
  }
`;

// hard coded to be taller than any index section container
let indexSectionContainerHeightCeiling = '1000px';

type IndexSectionHeaderClick = {
  /**
   * The index of the index section.
   */
  index: number;
};

type IndexSectionRemoveButtonClick = {
  /**
   * The index of the index section.
   */
  index: number;
};

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The bonds whose strung elements are to be edited.
   */
  bonds: Bond[];
};

/**
 * A section for editing the strung elements of bonds.
 */
export class StrungElementsSection extends React.Component<Props> {
  state: {
    collapsedIndices: Set<number>;

    /**
     * The index that is about to be removed.
     */
    indexToBeRemoved?: number;

    /**
     * The height of the index section container for the index that is
     * about to be removed.
     */
    heightToBeRemoved?: string;
  };

  /**
   * Refs to the divs containing each index section in order by index.
   */
  indexSectionContainerRefs: React.RefObject<HTMLDivElement>[];

  constructor(props: Props) {
    super(props);

    this.state = {
      collapsedIndices: new Set<number>(collapsedIndices),
    };

    this.indexSectionContainerRefs = [];
  }

  componentWillUnmount() {
    collapsedIndices = new Set(this.state.collapsedIndices);

    if (!isNullish(this.state.indexToBeRemoved)) {
      let indexToBeRemoved = this.state.indexToBeRemoved;
      collapsedIndices.delete(indexToBeRemoved);
      // decrement indices greater than the index to be removed
      collapsedIndices = new Set(
        Array.from(collapsedIndices).map(i => i > indexToBeRemoved ? i - 1 : i)
      );
    }
  }

  handleIndexSectionHeaderClick(event: IndexSectionHeaderClick) {
    let index = event.index;
    let collapsedIndices = new Set(this.state.collapsedIndices);
    if (collapsedIndices.has(index)) {
      collapsedIndices.delete(index);
    } else {
      collapsedIndices.add(index);
    }
    this.setState({ collapsedIndices });
  }

  handleIndexSectionRemoveButtonClick(event: IndexSectionRemoveButtonClick) {
    let index = event.index;

    let heightToBeRemoved: string | undefined = undefined;
    let container = atIndex(this.indexSectionContainerRefs, index)?.current;
    if (container) {
      heightToBeRemoved = window.getComputedStyle(container).height;
    }

    this.setState({ indexToBeRemoved: index, heightToBeRemoved });

    setTimeout(() => {
      this.props.app.pushUndo();
      removeStrungElementsAtIndex({ bonds: this.props.bonds, index });
      this.props.app.refresh();
    }, 1000 * smushAnimationDuration);
  }

  render() {
    let strungElementsArrayLengths = this.props.bonds.map(
      bond => bond.strungElements.length
    );

    let minStrungElementsArrayLength = Math.min(...strungElementsArrayLengths);

    for (let i = 0; i < minStrungElementsArrayLength; i++) {
      if (!this.indexSectionContainerRefs[i]) {
        this.indexSectionContainerRefs[i] = React.createRef();
      }
    }
    this.indexSectionContainerRefs.length = minStrungElementsArrayLength;

    let indexToBeRemoved = this.state.indexToBeRemoved;

    if (!isNullish(indexToBeRemoved)) {
      smushAnimation.innerHTML = smushAnimationKeyFrames.replace(
        'START_HEIGHT',
        this.state.heightToBeRemoved ?? indexSectionContainerHeightCeiling,
      );
    }

    let addStrungElementButton = (
      <AddStrungElementButton {...this.props} style={{ marginLeft: '1px' }} />
    );

    return (
      <div>
        {this.indexSectionContainerRefs.map((ref, i) => (
          <div key={i} ref={ref}
            className={i == indexToBeRemoved ? styles.smushed : undefined}
            style={{
              animation: i != indexToBeRemoved ? undefined : (
                `${smushAnimationName} ${smushAnimationDuration}s`
              ),
            }}
          >
            <IndexSection
              {...this.props}
              strungElementsIndex={i}
              isCollapsed={this.state.collapsedIndices.has(i)}
              onHeaderClick={() => {
                this.handleIndexSectionHeaderClick({ index: i });
              }}
              onRemoveButtonClick={() => {
                this.handleIndexSectionRemoveButtonClick({ index: i });
              }}
            />
            <div style={{ height: '45px' }} />
          </div>
        ))}
        {addStrungElementButton}
      </div>
    );
  }
}
