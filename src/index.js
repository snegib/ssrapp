// typical common js syntax/module
// const express = require("express");
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// const Home = require("./client/components/Home").default;

import express from "express";
import renderer from "./helpers/renderer";
const app = express();
app.use(express.static("public"));

// root route of our application
app.get("/", (req, res) => {
    res.send(renderer());
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
