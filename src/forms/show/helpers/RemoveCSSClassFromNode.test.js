import { RemoveCSSClassFromNode } from './RemoveCSSClassFromNode';

describe('RemoveCSSClassFromNode class', () => {
  test('do method', () => {
    let targetNode = { classList: { remove: jest.fn() } };
    let cssClassName = 'CSS class - 38475891724909284938';

    let task = new RemoveCSSClassFromNode(targetNode, cssClassName);

    expect(targetNode.classList.remove).not.toHaveBeenCalled();

    task.do();

    expect(targetNode.classList.remove).toHaveBeenCalledTimes(1);
    expect(targetNode.classList.remove.mock.calls[0][0]).toBe('CSS class - 38475891724909284938');
  });
});
