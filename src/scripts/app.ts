import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Square } from './square'

export class App {

    static main() {

        console.log("app main");
        
        // setup
        const content = document.getElementById("content");
        var gameboard: HTMLCanvasElement = document.getElementById("gameboard") as HTMLCanvasElement;
        var renderContext: CanvasRenderingContext2D = gameboard.getContext("2d") as CanvasRenderingContext2D;

        let s0 = new Square(renderContext, 20, 20, 30, 'blue');
        s0.render();

        // observer keypresses
        const output = document.getElementById("output");      
        Observable.fromEvent(document, 'keydown')
                    //.do(event => console.log(event))
                    .map((event: KeyboardEvent) => { return { key: event.key, keyCode: event.keyCode, char: event.char }; })
                    .subscribe(val=> output.innerHTML = JSON.stringify(val, null, '\t') );

    }
    
}

console.log('app module loaded');
App.main();
