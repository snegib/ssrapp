// this file is going to how is a function that will simply render our react app and return
// it as a string, essentially what we are currently doing on these couple lines inside of our // root handler.

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../client/Routes";

export default (req) => {
    const content = renderToString(
        // path is coming from express, chk express docuemntation
        <StaticRouter location={req.path} context={{}}>
            <Routes />
        </StaticRouter>
    ); // this will convert react to html code
    return `
    <html>
        <head></head>
        <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>`;
};
