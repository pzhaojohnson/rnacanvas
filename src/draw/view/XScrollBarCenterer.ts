export class XScrollBarCenterer {
  /**
   * Centers the horizontal scroll bar of the element.
   */
  applyTo(ele: Element) {
    let scrollWidth = ele.scrollWidth;
    let clientWidth = ele.getBoundingClientRect().width;
    ele.scrollLeft = (scrollWidth / 2) - (clientWidth / 2);
  }
}
