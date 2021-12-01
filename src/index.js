// typical common js syntax/module
// const express = require("express");
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// const Home = require("./client/components/Home").default;

import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./client/components/Home";
const app = express();
app.use(express.static("public"));

// root route of our application
app.get("/", (req, res) => {
    const content = renderToString(<Home />); // this will convert react to html code
    const html = `
    <html>
        <head></head>
        <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>`;
    res.send(html);
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
