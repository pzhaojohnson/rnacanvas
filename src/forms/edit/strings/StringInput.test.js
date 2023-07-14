import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Simulate } from 'react-dom/test-utils';

import { StringInput } from './StringInput';

let props = null;

let container = null;

beforeEach(() => {
  let initialValueProvider = {
    provide: () => '',
  };

  let submittedValueRefiner = {
    refine: () => '',
  };

  let shouldSetDecider = {
    shouldSetTo: () => true,
  };

  let setter = {
    setTo: () => {},
  };

  props = {
    initialValueProvider, submittedValueRefiner, shouldSetDecider, setter,
  };

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  props = null;
});

describe('StringInput component', () => {
  it('renders with the initial value provided by the provider', () => {
    props.initialValueProvider.provide = () => '8123iuhwekbjw8913';

    act(() => { render(<StringInput {...props} />, container); });

    expect(container.firstChild.value).toBe('8123iuhwekbjw8913');
  });

  it('can set on blur', () => {
    act(() => { render(<StringInput {...props} />, container); });

    props.submittedValueRefiner.refine = () => '998ysdhk13kj398le';
    props.shouldSetDecider.shouldSetTo = () => true;
    props.setter.setTo = jest.fn();

    Simulate.blur(container.firstChild);

    expect(props.setter.setTo).toHaveBeenCalledTimes(1);
    expect(props.setter.setTo.mock.calls[0][0]).toBe('998ysdhk13kj398le');
  });

  it('can set on enter key up', () => {
    act(() => { render(<StringInput {...props} />, container); });

    props.submittedValueRefiner.refine = () => '989237YKJHEQKJ198';
    props.shouldSetDecider.shouldSetTo = () => true;
    props.setter.setTo = jest.fn();

    Simulate.keyUp(container.firstChild, { key: 'Enter' });

    expect(props.setter.setTo).toHaveBeenCalledTimes(1);
    expect(props.setter.setTo.mock.calls[0][0]).toBe('989237YKJHEQKJ198');
  });

  it('passes the submitted value to the refiner', () => {
    act(() => { render(<StringInput {...props} />, container); });

    container.firstChild.value = '90D-3RNCXXC.XVUHA';
    Simulate.change(container.firstChild, { bubbles: true });

    props.submittedValueRefiner.refine = jest.fn(() => '');

    Simulate.blur(container.firstChild);

    expect(props.submittedValueRefiner.refine).toHaveBeenCalledTimes(1);

    let call = props.submittedValueRefiner.refine.mock.calls[0];
    expect(call[0]).toBe('90D-3RNCXXC.XVUHA');
  });

  it('passes the refined submitted value to the should-set decider', () => {
    act(() => { render(<StringInput {...props} />, container); });

    props.submittedValueRefiner.refine = () => '9309sojnjc635613uyknsj';
    props.shouldSetDecider.shouldSetTo = jest.fn(() => true);

    Simulate.blur(container.firstChild);

    expect(props.shouldSetDecider.shouldSetTo).toHaveBeenCalledTimes(1);

    let call = props.shouldSetDecider.shouldSetTo.mock.calls[0];
    expect(call[0]).toBe('9309sojnjc635613uyknsj');
  });

  it('passes the refined submitted value to the setter', () => {
    act(() => { render(<StringInput {...props} />, container); });

    props.submittedValueRefiner.refine = () => '9v89hjngj3081313y';
    props.shouldSetDecider.shouldSetTo = () => true;
    props.setter.setTo = jest.fn();

    Simulate.blur(container.firstChild);

    expect(props.setter.setTo).toHaveBeenCalledTimes(1);
    expect(props.setter.setTo.mock.calls[0][0]).toBe('9v89hjngj3081313y');
  });

  it('does not set when the decider says not to', () => {
    act(() => { render(<StringInput {...props} />, container); });

    props.shouldSetDecider.shouldSetTo = () => false;
    props.setter.setTo = jest.fn();

    Simulate.blur(container.firstChild);

    expect(props.setter.setTo).not.toHaveBeenCalled();

    props.shouldSetDecider.shouldSetTo = () => true;

    Simulate.blur(container.firstChild);

    // now it does set
    expect(props.setter.setTo).toHaveBeenCalledTimes(1);
  });

  it('resets the displayed value on submission rejection', () => {
    act(() => { render(<StringInput {...props} />, container); });

    container.firstChild.value = 'asdf';
    Simulate.change(container.firstChild, { bubbles: true });

    props.initialValueProvider.provide = () => '889iu3kjfankdjknoci89';
    props.shouldSetDecider.shouldSetTo = () => false;

    Simulate.blur(container.firstChild);

    expect(container.firstChild.value).toBe('889iu3kjfankdjknoci89');
  });

  it('requeries the initial value provider on submission rejection', () => {
    act(() => { render(<StringInput {...props} />, container); });

    props.initialValueProvider.provide = jest.fn(() => 'asdf');
    props.shouldSetDecider.shouldSetTo = () => false;

    Simulate.blur(container.firstChild);

    // should requery to get the most up-to-date value
    expect(props.initialValueProvider.provide).toHaveBeenCalledTimes(1);
  });

  it('renders with the provided ID', () => {
    props.id = 'auiwuefhho2892398hiud';

    act(() => { render(<StringInput {...props} />, container); });

    expect(container.firstChild.id).toBe('auiwuefhho2892398hiud');
  });

  it('renders with the provided style props', () => {
    props.style = { margin: '2px 0px 318px 532px' };

    act(() => { render(<StringInput {...props} />, container); });

    expect(container.firstChild.style.margin).toBe('2px 0px 318px 532px');
  });
});
