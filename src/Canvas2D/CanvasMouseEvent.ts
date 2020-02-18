import {CanvasInputEvent, EInputEventType, EMouseKeyType} from './CanvasInputEvent';

export class CanvasMouseEvent extends CanvasInputEvent {
    public mouseButton:EMouseKeyType;
    public canvasPosition:vec2 ;
    public localPosition: vec2;
    public constructor(canvasPos:vec2, mouseButton:EMouseKeyType, altkey=false,ctrlKey=false,shiftKey=false){
        super(altkey,ctrlKey, shiftKey);
        this.canvasPosition = canvasPos;
        this.mouseButton = mouseButton;
        this.localPosition = vec2.create();
    }

    private _toCanvasMouseEvent(evt: Event):CanvasMouseEvent {
        let event = evt as MouseEvent;
        let mousePosition: vec2 = this._viewportToCanvasCoordinate(event);
        let canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(mousePosition
            , event.button ,event.altKey, event.ctrlKey, event.shiftKey);
        return canvasMouseEvent;
    }
}