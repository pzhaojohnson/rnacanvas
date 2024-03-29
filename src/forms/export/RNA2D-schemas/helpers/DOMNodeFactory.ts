import styles from './ExportRNA2DSchemaForm.css';

import appIconSrc from './appIconSrc.svg';

export type BuildingBlocks = {
  /**
   * For closing the form.
   */
  closeButton: HTMLElement;

  /**
   * RNA 2D schemas are to be exported upon clicking this.
   */
  exportButton: HTMLElement;

  /**
   * To be used to create elements.
   */
  document: Document;
};

/**
 * Produces the actual DOM node of an export-RNA-2D-schema form.
 */
export class DOMNodeFactory {
  produceUsing(buildingBlocks: BuildingBlocks) {
    let closeButtonContainer = (new CloseButtonContainerFactory()).produceUsing(buildingBlocks);
    closeButtonContainer.append(buildingBlocks.closeButton);

    let children = [
      (new HeaderFactory()).produceUsing(buildingBlocks),
      (new MainContentFactory()).produceUsing(buildingBlocks),
    ];

    // add last to keep on top and clickable
    children.push(closeButtonContainer);

    let exportRNA2DSchemaForm = buildingBlocks.document.createElement('div');
    exportRNA2DSchemaForm.classList.add(styles.exportRNA2DSchemaForm);
    exportRNA2DSchemaForm.append(...children);
    return exportRNA2DSchemaForm;
  }
}

type BasicBuildingBlocks = {
  /**
   * To be used to create elements.
   */
  document: Document;
};

class HeaderFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let appIcon = buildingBlocks.document.createElement('img');
    appIcon.classList.add(styles.appIcon);
    appIcon.src = appIconSrc;

    let text = buildingBlocks.document.createElement('p');
    text.classList.add(styles.headerText);
    text.textContent = 'Export an RNA 2D JSON Schema';

    let header = buildingBlocks.document.createElement('div');
    header.classList.add(styles.header);
    header.append(appIcon, text);
    return header;
  }
}

class MainContentFactory {
  produceUsing(buildingBlocks: BuildingBlocks) {
    let exportButtonContainer = (new ExportButtonContainerFactory()).produceUsing(buildingBlocks);
    exportButtonContainer.append(buildingBlocks.exportButton);

    let children = [
      (new IntroLineFactory()).produceUsing(buildingBlocks),
      (new WhatGetsIncludedSectionFactory()).produceUsing(buildingBlocks),
      (new WhatIsCanonicalSectionFactory()).produceUsing(buildingBlocks),
      exportButtonContainer,
      (new SubmissionSectionFactory()).produceUsing(buildingBlocks),
      (new LocalUseSectionFactory()).produceUsing(buildingBlocks),
    ];

    let mainContent = buildingBlocks.document.createElement('div');
    mainContent.classList.add(styles.mainContent);
    mainContent.append(...children);
    return mainContent;
  }
}

class IntroLineFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let leadingText = buildingBlocks.document.createElement('span');
    leadingText.textContent = 'Convert your drawing to an ';

    let r2dtLink = buildingBlocks.document.createElement('a');
    r2dtLink.classList.add(styles.link);
    r2dtLink.href = 'https://r2dt.bio/';
    r2dtLink.target = '_blank';
    r2dtLink.rel = 'noreferrer noopener';
    r2dtLink.textContent = 'RNA 2D';

    let trailingText = buildingBlocks.document.createElement('span');
    trailingText.textContent = ' JSON schema.';

    let introLine = buildingBlocks.document.createElement('p');
    introLine.classList.add(styles.mainText);
    introLine.append(leadingText, r2dtLink, trailingText);
    return introLine;
  }
}

class WhatGetsIncludedSectionFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let leadingLine = (new WhatGetsIncludedLeadingLineFactory()).produceUsing(buildingBlocks);

    let whatGetsIncludedList = (new WhatGetsIncludedListFactory()).produceUsing(buildingBlocks);

    let whatGetsIncludedSection = buildingBlocks.document.createElement('div');
    whatGetsIncludedSection.classList.add(styles.whatGetsIncludedSection);
    whatGetsIncludedSection.append(leadingLine, whatGetsIncludedList);
    return whatGetsIncludedSection;
  }
}

class WhatGetsIncludedLeadingLineFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let line = buildingBlocks.document.createElement('p');
    line.classList.add(styles.mainText);
    line.textContent = 'Exported RNA 2D JSON schemas will include...';
    return line;
  }
}

class WhatGetsIncludedListFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let dottedLineFactory = new DottedLineFactory();

    let includedItems = [
      'The nucleotide letter sequence',
      'Canonical secondary bond base-pairs',
    ];

    let dottedLines = includedItems.map(
      item => dottedLineFactory.produceUsing({ ...buildingBlocks, textContent: item })
    );

    let whatGetsIncludedList = buildingBlocks.document.createElement('div');
    whatGetsIncludedList.classList.add(styles.whatGetsIncludedList);
    whatGetsIncludedList.append(...dottedLines);
    return whatGetsIncludedList;
  }
}

type DottedLineBuildingBlocks = {
  textContent: string;

  /**
   * To be used to create elements.
   */
  document: Document;
};

class DottedLineFactory {
  produceUsing(buildingBlocks: DottedLineBuildingBlocks) {
    let dot = buildingBlocks.document.createElement('div');
    dot.classList.add(styles.dot);

    let text = buildingBlocks.document.createElement('p');
    text.classList.add(styles.mainText);
    text.textContent = buildingBlocks.textContent;

    let dottedLine = buildingBlocks.document.createElement('div');
    dottedLine.classList.add(styles.dottedLine);
    dottedLine.append(dot, text);
    return dottedLine;
  }
}

class WhatIsCanonicalSectionFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let firstLineText = buildingBlocks.document.createElement('p');
    firstLineText.classList.add(styles.mainText, styles.whatIsCanonicalFirstLineText);
    firstLineText.textContent = 'The canonical base-pairs are: AU/AT, GC and GU/GT.';

    let firstLine = buildingBlocks.document.createElement('div');
    firstLine.classList.add(styles.whatIsCanonicalFirstLine);
    firstLine.append(firstLineText);

    let whatIsCanonicalSection = buildingBlocks.document.createElement('div');
    whatIsCanonicalSection.classList.add(styles.whatIsCanonicalSection);
    whatIsCanonicalSection.append(firstLine);
    return whatIsCanonicalSection;
  }
}

class ExportButtonContainerFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let exportButtonContainer = buildingBlocks.document.createElement('div');
    exportButtonContainer.classList.add(styles.exportButtonContainer);
    return exportButtonContainer;
  }
}

class SubmissionSectionFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let children = [
      (new SubmissionSectionLeaderFactory()).produceUsing(buildingBlocks),
      (new SubmissionOptionsListFactory()).produceUsing(buildingBlocks),
      (new SubmissionSectionTrailerFactory()).produceUsing(buildingBlocks),
    ];

    let submissionSection = buildingBlocks.document.createElement('div');
    submissionSection.classList.add(styles.submissionSection);
    submissionSection.append(...children);
    return submissionSection;
  }
}

class SubmissionSectionLeaderFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let leadingText = buildingBlocks.document.createElement('span');
    leadingText.textContent = 'To submit an exported RNA 2D JSON schema for inclusion in the R2DT ';

    let templateLibraryLink = buildingBlocks.document.createElement('a');
    templateLibraryLink.classList.add(styles.mainText, styles.link);
    templateLibraryLink.href = 'https://rnacentral.org/';
    templateLibraryLink.target = '_blank';
    templateLibraryLink.rel = 'noreferrer noopener';
    templateLibraryLink.textContent = 'template library';

    let trailingText = buildingBlocks.document.createElement('span');
    trailingText.textContent = '...';

    let submissionSectionLeader = buildingBlocks.document.createElement('p');
    submissionSectionLeader.classList.add(styles.mainText);
    submissionSectionLeader.append(leadingText, templateLibraryLink, trailingText);
    return submissionSectionLeader;
  }
}

class SubmissionOptionsListFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let options = [
      (new OpeningAGitHubIssueOptionFactory()).produceUsing(buildingBlocks),
      (new ContactEmailOptionFactory()).produceUsing(buildingBlocks),
    ];

    let submissionOptionsList = buildingBlocks.document.createElement('div');
    submissionOptionsList.classList.add(styles.submissionOptionsList);
    submissionOptionsList.append(...options);
    return submissionOptionsList;
  }
}

class OpeningAGitHubIssueOptionFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let linkToOpenAGitHubIssue = buildingBlocks.document.createElement('a');
    linkToOpenAGitHubIssue.classList.add(styles.mainText, styles.link);
    linkToOpenAGitHubIssue.href = 'https://github.com/rnacentral/r2dt/issues/new?title=A%20new%20template&body=Describe%20your%20new%20template%20and%20attach%20an%20RNA%202D%20JSON%20schema%20file';
    linkToOpenAGitHubIssue.target = '_blank';
    linkToOpenAGitHubIssue.rel = 'noreferrer noopener';
    linkToOpenAGitHubIssue.textContent = 'Open a GitHub issue';

    let dot = buildingBlocks.document.createElement('div');
    dot.classList.add(styles.dot);

    let openingAGitHubIssueOption = buildingBlocks.document.createElement('div');
    openingAGitHubIssueOption.classList.add(styles.dottedLine);
    openingAGitHubIssueOption.append(dot, linkToOpenAGitHubIssue);
    return openingAGitHubIssueOption;
  }
}

class ContactEmailOptionFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let contactEmailLink = buildingBlocks.document.createElement('a');
    contactEmailLink.classList.add(styles.link);
    contactEmailLink.href = 'mailto:help@r2dt.bio';
    contactEmailLink.textContent = 'help@r2dt.bio';

    let text = buildingBlocks.document.createElement('p');
    text.classList.add(styles.mainText);
    text.append('Or email it to: ', contactEmailLink);

    let dot = buildingBlocks.document.createElement('div');
    dot.classList.add(styles.dot);

    let contactEmailOption = buildingBlocks.document.createElement('div');
    contactEmailOption.classList.add(styles.dottedLine);
    contactEmailOption.append(dot, text);
    return contactEmailOption;
  }
}

class SubmissionSectionTrailerFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let trailer = buildingBlocks.document.createElement('p');
    trailer.classList.add(styles.mainText, styles.submissionSectionTrailer);
    trailer.textContent = 'All submissions are welcome!'
    return trailer;
  }
}

class LocalUseSectionFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let leadingText = buildingBlocks.document.createElement('span');
    leadingText.textContent = 'For local, private use of exported RNA 2D JSON schemas, see the ';

    let r2dtDocsLink = buildingBlocks.document.createElement('a');
    r2dtDocsLink.classList.add(styles.link);
    r2dtDocsLink.href = 'https://docs.r2dt.bio/en/latest/templates.html#creating-templates-using-rna-2d-json-schema-files';
    r2dtDocsLink.target = '_blank';
    r2dtDocsLink.rel = 'noreferrer noopener';
    r2dtDocsLink.textContent = 'R2DT docs';

    let trailingText = buildingBlocks.document.createElement('span');
    trailingText.textContent = '.';

    let localUseSection = buildingBlocks.document.createElement('p');
    localUseSection.classList.add(styles.mainText, styles.localUseSection);
    localUseSection.append(leadingText, r2dtDocsLink, trailingText);
    return localUseSection;
  }
}

class CloseButtonContainerFactory {
  produceUsing(buildingBlocks: BasicBuildingBlocks) {
    let closeButtonContainer = buildingBlocks.document.createElement('div');
    closeButtonContainer.classList.add(styles.closeButtonContainer);
    return closeButtonContainer;
  }
}
