import { DragTranslater } from './DragTranslater';

describe('DragTranslater class', () => {
  it('translates the target form by the correct amounts whenever there is a drag event on it', () => {
    let dragListener = null;

    let dragSignaller = {
      addListener: listener => dragListener = listener,
    };

    let formTranslater = {
      translate: jest.fn(),
    };

    new DragTranslater({ dragSignaller, formTranslater });

    dragListener({ movementX: 4891, movementY: -3671 });

    expect(formTranslater.translate).toHaveBeenCalledTimes(1);
    expect(formTranslater.translate.mock.calls[0][0]).toStrictEqual({ x: 4891, y: -3671 });
  });
});
