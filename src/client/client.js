// start up point for the client side application
console.log("hi there from client!!!");

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

ReactDOM.hydrate(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>,
    document.querySelector("#root")
);
//ReactDOM.render(<Home />, document.querySelector("#root"));
