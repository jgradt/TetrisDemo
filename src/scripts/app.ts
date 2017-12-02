import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observer } from 'rxjs/Observer';

import { Gameboard } from './gameboard';

export class App {

    static main() {

        console.log("app main");
        
        const config = {
            rowCount: 20,
            colCount: 12,
            pieceSize: 20,
            padding: 1
        };

        // setup
        const content = document.getElementById("content");
        const gamecanvas: HTMLCanvasElement = document.getElementById("gamecanvas") as HTMLCanvasElement;
        gamecanvas.width = config.colCount * config.pieceSize;
        gamecanvas.height = config.rowCount * config.pieceSize;
        const renderContext: CanvasRenderingContext2D = gamecanvas.getContext("2d") as CanvasRenderingContext2D;

        // initialize gameboard
        const gameboard = new Gameboard(renderContext, config.rowCount, config.colCount, config.pieceSize, config.padding);
        gameboard.render();

        // observe keypresses
        Observable.fromEvent(document, 'keydown')
                    //.do((event: KeyboardEvent) => console.log("keydown", event.keyCode, event.key))       
                    .map(mapKeyBoardToAction)             
                    //.do(action => console.log("game action", action))
                    .subscribe(new GameObserver(gameboard));

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
    
    constructor(private gameboard: Gameboard) {}
    
    //closed?: boolean;
    
    next(value: GameAction) : void {
        switch(value) {

            case GameAction.Left:
                //TODO: need error logic
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

    complete: () => void;
    
}

console.log('app module loaded');
App.main();
