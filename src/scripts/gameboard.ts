import { GamePiece, GamePieceFactory, ICoordinate, printCoordinate, printCoordinates } from './gamepiece'
import { Square } from './square'

export interface IGameSquare {
     style: number;
     locked: boolean;
}

export class Gameboard {

    private gameboard: IGameSquare[][] = [];
    private currentPiece: GamePiece;
    private readonly rowCount: number;
    private readonly columnCount: number;
    private readonly pieceFactory: GamePieceFactory = new GamePieceFactory();
    private readonly config = {
        originX: 5,
        originY: 5,
        defaultStyle: 0
    };

    constructor(private renderContext: CanvasRenderingContext2D, rowCount: number, columnCount: number, private pieceSize: number, private piecePadding: number = 0) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        
        this.init();
    }

    private init() {

        for(let col=0;col<=this.columnCount-1;col++) {
            this.gameboard[col] = [];
            for(let row=0;row<=this.rowCount-1;row++) {
                this.gameboard[col][row]= { style: 0, locked: false };
            }
        }

        this.newPiece();        
    }

    private newPiece() : void {
        this.currentPiece = this.pieceFactory.getRandomPiece(this.config.originX, this.config.originY); 
        this.applyGamePiece(this.currentPiece);
    }

    private clearGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), this.config.defaultStyle);
    }

    private lockGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), gamepiece.style, true);
    }

    private applyGamePiece(gamepiece: GamePiece) {
        //console.log(`applying game piece : ${gamepiece.style}`);
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), gamepiece.style);
    }

    private applyGamePieceCoordinates(coordinates: ICoordinate[], style: number, locked: boolean = false) {
        //console.log(`applying game piece coordinates: ${printCoordinates(coordinates)} with style ${style}`);
        for(let c of coordinates){
            this.gameboard[c.x][c.y].style = style;
            this.gameboard[c.x][c.y].locked = locked;
        }
    }

    private canApplyGamePiece(gamepiece: GamePiece) {
        return this.canApplyCoordinates(gamepiece.getAbsoluteCoordinates());
    }

    private canApplyCoordinates(coordinates: ICoordinate[]) : boolean {
        let can = true;

        coordinates.forEach(c => {
            if(c.x < 0 || c.x > this.columnCount-1 || c.y > this.rowCount-1 || this.gameboard[c.x][c.y].locked) {
                can = false;
            }
        });

        return can;
    }

    private tryApplyNewPiece(newPiece: GamePiece): boolean {
        if (this.canApplyGamePiece(newPiece)) {
            this.clearGamePiece(this.currentPiece);
            this.applyGamePiece(newPiece);
            this.currentPiece = newPiece;
            return true;
        }
        return false;
    }

    moveLeft() {
        let newPiece = this.currentPiece.moveLeft();
        this.tryApplyNewPiece(newPiece);
    }

    moveRight() {
        let newPiece = this.currentPiece.moveRight();
        this.tryApplyNewPiece(newPiece);
    }

    turn() {
        let newPiece = this.currentPiece.turn();
        this.tryApplyNewPiece(newPiece);
    }

    moveDown() {
        let newPiece = this.currentPiece.moveDown();
        if(!this.tryApplyNewPiece(newPiece)) {
            this.lockGamePiece(this.currentPiece);
            this.newPiece();
        }
    }

    render() {
        //console.log('rendering gameboard');
        this.renderContext.clearRect(0,0,this.columnCount*this.pieceSize,this.rowCount*this.pieceSize);
        for(let row=0;row<=this.rowCount-1;row++) {
            for(let col=0;col<=this.columnCount-1;col++) {
                let style = this.gameboard[col][row].style;
                if(style !== this.config.defaultStyle) {
                    let clientX = col * this.pieceSize;
                    let clientY = row * this.pieceSize;
                    let sq = new Square(this.renderContext, clientX, clientY, this.pieceSize, this.piecePadding, style);
                    sq.render();
                }
            }
        }
    }

}