type Coordinate = number[];


export class GamePiece {

    public originX: number;
    public originY: number; 

    constructor(private coorindates: Coordinate[], originX: number, originY: number) {
        this.originX = originX;
        this.originY = originY;
    }

    getAbsoluteCoordinates(): number[][] {
        let absCoordinates: Coordinate[] = [];
        for(let i in this.coorindates){
            absCoordinates[i] = [this.originX - this.coorindates[i][0],this.originX - this.coorindates[i][1]];
        }
        return absCoordinates;
    }
}

export class GamePieceT extends GamePiece {
    
    constructor(originX: number, originY: number) {
        super([[0,0], [1,0], [1,1], [2,0]], originX, originY);
    }
}

export class GamePieceSquare extends GamePiece {
    
    constructor(originX: number, originY: number) {
        super([[0,0], [0,1], [1,0], [1,1]], originX, originY);
    }
}

export class GamePieceStick extends GamePiece {
    
    constructor(originX: number, originY: number) {
        super([[0,0], [0,1], [0,2], [0,3]], originX, originY);
    }
}

export class GamePieceLLeft extends GamePiece {
    
    constructor(originX: number, originY: number) {
        super([[0,0], [1,0], [1,1], [1,2]], originX, originY);
    }
}

export class GamePieceLRight extends GamePiece {
    
    constructor(originX: number, originY: number) {
        super([[0,0], [0,1], [0,2], [1,0]], originX, originY);
    }
}

export class GamePieceDogLeft extends GamePiece {
    
    constructor(originX: number, originY: number) {
        super([[0,1], [1,0], [1,1], [2,0]], originX, originY);
    }
}

export class GamePieceDogRight extends GamePiece {
    
    constructor(originX: number, originY: number) {
        super([[0,0], [1,0], [1,2], [2,1]], originX, originY);
    }
}