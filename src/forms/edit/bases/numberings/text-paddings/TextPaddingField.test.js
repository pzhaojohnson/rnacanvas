import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Simulate } from 'react-dom/test-utils';

import { TextPaddingField } from './TextPaddingField';

let valueToDisplayDeterminer = null;

let shouldSetDecider = null;

let textPaddingsSetter = null;

let props = null;

let container = null;

beforeEach(() => {
  valueToDisplayDeterminer = {
    determine: () => '',
  };

  shouldSetDecider = {
    shouldSetTo: () => true,
  };

  textPaddingsSetter = {
    set: () => {},
  };

  props = { valueToDisplayDeterminer, shouldSetDecider, textPaddingsSetter };

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  props = null;

  textPaddingsSetter = null;

  shouldSetDecider = null;

  valueToDisplayDeterminer = null;
});

describe('TextPaddingField component', () => {
  it('displays the value returned by the determiner', () => {
    valueToDisplayDeterminer.determine = () => '12.804181';

    act(() => {
      render(<TextPaddingField {...props} />, container);
    });

    let input = container.getElementsByTagName('input')[0];
    expect(input.value).toBe('12.804181');
  });

  it('can set text paddings on blur', () => {
    shouldSetDecider.shouldSetTo = () => true;
    textPaddingsSetter.set = jest.fn();

    act(() => {
      render(<TextPaddingField {...props} />, container);
    });

    let input = container.getElementsByTagName('input')[0];
    input.value = '9.004314781';
    Simulate.change(input, { bubbles: true });

    Simulate.blur(input);
    expect(textPaddingsSetter.set).toHaveBeenCalledTimes(1);
    expect(textPaddingsSetter.set.mock.calls[0][0]).toBe(9.004314781);
  });

  it('can set text paddings on enter key up', () => {
    shouldSetDecider.shouldSetTo = () => true;
    textPaddingsSetter.set = jest.fn();

    act(() => {
      render(<TextPaddingField {...props} />, container);
    });

    let input = container.getElementsByTagName('input')[0];
    input.value = '5.229758137';
    Simulate.change(input, { bubbles: true });

    Simulate.keyUp(input, { key: 'Enter' });
    expect(textPaddingsSetter.set).toHaveBeenCalledTimes(1);
    expect(textPaddingsSetter.set.mock.calls[0][0]).toBe(5.229758137);
  });

  it('passes submitted value to the should-set decider', () => {
    shouldSetDecider.shouldSetTo = jest.fn(() => true);

    act(() => {
      render(<TextPaddingField {...props} />, container);
    });

    let input = container.getElementsByTagName('input')[0];
    input.value = '8.028011543';
    Simulate.change(input, { bubbles: true });

    Simulate.blur(input);
    expect(shouldSetDecider.shouldSetTo).toHaveBeenCalledTimes(1);
    expect(shouldSetDecider.shouldSetTo.mock.calls[0][0]).toBe(8.028011543);
  });

  it('does not set text paddings when the decider says not to', () => {
    shouldSetDecider.shouldSetTo = () => false;
    textPaddingsSetter.set = jest.fn();

    act(() => {
      render(<TextPaddingField {...props} />, container);
    });

    let input = container.getElementsByTagName('input')[0];
    input.value = '6.818415';
    Simulate.change(input, { bubbles: true });

    Simulate.blur(input);
    expect(textPaddingsSetter.set).not.toHaveBeenCalled();
  });

  it('resets displayed value upon submission rejection', () => {
    valueToDisplayDeterminer.determine = () => '8.22';
    shouldSetDecider.shouldSetTo = () => false;

    act(() => {
      render(<TextPaddingField {...props} />, container);
    });

    let input = container.getElementsByTagName('input')[0];
    input.value = '10.9038173';
    Simulate.change(input, { bubbles: true });

    expect(input.value).toBe('10.9038173');

    Simulate.blur(input);

    // reset back to original value
    expect(input.value).toBe('8.22');
  });
});
