// for server side store

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import reducers from "../client/reducers";

export default (req) => {
    const axiosInstance = axios.create({
        baseURL: "http://react-ssr-api.herokuapp.com",
        header: { cookies: req.get("cookie") || "" },
        // client_id:
        //     "517024197546-9lkgr6sm15mt17bs09kkvhdtuu45rer6.apps.googleusercontent.com",
        // client_secret: "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",
    });
    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );
    return store;
};
