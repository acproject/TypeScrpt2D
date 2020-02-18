import  {Application} from './Application';


export class Canva2DApplication extends Application {
    public content2D: CanvasRenderingContext2D | null;
    public constructor(canvas: HTMLCanvasElement, contextAttributes?:CanvasRenderingContext2DSettings) {
        super(canvas);
        this.content2D = this.canvas.getContext('2d', contextAttributes);
    }
}