/**
 * CanvasKeyboardEvent个CanvasMouseEvent都继承自这个类
 * 上面两个类的事件可以组合起来使用
 */
var CanvasInputEvent = /** @class */ (function () {
    function CanvasInputEvent(altKey, ctrlKey, shiftkey, type) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftkey === void 0) { shiftkey = false; }
        if (type === void 0) { type = EInputEventType.MOUSEEVENT; }
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.shiftkey = shiftkey;
        this.type = type;
    }
    return CanvasInputEvent;
}());
export { CanvasInputEvent };
export var EInputEventType;
(function (EInputEventType) {
    EInputEventType[EInputEventType["MOUSEEVENT"] = 0] = "MOUSEEVENT";
    EInputEventType[EInputEventType["MOUSEDOWN"] = 1] = "MOUSEDOWN";
    EInputEventType[EInputEventType["MOUSEUP"] = 2] = "MOUSEUP";
    EInputEventType[EInputEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
    EInputEventType[EInputEventType["MOUSEDRAG"] = 4] = "MOUSEDRAG";
    EInputEventType[EInputEventType["KEYBOARDEVENT"] = 5] = "KEYBOARDEVENT";
    EInputEventType[EInputEventType["KEYUP"] = 6] = "KEYUP";
    EInputEventType[EInputEventType["KEYDOWN"] = 7] = "KEYDOWN";
    EInputEventType[EInputEventType["KEYPRESS"] = 8] = "KEYPRESS";
})(EInputEventType || (EInputEventType = {}));
;
export var EMouseKeyType;
(function (EMouseKeyType) {
    EMouseKeyType[EMouseKeyType["LEFT"] = 0] = "LEFT";
    EMouseKeyType[EMouseKeyType["MIDDLE"] = 1] = "MIDDLE";
    EMouseKeyType[EMouseKeyType["RIGHT"] = 2] = "RIGHT";
})(EMouseKeyType || (EMouseKeyType = {}));
