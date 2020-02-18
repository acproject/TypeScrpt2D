var __extends = (this && this.__extends) || (function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] }
                instanceof Array && function(d, b) { d.__proto__ = b; }) ||
            function(d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function(d, b) {
        extendStatics(d, b);

        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CanvasInputEvent } from './CanvasInputEvent.js';
import { vec2 } from '../../Math/Vec2.js';
var CanvasMouseEvent = /** @class */ (function(_super) {
    __extends(CanvasMouseEvent, _super);

    function CanvasMouseEvent(canvasPos, mouseButton, altkey, ctrlKey, shiftKey) {
        if (altkey === void 0) { altkey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        var _this = _super.call(this, altkey, ctrlKey, shiftKey) || this;
        _this.canvasPosition = canvasPos;
        _this.mouseButton = mouseButton;
        _this.localPosition = vec2.create();
        return _this;
    }
    return CanvasMouseEvent;
}(CanvasInputEvent));
export { CanvasMouseEvent };