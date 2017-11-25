import { GamePiece, GamePieceT, Coordinate } from './gamepiece'
import { Square } from './square'

export interface IGameSquare {
     style: number;
}

export class Gameboard {

    private gameboard: IGameSquare[][] = [];
    readonly rowCount: number;
    readonly columnCount: number;
    private currentPiece: GamePiece;

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

        this.currentPiece = new GamePieceT(5, 5, 1);
        this.applyGamePiece(this.currentPiece);
    }

    clearGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), 0);
    }

    applyGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), gamepiece.style);
    }

    applyGamePieceCoordinates(coordinates: Coordinate[], style: number) {
        console.log(`applying game piece coordinates: ${coordinates} with style ${style}`);
        for(let c of coordinates){
            this.gameboard[c[0]][c[1]].style = style;
        }
    }

    moveLeft() {
        //TODO: check if can move
        let newPiece = this.currentPiece.moveLeft();
        this.clearGamePiece(this.currentPiece);
        this.applyGamePiece(newPiece);
        this.currentPiece = newPiece;
    }

    moveRight() {
        //TODO: check if can move
        let newPiece = this.currentPiece.moveRight();
        this.clearGamePiece(this.currentPiece);
        this.applyGamePiece(newPiece);
        this.currentPiece = newPiece;
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