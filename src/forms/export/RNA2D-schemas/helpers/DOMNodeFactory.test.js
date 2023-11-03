import { DOMNodeFactory } from './DOMNodeFactory';

let domNodeFactory = null;

let buildingBlocks = null;

beforeEach(() => {
  domNodeFactory = new DOMNodeFactory();

  buildingBlocks = {
    closeButton: document.createElement('button'),
    exportButton: document.createElement('button'),
    document,
  };
});

describe('DOMNodeFactory class', () => {
  describe('produceUsing method', () => {
    it('uses the provided close button', () => {
      buildingBlocks.closeButton = document.createElement('button');
      buildingBlocks.closeButton.textContent = 'Close button - 938243298235923';

      let domNode = domNodeFactory.produceUsing(buildingBlocks);

      expect(domNode.textContent.includes('Close button - 938243298235923')).toBeTruthy();
    });

    it('uses the provided export button', () => {
      buildingBlocks.exportButton = document.createElement('button');
      buildingBlocks.exportButton.textContent = 'Export button - 4768274698274918';

      let domNode = domNodeFactory.produceUsing(buildingBlocks);

      expect(domNode.textContent.includes('Export button - 4768274698274918')).toBeTruthy();
    });
  });
});
