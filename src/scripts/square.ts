export class Square {

    public clientX: number;
    public clientY: number;
    public size: number;
    public style: number;

    constructor(private renderContext: CanvasRenderingContext2D, clientX: number,
        clientY: number, size: number, private padding: number = 0, style: number) {

        this.clientX = clientX;
        this.clientY = clientY;
        this.size = size;
        this.style = style;
    }

    render() {
        this.renderContext.beginPath();
        this.renderContext.rect(this.clientX + this.padding, this.clientY + this.padding, this.size - (2 * this.padding), this.size - (2 * this.padding));
        this.renderContext.fillStyle = this.getFillColor(this.style);
        this.renderContext.fill();
        this.renderContext.closePath();
    }

    //TODO: need enum for color
    private getFillColor(style: number) : string {
        switch(style) {
            case 0:
                return 'black';
            case 1:
                return 'blue';
            case 2:
                return 'red';
            case 3:
                return 'yellow';
            default:
                return 'black';
        }

    }
}