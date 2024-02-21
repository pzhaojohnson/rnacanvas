import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import { appendSequence } from 'Draw/sequences/add/sequence';

import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Simulate } from 'react-dom/test-utils';

import { isNullish } from '@rnacanvas/value-check';

import { DrawingTitleInput } from './DrawingTitleInput';

/**
 * Meant to make appending sequences easier.
 */
class StrictDrawingWrapper {
  constructor(strictDrawing) {
    this.strictDrawing = strictDrawing;
  }

  appendSequence(sequenceSpecification) {
    appendSequence(this.strictDrawing.drawing, {
      id: sequenceSpecification.id,
      characters: sequenceSpecification.sequence,
    });
  }
}

let container = null;

let app = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  app = new App({ SVG });
  app.appendTo(document.body);
});

afterEach(() => {
  app.remove();
  app = null;

  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('DrawingTitleInput component', () => {
  test('setting the drawing title to an entered value', () => {
    act(() => render(<DrawingTitleInput app={app} />, container));
    container.firstChild.value = 'Asdf 668zxmcvn';
    Simulate.change(container.firstChild);
    Simulate.blur(container.firstChild);
    expect(app.drawingTitle.value).toBe('Asdf 668zxmcvn');
  });

  test('trimming leading and trailing whitespace', () => {
    act(() => render(<DrawingTitleInput app={app} />, container));
    container.firstChild.value = '   QQ asdf    ';
    Simulate.change(container.firstChild);
    Simulate.blur(container.firstChild);
    expect(app.drawingTitle.value).toBe('QQ asdf');
  });

  test('setting the drawing title to its current value', () => {
    let drawing = new StrictDrawingWrapper(app.strictDrawing);
    drawing.appendSequence({ id: 'Seq A1', sequence: 'AAAGGG' });
    act(() => render(<DrawingTitleInput app={app} />, container));
    // should ignore leading and trailing whitespace
    container.firstChild.value = '  Seq A1   ';
    Simulate.change(container.firstChild);
    Simulate.blur(container.firstChild);
    expect(app.drawingTitle.value).toBe('Seq A1'); // is unchanged
    // drawing title was not set
    expect(isNullish(app.drawingTitle.specifiedValue)).toBeTruthy();
  });

  test('unspecifying the drawing title', () => {
    let drawing = new StrictDrawingWrapper(app.strictDrawing);
    drawing.appendSequence({ id: '11aab3', sequence: 'AAA' });
    app.drawingTitle.value = 'Drawing Title';
    expect(isNullish(app.drawingTitle.specifiedValue)).toBeFalsy();
    act(() => render(<DrawingTitleInput app={app} />, container));
    container.firstChild.value = '   '; // all whitespace
    Simulate.change(container.firstChild);
    Simulate.blur(container.firstChild);
    expect(app.drawingTitle.value).toBe('11aab3');
    expect(isNullish(app.drawingTitle.specifiedValue)).toBeTruthy();
  });

  test('unspecifying an already unspecified drawing title', () => {
    let drawing = new StrictDrawingWrapper(app.strictDrawing);
    drawing.appendSequence({ id: '1234fdsa', sequence: 'GG' });
    // drawing title is already unspecified
    expect(isNullish(app.drawingTitle.specifiedValue)).toBeTruthy();
    act(() => render(<DrawingTitleInput app={app} />, container));
    container.firstChild.value = '   '; // all whitespace
    Simulate.change(container.firstChild);
    Simulate.blur(container.firstChild);
    expect(app.drawingTitle.value).toBe('1234fdsa');
    // drawing title is still unspecified
    expect(isNullish(app.drawingTitle.specifiedValue)).toBeTruthy();
  });
});
