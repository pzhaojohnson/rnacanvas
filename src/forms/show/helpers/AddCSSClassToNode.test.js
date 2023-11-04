import { AddCSSClassToNode } from './AddCSSClassToNode';

describe('AddCSSClassToNode class', () => {
  describe('do method', () => {
    it('adds the CSS class name to the CSS classes list of the target node', () => {
      let targetNode = { classList: { add: jest.fn() } };
      let cssClassName = 'CSS class - 3847593749122832384';

      let task = new AddCSSClassToNode(targetNode, cssClassName);

      expect(targetNode.classList.add).not.toHaveBeenCalled();

      task.do();

      expect(targetNode.classList.add).toHaveBeenCalledTimes(1);
      expect(targetNode.classList.add.mock.calls[0][0]).toBe('CSS class - 3847593749122832384');
    });
  });
});
