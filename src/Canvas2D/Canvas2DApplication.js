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
var Canva2DApplication = /** @class */ (function (_super) {
    __extends(Canva2DApplication, _super);
    function Canva2DApplication(canvas, contextAttributes) {
        var _this = _super.call(this, canvas) || this;
        _this.content2D = _this.canvas.getContext('2d', contextAttributes);
        return _this;
    }
    return Canva2DApplication;
}(Application));
export { Canva2DApplication };
