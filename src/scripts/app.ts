import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

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
        const output = document.getElementById("output");      
        Observable.fromEvent(document, 'keydown')
                    //.do(event => console.log(event))                    
                    .map((event: KeyboardEvent) => { return { key: event.key, keyCode: event.keyCode }; })
                    .do(val => output.innerHTML = JSON.stringify(val, null, '  '))
                    .subscribe(val=> {
                        switch(val.key) {

                            case 'ArrowLeft':
                                //TODO: need error logic
                                gameboard.moveLeft();
                                gameboard.render();
                                break;

                            case 'ArrowRight':
                                gameboard.moveRight();
                                gameboard.render();
                                break;

                            case 'ArrowDown':
                                gameboard.moveDown();
                                gameboard.render();
                                break;

                            case 'ArrowUp':
                                gameboard.turn();
                                gameboard.render();
                                break;
                        }
                    });

    }
    
}

console.log('app module loaded');
App.main();
