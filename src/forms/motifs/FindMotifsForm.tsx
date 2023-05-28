import type { App } from 'App';

import type { Sequence } from 'Draw/sequences/Sequence';
import { numberingOffset } from 'Draw/sequences/numberingOffset';

import type { Base } from 'Draw/bases/Base';

import * as React from 'react';
import styles from './FindMotifsForm.css';

import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';
import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';

import { MotifInput } from './MotifInput';

import { OptionsToggle } from './OptionsToggle';
import { OptionsPanel } from './OptionsPanel';

import { NumMatchesView } from './NumMatchesView';
import { DisplayableSequenceRange } from 'Forms/edit/sequences/DisplayableSequenceRange';
import { MatchesView } from './MatchesView';

import { isBlank } from 'Parse/isBlank';

import { motifsMatch } from './motifsMatch';

import { centerViewOnBases } from './centerViewOnBases';
import { BaseBlinker } from './BaseBlinker';

export type Props = {

  // a reference to the whole app
  app: App;

  unmount: () => void;
  history: FormHistoryInterface;
};

export type Options = {
  UT: boolean;
  IUPAC: boolean;
  allowedMismatch: number;
  treatMotifAsRegExp: boolean;
};

function deepCopyOptions(options: Options): Options {
  return { ...options };
}

type State = {
  motif: string;

  showOptions: boolean;
  options: Options;
};

function deepCopyState(state: State): State {
  return {
    ...state,
    options: deepCopyOptions(state.options),
  };
}

let prevState: State = {
  motif: '',
  showOptions: false,
  options: {
    UT: true,
    IUPAC: false,
    allowedMismatch: 0,
    treatMotifAsRegExp: false,
  },
};

export type Match = {

  // the motif that the match was found for
  matchedMotif: string;

  // the motif matching the matched motif
  matchingMotif: string;

  // the start position of the matching motif in its parent sequence
  startPosition: number;
};

export class FindMotifsForm extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = deepCopyState(prevState);
  }

  componentWillUnmount() {
    prevState = deepCopyState(this.state);
  }

  render() {
    let matches = this.matches();

    return (
      <PartialWidthContainer
        title='Find Motifs'
        unmount={this.props.unmount}
        history={this.props.history}
        style={{ width: '382px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <MotifInput
            value={this.state.motif}
            onSubmit={event => this.setState({ motif: event.target.value })}
          />
          <OptionsToggle
            onClick={() => this.setState({ showOptions: !this.state.showOptions })}
          />
          {!this.state.showOptions ? null : (
            <OptionsPanel
              value={this.state.options}
              onChange={event => this.setState({ options: deepCopyOptions(event.target.value) })}
            />
          )}
          {isBlank(this.state.motif) ? null : (
            <div style={{ margin: '41px 0 0 0', display: 'flex', flexDirection: 'column' }} >
              <NumMatchesView numMatches={matches.length} />
              {matches.length == 0 ? null : (
                <div style={{ margin: '11px 0 0 0' }} >
                  <DisplayableSequenceRange sequence={this.sequence()} />
                  <MatchesView
                    matches={matches}
                    numberingOffset={this.numberingOffset}
                    onMatchSelect={match => this.highlightMatch(match)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </PartialWidthContainer>
    );
  }

  // the sequence to search for motifs in
  sequence(): Sequence {
    return this.props.app.strictDrawing.layoutSequence();
  }

  // the numbering offset to use when reporting motif positions
  get numberingOffset(): number {
    return numberingOffset(this.sequence()) ?? 0;
  }

  // converts a series of bases to a motif string
  basesToMotif(bases: Base[]): string {
    return bases.map(base => base.text.text()).join('');
  }

  // matches to the entered motif
  matches(): Match[] {
    if (this.state.options.treatMotifAsRegExp) {
      return this.regExpMatches();
    } else {
      return this.nucleicAcidMatches();
    }
  }

  // matches when treating the motif as a nucleic acid sequence
  nucleicAcidMatches(): Match[] {
    if (isBlank(this.state.motif)) {
      return [];
    }

    let matchedMotif = this.state.motif.trim();
    let matchesOptions = {
      UT: this.state.options.UT,
      IUPAC: this.state.options.IUPAC,
      allowedMismatch: this.state.options.allowedMismatch,
    };

    let matches: Match[] = [];
    let sequence = this.sequence();
    for (let p1 = 1; p1 + matchedMotif.length - 1 <= sequence.length; p1++) {
      let bases = sequence.bases.slice(p1 - 1, (p1 - 1) + matchedMotif.length);
      let matchingMotif = this.basesToMotif(bases);
      if (motifsMatch(matchedMotif, matchingMotif, matchesOptions)) {
        matches.push({ startPosition: p1, matchedMotif, matchingMotif });
      }
    }
    return matches;
  }

  // matches when treating the motif as a regular expression
  regExpMatches(): Match[] {
    if (isBlank(this.state.motif)) {
      return [];
    }

    // use try...catch in case the regular expression is invalid
    let it;
    try {
      let regExp = new RegExp(this.state.motif, 'g');
      it = this.basesToMotif(this.sequence().bases).matchAll(regExp);
    } catch (error) {
      console.error(error);
      console.error('Unable to use motif as a regular expression.');
      return [];
    }

    let matches: Match[] = [];
    let next = it.next();
    while (!next.done && next.value.index != undefined) {
      matches.push({
        matchedMotif: this.state.motif,
        matchingMotif: next.value[0],
        startPosition: next.value.index + 1,
      });
      next = it.next();
    }
    return matches;
  }

  basesOfMatch(match: Match): Base[] {
    let p1 = match.startPosition;
    let length = match.matchingMotif.length;
    return this.sequence().bases.slice(p1 - 1, (p1 - 1) + length);
  }

  highlightMatch(match: Match) {
    let matchingBases = this.basesOfMatch(match);
    centerViewOnBases(this.props.app.strictDrawing, matchingBases);

    let strictDrawingInteraction = this.props.app.strictDrawingInteraction;
    let drawingOverlay = strictDrawingInteraction.drawingOverlay
    drawingOverlay.fitTo(this.props.app.strictDrawing.drawing);
    let blinkers = matchingBases.map(base => new BaseBlinker(base));
    blinkers.forEach(blinker => blinker.appendTo(drawingOverlay.svg));
    blinkers.forEach(blinker => blinker.blink({ remove: true }));
  }
}
