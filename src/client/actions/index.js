import axios from "axios"; // for api request

export const FETCH_USERS = "fetch-users";

// this function start from 'async' will automatically invoke by redux thunk
export const fetchUsers = () => async (dispatch, getState, api) => {
    // api here is 'axiosInstance', see client.js
    const res = await api.get("/users");

    dispatch({
        type: FETCH_USERS,
        payload: res, // sending data whatever getting from api
    });
};
