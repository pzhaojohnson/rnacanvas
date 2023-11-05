import { Signaller } from './Signaller';

describe('Signaller class', () => {
  it('calls all added listeners when it gives the signal', () => {
    let signaller = new Signaller();

    let listeners = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
    listeners.forEach(listener => signaller.addListener(listener));

    listeners.forEach(listener => expect(listener).not.toHaveBeenCalled());
    signaller.signal();
    listeners.forEach(listener => expect(listener).toHaveBeenCalledTimes(1));
  });

  test('giving the signal with zero added listeners', () => {
    let signaller = new Signaller();

    expect(() => signaller.signal()).not.toThrow();
  });
});
