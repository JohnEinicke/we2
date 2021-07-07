import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "react-bootstrap/Button";
import * as authenticationActions from "../actions/AuthenticationActions";
import "../layout/css/loginButton.css";

const mapStateToProps = state => {
    return state;
}

class LoginButton extends Component {

    constructor(props) {
        super(props);
        this.showLoginDialog = this.showLoginDialog.bind(this);
        this.logout = this.logout.bind(this);
    }

    showLoginDialog() {
        const {getShowLoginDialogAction} = this.props;
        getShowLoginDialogAction();
    }

    logout() {
        const {logoutAction} = this.props;
        logoutAction();
        console.log(this.props)
    }

    render() {
        if (!this.props.accessToken) {
            return (
                <div id="loginButton">
                    <Button variant="primary" onClick={this.showLoginDialog}>
                        Log In
                </Button>
                </div>
            )
        }
        else {
            return (
                <div id="loginButton">
                    <Button variant="primary" onClick={this.logout}>
                        Log Out
                </Button>
            </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getShowLoginDialogAction : authenticationActions.getShowLoginDialogAction,
    logoutAction : authenticationActions.getLogoutAction

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);