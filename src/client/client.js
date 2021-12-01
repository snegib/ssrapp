// start up point for the client side application
console.log("hi there from client!!!");

import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";

ReactDOM.hydrate(<Home />, document.querySelector("#root"));
//ReactDOM.render(<Home />, document.querySelector("#root"));
