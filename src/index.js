import App from "./app.js"
import SceneController from "./threejsScene.js"

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

let threejsSceneRenderer = new SceneController()