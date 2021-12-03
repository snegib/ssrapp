// this is the file shared routes both server and client base routes

import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import UsersList from "./components/UsersList";

// this structure needed when we doing SSR, npm module required 'react-router-config'
export default [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/users",
        component: UsersList,
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
