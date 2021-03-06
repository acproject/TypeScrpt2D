import { CanvasMouseEvent } from "./Events/CanvasMouseEvent";
import { CanvasKeyBoardEvent } from "./Events/CanvasKeyBoardEvent";
import { vec2 } from "../Math/Vec2";
/**
 *  # 可以启动动画循环和结束动画循环
 *  # 可以进行基于时间的更新与重绘
 *  # 可以对输入事件（鼠标或者键盘事件）进行分发和响应
 *  # 可以被继承扩展， 用于Canvas2D和WebGL渲染
 */

export class Application implements EventListenerObject {
  protected _start: boolean = false; //是否开始一直循环
  protected _requestId: number = -1;
  protected _lastTime!: number; // 用于时间更新和延迟
  protected _startTime!: number; // 用于时间更新和延迟
  protected canvas: HTMLCanvasElement;

  public isSupportMouseMove: boolean;
  protected _isMouseDown: boolean;

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {}
  protected dispatchMouseUp(evt: CanvasMouseEvent): void {}
  protected dispatchMouseMove(evt: CanvasMouseEvent): void {}
  protected dispatchMouseDrag(evt: CanvasMouseEvent): void {}
  protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {}
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {}
  protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {}

  public handleEvent(evt: Event): void {
    switch (evt.type) {
      case "mousedown":
        this._isMouseDown = true;
        this.dispatchMouseDown(this._toCanvasMouseEvent(evt));
        break;
      case "mouseup":
        this._isMouseDown = false;
        this.dispatchMouseUp(this._toCanvasMouseEvent(evt));
        break;
      case "mousemove":
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt));
        }
        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt));
        }
        break;
      case "keypress":
        this.dispatchKeyPress(this._toCanvaskeyBoardEvent(evt));
        break;
      case "keydown":
        this.dispatchKeyDown(this._toCanvaskeyBoardEvent(evt));
        break;
      case "keyup":
        this.dispatchKeyUp(this._toCanvaskeyBoardEvent(evt));
        break;
    }
  }

  public start(): void {
    if (!this._start) {
      this._start = true;
      this._requestId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      // 这里使用window.requestAnimationFrame来添加动画帧
      // this._requestId = requestAnimationFrame((elapsedMsec: number): void => {
      //    this.step(elapsedMsec);
      // });
      // 由于使用了箭头函数，this会变成null指向，用bind函数来明确指向当前类，如果不用bind函数，可以用this.step来进行引用传值
      this._requestId = requestAnimationFrame(this.step.bind(this));
    }
  }

  public stop(): void {
    if (this._start) {
      //使用window.requestAnimationFrame来取消动画帧
      cancelAnimationFrame(this._requestId);
      this._requestId = -1;
      this._lastTime = -1;
      this._startTime = -1;
      this._start = false;
    }
  }

  public isRunning(): boolean {
    return this._start;
  }

  protected step(timeStamp: number): void {
    if (this._startTime === -1) this._startTime = timeStamp;
    if (this._lastTime === -1) this._lastTime = timeStamp;
    // 计算当前时间第一调用step的时间差，以毫秒为单位
    // 由于intervalSec是以秒为单位，所以要除以1000
    let elapsedMsec = timeStamp - this._startTime;

    let intervalSec = (timeStamp - this._lastTime) / 1000.0;

    this._lastTime = timeStamp;
    // 调用更新
    this.update(elapsedMsec, intervalSec);
    // 再进行渲染
    this.render();
    // 用递归的方法进行循环操作
    requestAnimationFrame((elapsedMsec: number): void => {
      // 调用自己
      this.step(elapsedMsec);
    });
  }

  // 这里将更新函数定义为虚函数，使得这个类的子类可以被override
  public update(elapsedMsec: number, intervalSec: number): void {}

  public render(): void {}

  private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      let rect: ClientRect = this.canvas.getBoundingClientRect();
      if (evt.type === "mousedown") {
        console.log("boundingClientRect: " + JSON.stringify(rect));
        console.log("clientX: " + evt.clientX + " clientY: " + evt.clientY);
      }
      if (evt.target) {
        let borderLeftWidth = 0;
        let borderTopWidth = 0;
        let paddingLeft = 0;
        let paddingTop = 0;
        let decl: CSSStyleDeclaration = window.getComputedStyle(
          evt.target as HTMLElement
        );
        let strNumber: string | null = decl.borderLeftWidth;
        if (strNumber !== null) {
          borderLeftWidth = parseInt(strNumber, 10);
        }
        strNumber = decl.borderTopWidth;
        if (strNumber !== null) {
          borderTopWidth = parseInt(strNumber, 10);
        }

        strNumber = decl.paddingLeft;
        if (strNumber !== null) {
          paddingLeft = parseInt(strNumber, 10);
        }

        strNumber = decl.paddingTop;
        if (strNumber !== null) {
          paddingTop = parseInt(strNumber, 10);
        }
        let x = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
        let y = evt.clientY - rect.top - borderTopWidth - paddingTop;
        let pos: vec2 = vec2.create(x, y);
        if (evt.type === "mousedown") {
          console.log(
            "borderLeftWidth: " +
              borderLeftWidth +
              "borderTopWidth: " +
              borderTopWidth
          );
          console.log(
            "paddingLeft: " + paddingLeft + " paddingTop: " + paddingTop
          );
          console.log("canvasPosition: " + pos.toString());
        }
        return pos;
      }
      throw new Error("canvas为null");
    }
    throw new Error("canvas为null");
  }

  private _toCanvaskeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
    let event: KeyboardEvent = evt as KeyboardEvent;

    let canvasKeyboardEvent: CanvasKeyBoardEvent = new CanvasKeyBoardEvent(
      event.key,
      event.keyCode,
      event.repeat,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    );
    return canvasKeyboardEvent;
  }

  private _toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
    let event = evt as MouseEvent;
    let mousePosition: vec2 = this._viewportToCanvasCoordinate(event);
    let canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(
      mousePosition,
      event.button,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    );
    return canvasMouseEvent;
  }

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // 给canvas元素添加鼠标监听
    this.canvas.addEventListener("mousedown", this, false);
    this.canvas.addEventListener("mouseup", this, false);
    this.canvas.addEventListener("mousemove", this, false);
    // 由于在canvas中不能使用键盘监听；
    // 所以我们用window对象来监听键盘;
    window.addEventListener("keydown", this, false);
    window.addEventListener("keyup", this, false);
    window.addEventListener("keypress", this, false);
    this._isMouseDown = false;
    this.isSupportMouseMove = false;
  }
}

/**
 * 增加计数器和对应的回调函数
 * # Application类可以触发多个计时器
 * # 每个计时器可以以不同帧率来重复执行任务
 * # 每个计时器可以倒计时的方式执行一次任务
 * # 尽量让内存使用与运行效率达到相对平衡
 */

export type TimerCallback = (id: number, data: any) => void;

class Timer {
  public id:number = -1;
  public enabled:boolean = false;

  public callback: TimerCallback;
  public callbackData: any = undefined;
  public counddown: number = 0;
  public timeout: number = 0;
  public onlyOnce: boolean = false;
  constructor(callback: TimerCallback){
    this.callback = callback;
  }
}