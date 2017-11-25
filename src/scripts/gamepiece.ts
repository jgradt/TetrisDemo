type Coordinate = number[];


export class GamePiece {

    constructor(private coorindates: Coordinate[]) {}
}

export class GamePieceT extends GamePiece {
    
    constructor() {
        super([[0,0], [1,0], [1,1], [2,0]]);
    }
}

export class GamePieceSquare extends GamePiece {
    
    constructor() {
        super([[0,0], [0,1], [1,0], [1,1]]);
    }
}

export class GamePieceStick extends GamePiece {
    
    constructor() {
        super([[0,0], [0,1], [0,2], [0,3]]);
    }
}

export class GamePieceLLeft extends GamePiece {
    
    constructor() {
        super([[0,0], [1,0], [1,1], [1,2]]);
    }
}

export class GamePieceLRight extends GamePiece {
    
    constructor() {
        super([[0,0], [0,1], [0,2], [1,0]]);
    }
}

export class GamePieceDogLeft extends GamePiece {
    
    constructor() {
        super([[0,1], [1,0], [1,1], [2,0]]);
    }
}

export class GamePieceDogRight extends GamePiece {
    
    constructor() {
        super([[0,0], [1,0], [1,2], [2,1]]);
    }
}