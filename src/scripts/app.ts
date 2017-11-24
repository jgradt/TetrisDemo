//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/from';
//import 'rxjs/add/operator/map';


export class App {

    static main() {
        //do something here
        document.getElementById("content").innerText = 'hello App Main';
        //Observable.from([1,2,3,4]).subscribe(val=>console.log(val));
        console.log("app main");
        //alert('hello');
    }
    
}

console.log('app module loaded');
App.main();
