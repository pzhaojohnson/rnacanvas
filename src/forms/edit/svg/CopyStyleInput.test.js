import * as React from 'react';
import { Simulate, act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { App } from 'App';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { appendSequence } from 'Draw/sequences/add/sequence';

import { CopyStyleInput } from './CopyStyleInput';
import { StraightBond } from 'Draw/bonds/straight/StraightBond';

let app = null;
let drawing = null;
let sequence = null;
let bases = null;
let bonds = null;

let container = null;

beforeEach(() => {
  app = new App({ SVG: { SVG: NodeSVG } });
  app.appendTo(document.body);

  drawing = app.strictDrawing.drawing;
  sequence = appendSequence(drawing, { id: 'asdf', characters: 'asdf' });

  bases = [
    sequence.atPosition(1),
    sequence.atPosition(2),
    sequence.atPosition(3),
    sequence.atPosition(4),
  ];

  let line = app.strictDrawing.svg.line(30, 50, 100, 500);

  bonds = [
    new StraightBond(line, bases[0], bases[1]),
    new StraightBond(line, bases[1], bases[2]),
    new StraightBond(line, bases[2], bases[3]),
  ];

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  bases = null;
  sequence = null;
  drawing = null;

  app.remove();
  app = null;
});

describe('CopyStyleInput component', () => {
  test('id prop', () => {
    act(() => render(
      <CopyStyleInput id='asdfFDsa321' />,
      container,
    ));

    expect(container.firstChild.id).toBe('asdfFDsa321');
  });

  describe('copying the attributes of bases', () => {
    test('when the input value is less than 0', () => {
      let old_bases = bases.slice();
      act(() => render(
        <CopyStyleInput
          app={app}
          bases={bases}
        />,
        container,
      ));
      container.firstChild.value = '-1';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      // I expect no changes in bases vs old_bases
      expect(bases.every((base, i) => base === old_bases[i])).toBeTruthy();
    });

    test('when the input value is higher than the number of bases', () => {
      let old_bases = bases.slice();
      act(() => render(
        <CopyStyleInput
          app={app}  		
          bases={bases}
        />,
        container,
      ));

      container.firstChild.value = '123678';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      // I expect no changes in bases vs old_bases
      expect(bases.every((base, i) => base === old_bases[i])).toBeTruthy();
    });

    test('when the input value is empty', () => {
      let old_bases = bases.slice();
      act(() => render(
        <CopyStyleInput
          app={app}
          bases={bases}
        />,
        container,
      ));

      container.firstChild.value = '       ';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      // I expect no changes in bases vs old_bases
      expect(bases.every((base, i) => base === old_bases[i])).toBeTruthy();
    });

    test('when the input value is a valid index', () => {
      // Modify the fill of the third base
      bases[2].text = bases[2].text.attr("fill", "#00ff00");
      let pass_bases = bases.slice(0, 2);  // Copy only to the first two bases
      act(() => render(
        <CopyStyleInput
          app={app}
          bases={pass_bases} 
        />,
        container,
      ));

      container.firstChild.value = '3';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      expect(
        pass_bases.every(base => base.text.attr('fill') === "#00ff00")
      ).toBeTruthy();
    });

    test('when you copy twice, i.e. it resets the setting', () => {
      // Modify the fill of the third base
      bases[2].text = bases[2].text.attr("fill", "#00ff00");
      let pass_bases = bases.slice(0, 2);  // Copy only to the first two bases
      act(() => render(
        <CopyStyleInput
          app={app}
          bases={pass_bases} 
        />,
        container,
      ));

      container.firstChild.value = '3';  // Copy from the third base (idx 2)
      Simulate.change(container.firstChild);
      Simulate.keyUp(container.firstChild, { key: 'Enter' });

      container.firstChild.value = '4';  // Copy from the fourth base (idx 3)
      Simulate.change(container.firstChild);
      Simulate.keyUp(container.firstChild, { key: 'Enter' });

      expect(
        pass_bases.every(base => base.text.attr('fill') === "black")
      ).toBeTruthy();
    });
  });

  describe('copying the attributes of bonds', () => {
    test('when the input value is less than 0', () => {
      let old_bonds = bonds.slice();
      act(() => render(
        <CopyStyleInput
          app={app}
          bonds={bonds}
        />,
        container,
      ));
      container.firstChild.value = '-1';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      // I expect no changes in bonds vs old_bases
      expect(bonds.every((bond, i) => bond === old_bonds[i])).toBeTruthy();
    });

    test('when the input value is higher than the number of bases', () => {
      let old_bonds = bonds.slice();
      act(() => render(
        <CopyStyleInput
          app={app}
          bonds={bonds}
        />,
        container,
      ));
      container.firstChild.value = '1123678';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      // I expect no changes in bonds vs old_bases
      expect(bonds.every((bond, i) => bond === old_bonds[i])).toBeTruthy();
    });

    test('when the input value is empty', () => {
      let old_bonds = bonds.slice();
      act(() => render(
        <CopyStyleInput
          app={app}
          bonds={bonds}
        />,
        container,
      ));
      container.firstChild.value = '      ';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      // I expect no changes in bonds vs old_bases
      expect(bonds.every((bond, i) => bond === old_bonds[i])).toBeTruthy();
    });

    test('when the input value is a valid index', () => {
      // Modify the fill of the third base
      bonds[2].line = bonds[2].line.attr("fill", "#00ff00");
      let pass_bonds = bonds.slice(0, 2);  // Copy only to the first two bases
      act(() => render(
        <CopyStyleInput
          app={app}
          bonds={pass_bonds} 
        />,
        container,
      ));

      container.firstChild.value = '3';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);
      expect(
        pass_bonds.every(bond => bond.line.attr('fill') === "#00ff00")
      ).toBeTruthy();
    });

  });

});
