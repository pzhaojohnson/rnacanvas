import { AppendNodeToParent } from './AppendNodeToParent';

describe('AppendNodeToParent class', () => {
  test('do method', () => {
    let targetNode = {};
    let parentNode = { appendChild: jest.fn() };

    let task = new AppendNodeToParent(targetNode, parentNode);

    expect(parentNode.appendChild).not.toHaveBeenCalled();

    task.do();

    expect(parentNode.appendChild).toHaveBeenCalledTimes(1);

    expect(parentNode.appendChild.mock.calls[0][0]).toBe(targetNode);
    expect(targetNode).toBeTruthy();
  });
});
