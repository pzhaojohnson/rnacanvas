import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import { parseDotBracket } from 'Parse/parseDotBracket';

import { SequenceWrapper } from './SequenceWrapper';

let app = null;

let drawing = null;

let sequence = null;
let sequenceWrapper = null;

beforeEach(() => {
  app = new App({ SVG });
  app.appendTo(document.body);

  drawing = app.drawing;

  drawing.appendStructure({
    id: 'A Structure',
    characters: 'AAGGUSGCUGACGGCGAAGGUSGCUGACGGCG',
    secondaryPartners: (
      parseDotBracket('..((((....))))....((((....))))..').secondaryPartners
    ),
  });

  sequence = drawing.sequences[0];
  sequenceWrapper = new SequenceWrapper(sequence);
});

afterEach(() => {
  sequenceWrapper = null;
  sequence = null;

  drawing = null;

  app.remove();
  app = null;
});

describe('SequenceWrapper class', () => {
  test('sequence property', () => {
    expect(sequence).toBeTruthy();
    let sequenceWrapper = new SequenceWrapper(sequence);
    expect(sequenceWrapper.sequence).toBe(sequence);
  });

  describe('setNumbering method', () => {
    test('an empty sequence', () => {
      drawing.appendStructure({ id: 'E', characters: '' });
      let sequence = drawing.sequences[drawing.sequences.length - 1];
      expect(sequence.length).toBe(0);

      let sequenceWrapper = new SequenceWrapper(sequence);
      let numbering = { offset: 0, increment: 20, anchor: 20 };

      expect(
        () => sequenceWrapper.setNumbering(numbering)
      ).not.toThrow();
    });

    test('when offset is specified', () => {
      sequenceWrapper.setNumbering({ offset: 33, increment: 15, anchor: 6 });
      expect(sequence.bases[5].numbering.text.text()).toBe('39');
      expect(sequence.bases[20].numbering.text.text()).toBe('54');
    });

    test('when offset is not specified', () => {
      sequenceWrapper.setNumbering({ increment: 15, anchor: 6 });
      expect(sequence.bases[5].numbering.text.text()).toBe('6');
      expect(sequence.bases[20].numbering.text.text()).toBe('21');
    });

    test('when increment is specified', () => {
      sequenceWrapper.setNumbering({ increment: 12, anchor: 8 });
      expect(sequence.bases[7].numbering.text.text()).toBe('8');
      expect(sequence.bases[19].numbering.text.text()).toBe('20');
      expect(sequence.bases[31].numbering.text.text()).toBe('32');
    });

    test('when increment is not specified', () => {
      sequenceWrapper.setNumbering({ anchor: 8 });
      expect(sequence.bases[7].numbering.text.text()).toBe('8');
      expect(sequence.bases[27].numbering.text.text()).toBe('28');
    });

    test('when sequence length is less than increment', () => {
      expect(sequence.length).toBeLessThan(50);
      sequenceWrapper.setNumbering({ increment: 50 });

      // should have adjusted anchor to number the last base
      let lastBase = sequence.bases[sequence.length - 1];
      expect(lastBase.numbering.text.text()).toBe('32');
    });

    test('when anchor is specified', () => {
      sequenceWrapper.setNumbering({ offset: 2, increment: 11, anchor: 27 });
      expect(sequence.bases[26].numbering.text.text()).toBe('29');
      expect(sequence.bases[15].numbering.text.text()).toBe('18');
      expect(sequence.bases[4].numbering.text.text()).toBe('7');
    });

    test('when anchor is not specified', () => {
      sequenceWrapper.setNumbering({ increment: 9 });
      expect(sequence.bases[8].numbering.text.text()).toBe('9');
      expect(sequence.bases[17].numbering.text.text()).toBe('18');
      expect(sequence.bases[26].numbering.text.text()).toBe('27');
    });
  });
});
