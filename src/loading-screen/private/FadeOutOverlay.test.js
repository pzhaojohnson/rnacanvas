import { FadeOutOverlay } from './FadeOutOverlay';

describe('FadeOutOverlay component', () => {
  it('is created with the correct CSS styles', () => {
    let fadeOutOverlay = new FadeOutOverlay();
    expect(fadeOutOverlay.node.className).toBe('fadeOutOverlay');
  });

  it('uses specified animation duration', () => {
    let animationDuration = '1209ms';
    let fadeOutOverlay = new FadeOutOverlay({ style: { animationDuration } });
    expect(fadeOutOverlay.node.style.animationDuration).toBe('1209ms');
  });

  it('has a nonzero default animation duration', () => {
    let fadeOutOverlay = new FadeOutOverlay();
    expect(fadeOutOverlay.node.style.animationDuration).toBe('500ms');
  });

  it('uses specified z-index', () => {
    let zIndex = '84';
    let fadeOutOverlay = new FadeOutOverlay({ style: { zIndex } });
    expect(fadeOutOverlay.node.style.zIndex).toBe('84');
  });

  it('has a relatively high default z-index', () => {
    let fadeOutOverlay = new FadeOutOverlay();

    // 10 is probably higher than everything else in the document
    expect(fadeOutOverlay.node.style.zIndex).toBe('10');
  });

  test('show and hide methods', () => {
    let fadeOutOverlay = new FadeOutOverlay();
    let n = document.body.childNodes.length;

    fadeOutOverlay.show();
    expect(document.body.childNodes.length).toBe(n + 1);
    expect(document.body.childNodes[n]).toBe(fadeOutOverlay.node);

    fadeOutOverlay.hide();
    expect(document.body.childNodes.length).toBe(n);
    expect(document.body.childNodes[n - 1]).not.toBe(fadeOutOverlay.node);

    // try hiding again after the fade out overlay was already hidden
    expect(() => fadeOutOverlay.hide()).not.toThrow();
  });
});
