import {CanvasInputEvent, EInputEventType, EMouseKeyType} from './CanvasInputEvent';
import {vec2} from '../../Math/Vec2';

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

    
}