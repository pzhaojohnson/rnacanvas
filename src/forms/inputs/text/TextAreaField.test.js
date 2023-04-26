import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';

import { TextAreaField } from './TextAreaField';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('TextAreaField component', () => {
  it('renders with specified label text', () => {
    act(() => {
      render(<TextAreaField label='aaaa 1122' />, container);
    });
    expect(container.textContent).toMatch(/aaaa 1122/);
  });

  it('passes value to the textarea element', () => {
    act(() => {
      render(<TextAreaField value='asdfqqw5' />, container);
    });
    let textArea = container.getElementsByTagName('textarea')[0];
    expect(textArea.value).toBe('asdfqqw5');
  });

  it('passes onChange callback to the textarea element', () => {
    let onChange = jest.fn();
    act(() => {
      render(<TextAreaField onChange={onChange} />, container);
    });
    expect(onChange).not.toHaveBeenCalled();
    let textArea = container.getElementsByTagName('textarea')[0];
    act(() => {
      textArea.value = 'CUGCCA uggcag';
      Simulate.change(textArea);
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target).toBe(textArea);
    expect(onChange.mock.calls[0][0].target.value).toBe('CUGCCA uggcag');
  });

  it('passes onBlur callback to the textarea element', () => {
    let onBlur = jest.fn();
    act(() => {
      render(<TextAreaField onBlur={onBlur} />, container);
    });
    expect(onBlur).not.toHaveBeenCalled();
    let textArea = container.getElementsByTagName('textarea')[0];
    act(() => {
      Simulate.blur(textArea);
    });
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur.mock.calls[0][0].target).toBe(textArea);
  });

  it('renders with specified styles', () => {
    act(() => {
      render(<TextAreaField style={{ marginTop: '88.27px' }} />, container);
    });
    expect(container.firstChild.style.marginTop).toBe('88.27px');
  });

  it('passes number of rows to the textarea element', () => {
    act(() => {
      render(<TextAreaField textArea={{ rows: 81 }} />, container);
    });
    let textArea = container.getElementsByTagName('textarea')[0];
    expect(textArea.rows).toBe(81);
  });

  it('passes placeholder text to the textarea element', () => {
    act(() => {
      render(<TextAreaField textArea={{ placeholder: 'asdfQWzx.' }} />, container);
    });
    let textArea = container.getElementsByTagName('textarea')[0];
    expect(textArea.placeholder).toBe('asdfQWzx.');
  });

  it('passes spellCheck attribute to the textarea element', () => {
    act(() => {
      render(<TextAreaField textArea={{ spellCheck: true }} />, container);
    });
    let textArea = container.getElementsByTagName('textarea')[0];
    // simply checking spellcheck property on textarea element doesn't seem to work
    expect(textArea.outerHTML).toMatch(/spellcheck="true"/);
    act(() => {
      render(<TextAreaField textArea={{ spellCheck: false }} />, container);
    });
    textArea = container.getElementsByTagName('textarea')[0];
    expect(textArea.outerHTML).toMatch(/spellcheck="false"/);
  });

  test('nested style prop for textarea subcomponent', () => {
    let style = { padding: '4px 2px 8px 1px', color: 'rgb(10, 11, 29)' };
    act(() => render(<TextAreaField textArea={{ style }} />, container));
    let textArea = container.getElementsByTagName('textarea')[0];
    expect(textArea.style.padding).toBe('4px 2px 8px 1px');
    expect(textArea.style.color).toBe('rgb(10, 11, 29)');
  });

  it('sets number of rows for the textarea element to 10 by default', () => {
    act(() => {
      render(<TextAreaField />, container);
    });
    let textArea = container.getElementsByTagName('textarea')[0];
    expect(textArea.rows).toBe(10);
  });
});
