import { createDiv, createElement } from "../Tools/tools";
import { Player } from "./Player";
import { Marble } from "./Marble";
import { MarbelData } from "../Interfaces/MarbelData";
import { MarbelBoomData } from "../Interfaces/MarbelBoomData";

export class Zuma {
  constructor(data: {
    width: number;
    height: number;
    path: string;
    scale: number;
    playerPos: {x: number; y: number};
    updateScore?: (score: number) => void;
    updateFinal?: (isFinal: boolean) => void;
  }) {
    this.width = data.width;
    this.height = data.height;
    const svg: SVGSVGElement = createElement('svg', {
      x: '0px',
      y: '0px',
      width: `${data.width}px`,
      height: `${data.height}px`,
      viewBox: `0 0 ${data.width} ${data.height}`,
    });
    svg.appendChild(this.Path);
    this.Path.setAttributeNS(null, 'd', data.path);
    this.PathLength = this.Path.getTotalLength();

    const startHolePos = this.Path.getPointAtLength(0);
    const finalHolePos = this.Path.getPointAtLength(this.PathLength);
    const startHole = createDiv(['start-hole']);
    const finalHole = createDiv(['final-hole']);
    startHole.style.left = `${startHolePos.x}px`;
    startHole.style.top = `${startHolePos.y}px`;
    finalHole.style.left = `${finalHolePos.x}px`;
    finalHole.style.top = `${finalHolePos.y}px`;
    this.Container.appendChild(startHole);
    this.Container.appendChild(finalHole);
    this.Canvas.width = data.width * window.devicePixelRatio;
    this.Canvas.height = data.height * window.devicePixelRatio;
    this.Container.style.width = `${data.width}px`;
    this.Container.style.height = `${data.height}px`;
    this.Container.style.transform = `scale(${data.scale || 1})`;
    this.Player = new Player(data.playerPos);
    this.Player.appendTo(this.Container);
    this.colorList = [...Zuma.DefaultColorList];
    this.colorList.forEach((color) =>{
      this.marbleColorCount[color] = 0;
    })
    this.updateScore = data.updateScore;
    this.updateFinal = data.updateFinal;
  }

  static readonly DefaultColorList = ["#0C3406", "#077187", "#74A57F", "#ABD8CE", "#E4C5AF"];
  readonly width: number;
  readonly height: number;
  private readonly updateScore: undefined | ((score: number) => void);
  private readonly updateFinal: undefined | ((isFinal: boolean) => void);
  private readonly AllMarbleLength = 100;
  private readonly InitMarbleLength = 20;
  private readonly Canvas: HTMLCanvasElement = document.createElement('canvas');
  private readonly Container: HTMLElement = createDiv(['container'], [
    this.Canvas,
    createDiv(['leaf', 'leaf-01']),
    createDiv(['leaf', 'leaf-02']),
    createDiv(['leaf', 'leaf-03']),
    createDiv(['leaf', 'leaf-04']),
    createDiv(['leaf', 'leaf-05']),
    createDiv(['leaf', 'leaf-06']),
  ]);
  private readonly Path: SVGPathElement = createElement('path', {});
  private readonly PathLength: number;
  private parent: HTMLElement;
  private moveSpeed: number = 4;
  private autoAddMarbleCount = 0;
  private marbleDataList: MarbelData[] = [];
  private marbleBoomList: MarbelBoomData[] = [];
  private marbleColorCount = {};
  private time: number;
  private moveTimes: number = 0;
  private colorList: string[];
  private isStart = false;
  private _isInit = false;
  private _isFinal = false;
  private checkDeleteAfterTouchData: { [marbleId: string]: boolean; } = {};

  private readonly Player: Player;
  private playerMarble: {
    now: Marble | null;
    next: Marble | null;
  } = {
    now: null,
    next: null,
  };

  private _score = 0;

  get isInit(): boolean {
    return this._isInit;
  }

  set isFinal(isFinal: boolean) {
    this._isFinal = isFinal;
    this.updateFinal && this.updateFinal(this._isFinal);
  }

  get isFinal(): boolean {
    return this._isFinal;
  }

  set score(score: number) {
    this._score = score;
    this.updateScore && this.updateScore(this._score);
  }

  get score(): number {
    return this._score;
  }

  start(): Zuma {
    this.isStart = true;
    this.time = new Date().getTime();
    // if (!this.windowEventList.length) {
    //   this.bindEvent();
    // }
    this.animation();
    return this
  }

  stop(): Zuma {
    this.isStart = false;
    return this;
  }

  reset(): Zuma {
    this.isStart = false;
    this._isInit = false;
    this.isFinal = false;
    this.autoAddMarbleCount = 0;
    this.score = 0;
    this.moveSpeed = 4;
    this.colorList = [...Zuma.DefaultColorList];
    this.marbleDataList.length = 0;
    this.marbleBoomList.length = 0;
    this.checkDeleteAfterTouchData = {};
    this.playerMarble.now = null;
    this.playerMarble.next = null;
    this.Player
      .setMarbleColor('')
      .setNextMarbleColor('');
    Object.keys(this.marbleColorCount).forEach((color) => {
      this.marbleColorCount[color] = 0;
    });
    return this;
  }
}