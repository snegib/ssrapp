import axios from "axios"; // for api request

export const FETCH_USERS = "fetch-users";
export const fetchUsers = () => async (dispatch) => {
    const res = await axios.get("https://react-ssr-api.herokuapp.com/users");

    dispatch({
        type: FETCH_USERS,
        payload: res, // sending data whatever getting from api
    });
};
