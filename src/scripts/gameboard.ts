import { GamePiece, GamePieceFactory, ICoordinate } from './gamepiece'
import { Square } from './square'

export interface IGameSquare {
     style: number;
}

export class Gameboard {

    private gameboard: IGameSquare[][] = [];
    readonly rowCount: number;
    readonly columnCount: number;
    private currentPiece: GamePiece;
    private readonly pieceFactory: GamePieceFactory = new GamePieceFactory();

    constructor(private renderContext: CanvasRenderingContext2D, rowCount: number, columnCount: number, private pieceSize: number, private piecePadding: number = 0) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        
        this.init();
    }

    private init() {
        for(let row=0;row<=this.rowCount-1;row++) {
            this.gameboard[row] = [];
            for(let col=0;col<=this.columnCount-1;col++) {
                this.gameboard[row][col]= { style: 0 };
            }
        }

        this.currentPiece = this.pieceFactory.getPiece(1, 5, 5, 1); //new GamePieceT(5, 5, 1);
        this.applyGamePiece(this.currentPiece);
    }

    clearGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), 0);
    }

    applyGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), gamepiece.style);
    }

    applyGamePieceCoordinates(coordinates: ICoordinate[], style: number) {
        console.log(`applying game piece coordinates: ${coordinates} with style ${style}`);
        for(let c of coordinates){
            this.gameboard[c.x][c.y].style = style;
        }
    }

    canApplyGamePiece(gamepiece: GamePiece) {
        return this.canApplyCoordinates(gamepiece.getAbsoluteCoordinates());
    }

    canApplyCoordinates(coordinates: ICoordinate[]) : boolean {
        let can = true;

        //check for out of bounds
        coordinates.forEach(c => {
            if(c.x < 0 || c.x > this.columnCount-1 || c.y > this.rowCount-1) {
                can = false;
            }
        });

        if(!can) return false;

        //check for other blocks
        coordinates.forEach(c => {
            
            if(this.gameboard[c.x][c.y].style != 0) {
                //can = false;
            }
        });

        return can;
    }

    moveLeft() {
        //TODO: check if can move
        let newPiece = this.currentPiece.moveLeft();
        if(this.canApplyGamePiece(newPiece)) {
            this.clearGamePiece(this.currentPiece);
            this.applyGamePiece(newPiece);
            this.currentPiece = newPiece;
        };
    }

    moveRight() {
        //TODO: check if can move
        let newPiece = this.currentPiece.moveRight();
        if(this.canApplyGamePiece(newPiece)) {
            this.clearGamePiece(this.currentPiece);
            this.applyGamePiece(newPiece);
            this.currentPiece = newPiece;
        }
    }

    render() {
        console.log('rendering gameboard');
        this.renderContext.clearRect(0,0,this.columnCount*this.pieceSize,this.rowCount*this.pieceSize);
        for(let row=0;row<=this.rowCount-1;row++) {
            for(let col=0;col<=this.columnCount-1;col++) {
                let style = this.gameboard[row][col].style;
                if(style !== 0) {
                    let clientX = row * this.pieceSize;
                    let clientY = col * this.pieceSize;
                    let sq = new Square(this.renderContext, clientX, clientY, this.pieceSize, this.piecePadding, style);
                    sq.render();
                }
            }
        }
    }

}