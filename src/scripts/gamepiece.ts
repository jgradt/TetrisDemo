export interface ICoordinate {
    x: number;
    y: number;
};

// utility function
export function printCoordinate(coordinate: ICoordinate) : string {
    return `(${coordinate.x}, ${coordinate.y})`;
}

// utility function
export function printCoordinates(coordinates: ICoordinate[]) : string {
    let val = '';
    coordinates.forEach(c => val += printCoordinate(c) + ' ');
    return val;

}

export class GamePiece {

    public originX: number;
    public originY: number; 
    public style: number;

    constructor(private coorindates: ICoordinate[], originX: number, originY: number, style: number) {
        this.originX = originX;
        this.originY = originY;
        this.style = style;
    }

    getCoordinates(): ICoordinate[] {
        return this.coorindates;
    }

    getAbsoluteCoordinates(): ICoordinate[] {
        let absCoordinates = this.getCoordinates().map(c => { return {x: this.originX - c.x, y: this.originY - c.y};});
        return absCoordinates;
    }

    moveLeft(): GamePiece {
        return new GamePiece(this.getCoordinates(), this.originX-1, this.originY, this.style);
    }

    moveRight(): GamePiece {
        return new GamePiece(this.getCoordinates(), this.originX+1, this.originY, this.style);
    }

    moveDown(): GamePiece {
        return new GamePiece(this.getCoordinates(), this.originX, this.originY+1, this.style);
    }

    turn(): GamePiece {
        let newCoordinates = this.getCoordinates().map(c => { return {x: c.y * -1, y: c.x};});
        return new GamePiece(newCoordinates, this.originX, this.originY, this.style);
    }
}

export class GamePieceFactory {

    getRandomPiece(originX: number, originY: number) : GamePiece {
        let id = Math.floor(Math.random() * 7) + 1; 
        let style = Math.floor(Math.random() * 4) + 1;
        return this.getPiece(id, originX, originY, style);
    }

    //TODO: need enum for piece style
    getPiece(id: number, originX: number, originY: number, style: number) : GamePiece {
        //console.log(`get piece ${id}`);
        switch(id) {
            case 1: // GamePiece T
                return new GamePiece([{x:0,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:1,y:0}], originX, originY, style);
            case 2: // GamePiece Square
                return new GamePiece([{x:0,y:0}, {x:0,y:1}, {x:1,y:0}, {x:1,y:1}], originX, originY, style);
            case 3: // GamePiece Stick
                return new GamePiece([{x:0,y:0}, {x:0,y:-1}, {x:0,y:1}, {x:0,y:2}], originX, originY, style);
            case 4: // GamePiece L-Left
                return new GamePiece([{x:0,y:0}, {x:0,y:1}, {x:0,y:-1}, {x:-1,y:-1}], originX, originY, style);
            case 5: // GamePiece L-Right
                return new GamePiece([{x:0,y:0}, {x:0,y:1}, {x:0,y:-1}, {x:1,y:1}], originX, originY, style);
            case 6: // GamePiece DogLeft
                return new GamePiece([{x:0,y:0}, {x:0,y:1}, {x:1,y:0}, {x:1,y:-1}], originX, originY, style);
            case 7: // GamePiece DogRight
                return new GamePiece([{x:0,y:0}, {x:0,y:-1}, {x:1,y:0}, {x:1,y:1}], originX, originY, style);
            // default:
            //     return new GamePiece([{x:0,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:1,y:0}], originX, originY, style);
        }
    }
}
