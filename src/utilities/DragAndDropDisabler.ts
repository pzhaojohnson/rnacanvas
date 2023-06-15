export class DragAndDropDisabler {
  applyTo(ele: HTMLElement) {
    ele.ondragstart = () => false;
    ele.ondrop = () => false;
  }
}
