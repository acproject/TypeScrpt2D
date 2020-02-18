import {CanvasInputEvent, EInputEventType} from './CanvasInputEvent';

export class CanvasKeyBoardEvent extends CanvasInputEvent{
    // ASCII字符
    public key: string;
    // ASCII字符对应的编码
    public keyCode: number;

    public repeat:boolean;

    public constructor(key:string, keyCode:number, repeat:boolean, 
        altKey=false, ctrlKey=false, shiftKey=false){
            super(altKey,ctrlKey,shiftKey,EInputEventType.KEYBOARDEVENT);
            this.key = key;
            this.keyCode = keyCode;
            this.repeat  =repeat;

        }
}