import React from "react"
import ReactDOM from "react-dom"

import App from "./app.jsx"
import SceneController from "./threejsScene"

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

let sceneController = new SceneController();