// start up point for the client side application
console.log("hi there from client!!!");
import "babel-polyfill"; // this is added to ASYNC AWAIT work properly inside action => index.js
import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// for client side store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// for client side store end
import { renderRoutes } from "react-router-config";
import axios from "axios";
import Routes from "./Routes";
import reducers from "./reducers";

const axiosInstance = axios.create({
    baseURL: "/api",
});
const store = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument) // withExtraArgument will pass axios instances in it
);

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
);
//ReactDOM.render(<Home />, document.querySelector("#root"));
