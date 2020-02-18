export class vec2 {
    public values: Float32Array;

    public constructor(x = 0, y =0){
        this.values = new Float32Array([x, y]);
    }

    public static create(x=0, y=0):vec2 {
        return new vec2(x,y);
    }
}