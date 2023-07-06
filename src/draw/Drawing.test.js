import Drawing from './Drawing';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { Sequence } from 'Draw/sequences/Sequence';
import { savableState as savableSequenceState } from 'Draw/sequences/save';
import { Base } from 'Draw/bases/Base';
import { addPrimaryBond, addSecondaryBond } from 'Draw/bonds/straight/add';
import { removeSecondaryBondById } from 'Draw/bonds/straight/remove';
import { savableState as savableStraightBondState } from 'Draw/bonds/straight/save';
import { addTertiaryBond } from 'Draw/bonds/curved/add';
import { removeTertiaryBondById } from 'Draw/bonds/curved/remove';
import { savableState as savableTertiaryBondState } from 'Draw/bonds/curved/save';
import { resize } from 'Draw/dimensions';

let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
let container = document.createElement('div');
document.body.appendChild(container);
drawing.appendTo(container);
let seq1 = drawing.appendSequence('asdf', 'asdfasdf');
let seq2 = drawing.appendSequence('qwer', 'qwerqwerqwer');
let pb1 = addPrimaryBond(
  drawing,
  seq1.getBaseAtPosition(1),
  seq1.getBaseAtPosition(2),
);
let pb2 = addPrimaryBond(
  drawing,
  seq2.getBaseAtPosition(4),
  seq2.getBaseAtPosition(5),
);
let sb1 = addSecondaryBond(
  drawing,
  seq1.getBaseAtPosition(2),
  seq2.getBaseAtPosition(11),
);
let sb2 = addSecondaryBond(
  drawing,
  seq2.getBaseAtPosition(1),
  seq2.getBaseAtPosition(6),
);
let tb1 = addTertiaryBond(
  drawing,
  seq2.getBaseAtPosition(2),
  seq1.getBaseAtPosition(2),
);
let tb2 = addTertiaryBond(
  drawing,
  seq1.getBaseAtPosition(8),
  seq2.getBaseAtPosition(7),
);

test('node property', () => {
  expect(drawing.node).toBe(container.firstChild);
});

test('appendTo method', () => {
  let container = document.createElement('div');
  let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  expect(container.contains(drawing.node)).toBeFalsy();
  drawing.appendTo(container);
  expect(container.lastChild).toBe(drawing.node);
});

test('scroll property', () => {
  expect(drawing.scroll.element).toBe(drawing.node);
});

it('isEmpty method', () => {
  let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  let container = document.createElement('div');
  document.body.appendChild(container);
  drawing.appendTo(container);
  expect(drawing.isEmpty()).toBeTruthy();
  drawing.appendSequence('asdf', 'asdf');
  expect(drawing.isEmpty()).toBeFalsy();
});

