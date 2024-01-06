import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import * as fs from 'fs';

import { AppWrapper } from './openDrawing';

const jsonDrawingFilesDirectoryPath = 'src/forms/open/saved/test-inputs/json-drawings';

function readJSONDrawingFile(name) {
  let path = jsonDrawingFilesDirectoryPath + '/' + name;

  return fs.readFileSync(path, 'utf8');
}

const legacyDrawingFilesDirectoryPath = 'src/forms/open/saved/legacy/test-inputs';

function readLegacyDrawingFile(name) {
  let path = legacyDrawingFilesDirectoryPath + '/' + name;

  return fs.readFileSync(path, 'utf8');
}

class FileMock {
  constructor({ name, contents }) {
    this.name = name;
    this.contents = contents;
  }

  text() {
    return new Promise(resolve => resolve(this.contents));
  }
}

function openJSONDrawingFile(name) {
  let contents = readJSONDrawingFile(name);
  return new FileMock({ name, contents });
}

function openLegacyDrawingFile(name) {
  let contents = readLegacyDrawingFile(name);
  return new FileMock({ name, contents });
}

let app = null;
let appWrapper = null;

beforeEach(() => {
  app = new App({ SVG });
  app.appendTo(document.body);

  appWrapper = new AppWrapper(app);
});

afterEach(() => {
  appWrapper = null;

  app.remove();
  app = null;
});

describe('AppWrapper class', () => {
  test('app property', () => {
    expect(appWrapper.app).toBe(app);
  });

  test('openJSONDrawing method', () => {
    let file = openJSONDrawingFile('tertiary-bonds.rnacanvas');

    return file.text().then(drawingFileContents => {
      appWrapper.openJSONDrawing({ drawingFileContents });
      expect(app.drawing.sequences.length).toBe(1);
      expect(app.drawing.sequences[0].length).toBe(305);
    });
  });

  describe('openDrawing method', () => {
    test('JSON drawing with .rnacanvas extension', () => {
      let file = openJSONDrawingFile('hairpin.rnacanvas');

      return appWrapper.openDrawing({ file }).then(() => {
        expect(app.drawing.sequences.length).toBe(1);
        expect(app.drawing.sequences[0].length).toBe(25);
      });
    });

    test('JSON drawing with .rna2drawer2 extension', () => {
      let file = openJSONDrawingFile('hairpins.rna2drawer2');

      return appWrapper.openDrawing({ file }).then(() => {
        expect(app.drawing.sequences.length).toBe(1);
        expect(app.drawing.sequences[0].length).toBe(104);
      });
    });

    test('JSON drawing with .rna2drawer extension', () => {
      let file = openJSONDrawingFile('json-drawing.rna2drawer');

      return appWrapper.openDrawing({ file }).then(() => {
        expect(app.drawing.sequences.length).toBe(1);
        expect(app.drawing.sequences[0].length).toBe(104);
      });
    });

    test('invalid JSON drawing file', () => {
      let file = openJSONDrawingFile('invalid-base-text-id.rnacanvas');

      return expect(
        appWrapper.openDrawing({ file })
      ).rejects.toEqual(new Error('Invalid drawing file.'));
    });

    /**
     * A drawing from the original RNA2Drawer desktop app
     * (from before the web app was even made).
     */
    test('a legacy drawing file', () => {
      let file = openLegacyDrawingFile('hairpin.rna2drawer');

      return expect(
        appWrapper.openDrawing({ file })
      ).rejects.toEqual(new Error('Invalid drawing file.'));
    });

    test('empty drawing file', () => {
      let file = openJSONDrawingFile('empty.rnacanvas');

      return expect(
        appWrapper.openDrawing({ file })
      ).rejects.toEqual(new Error('Drawing file is empty.'));
    });

    it('specifies drawing title when necessary', () => {
      let file = openJSONDrawingFile('qwer.rnacanvas');

      return appWrapper.openDrawing({ file }).then(() => {
        expect(app.drawing.sequences[0].id).toBe('asdf');
        expect(app.drawingTitle.value).toBe('qwer');
        expect(app.drawingTitle.specifiedValue).toBe('qwer');
      });
    });

    it('does not specify drawing title when not necessary', () => {
      let file = openJSONDrawingFile('small-structure.rnacanvas');

      return appWrapper.openDrawing({ file }).then(() => {
        expect(app.drawing.sequences[0].id).toBe('small-structure');
        expect(app.drawingTitle.value).toBe('small-structure');
        expect(app.drawingTitle.specifiedValue).toBeUndefined();
      });
    });
  });
});
