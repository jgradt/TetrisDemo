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
        let absCoordinates: ICoordinate[] = [];
        for(let i in this.coorindates){
            absCoordinates[i] = {x: this.originX - this.coorindates[i].x, y: this.originY - this.coorindates[i].y};
        }
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

    //TODO: need enum for piece style
    getPiece(id: number, originX: number, originY: number, style: number) : GamePiece {
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
                return new GamePiece([{x:0,y:0}, {x:1,y:-1}, {x:1,y:0}, {x:1,y:1}], originX, originY, style);
            // default:
            //     return new GamePiece([{x:0,y:0}, {x:1,y:0}, {x:1,y:1}, {x:2,y:0}], originX, originY, style);
        }
    }
}

// export class GamePieceT extends GamePiece {
    
//     constructor(originX: number, originY: number, style: number) {
//         super([[0,0], [1,0], [1,1], [2,0]], originX, originY, style);
//     }
// }

// export class GamePieceSquare extends GamePiece {
    
//     constructor(originX: number, originY: number, style: number) {
//         super([[0,0], [0,1], [1,0], [1,1]], originX, originY, style);
//     }
// }

// export class GamePieceStick extends GamePiece {
    
//     constructor(originX: number, originY: number, style: number) {
//         super([[0,0], [0,1], [0,2], [0,3]], originX, originY, style);
//     }
// }

// export class GamePieceLLeft extends GamePiece {
    
//     constructor(originX: number, originY: number, style: number) {
//         super([[0,0], [1,0], [1,1], [1,2]], originX, originY, style);
//     }
// }

// export class GamePieceLRight extends GamePiece {
    
//     constructor(originX: number, originY: number, style: number) {
//         super([[0,0], [0,1], [0,2], [1,0]], originX, originY, style);
//     }
// }

// export class GamePieceDogLeft extends GamePiece {
    
//     constructor(originX: number, originY: number, style: number) {
//         super([[0,1], [1,0], [1,1], [2,0]], originX, originY, style);
//     }
// }

// export class GamePieceDogRight extends GamePiece {
    
//     constructor(originX: number, originY: number, style: number) {
//         super([[0,0], [1,0], [1,2], [2,1]], originX, originY, style);
//     }
// }