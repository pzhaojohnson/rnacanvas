import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Simulate } from 'react-dom/test-utils';

import { SelectBasesByTextContentForm } from './SelectBasesByTextContentForm';

import { textContentInputElementId } from './SelectBasesByTextContentForm';

let selectRequestHandler = null;

let props = null;

let container = null;

beforeEach(() => {
  selectRequestHandler = {
    handle: () => {},
  };

  props = {
    close: () => {},
    history: {
      goBackward: () => {},
      canGoBackward: () => false,
      goForward: () => {},
      canGoForward: () => false,
    },
    selectRequestHandler,
  };

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  props = null;

  selectRequestHandler = null;
});

describe('SelectBasesByTextContentForm component', () => {
  test('initial text content input is not blank', () => {
    act(() => {
      render(<SelectBasesByTextContentForm {...props} />, container);
    });

    let input = document.getElementById(textContentInputElementId);
    expect(input.value.trim().length).toBeGreaterThan(0);
  });

  describe('on select button press', () => {
    it('passes select request with input text content to handler', () => {
      act(() => {
        render(<SelectBasesByTextContentForm {...props} />, container);
      });

      let input = document.getElementById(textContentInputElementId);
      input.value = '989y23hdj';
      Simulate.change(input);

      let selectButton = container.getElementsByTagName('button')[0];

      props.selectRequestHandler.handle = jest.fn();

      Simulate.click(selectButton);

      expect(props.selectRequestHandler.handle).toHaveBeenCalledTimes(1);

      expect(props.selectRequestHandler.handle.mock.calls[0][0].textContent)
        .toBe('989y23hdj');
    });
  });

  it('shows errors thrown by the select request handler', () => {
    act(() => {
      render(<SelectBasesByTextContentForm {...props} />, container);
    });

    let selectButton = container.getElementsByTagName('button')[0];

    props.selectRequestHandler.handle = () => {
      throw new Error('0923u3twafdkjsf32');
    };

    Simulate.click(selectButton);

    expect(container.textContent).toMatch('0923u3twafdkjsf32');
  });

  it('remembers the input text content between mountings', () => {
    act(() => {
      render(<SelectBasesByTextContentForm {...props} />, container);
    });

    let input = document.getElementById(textContentInputElementId);
    input.value = 'dkjhf923y8rhfkj';
    Simulate.change(input);

    act(() => { unmountComponentAtNode(container); });

    input = document.getElementById(textContentInputElementId);
    expect(input).toBeFalsy();

    act(() => {
      render(<SelectBasesByTextContentForm {...props} />, container);
    });

    input = document.getElementById(textContentInputElementId);
    expect(input.value).toBe('dkjhf923y8rhfkj');
  });
});
