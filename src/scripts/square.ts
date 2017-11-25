export class Square {
    
    public clientX: number;
    public clientY: number;
    public size: number;
    public color: string;

    constructor(private renderContext: CanvasRenderingContext2D, clientX: number,
        clientY: number, size: number, color: string) {

        this.clientX = clientX;
        this.clientY = clientY;
        this.size = size;
        this.color = color;
    }

    render() {
        this.renderContext.beginPath();
        this.renderContext.rect(this.clientX, this.clientY, this.size, this.size);
        this.renderContext.fillStyle = this.color;
        this.renderContext.fill();
        this.renderContext.closePath();
    }
}