describe('sequence and base attributes', () => {
  let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  let container = document.createElement('div');
  document.body.appendChild(container);
  drawing.appendTo(container);
  let seq1 = drawing.appendSequence('asdf', 'asdfasdf');
  let seq2 = drawing.appendSequence('qwer', 'qwerqwerqwer');
  let seq3 = drawing.appendSequence('zxcv', 'zxcv');

  it('numSequences getter', () => {
    expect(drawing.numSequences).toBe(3);
  });

  it('getSequenceById method', () => {
    expect(drawing.getSequenceById('qwer').id).toBe('qwer');
    expect(drawing.getSequenceById('nonexistent ID')).toBeFalsy();
  });

  it('forEachSequence method', () => {
    let ids = ['asdf', 'qwer', 'zxcv'];
    let i = 0;
    drawing.forEachSequence(seq => {
      expect(seq.id).toBe(ids[i]);
      i++;
    });
    expect(i).toBe(3);
  });

  it('sequenceIds method', () => {
    let ids = drawing.sequenceIds();
    expect(ids[0]).toBe('asdf');
    expect(ids[1]).toBe('qwer');
    expect(ids[2]).toBe('zxcv');
  });

  it('sequenceIdIsTaken method', () => {
    expect(drawing.sequenceIdIsTaken('qwer')).toBeTruthy();
    expect(drawing.sequenceIdIsTaken('nonexistent ID')).toBeFalsy();
  });

  it('overallCharacters getter handles multiple sequences', () => {
    expect(drawing.overallCharacters).toBe('asdfasdfqwerqwerqwerzxcv');
  });

  it('numBases getter handles multiple sequences', () => {
    expect(drawing.numBases).toBe(24);
  });

  it('getBaseById method', () => {
    let b = seq2.getBaseAtPosition(9); // in second sequence
    expect(drawing.getBaseById(b.id)).toBe(b);
    expect(drawing.getBaseById('nonexistent ID')).toBeFalsy();
  });

  it('getBaseAtOverallPosition method', () => {
    let b1 = seq1.getBaseAtPosition(5);
    let b2 = seq2.getBaseAtPosition(3);
    expect(drawing.getBaseAtOverallPosition(5)).toBe(b1);
    expect(drawing.getBaseAtOverallPosition(seq1.length + 3)).toBe(b2);
    expect(drawing.getBaseAtOverallPosition(1000)).toBeFalsy(); // out of range
  });

  it('overallPositionOfBase method', () => {
    let b1 = seq1.getBaseAtPosition(7);
    let b2 = seq2.getBaseAtPosition(5);
    expect(drawing.overallPositionOfBase(b1)).toBe(7);
    expect(drawing.overallPositionOfBase(b2)).toBe(seq1.length + 5);
    let b3 = Base.create(drawing.svg, 'a', 1, 2); // not in drawing
    expect(drawing.overallPositionOfBase(b3)).toBe(0);
  });

  it('forEachBase method handles multiple sequences', () => {
    let i = 0;
    drawing.forEachBase((b, p) => {
      expect(drawing.getBaseAtOverallPosition(p)).toBe(b);
      i++;
    });
    expect(i).toBe(drawing.numBases);
  });

  it('bases method', () => {
    // test with multiple sequences
    expect(drawing.numSequences).toBeGreaterThan(1);
    let bs = drawing.bases();
    let n = 0;
    drawing.forEachSequence(seq => {
      seq.bases.forEach(b => {
        expect(bs.includes(b)).toBeTruthy();
        n++;
      });
    });
    expect(bs.length).toBe(n);
  });

  it('createBases method', () => {
    let characters = 'asdfqwerZXCV';
    let bs = drawing.createBases(characters);
    for (let i = 0; i < characters.length; i++) {
      expect(bs[i].character).toBe(characters.charAt(i));
    }
    expect(bs.length).toBe(characters.length);
  });
});

describe('appendSequence method', () => {
  let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  let container = document.createElement('div');
  document.body.appendChild(container);
  drawing.appendTo(container);
  let seq1 = drawing.appendSequence('qwer', 'qwerqwer');

  it('sequence ID is already taken', () => {
    let n = drawing.numSequences;
    let seq = drawing.appendSequence('qwer', 'qwer');
    expect(seq).toBeFalsy();
    expect(drawing.numSequences).toBe(n);
  });

  it('sequence ID is not already taken', () => {
    let n = drawing.numSequences;
    let seq = drawing.appendSequence('zxcvbnm', 'zxcvbnmqq');
    expect(seq.id).toBe('zxcvbnm');
    expect(seq.characters).toBe('zxcvbnmqq');
    expect(drawing.numSequences).toBe(n + 1);
    expect(drawing.sequences[n].id).toBe(seq.id);
  });
});

it('repositionBonds method', () => {
  expect(drawing.primaryBonds.length).toBeGreaterThan(1);
  expect(drawing.secondaryBonds.length).toBeGreaterThan(1);
  expect(drawing.tertiaryBonds.length).toBeGreaterThan(1);
  let spies = [];
  drawing.primaryBonds.forEach(pb => spies.push(jest.spyOn(pb, 'reposition')));
  drawing.secondaryBonds.forEach(sb => spies.push(jest.spyOn(sb, 'reposition')));
  drawing.tertiaryBonds.forEach(tb => spies.push(jest.spyOn(tb, 'reposition')));
  drawing.repositionBonds();
  spies.forEach(s => expect(s).toHaveBeenCalled());
});

