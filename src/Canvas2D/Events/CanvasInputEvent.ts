/**
 * CanvasKeyboardEvent个CanvasMouseEvent都继承自这个类
 * 上面两个类的事件可以组合起来使用
 */
export class CanvasInputEvent {
    // 设定常用快捷键
    public altKey: boolean;
    public ctrlKey: boolean;
    public shiftkey: boolean;

    public type: EInputEventType;
    public constructor(altKey=false, ctrlKey=false,
         shiftkey=false,type=EInputEventType.MOUSEEVENT) {
        this.altKey = altKey;
        this.ctrlKey =ctrlKey;
        this.shiftkey = shiftkey;
        this.type = type

    }

}

export enum EInputEventType {
    MOUSEEVENT,
    MOUSEDOWN,
    MOUSEUP,
    MOUSEMOVE,
    MOUSEDRAG,
    KEYBOARDEVENT,
    KEYUP,
    KEYDOWN,
    KEYPRESS
};

export enum EMouseKeyType {
    LEFT,
    MIDDLE,
    RIGHT
}