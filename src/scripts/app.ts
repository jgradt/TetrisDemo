import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs'
import { Subscription } from 'rxjs/Subscription';

import { Gameboard } from './gameboard';

export class App {

    static main() {

        console.log("app main");
        
        let game = new Game();
        game.init();

    }
    
}

class Game {

    gameboard: Gameboard;
    totalLines = 0;
    score = 0;
    level = 0;
    speed = 2000;
    rowCount = 20;
    colCount = 12;
    pieceSize = 20;
    padding = 1;
    isPaused: boolean = false;

    // html elements
    gamecanvas: HTMLCanvasElement = document.getElementById("gamecanvas") as HTMLCanvasElement;
    el_score = document.getElementById("score");
    el_level = document.getElementById("level");
    el_lineCount = document.getElementById("lineCount");        
    el_message = document.getElementById("message");
    el_startButton = document.getElementById("btnStart") as HTMLButtonElement;
 
    // observables
    subscription: Subscription;
    tickSubcription: Subscription;
    subject$: BehaviorSubject<number>;
    tick$: Observable<GameAction>;

    init() {

        this.gamecanvas.width = this.colCount * this.pieceSize;
        this.gamecanvas.height = this.rowCount * this.pieceSize;

        let renderContext = this.gamecanvas.getContext("2d") as CanvasRenderingContext2D;
        this.gameboard = new Gameboard(renderContext, this.rowCount, this.colCount, this.pieceSize, this.padding);
        this.gameboard.onLinesCompleted = (lineCount) => this.linesCompleted(lineCount);
        this.gameboard.render();

        this.el_startButton.onclick = () => this.startGame();

        // observe keyboard events
        let keySource$ = Observable.fromEvent(document, 'keydown')
                    //.do((event: KeyboardEvent) => console.log("keydown", event.keyCode, event.key))       
                    .map(this.mapKeyBoardToAction);            
                    //.do(action => console.log("game action", action))
 
        this.subject$ = new BehaviorSubject(0);
        keySource$.subscribe(this.subject$);
    }

    private linesCompleted(lineCount: number) : void {
        let previousLevel = this.level;
        this.totalLines += lineCount;
        this.level = Math.floor(this.totalLines / 5) + 1;
        let scoreIncrement = 100 * [1,3,8,20][lineCount-1] * (Math.pow(1.1, this.level-1));
        scoreIncrement = Math.round(scoreIncrement/10) * 10;
        this.score += scoreIncrement;

        if(previousLevel != this.level) {

            if(this.speed > 300) {
                if(this.level <= 5) {
                    this.speed -= 100;
                } else if (this.level <= 10) {
                    this.speed -= 50
                } else {
                    this.speed -= 30;
                }
            }

            this.startTimer();
        }
        
        this.el_lineCount.innerText = this.totalLines.toString();
        this.el_level.innerText = this.level.toString();
        this.el_score.innerText = this.score.toString();
    }


    private startGame() {
        this.gameboard.newGame();
        this.setMessage('');
        this.subscription = this.subject$.subscribe(val => this.nextGameAction(val), 
                                                    err => console.log(err), 
                                                    () => console.log('observer complete'));
        this.startTimer();
    }

    private endGame() {
        this.stopTimer();
        this.subscription.unsubscribe();
        this.setMessage('Game Over');
    }
    
    private setMessage(msg: string) {
        this.el_message.innerText = msg;
    }

    private startTimer() {
        //console.log(`start timer with speed ${this.speed}`);
        if(this.tickSubcription)
            this.tickSubcription.unsubscribe();
        this.tick$ = Observable.interval(this.speed).mapTo(GameAction.Tick);
        this.tickSubcription = this.tick$.subscribe(this.subject$);
    }

    private stopTimer() {
        this.tickSubcription.unsubscribe();
    }

    private mapKeyBoardToAction(event: KeyboardEvent) : GameAction {
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
                return GameAction.None;
        }
    }
  
    private nextGameAction(value: GameAction) : void {
        
        //TODO: need error logic
        
        //console.log(`observed GameAction: ${value}`)
        
        if(this.gameboard.isGameOver) return;

        if(value === GameAction.Pause) {
            this.isPaused = !this.isPaused;
            if(this.isPaused)
                this.setMessage('Paused');
            else    
                this.setMessage('');
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

            case GameAction.Tick:
            case GameAction.Down:
                this.gameboard.moveDown();
                this.gameboard.render();
                if(this.gameboard.isGameOver) 
                    this.endGame();

                break;

            case GameAction.Turn:
                this.gameboard.turn();
                this.gameboard.render();
                break;
        }
    }

}

enum GameAction {
    None,
    Turn,
    Down,
    Right,
    Left,
    Pause,
    Tick
}

console.log('app module loaded');
App.main();
