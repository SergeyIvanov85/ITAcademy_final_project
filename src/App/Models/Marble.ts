import { createDiv } from "../Tools/tools";

export class Marble {

  constructor({color = `#ff2244`}) {
    this.Color = color;
    this.DOM.style.backgroundColor = this.Color;
    this.DOM.style.width = `${Marble.Size}px`;
    this.DOM.style.height = `${Marble.Size}px`;
  }

  static readonly Size = 60;
  readonly ID = `${(~~(Math.random() * 1000000000)).toString(16).toLocaleUpperCase()}`;
  readonly DOM: HTMLElement = createDiv(['marble']);
  readonly Color: string;
  private parent: HTMLElement | null;
  x: number;
  y: number;

  setPosition(x: number, y: number): Marble {
    this.x = x;
    this.y = y;
    return this;
  }
  overlap(marble: Marble): number {
    let r = Marble.Size - Math.sqrt((this.x - marble.x) ** 2 + (this.y - marble.y) ** 2);
    return  r;
  }
  
}