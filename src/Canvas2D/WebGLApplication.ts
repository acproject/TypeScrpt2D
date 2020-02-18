import  {Application} from './Application';

export class WebGLApplication extends Application {
    public contenxt3D:WebGLRenderingContext | null;
    public constructor(canvas:HTMLCanvasElement, contextAttributes?: WebGLContextAttributes) {
        super(canvas);
        this.contenxt3D = this.canvas.getContext('webgl', contextAttributes);
        if(this.contenxt3D === null) {
            this.contenxt3D = this.canvas.getContext('webgl2',contextAttributes);
            if(this.contenxt3D === null) {
                throw new Error('无法创建WebGLRenderingContext上下文对象');
            }
        }
    }
}