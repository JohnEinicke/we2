
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../layout/css/bootstrap.css";
import "../layout/css/bootstrap-grid.css";
import "../layout/css/bootstrap-reboot.css";
import "../layout/css/bootstrap.min.css";
import "../layout/css/bootstrap-grid.min.css";
import "../layout/css/colors.css";
import "../layout/css/myStyles.css";
import "../layout/css/navbar.css";
import * as authenticationActions from "../actions/AuthenticationActions";

const mapStateToProps = state => {
    return state;
}


class RegisterSucess extends Component {

    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e) {
        const { getHideRegisterAlertAction } = this.props;
        getHideRegisterAlertAction();
    }

    render() {

        var showAlert = this.props.registerSucess;
        if (showAlert === undefined) {
            showAlert = false;
        }

        console.log(showAlert)

        return (
            <>
                <Modal show={showAlert} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registrierung</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Es wurde ein Aktivierungscode an deine Email geschickt!</Modal.Body>
                    <Modal.Body>Bittle klicke auf den Link innerhalb von 24 Stunden.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                  </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    getHideRegisterAlertAction : authenticationActions.getHideRegisterSucessAlertAction,
}, dispatch)

const ConnectedRegisterSucess = connect(mapStateToProps, mapDispatchToProps)(RegisterSucess)

export default ConnectedRegisterSucess