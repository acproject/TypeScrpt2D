/**
 *  # 可以启动动画循环和结束动画循环
 *  # 可以进行基于时间的更新与重绘
 *  # 可以对输入事件（鼠标或者键盘事件）进行分发和响应
 *  # 可以被继承扩展， 用于Canvas2D和WebGL渲染
 */

 export class Application {
    protected _start: boolean = false;
    protected _requestId: number = -1;
    protected _lastTime! :number;
    protected _startTime!: number; 

 }