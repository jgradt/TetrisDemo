import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observer } from 'rxjs/Observer';

import { Gameboard } from './gameboard';

export class App {

    static main() {

        console.log("app main");
        
        let totalLines = 0,
            score = 0,
            level = 0,
            speed = 1200;

        const config = {
            rowCount: 20,
            colCount: 12,
            pieceSize: 20,
            padding: 1
        };

        // setup
         const gamecanvas: HTMLCanvasElement = document.getElementById("gamecanvas") as HTMLCanvasElement;
        gamecanvas.width = config.colCount * config.pieceSize;
        gamecanvas.height = config.rowCount * config.pieceSize;
        const renderContext: CanvasRenderingContext2D = gamecanvas.getContext("2d") as CanvasRenderingContext2D;
        const el_score = document.getElementById("score");
        const el_level = document.getElementById("level");
        const el_lineCount = document.getElementById("lineCount");        
        const el_message = document.getElementById("message");

        function setMessage(msg: string) {
            el_message.innerText = msg;
        }

        function linesCompleted(lineCount: number) : void {
            let previousLevel = level;
            totalLines += lineCount;
            level = Math.floor(totalLines / 10) + 1;
            score += 100 * [1,3,8,20][lineCount-1];

            if(previousLevel != level && speed > 300) {
                if(level <= 5) {
                    speed -= 100;
                } else if (level <= 10) {
                    speed -= 50
                } else {
                    speed -= 30;
                }
            }
            
            el_lineCount.innerText = totalLines.toString();
            el_level.innerText = level.toString();
            el_score.innerText = score.toString();
        }

        // initialize gameboard
        const gameboard = new Gameboard(renderContext, config.rowCount, config.colCount, config.pieceSize, config.padding);
        gameboard.onLinesCompleted = linesCompleted;
        gameboard.render();

        // observe keypresses
        Observable.fromEvent(document, 'keydown')
                    //.do((event: KeyboardEvent) => console.log("keydown", event.keyCode, event.key))       
                    .map(mapKeyBoardToAction)             
                    //.do(action => console.log("game action", action))
                    .subscribe(new GameObserver(gameboard, setMessage));

    }
    
}

enum GameAction {
    Turn,
    Down,
    Right,
    Left,
    Pause,
    Unknown
}

function mapKeyBoardToAction(event: KeyboardEvent) : GameAction {
    switch(event.keyCode) {
        case 37:
            return GameAction.Left;
        case 32:
        case 38:
            return GameAction.Turn;
        case 39:
            return GameAction.Right;
        case 40:
            return GameAction.Down;
        case 80:
            return GameAction.Pause;
        default:
            //return Observable.of(GameAction.Down); 
            return GameAction.Unknown;
    }
}

class GameObserver implements Observer<GameAction> {
    
    constructor(private gameboard: Gameboard, 
                private setMessageCallback?: (msg: string) => void) {}
    
    private isPaused: boolean = false;
    
    next(value: GameAction) : void {
        
        //TODO: need error logic

        if(this.gameboard.isGameOver) return;

        if(value === GameAction.Pause) {
            this.isPaused = !this.isPaused;
            if(this.setMessageCallback)
                if(this.isPaused)
                    this.setMessageCallback('Paused');
                else    
                    this.setMessageCallback('');
        }

        if(this.isPaused) return;

        switch(value) {

            case GameAction.Left:
                this.gameboard.moveLeft();
                this.gameboard.render();
                break;

            case GameAction.Right:
                this.gameboard.moveRight();
                this.gameboard.render();
                break;

            case GameAction.Down:
                this.gameboard.moveDown();
                this.gameboard.render();
                if(this.gameboard.isGameOver && this.setMessageCallback) 
                    this.setMessageCallback('Game Over');

                break;

            case GameAction.Turn:
                this.gameboard.turn();
                this.gameboard.render();
                break;
        }
    }

    error(err: any) : void {
        console.error(err);
    }

    complete() { 
        console.log('GameObserver complete');
    };
    
}

console.log('app module loaded');
App.main();
