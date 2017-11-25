export type Coordinate = [number, number];

export class GamePiece {

    public originX: number;
    public originY: number; 
    public style: number;

    constructor(private coorindates: Coordinate[], originX: number, originY: number, style: number) {
        this.originX = originX;
        this.originY = originY;
        this.style = style;
    }

    getCoordinates(): Coordinate[] {
        return this.coorindates;
    }

    getAbsoluteCoordinates(): Coordinate[] {
        let absCoordinates: Coordinate[] = [];
        for(let i in this.coorindates){
            absCoordinates[i] = [this.originX - this.coorindates[i][0],this.originY - this.coorindates[i][1]];
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
}

export class GamePieceT extends GamePiece {
    
    constructor(originX: number, originY: number, style: number) {
        super([[0,0], [1,0], [1,1], [2,0]], originX, originY, style);
    }
}

export class GamePieceSquare extends GamePiece {
    
    constructor(originX: number, originY: number, style: number) {
        super([[0,0], [0,1], [1,0], [1,1]], originX, originY, style);
    }
}

export class GamePieceStick extends GamePiece {
    
    constructor(originX: number, originY: number, style: number) {
        super([[0,0], [0,1], [0,2], [0,3]], originX, originY, style);
    }
}

export class GamePieceLLeft extends GamePiece {
    
    constructor(originX: number, originY: number, style: number) {
        super([[0,0], [1,0], [1,1], [1,2]], originX, originY, style);
    }
}

export class GamePieceLRight extends GamePiece {
    
    constructor(originX: number, originY: number, style: number) {
        super([[0,0], [0,1], [0,2], [1,0]], originX, originY, style);
    }
}

export class GamePieceDogLeft extends GamePiece {
    
    constructor(originX: number, originY: number, style: number) {
        super([[0,1], [1,0], [1,1], [2,0]], originX, originY, style);
    }
}

export class GamePieceDogRight extends GamePiece {
    
    constructor(originX: number, originY: number, style: number) {
        super([[0,0], [1,0], [1,2], [2,1]], originX, originY, style);
    }
}