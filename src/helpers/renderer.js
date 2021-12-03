//use for server (index.js)
// this file is going to how is a function that will simply render our react app and return
// it as a string, essentially what we are currently doing on these couple lines inside of our // root handler.

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import Routes from "../client/Routes";
import serialize from "serialize-javascript";

export default (req, store) => {
    const content = renderToString(
        // path is coming from express, chk express docuemntation
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    ); // this will convert react to html code
    return `
    <html>
        <head></head>
        <body>
            <div id="root">${content}</div>
            <script>
            window.INITIAL_STATE = ${serialize(store.getState())}</script>
            <script src="bundle.js"></script>
        </body>
    </html>`;
};
