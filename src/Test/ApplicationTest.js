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
import { Application } from '../Canvas2D/Application.js';
var ApplicationTest = /** @class */ (function(_super) {
    __extends(ApplicationTest, _super);

    function ApplicationTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @override dispatchKeyDown from Application
    ApplicationTest.prototype.dispatchKeyDown = function(evt) {
        console.log('key ' + evt.key + ' is downed');
    };
    ApplicationTest.prototype.dispatchMouseDown = function(evt) {
        console.log('canvasPosition: ' + evt.canvasPosition);
    };
    // @override 
    ApplicationTest.prototype.update = function(elapedMsec, intervalSec) {
        console.log('elapedMsec: ' + elapedMsec + ' intercvalSec: ' + intervalSec);
    };
    // @override
    ApplicationTest.prototype.render = function() {
        console.log('调用render方法!');
    };
    return ApplicationTest;
}(Application));
var canvas = document.getElementById('canvas');
var app = new ApplicationTest(canvas);
app.update(0, 0);
app.render();
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
startButton.onclick = function(evt) {
    app.start();
};
stopButton.onclick = function(evt) {
    app.stop();
};