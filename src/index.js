// typical common js syntax/module
// const express = require("express");
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// const Home = require("./client/components/Home").default;
import "babel-polyfill"; // this is added to ASYNC AWAIT work properly inside action => index.js
import express from "express";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
const app = express();
app.use(express.static("public"));

// root route of our application
app.get("*", (req, res) => {
    const store = createStore();

    // some logic to initialize
    // and load data into the store

    res.send(renderer(req, store)); //  request (req), is contains the url which user trying to access or which component should be rendered
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
