import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "react-bootstrap/Button";
import * as authenticationActions from "../actions/AuthenticationActions";
import "../layout/css/loginButton.css";

const mapStateToProps = state => {
    return state;
}

class RegisterButton extends Component {

    constructor(props) {
        super(props);
        this.showRegisterDialog = this.showRegisterDialog.bind(this);
        this.logout = this.logout.bind(this);
    }

    showRegisterDialog() {
        const {getShowRegisterDialogAction} = this.props;
        getShowRegisterDialogAction();
    }

    logout() {
        const {logoutAction} = this.props;
        logoutAction();
        console.log(this.props)
    }

    render() {
        if (!this.props.accessToken) {
            return (
                <div id="registerButton">
                    <Button variant="primary" onClick={this.showRegisterDialog}>
                        Register
                </Button>
                </div>
            )
        }
        else {
            return (
            <div></div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getShowRegisterDialogAction : authenticationActions.getShowRegisterDialogAction,
    logoutAction : authenticationActions.getLogoutAction

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterButton);