import { Sequence } from './Sequence';
import { Drawing } from 'Draw/Drawing';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { appendSequence } from 'Draw/sequences/add/sequence';
import { Base } from 'Draw/bases/Base';

let container = null;
let drawing = null;
let seq = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  drawing.appendTo(container);

  seq = appendSequence(drawing, { id: 'asdf', characters: 'asdfASDFqwer' });
});

afterEach(() => {
  drawing.clear();
  drawing = null;

  container.remove();
  container = null;
});

describe('Sequence class', () => {
  describe('constructor', () => {
    it('stores ID', () => {
      let id = 'id' + Math.random();
      let seq = new Sequence(id);
      expect(seq.id).toBe(id);
    });
  });

  test('characters getter', () => {
    expect(seq.length).toBeGreaterThanOrEqual(5);
    let cs = seq.characters;
    for (let i = 0; i < seq.length; i++) {
      expect(cs.charAt(i)).toBe(seq.bases[i].character);
    }
  });

  it('length getter', () => {
    expect(seq.bases.length).toBeGreaterThanOrEqual(5);
    expect(seq.length).toBe(seq.bases.length);
  });

  test('positionInRange and positionOutOfRange methods', () => {
    let seq = appendSequence(drawing, { id: 'asdf', characters: 'qweras' });
    [1, 2, 3, 4, 5, 6].forEach(p => {
      expect(seq.positionInRange(p)).toBeTruthy();
      expect(seq.positionOutOfRange(p)).toBeFalsy();
    });
    [0, -1, -10, 7, 8, 12].forEach(p => {
      expect(seq.positionInRange(p)).toBeFalsy();
      expect(seq.positionOutOfRange(p)).toBeTruthy();
    });
  });

  test('atPosition and getBaseAtPosition methods', () => {
    let cs = 'zxcvZX';
    let seq = appendSequence(drawing, { id: 'qwer', characters: cs });
    [1, 2, 3, 4, 5, 6].forEach(p => {
      let b = seq.atPosition(p);
      expect(b.character).toBe(cs.charAt(p - 1));
      b = seq.getBaseAtPosition(p);
      expect(b.character).toBe(cs.charAt(p - 1));
    });
    [0, -1, -5, 7, 9, 12].forEach(p => {
      let b = seq.atPosition(p);
      expect(b).toBe(undefined);
      b = seq.getBaseAtPosition(p);
      expect(b).toBe(undefined);
    });
  });

  test('positionOf method', () => {
    let cs = 'ABCDasdfqwer';
    let seq1 = appendSequence(drawing, { id: 'QQww', characters: cs });
    expect(seq1.positionOf(seq1.bases[0])).toBe(1);
    expect(seq1.positionOf(seq1.bases[3])).toBe(4);
    expect(seq1.positionOf(seq1.bases[8])).toBe(9);
    expect(seq1.positionOf(seq1.bases[seq.bases.length - 1])).toBe(seq.bases.length);
    let seq2 = appendSequence(drawing, { id: 'ZxcV', characters: 'zxcv' });
    expect(seq1.positionOf(seq2.bases[0])).toBe(0); // not in sequence
  });

  test('basesToPositions method', () => {
    let cs = 'bnT423mn';
    let seq = appendSequence(drawing, { id: 'blah', characters: cs });
    let basesToPositions = seq.basesToPositions();
    expect(basesToPositions.size).toBe(seq.bases.length);
    for (let i = 0; i < seq.bases.length; i++) {
      let b = seq.bases[i];
      let p = i + 1;
      expect(basesToPositions.get(b)).toBe(p);
    }
  });

  describe('append method', () => {
    test('on an empty sequence', () => {
      let seq = appendSequence(drawing, { id: 'Empty', characters: '' });
      expect(seq.length).toBe(0);
      seq.append(new Base({ text: drawing.svg.text('B') }));
      expect(seq.length).toBe(1);
      expect(seq.bases[0].text.text()).toBe('B');
    });

    test('on a nonempty sequence', () => {
      let seq = appendSequence(drawing, { id: '1', characters: 'AUGGC' });
      expect(seq.length).toBe(5);
      seq.append(new Base({ text: drawing.svg.text('T') }));
      expect(seq.length).toBe(6);
      expect(seq.bases.map(b => b.text.text()).join('')).toBe('AUGGCT');
    });
  });
});