it('clear method removes elements and references', () => {
  let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  let container = document.createElement('div');
  document.body.appendChild(container);
  drawing.appendTo(container);
  let seq1 = drawing.appendSequence('qwer', 'qwerqwer');
  let seq2 = drawing.appendSequence('asdf', 'asdfas');
  let pb1 = addPrimaryBond(drawing, seq1.getBaseAtPosition(1), seq1.getBaseAtPosition(3));
  let pb2 = addPrimaryBond(drawing, seq2.getBaseAtPosition(2), seq2.getBaseAtPosition(3));
  let sb1 = addSecondaryBond(drawing, seq1.getBaseAtPosition(2), seq2.getBaseAtPosition(6));
  let sb2 = addSecondaryBond(drawing, seq1.getBaseAtPosition(1), seq2.getBaseAtPosition(2));
  let tb1 = addTertiaryBond(drawing, seq2.getBaseAtPosition(3), seq1.getBaseAtPosition(5));
  let tb2 = addTertiaryBond(drawing, seq1.getBaseAtPosition(8), seq2.getBaseAtPosition(5));
  let spy = jest.spyOn(drawing.svg, 'clear');
  drawing.clear();
  expect(spy).toHaveBeenCalled(); // removed elements
  // removed references
  expect(drawing.numSequences).toBe(0);
  expect(drawing.primaryBonds.length).toBe(0);
  expect(drawing.secondaryBonds.length).toBe(0);
  expect(drawing.tertiaryBonds.length).toBe(0);
});

it('svgString getter', () => {
  expect(drawing.svgString).toBe(drawing.svg.svg());
});

describe('savableState method', () => {
  let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  drawing.appendTo(container);
  let seq1 = drawing.appendSequence('asdf', 'asdf');
  let seq2 = drawing.appendSequence('qwer', 'qwerzx');
  let b1 = seq1.getBaseAtPosition(1);
  let b2 = seq1.getBaseAtPosition(2);
  let b3 = seq1.getBaseAtPosition(3);
  let b6 = seq2.getBaseAtPosition(2);
  let b8 = seq2.getBaseAtPosition(4);
  let sb1 = addSecondaryBond(drawing, b2, b8);
  let sb2 = addSecondaryBond(drawing, b6, b3);
  let tb1 = addTertiaryBond(drawing, b6, b1);
  let tb2 = addTertiaryBond(drawing, b2, b6);
  let savableState = drawing.savableState();
  let svgString = drawing.svg.svg();

  it('includes class name and svg', () => {
    expect(savableState.className).toBe('Drawing');
    expect(savableState.svg).toBe(svgString);
  });

  it('includes origin', () => {
    drawing.origin = 'rna-2d-schema';
    expect(drawing.savableState().origin).toBe('rna-2d-schema');

    drawing.origin = undefined;
    expect(drawing.savableState().origin).toBeUndefined();
  });

  it('includes sequences', () => {
    let sequences = savableState.sequences;
    expect(sequences.length).toBe(2);
    expect(JSON.stringify(sequences[0])).toBe(JSON.stringify(savableSequenceState(seq1)));
    expect(JSON.stringify(sequences[1])).toBe(JSON.stringify(savableSequenceState(seq2)));
  });

  it('includes primary bonds', () => {
    expect(drawing.primaryBonds.length).toBe(8);
    expect(savableState.primaryBonds.length).toBe(drawing.primaryBonds.length);
    for (let i = 0; i < drawing.primaryBonds.length; i++) {
      expect(savableState.primaryBonds[i]).toEqual(
        savableStraightBondState(drawing.primaryBonds[i])
      );
    }
  });

  it('includes secondary bonds', () => {
    let secondaryBonds = savableState.secondaryBonds;
    expect(secondaryBonds.length).toBe(2);
    expect(JSON.stringify(secondaryBonds[0])).toBe(JSON.stringify(savableStraightBondState(sb1)));
    expect(JSON.stringify(secondaryBonds[1])).toBe(JSON.stringify(savableStraightBondState(sb2)));
  });

  it('includes tertiary bonds', () => {
    let tertiaryBonds = savableState.tertiaryBonds;
    expect(tertiaryBonds.length).toBe(2);
    expect(JSON.stringify(tertiaryBonds[0])).toBe(JSON.stringify(savableTertiaryBondState(tb1)));
    expect(JSON.stringify(tertiaryBonds[1])).toBe(JSON.stringify(savableTertiaryBondState(tb2)));
  });

  it('can be converted to and from a JSON string', () => {
    let json = JSON.stringify(savableState);
    let parsed = JSON.parse(json);
    expect(JSON.stringify(parsed)).toBe(json);
  });
});

