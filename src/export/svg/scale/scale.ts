import * as SVG from '@svgdotjs/svg.js';
import { scaleStrokeDasharray } from './scaleStrokeDasharray';
import { scalePathDefinition } from './scalePathDefinition';

function scaleNumericAttribute(ele: SVG.Element | SVG.Svg, name: string, factor: number) {
  try {
    let n = new SVG.Number(ele.attr(name));
    let scaled = n.times(factor).convert('px').valueOf();
    ele.attr(name, scaled);
  } catch (error) {
    console.error(error);
    console.error(`Unable to scale ${name} attribute of element ${ele}.`);
  }
}

function scaleNumericAttributes(ele: SVG.Element | SVG.Svg, names: string[], factor: number) {
  names.forEach(name => {
    scaleNumericAttribute(ele, name, factor);
  });
}

function scaleCenterCoordinates(ele: SVG.Element, factor: number) {
  let bbox = ele.bbox();
  ele.center(factor * bbox.cx, factor * bbox.cy);
}

function scaleText(text: SVG.Text, factor: number) {
  scaleNumericAttributes(
    text,
    ['x', 'y', 'font-size'],
    factor,
  );
}

function scaleLine(line: SVG.Line, factor: number) {
  scaleNumericAttributes(
    line,
    ['x1', 'y1', 'x2', 'y2', 'stroke-width'],
    factor,
  );
  scaleStrokeDasharray(line, factor);
}

function scaleCircle(circle: SVG.Circle, factor: number) {
  scaleNumericAttributes(
    circle,
    ['cx', 'cy', 'r', 'stroke-width'],
    factor,
  );
  scaleStrokeDasharray(circle, factor);
}

function scaleRect(rect: SVG.Rect, factor: number) {
  scaleNumericAttributes(
    rect,
    ['x', 'y', 'width', 'height', 'stroke-width'],
    factor,
  );
  scaleStrokeDasharray(rect, factor);
}

function scalePath(path: SVG.Path, factor: number) {
  scaleNumericAttributes(
    path,
    ['stroke-width'],
    factor,
  );
  scaleStrokeDasharray(path, factor);
  scalePathDefinition(path, factor);
}

function scaleElements(eles: SVG.Element[], factor: number) {
  eles.forEach(ele => {
    if (ele instanceof SVG.Text) {
      scaleText(ele, factor);
    } else if (ele instanceof SVG.Line) {
      scaleLine(ele, factor);
    } else if (ele instanceof SVG.Circle) {
      scaleCircle(ele, factor);
    } else if (ele instanceof SVG.Rect) {
      scaleRect(ele, factor);
    } else if (ele instanceof SVG.Path) {
      scalePath(ele, factor);
    } else {
      if (['defs'].includes(ele.type)) {
        console.log(`Intentionally ignoring ${ele.type} element.`);
      } else {
        console.error(`Element of unexpected type: ${ele.type}. Only scaling center coordinates.`);
        scaleCenterCoordinates(ele, factor);
      }
    }
  });
}

function scaleViewbox(svg: SVG.Svg, factor: number) {
  let viewbox = svg.viewbox();
  svg.viewbox(
    factor * viewbox.x,
    factor * viewbox.y,
    factor * viewbox.width,
    factor * viewbox.height,
  );
}

export function scale(svg: SVG.Svg, factor: number) {
  scaleElements(svg.children(), factor);
  scaleViewbox(svg, factor);
  scaleNumericAttributes(
    svg,
    ['width', 'height'],
    factor,
  );
}
