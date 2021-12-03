// typical common js syntax/module
// const express = require("express");
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// const Home = require("./client/components/Home").default;
import "babel-polyfill"; // this is added to ASYNC AWAIT work properly inside action => index.js
import express from "express";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import { loadData } from "./client/components/UsersList";
const app = express();
app.use(express.static("public"));

// root route of our application
app.get("*", (req, res) => {
    const store = createStore();

    // some logic to initialize
    // and load data into the store
    // console.log(matchRoutes(Routes, req.path))
    // (Routes) which component and (req.path) url of data which data need to be show/view
    // map(({ route }) destructuring
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null; // return array of promises representing all the pending network request from all the actin creators that we might end up calling
    });
    // console.log(promises);
    Promise.all(promises).then(() => {
        res.send(renderer(req, store)); //  request (req), is contains the url which user trying to access or which component should be rendered
    });
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
