import { createDiv } from '../Tools/tools';

export class Player {
    constructor({ x = 0, y = 0 }) {
        this.X = x;
        this.Y = y;
        this.DOM.style.transform = `translate(calc(${this.X}px - 50%), calc(${this.Y}px - 50%)) rotate(0deg)`;
    }

    readonly Marble: HTMLElement = createDiv(['marble-1']);
    readonly NextMarbleList: HTMLElement[] = [
        createDiv(['marble-2']),
        createDiv(['marble-2']),
        createDiv(['marble-2']),
    ];
    readonly DOM: HTMLElement = createDiv(['player'], [this.Marble, ...this.NextMarbleList]);
    readonly X: number;
    readonly Y: number;

    private parent!: HTMLElement;
    rotate: number = 0;

    lookAt(x: number, y: number): Player {
        if (!this.parent) {
            return this;
        }

        const rect = this.DOM.getBoundingClientRect();
        const innerX = rect.left + (rect.right - rect.left) / 2;
        const innerY = rect.top + (rect.bottom - rect.top) / 2;
        return this.lookAtVector(x - innerX, y - innerY);
    }

    lookAtVector(x: number, y: number): Player {
        this.rotate = (Math.atan2(y, x) * 180) / Math.PI + 90;
        this.DOM.style.transform = `translate(calc(${this.X}px - 50%), calc(${this.Y}px - 50%)) rotate(${this.rotate}deg)`;
        return this;
    }

    appendTo(parent: HTMLElement): Player {
        this.parent = parent;
        this.parent.appendChild(this.DOM);
        return this;
    }
    setMarbleColor(color: string): Player {
        this.Marble.style.backgroundColor = color;
        return this;
    }

    setNextMarbleColor(color: string): Player {
        this.NextMarbleList.forEach((dom) => {
            dom.style.backgroundColor = color;
        });
        return this;
    }

    getVector() {
        const innerRotate = this.rotate - 90;
        return {
            x: Math.cos((innerRotate * Math.PI) / 180) * 30,
            y: Math.sin((innerRotate * Math.PI) / 180) * 30,
        };
    }
}
