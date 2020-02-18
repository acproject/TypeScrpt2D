var vec2 = /** @class */ (function () {
    function vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.values = new Float32Array([x, y]);
    }
    vec2.create = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new vec2(x, y);
    };
    return vec2;
}());
export { vec2 };
