var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Application } from './Application';
var WebGLApplication = /** @class */ (function (_super) {
    __extends(WebGLApplication, _super);
    function WebGLApplication(canvas, contextAttributes) {
        var _this = _super.call(this, canvas) || this;
        _this.contenxt3D = _this.canvas.getContext('webgl', contextAttributes);
        if (_this.contenxt3D === null) {
            _this.contenxt3D = _this.canvas.getContext('webgl2', contextAttributes);
            if (_this.contenxt3D === null) {
                throw new Error('无法创建WebGLRenderingContext上下文对象');
            }
        }
        return _this;
    }
    return WebGLApplication;
}(Application));
export { WebGLApplication };
