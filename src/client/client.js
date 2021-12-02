// start up point for the client side application
console.log("hi there from client!!!");

import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// for client side store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// for client side store end
import Routes from "./Routes";

const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
);
//ReactDOM.render(<Home />, document.querySelector("#root"));
