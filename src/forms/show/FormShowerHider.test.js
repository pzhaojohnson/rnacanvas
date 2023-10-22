import { FormShowerHider } from './FormShowerHider';

class ConfigFactory {
  /**
   * Produces a mock configuration object for a form shower-hider.
   */
  produceMock() {
    return {
      documentBody: {
        appendChild: jest.fn(),
      },
      aFormWithFixedPositioning: {
        remove: jest.fn(),
      },
      hideSignaller: {
        addListener: jest.fn(),
      },
    };
  }
}

describe('FormShowerHider class', () => {
  describe('show method', () => {
    it('appends the form to the document body', () => {
      let config = (new ConfigFactory()).produceMock();

      let formShowerHider = new FormShowerHider(config);

      expect(config.documentBody.appendChild).not.toHaveBeenCalled();

      formShowerHider.show();

      expect(config.documentBody.appendChild).toHaveBeenCalledTimes(1);

      expect(config.documentBody.appendChild.mock.calls[0][0]).toBe(config.aFormWithFixedPositioning);
      expect(config.aFormWithFixedPositioning).toBeTruthy();
    });
  });

  it('hides forms when the hide signaller says to', () => {
    let config = (new ConfigFactory()).produceMock();

    let hideSignalListener = null;

    config.hideSignaller.addListener = listener => hideSignalListener = listener;

    new FormShowerHider(config);

    expect(config.aFormWithFixedPositioning.remove).not.toHaveBeenCalled();

    hideSignalListener();

    expect(config.aFormWithFixedPositioning.remove).toHaveBeenCalledTimes(1);
  });
});
