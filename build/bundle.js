/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(18);

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _reactRouterConfig = __webpack_require__(19);

var _expressHttpProxy = __webpack_require__(23);

var _expressHttpProxy2 = _interopRequireDefault(_expressHttpProxy);

var _Routes = __webpack_require__(7);

var _Routes2 = _interopRequireDefault(_Routes);

var _renderer = __webpack_require__(5);

var _renderer2 = _interopRequireDefault(_renderer);

var _createStore = __webpack_require__(9);

var _createStore2 = _interopRequireDefault(_createStore);

var _UsersListPage = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server file
// typical common js syntax/module
// const express = require("express");
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// const Home = require("./client/components/Home").default;
var app = (0, _express2.default)();

//proxy setup for cookies auth instead of jwt token
/*the browser ever makes a request to our render server with a route that begins with API, we will attempt to proxy it off or send it off to the proxy server. So this right here is going to match this route and it will pass in a second argument of exactly what
we want to have happen to this request. So we'll pass in proxy. Proxy is a function. We're going to pass a string that tells it where to send this request to. So we're going to say send this request off to http://react-ssr-api-herokuapp.com.*/
// this is added to ASYNC AWAIT work properly inside action => index.js
app.use("/api", (0, _expressHttpProxy2.default)("http://react-ssr-api-herokuapp.com",
// this option is just for this course
{
    proxyReqOptDecorator: function proxyReqOptDecorator(opts) {
        opts.headers["x-forwarded-host"] = "localhost:3000";
        return opts;
    }
}));
app.use(_express2.default.static("public"));

// root route of our application
app.get("*", function (req, res) {
    var store = (0, _createStore2.default)(req);

    // some logic to initialize
    // and load data into the store
    // console.log(matchRoutes(Routes, req.path))
    // (Routes) which component and (req.path) url of data which data need to be show/view
    // map(({ route }) destructuring
    var promises = (0, _reactRouterConfig.matchRoutes)(_Routes2.default, req.path).map(function (_ref) {
        var route = _ref.route;

        return route.loadData ? route.loadData(store) : null; // return array of promises representing all the pending network request from all the actin creators that we might end up calling
    });
    // console.log(promises);
    Promise.all(promises).then(function () {
        res.send((0, _renderer2.default)(req, store)); //  request (req), is contains the url which user trying to access or which component should be rendered
    });
});
app.listen(3000, function () {
    console.log("listening on port 3000");
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(3);

var _reactRouterDom = __webpack_require__(8);

var _reactRedux = __webpack_require__(12);

var _reactRouterConfig = __webpack_require__(19);

var _Routes = __webpack_require__(7);

var _Routes2 = _interopRequireDefault(_Routes);

var _serializeJavascript = __webpack_require__(22);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, store) {
    var content = (0, _server.renderToString)(
    // path is coming from express, chk express docuemntation
    _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouterDom.StaticRouter,
            { location: req.path, context: {} },
            _react2.default.createElement(
                "div",
                null,
                (0, _reactRouterConfig.renderRoutes)(_Routes2.default)
            )
        )
    )); // this will convert react to html code
    return "\n    <html>\n        <head></head>\n        <body>\n            <div id=\"root\">" + content + "</div>\n            <script>\n            window.INITIAL_STATE = " + (0, _serializeJavascript2.default)(store.getState()) + "</script>\n            <script src=\"bundle.js\"></script>\n        </body>\n    </html>";
}; //use for server (index.js)
// this file is going to how is a function that will simply render our react app and return
// it as a string, essentially what we are currently doing on these couple lines inside of our // root handler.

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // this is the file shared routes both server and client base routes

// import { Route } from "react-router-dom";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(24);

var _App2 = _interopRequireDefault(_App);

var _HomePage = __webpack_require__(20);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _UsersListPage = __webpack_require__(21);

var _UsersListPage2 = _interopRequireDefault(_UsersListPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this structure needed when we doing SSR, npm module required 'react-router-config'
exports.default = [_extends({}, _App2.default, {
    routes: [_extends({}, _HomePage2.default, {
        path: "/",
        exact: true
    }), _extends({}, _UsersListPage2.default, {
        path: "/users"
    })]
})];

// otherwise the old structure is used
// export default () => {
//     return (
//         <div>
//             <Route exact path="/" component={Home} />
//             <Route path="/users" component={UsersList} />
//             {/* <Route path="/hi" component={() => "Hi"} /> */}
//         </div>
//     );
// };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(10);

var _reduxThunk = __webpack_require__(11);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _axios = __webpack_require__(16);

var _axios2 = _interopRequireDefault(_axios);

var _reducers = __webpack_require__(13);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for server side store

exports.default = function (req) {
    var axiosInstance = _axios2.default.create({
        baseURL: "http://react-ssr-api.herokuapp.com",
        header: { cookies: req.get("cookie") || "" }
    });
    var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument(axiosInstance)));
    return store;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(10);

var _usersReducer = __webpack_require__(14);

var _usersReducer2 = _interopRequireDefault(_usersReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// combine all reducers
exports.default = (0, _redux.combineReducers)({
    users: _usersReducer2.default
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(15);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _actions.FETCH_USERS:
            return action.payload.data;
        default:
            return state;
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//import axios from "axios"; // for api request

var FETCH_USERS = exports.FETCH_USERS = "fetch-users";

// this function start from 'async' will automatically invoke by redux thunk
var fetchUsers = exports.fetchUsers = function fetchUsers() {
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState, api) {
            var res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return api.get("/users");

                        case 2:
                            res = _context.sent;


                            dispatch({
                                type: FETCH_USERS,
                                payload: res // sending data whatever getting from api
                            });

                        case 4:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
            "div",
            null,
            "I'm the very very best home component"
        ),
        _react2.default.createElement(
            "button",
            {
                onClick: function onClick() {
                    console.log("hi there from Home!");
                }
            },
            "Press Me"
        )
    );
}; // es 2015 module syntax

exports.default = { component: Home };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(12);

var _actions = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersList = function (_Component) {
    _inherits(UsersList, _Component);

    function UsersList() {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
    }

    _createClass(UsersList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // action creator
            this.props.fetchUsers();
        }

        // helper function

    }, {
        key: "renderUsers",
        value: function renderUsers() {
            return this.props.users.map(function (user) {
                return _react2.default.createElement(
                    "li",
                    { key: user.id },
                    user.name
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                "Here's big list of users:",
                _react2.default.createElement(
                    "ul",
                    null,
                    this.renderUsers()
                )
            );
        }
    }]);

    return UsersList;
}(_react.Component);

function loadData(store) {
    // console.log("trying to load data");
    return store.dispatch((0, _actions.fetchUsers)()); // this line return the promise
}

function mapStateToProps(state) {
    return { users: state.users }; // before (:) users is prop here
}

exports.default = {
    loadData: loadData,
    component: (0, _reactRedux.connect)(mapStateToProps, { fetchUsers: _actions.fetchUsers })(UsersList)
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("express-http-proxy");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterConfig = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
    var route = _ref.route;

    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
            "h1",
            null,
            "header"
        ),
        (0, _reactRouterConfig.renderRoutes)(route.routes)
    );
};

exports.default = {
    component: App
};

/***/ })
/******/ ]);