import App from "./app.js";
import SceneController from "./threejsScene.js";

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));

var threejsSceneRenderer = new SceneController();