describe('applySavedState method', () => {
  it('can successfully apply saved state', () => {
    let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
    drawing.appendTo(container);
    resize(drawing, { width: 150, height: 330 });
    let seq1 = drawing.appendSequence('asdf', 'asdfasdf');
    let seq2 = drawing.appendSequence('qwer', 'qwerzxcvzxcv');
    let b2 = seq1.getBaseAtPosition(2);
    let b5 = seq1.getBaseAtPosition(5);
    let b12 = seq2.getBaseAtPosition(4);
    let b17 = seq2.getBaseAtPosition(9);
    let pb1 = addPrimaryBond(drawing, b2, b5);
    let pb2 = addPrimaryBond(drawing, b5, b12);
    let sb1 = addSecondaryBond(drawing, b2, b17);
    let sb2 = addSecondaryBond(drawing, b5, b12);
    let tb1 = addTertiaryBond(drawing, b12, b2);
    let tb2 = addTertiaryBond(drawing, b5, b17);
    let savableState = drawing.savableState();
    let seq3 = drawing.appendSequence('zxcv', 'zxcvzxcv');
    let pb3 = addPrimaryBond(drawing, b12, b17);
    removeSecondaryBondById(drawing, sb1.id);
    removeTertiaryBondById(drawing, tb2.id);
    expect(JSON.stringify(drawing.savableState())).not.toBe(JSON.stringify(savableState));
    let applied = drawing.applySavedState(savableState);
    expect(applied).toBeTruthy();
    // requires that saved svg, sequences and primary, secondary and tertiary bonds
    // have been applied correctly
    expect(JSON.stringify(drawing.savableState())).toBe(JSON.stringify(savableState));
  });

  it('applies saved origin', () => {
    drawing.clear();
    drawing.origin = 'rna-2d-schema';
    let saved = drawing.savableState();

    drawing.origin = undefined;
    expect(drawing.origin).toBeUndefined();

    drawing.applySavedState(saved);
    expect(drawing.origin).toBe('rna-2d-schema');
  });

  it('handles failure to apply saved state', () => {
    let drawing = new Drawing({ SVG: { SVG: NodeSVG } });
    drawing.appendTo(container);
    let seq1 = drawing.appendSequence('asdf', 'asdfasdf');
    let seq2 = drawing.appendSequence('qwer', 'qwerqwer');
    let savableState1 = drawing.savableState();
    savableState1.className = 'Drwing';
    let seq3 = drawing.appendSequence('zxcv', 'zxcvzxcv');
    let savableState2 = drawing.savableState();
    expect(JSON.stringify(savableState2)).not.toBe(JSON.stringify(savableState1));
    let applied = drawing.applySavedState(savableState1);
    expect(applied).toBeFalsy();
    // drawing state is not changed
    expect(JSON.stringify(drawing.savableState())).toBe(JSON.stringify(savableState2));
  });
});
