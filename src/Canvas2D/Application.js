import { CanvasMouseEvent } from "./Events/CanvasMouseEvent.js";
import { CanvasKeyBoardEvent } from "./Events/CanvasKeyBoardEvent.js";
import { vec2 } from "../Math/Vec2.js";
/**
 *  # 可以启动动画循环和结束动画循环
 *  # 可以进行基于时间的更新与重绘
 *  # 可以对输入事件（鼠标或者键盘事件）进行分发和响应
 *  # 可以被继承扩展， 用于Canvas2D和WebGL渲染
 */
var Application = /** @class */ (function() {
    function Application(canvas) {
        this._start = false; //是否开始一直循环
        this._requestId = -1;
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
    Application.prototype.dispatchMouseDown = function(evt) {};
    Application.prototype.dispatchMouseUp = function(evt) {};
    Application.prototype.dispatchMouseMove = function(evt) {};
    Application.prototype.dispatchMouseDrag = function(evt) {};
    Application.prototype.dispatchKeyPress = function(evt) {};
    Application.prototype.dispatchKeyDown = function(evt) {};
    Application.prototype.dispatchKeyUp = function(evt) {};
    Application.prototype.handleEvent = function(evt) {
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
    };
    Application.prototype.start = function() {
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
    };
    Application.prototype.stop = function() {
        if (this._start) {
            //使用window.requestAnimationFrame来取消动画帧
            cancelAnimationFrame(this._requestId);
            this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    };
    Application.prototype.isRunning = function() {
        return this._start;
    };
    Application.prototype.step = function(timeStamp) {
        var _this = this;
        if (this._startTime === -1)
            this._startTime = timeStamp;
        if (this._lastTime === -1)
            this._lastTime = timeStamp;
        // 计算当前时间第一调用step的时间差，以毫秒为单位
        // 由于intervalSec是以秒为单位，所以要除以1000
        var elapsedMsec = timeStamp - this._startTime;
        var intervalSec = (timeStamp - this._lastTime) / 1000.0;
        this._lastTime = timeStamp;
        // 调用更新
        this.update(elapsedMsec, intervalSec);
        // 再进行渲染
        this.render();
        // 用递归的方法进行循环操作
        requestAnimationFrame(function(elapsedMsec) {
            // 调用自己
            _this.step(elapsedMsec);
        });
    };
    // 这里将更新函数定义为虚函数，使得这个类的子类可以被override
    Application.prototype.update = function(elapsedMsec, intervalSec) {};
    Application.prototype.render = function() {};
    Application.prototype._viewportToCanvasCoordinate = function(evt) {
        if (this.canvas) {
            var rect = this.canvas.getBoundingClientRect();
            if (evt.type === "mousedown") {
                console.log("boundingClientRect: " + JSON.stringify(rect));
                console.log("clientX: " + evt.clientX + " clientY: " + evt.clientY);
            }
            if (evt.target) {
                var borderLeftWidth = 0;
                var borderTopWidth = 0;
                var paddingLeft = 0;
                var paddingTop = 0;
                var decl = window.getComputedStyle(evt.target);
                var strNumber = decl.borderLeftWidth;
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
                var x = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
                var y = evt.clientY - rect.top - borderTopWidth - paddingTop;
                var pos = vec2.create(x, y);
                if (evt.type === "mousedown") {
                    console.log("borderLeftWidth: " +
                        borderLeftWidth +
                        "borderTopWidth: " +
                        borderTopWidth);
                    console.log("paddingLeft: " + paddingLeft + " paddingTop: " + paddingTop);
                    console.log("canvasPosition: " + pos.toString());
                }
                return pos;
            }
            throw new Error("canvas为null");
        }
        throw new Error("canvas为null");
    };
    Application.prototype._toCanvaskeyBoardEvent = function(evt) {
        var event = evt;
        var canvasKeyboardEvent = new CanvasKeyBoardEvent(event.key, event.keyCode, event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasKeyboardEvent;
    };
    Application.prototype._toCanvasMouseEvent = function(evt) {
        var event = evt;
        var mousePosition = this._viewportToCanvasCoordinate(event);
        var canvasMouseEvent = new CanvasMouseEvent(mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasMouseEvent;
    };
    return Application;
}());
export { Application };