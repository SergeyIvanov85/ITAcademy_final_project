export  const  OneFrameTime = 17;

export const createDiv: (
  classList: string[],
  children?: HTMLElement[]
) => HTMLElement = (classList, children = []) => {
  const  div = document.createElement('div');
  div.classList.add(...classList);
  children.forEach((el) => {
    div.appendChild(el);
  });
  return div;
}

export const createElement: (name: string, attr: {[key: string]: any}) => any = (
  name, attr) => {
  const xmlns = 'http://www.w3.org/TR/SVG';
  const  element = document.createElementNS(xmlns, name);
  Object.keys(attr).forEach((key) => {
    element.setAttributeNS(null, key, attr[key]);
  });
  return element;
}
