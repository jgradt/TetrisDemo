import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export class App {

    static main() {

        console.log("app main");
        
        const content = document.getElementById("content");
        const code = document.getElementById("code");
        Observable.fromEvent(document, 'keydown')
                    //.do(event => console.log(event))
                    .map((event: KeyboardEvent) => { return { key: event.key, keyCode: event.keyCode, char: event.char }; })
                    .subscribe(val=> code.innerHTML = JSON.stringify(val) );

    }
    
}

console.log('app module loaded');
App.main();
