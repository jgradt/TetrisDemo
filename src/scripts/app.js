var App = (function () {
    function App() {
    }
    App.main = function () {
        document.getElementById("content").innerText = 'hello App Main';
        console.log("app main");
    };
    return App;
}());
export { App };
console.log('app module loaded');
App.main();
//# sourceMappingURL=app.js.map