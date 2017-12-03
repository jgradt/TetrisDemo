import { GamePiece, GamePieceFactory, ICoordinate, printCoordinate, printCoordinates } from './gamepiece'
import { Square } from './square'

export interface IGameSquare {
     style: number;
     locked: boolean;
}

export class Gameboard {

    isGameOver: boolean = false;
    onLinesCompleted: (lineCount:number) => void;
    private gameboard: IGameSquare[][] = [];
    private currentPiece: GamePiece;    
    private readonly rowCount: number;
    private readonly columnCount: number;
    private readonly pieceFactory: GamePieceFactory = new GamePieceFactory();
    private readonly config = {
        originX: 6,
        originY: 3,
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
        if(this.canApplyGamePiece(this.currentPiece)) {
            this.applyGamePiece(this.currentPiece);
        } else {
            this.isGameOver = true;
        }
    }

    private clearGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), this.config.defaultStyle);
    }

    private lockGamePiece(gamepiece: GamePiece) {
        this.applyGamePieceCoordinates(gamepiece.getAbsoluteCoordinates(), gamepiece.style, true);
    }

    private applyGamePiece(gamepiece: GamePiece) {
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

    private getCompleteLines() : number[] {
        //console.log('checking for completed lines');
        let complete: number[] = [];
        for(let row=0;row<=this.rowCount-1;row++) {
            let rowCompleted = true;
            for(let col=0;col<=this.columnCount-1;col++) {
                if(!this.gameboard[col][row].locked) {
                    rowCompleted = false;                    
                }
            }
            if(rowCompleted){
                //console.log(`row ${row} completed`);
                complete.push(row);
            } 
        }
        return complete;
    }

    private copyRow(sourceRowNo: number, destRowNo: number) : void {
        for(let col=0;col<=this.columnCount-1;col++) {
            this.gameboard[col][destRowNo].locked = this.gameboard[col][sourceRowNo].locked;
            this.gameboard[col][destRowNo].style = this.gameboard[col][sourceRowNo].style;
        }
    }

    private removeCompletedLines() : void {
        let completedLines = this.getCompleteLines();
        completedLines.sort();
        completedLines.forEach(lineNo => {
            for(let row=lineNo;row>=1;row--) {
                this.copyRow(row-1,row);
            }
        })

        if(completedLines.length > 0 && this.onLinesCompleted) {
            this.onLinesCompleted(completedLines.length);
        }
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
            this.removeCompletedLines();
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