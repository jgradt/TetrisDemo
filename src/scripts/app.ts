import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';


export class App {

    static main() {
        //do something here
        document.getElementById("content").innerText = 'Hello Typescript class';
        Observable.range(1,15).subscribe(val=>console.log(val));
        console.log("app main");
        //alert('hello');
    }
    
}

console.log('app module loaded');
App.main();
