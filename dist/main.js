System.register("app", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var App;
    return {
        setters:[],
        execute: function() {
            App = (function () {
                function App() {
                }
                App.main = function () {
                    document.getElementById("content").innerText = 'hello App Main';
                    console.log("app main");
                };
                return App;
            }());
            exports_1("App", App);
            console.log('app module loaded');
            App.main();
        }
    }
});
//# sourceMappingURL=main.js.map