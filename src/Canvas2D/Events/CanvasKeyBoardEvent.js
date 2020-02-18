var __extends = (this && this.__extends) || (function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] }
                instanceof Array && function(d, b) { d.__proto__ = b; }) ||
            function(d, b) { for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function(d, b) {
        extendStatics(d, b);

        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CanvasInputEvent, EInputEventType } from './CanvasInputEvent.js';
var CanvasKeyBoardEvent = /** @class */ (function(_super) {
    __extends(CanvasKeyBoardEvent, _super);

    function CanvasKeyBoardEvent(key, keyCode, repeat, altKey, ctrlKey, shiftKey) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        var _this = _super.call(this, altKey, ctrlKey, shiftKey, EInputEventType.KEYBOARDEVENT) || this;
        _this.key = key;
        _this.keyCode = keyCode;
        _this.repeat = repeat;
        return _this;
    }
    return CanvasKeyBoardEvent;
}(CanvasInputEvent));
export { CanvasKeyBoardEvent };