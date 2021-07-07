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
import * as sendMessageActions from "../actions/SendMessageActions";

const mapStateToProps = state => {
    return state;
}


class SendSucess extends Component {

    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e) {
        const { getHideSendAlertAction } = this.props;
        getHideSendAlertAction();
    }

    render() {

        var showSendAlert = this.props.showSendAlert;
        if (showSendAlert === undefined) {
            showSendAlert = false;
        }

        return (
            <>
                <Modal show={showSendAlert} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nachricht</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deine Nachricht wurde erfolgreich verschickt!</Modal.Body>
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
    getHideSendAlertAction : sendMessageActions.getHideSendAlertAction
}, dispatch)

const ConnectedSendSucess = connect(mapStateToProps, mapDispatchToProps)(SendSucess)

export default ConnectedSendSucess