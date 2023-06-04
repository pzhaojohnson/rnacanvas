import { createSequence } from './createSequence';

import * as SVG from 'Draw/svg/NodeSVG';

import { SequenceDecorator } from './appendTo';

let svg = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  // add some elements to append after
  svg.text('B');
  svg.circle(20);
  svg.circle(23);
  svg.rect(20, 10);
  svg.ellipse(20, 30);
});

afterEach(() => {
  svg.remove();
  svg = null;
});

describe('SequenceDecorator class', () => {
  describe('constructor', () => {
    it('stores decoratee', () => {
      let decoratee = createSequence('asdf');
      let decorator = new SequenceDecorator(decoratee);
      expect(decorator.decoratee).toBe(decoratee);
    });
  });

  describe('appendTo method', () => {
    test('an empty sequence', () => {
      let decoratee = createSequence('');
      let decorator = new SequenceDecorator(decoratee);

      expect(() => decorator.appendTo(svg)).not.toThrow();
    });

    test('a nonempty sequence', () => {
      let decoratee = createSequence('auihIUHEG');
      let decorator = new SequenceDecorator(decoratee);

      decoratee.bases.forEach(b => {
        expect(b.text.root()).toBeFalsy();
      });

      let n = svg.children().length;
      expect(n).toBeGreaterThan(0);

      decorator.appendTo(svg);

      decoratee.bases.forEach(b => {
        expect(b.text.root()).toBe(svg);
        expect(b.text.position()).toBeGreaterThanOrEqual(n);
      });
    });
  });

  describe('remove method', () => {
    test('an empty sequence', () => {
      let decoratee = createSequence('');
      let decorator = new SequenceDecorator(decoratee);

      decorator.appendTo(svg);
      expect(() => decorator.remove()).not.toThrow();
    });

    test('a nonempty sequence', () => {
      let decoratee = createSequence('sdigf139857');
      let decorator = new SequenceDecorator(decoratee);

      decorator.appendTo(svg);

      decoratee.bases.forEach(b => {
        expect(b.text.root()).toBe(svg);
      });

      decorator.remove();

      decoratee.bases.forEach(b => {
        expect(b.text.root()).toBeFalsy();
      });
    });

    test('a nonempty sequence that has not been added to anything', () => {
      let decoratee = createSequence('sdifjaodf');
      let decorator = new SequenceDecorator(decoratee);

      decoratee.bases.forEach(b => {
        expect(b.text.root()).toBeFalsy();
      });

      expect(() => decorator.remove()).not.toThrow();
    });
  });
});
