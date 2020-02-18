import { Application } from '../Canvas2D/Application';
import { CanvasMouseEvent, CanvasKeyBoardEvent } from '../Canvas2D/Events/index';
class ApplicationTest extends Application {
    // @override dispatchKeyDown from Application
    protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
        console.log('key ' + evt.key + ' is downed');
    }

    protected dispatchMouseDown(evt:CanvasMouseEvent):void {
        console.log('canvasPosition: '+ evt.canvasPosition);
    }

    // @override 
    public update(elapedMsec: number, intervalSec: number): void {
        console.log('elapedMsec: ' + elapedMsec + ' intercvalSec: ' + intervalSec);
    }

    // @override
    public render():void {
        console.log('调用render方法!');
    }
}

let canvas :HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;

let app: Application = new ApplicationTest(canvas);
app.update(0,0);
app.render();
let startButton:HTMLButtonElement | null = document.getElementById('start') as HTMLButtonElement;
let stopButton:HTMLButtonElement | null = document.getElementById('stop') as HTMLButtonElement;
startButton.onclick = (evt:MouseEvent):void =>{
    app.start();
}

stopButton.onclick = (evt:MouseEvent):void =>{
    app.stop();
}
