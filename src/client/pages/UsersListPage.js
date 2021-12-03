import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

class UsersList extends Component {
    componentDidMount() {
        // action creator
        this.props.fetchUsers();
    }

    // helper function
    renderUsers() {
        return this.props.users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
        });
    }
    render() {
        return (
            <div>
                Here's big list of users:
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

function loadData(store) {
    // console.log("trying to load data");
    return store.dispatch(fetchUsers()); // this line return the promise
}

function mapStateToProps(state) {
    return { users: state.users }; // before (:) users is prop here
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchUsers })(UsersList),
};
