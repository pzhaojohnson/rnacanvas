import { RemoveNode } from './RemoveNode';

describe('RemoveNode class', () => {
  test('do method', () => {
    let targetNode = { remove: jest.fn() };

    let task = new RemoveNode(targetNode);

    expect(targetNode.remove).not.toHaveBeenCalled();

    task.do();

    expect(targetNode.remove).toHaveBeenCalledTimes(1);
  });
});
