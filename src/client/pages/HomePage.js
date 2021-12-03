// es 2015 module syntax

import React from "react";

const Home = () => {
    return (
        <div>
            <div>I'm the very very best home component</div>
            <button
                onClick={() => {
                    console.log("hi there from Home!");
                }}
            >
                Press Me
            </button>
        </div>
    );
};

export default { component: Home };
