import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Square } from './square'
import { GamePieceT } from './gamepiece'

export class App {

    static main() {

        console.log("app main");
        
        // setup
        const content = document.getElementById("content");
        var gamecanvas: HTMLCanvasElement = document.getElementById("gamecanvas") as HTMLCanvasElement;
        var renderContext: CanvasRenderingContext2D = gamecanvas.getContext("2d") as CanvasRenderingContext2D;
        const config = {
            rowCount: 10,
            colCount: 10,
            pieceSize: 20,
            padding: 1
        };

        // initialize gameboard
        const gameboard: number[][] = [];
        for(let row=0;row<=config.rowCount-1;row++) {
            gameboard[row] = [];
            for(let col=0;col<=config.colCount-1;col++) {
                gameboard[row][col]=0;
            }
        }

        // apply gamepiece
        let piece = new GamePieceT(5,5);
        let pieceCoordinates = piece.getAbsoluteCoordinates();
        console.log(`game piece coordinates: ${pieceCoordinates}`);
        for(let c of pieceCoordinates){
            gameboard[c[0]][c[1]] = 1;
        }

        // render gameboard
        for(let row=0;row<=config.rowCount-1;row++) {
            for(let col=0;col<=config.colCount-1;col++) {
                if(gameboard[row][col]===1){
                    let clientX = row * config.pieceSize;
                    let clientY = col * config.pieceSize;
                    let sq = new Square(renderContext, clientX, clientY, config.pieceSize, config.padding, 'blue');
                    sq.render();
                }
            }
        }

        // observer keypresses
        const output = document.getElementById("output");      
        Observable.fromEvent(document, 'keydown')
                    //.do(event => console.log(event))
                    .map((event: KeyboardEvent) => { return { key: event.key, keyCode: event.keyCode }; })
                    .subscribe(val=> output.innerHTML = JSON.stringify(val, null, '  ') );

    }
    
}

console.log('app module loaded');
App.main();
