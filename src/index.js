// typical common js syntax/module

const express = require("express");
const React = require("react");
const renderToString = require("react-dom/server").renderToString;
const Home = require("./client/components/Home").default;
const app = express();

// root route of our application
app.get("/", (req, res) => {
    const content = renderToString(<Home />); // this will convert react to html code
    res.send(content);
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
