var Canvas2DUtil = /** @class */ (function () {
    function Canvas2DUtil(canvas) {
        this.context = canvas.getContext('2d');
    }
    Canvas2DUtil.prototype.drawText = function (text) {
        /**
         * 因为Canvas2D和WebGL这种底层图API都是状体机模式
         * 每次绘制前都要调用save将状态进行记录
         * 然后调用restore将已修改的状态丢到，恢复到初始化状态
         */
        if (this.context != null) {
            this.context.save();
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            var centerX = this.context.canvas.width * 0.5;
            var centerY = this.context.canvas.height * 0.5;
            this.context.fillText(text, centerX, centerY);
            this.context.strokeStyle = 'green';
            this.context.strokeText(text, centerX, centerY);
            this.context.restore();
        }
    };
    return Canvas2DUtil;
}());
export { Canvas2DUtil };
