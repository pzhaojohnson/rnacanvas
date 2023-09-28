import styles from './DOMNode.css';

import appIconSrc from './appIconSrc.svg';

class HeaderFactory {
  produce() {
    let appIcon = document.createElement('img');
    appIcon.classList.add(styles.appIcon);
    appIcon.src = appIconSrc;

    let rnaText = document.createElement('p');
    rnaText.classList.add(styles.headerRNAText);
    rnaText.textContent = 'RNA';

    let canvasText = document.createElement('p');
    canvasText.classList.add(styles.headerCanvasText);
    canvasText.textContent = 'canvas';

    let header = document.createElement('div');
    header.classList.add(styles.header);
    header.appendChild(appIcon);
    header.appendChild(rnaText);
    header.appendChild(canvasText);
    return header;
  }
}

class IntroFactory {
  produce() {
    let intro = document.createElement('p');
    intro.classList.add(styles.mainText, styles.intro);
    intro.textContent = 'You have opened an RNA 2D schema in RNAcanvas!';
    return intro;
  }
}

class BulletPointFactory {
  produce() {
    let bulletPoint = document.createElement('div');
    bulletPoint.classList.add(styles.bulletPoint);
    return bulletPoint;
  }
}

class BulletedItemFactory {
  produce(textContent: string) {
    let bulletPointFactory = new BulletPointFactory();
    let bulletPoint = bulletPointFactory.produce();

    let text = document.createElement('p');
    text.classList.add(styles.mainText);
    text.textContent = textContent;

    let bulletedItem = document.createElement('div');
    bulletedItem.classList.add(styles.bulletedItem);
    bulletedItem.appendChild(bulletPoint);
    bulletedItem.appendChild(text);
    return bulletedItem;
  }
}

let availableFeatureDescriptions = [
  'Move bases around',
  'Color, circle and number bases',
  'Annotate with structure probing data (e.g., SHAPE)',
  'Add and remove secondary and tertiary base-pairs',
  'Color bonds and adjust their widths',
  'Add Leontis-Westhof notation to bonds',
  'Search for complementary sequences and find motifs',
  'Add text labels to structural features',
  'Export in SVG and PowerPoint formats',
  'Granularly scale exported drawings',
];

class AvailableFeaturesListFactory {
  produce() {
    let leadingText = document.createElement('p');
    leadingText.classList.add(styles.mainText);
    leadingText.textContent = 'In RNAcanvas, you can...';

    let bulletedItems = document.createElement('div');
    bulletedItems.classList.add(styles.availableFeaturesListBulletedItems);

    let bulletedItemFactory = new BulletedItemFactory();

    availableFeatureDescriptions.forEach(description => {
      let bulletedItem = bulletedItemFactory.produce(description);
      bulletedItems.appendChild(bulletedItem);
    });

    let availableFeaturesList = document.createElement('div');
    availableFeaturesList.classList.add(styles.availableFeaturesList);
    availableFeaturesList.appendChild(leadingText);
    availableFeaturesList.appendChild(bulletedItems);
    return availableFeaturesList;
  }
}

let unavailableFeatureDescriptions = [
  'Insert subsequences',
];

class UnavailableFeaturesListFactory {
  produce() {
    let leadingText = document.createElement('p');
    leadingText.classList.add(styles.mainText);
    leadingText.textContent = 'Currently, it is not possible to...';

    let bulletedItems = document.createElement('div');
    bulletedItems.classList.add(styles.unavailableFeaturesListBulletedItems);

    let bulletedItemFactory = new BulletedItemFactory();

    unavailableFeatureDescriptions.forEach(description => {
      let bulletedItem = bulletedItemFactory.produce(description);
      bulletedItems.appendChild(bulletedItem);
    });

    let trailingText = document.createElement('p');
    trailingText.classList.add(styles.mainText);
    trailingText.classList.add(styles.unavailableFeaturesListTrailingText);
    trailingText.textContent = '...for drawings made from an RNA 2D schema';

    let unavailableFeaturesList = document.createElement('div');
    unavailableFeaturesList.classList.add(styles.unavailableFeaturesList);
    unavailableFeaturesList.appendChild(leadingText);
    unavailableFeaturesList.appendChild(bulletedItems);
    unavailableFeaturesList.appendChild(trailingText);
    return unavailableFeaturesList;
  }
}

class ContactEmailLineFactory {
  produce() {
    let leadingText = document.createElement('span');
    leadingText.classList.add(styles.mainText);
    leadingText.classList.add(styles.contactEmailLineLeadingText);
    leadingText.textContent = 'If you have any questions, email';

    let contactEmailLink = document.createElement('a');
    contactEmailLink.classList.add(styles.contactEmailLink);
    contactEmailLink.href = 'mailto:contact@rnacanvas.app';
    contactEmailLink.textContent = 'contact@rnacanvas.app';

    let contactEmailLine = document.createElement('p');
    contactEmailLine.classList.add(styles.contactEmailLine);
    contactEmailLine.appendChild(leadingText);
    contactEmailLine.appendChild(contactEmailLink);
    return contactEmailLine;
  }
}

export type ConstructorArgs = {
  /**
   * The close button to include as a child inside produced DOM
   * nodes.
   */
  closeButton: HTMLElement;
};

/**
 * Produces the actual DOM node for an on-open RNA 2D info dialog.
 */
export class DOMNodeFactory {
  _closeButton: HTMLElement;

  constructor(args: ConstructorArgs) {
    let { closeButton } = args;

    this._closeButton = closeButton;
  }

  produce(): HTMLElement {
    let componentFactories = [
      new HeaderFactory(),
      new IntroFactory(),
      new AvailableFeaturesListFactory(),
      new UnavailableFeaturesListFactory(),
      new ContactEmailLineFactory(),
    ];

    let closeButtonContainer = document.createElement('div');
    closeButtonContainer.classList.add(styles.closeButtonContainer);
    closeButtonContainer.appendChild(this._closeButton);

    let components = componentFactories.map(factory => factory.produce());

    // add last to keep close button on top and clickable
    components.push(closeButtonContainer);

    let domNode = document.createElement('div');
    domNode.classList.add(styles.domNode);
    components.forEach(component => domNode.appendChild(component));
    return domNode;
  }
}
