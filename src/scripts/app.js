System.register(['rxjs-es/Observable', 'rxjs-es/add/observable/from'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var App;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            App = (function () {
                function App() {
                }
                App.main = function () {
                    document.getElementById("content").innerText = 'hello TS';
                    Observable_1.Observable.from([1, 2, 3, 4]).subscribe(function (val) { return console.log(val); });
                };
                return App;
            }());
            App.main();
        }
    }
});
//# sourceMappingURL=app.js.map