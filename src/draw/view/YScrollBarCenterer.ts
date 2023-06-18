export class YScrollBarCenterer {
  /**
   * Centers the vertical scroll bar of the element.
   */
  applyTo(ele: Element) {
    let scrollHeight = ele.scrollHeight;
    let clientHeight = ele.getBoundingClientRect().height;
    ele.scrollTop = (scrollHeight / 2) - (clientHeight / 2);
  }
}
