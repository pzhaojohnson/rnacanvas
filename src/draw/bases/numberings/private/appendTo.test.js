import { createBaseNumbering } from 'Draw/bases/numberings/createBaseNumbering';

import * as SVG from 'Draw/svg/NodeSVG';

import { BaseNumberingDecorator } from './appendTo';

let decoratee = null;
let decorator = null;

let svg = null;

beforeEach(() => {
  decoratee = createBaseNumbering(56);
  decorator = new BaseNumberingDecorator(decoratee);

  svg = SVG.SVG();
  svg.addTo(document.body);
});

afterEach(() => {
  svg.remove();
  svg = null;

  decorator = null;
  decoratee = null;
});

describe('BaseNumberingDecorator class', () => {
  describe('constructor', () => {
    it('stores decoratee', () => {
      expect(decorator.decoratee).toBe(decoratee);
      expect(decoratee).toBeTruthy();
    });
  });

  test('appendTo and remove methods', () => {
    expect(decoratee.text.root()).toBeFalsy();
    expect(decoratee.line.root()).toBeFalsy();

    decorator.appendTo(svg);

    expect(decoratee.text.root()).toBe(svg);
    expect(decoratee.line.root()).toBe(svg);

    let n = svg.children().length;

    // appended text and line to end and kept text on top
    expect(svg.children()[n - 1]).toBe(decoratee.text);
    expect(svg.children()[n - 2]).toBe(decoratee.line);

    decorator.remove();

    expect(decoratee.text.root()).toBeFalsy();
    expect(decoratee.line.root()).toBeFalsy();

    expect(svg.children().length).toBe(n - 2);
  });
});
