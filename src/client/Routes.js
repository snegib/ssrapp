// this is the file shared routes both server and client base routes

import React from "react";
// import { Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";

// this structure needed when we doing SSR, npm module required 'react-router-config'
export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,
                path: "/",
                exact: true,
            },
            {
                ...UsersListPage,
                path: "/users",
            },
        ],
    },
];

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
