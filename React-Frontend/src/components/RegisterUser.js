import React, { Component } from "react";
import { connect } from "react-redux";
import * as authenticationActions from "../actions/AuthenticationActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { bindActionCreators } from "redux";
import Form from "react-bootstrap/Form";

const mapStateToProps = state => {
    return state;
}

class RegisterUser extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: "",
            email: ""
     };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({ [name] : value });
    }

    handleShow(e) {
        const { showRegisterDialogAction } = this.props;
        showRegisterDialogAction();
    }

    handleClose(e) {
        const { hideRegisterDialogAction } = this.props;
        hideRegisterDialogAction();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {username, password, email} = this.state;
        const {registerUserAction} = this.props;
        await registerUserAction(username, password, email);
    }

    

    render() {

        var showDialog = this.props.showRegisterDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        return (
            <div>
                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="loginForm">
                            <Form.Group controlId="formBasicUser">
                            <div className="row flex-nowrap">
                                    <div className="col-md-auto" id="loginIcon"><i className="fas fa-user"></i></div>
                                    <div className="col-md col-11">
                                        <Form.Control type="text" name="username" placeholder="Enter Username" onChange= {this.handleChange} />
                                    </div>
                            </div>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <div className="row flex-nowrap">
                                    <div className="col-md-auto" id="loginIcon"><i className="fas fa-key"></i></div>
                                    <div className="col-md col-11">
                                    <Form.Control type="password" name="password" placeholder="Password" onChange= {this.handleChange} />
                                    </div>
                            </div>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <div className="row flex-nowrap">
                                    <div className="col-md-auto" id="loginIcon"><i className="fas fa-envelope"></i></div>
                                    <div className="col-md col-11">
                                    <Form.Control type="email" name="email" placeholder="E-Mail" onChange= {this.handleChange} />
                                    </div>
                            </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
              </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Registrieren
              </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showRegisterDialogAction: authenticationActions.getShowRegisterDialogAction,
    hideRegisterDialogAction: authenticationActions.getHideRegisterDialogAction,
    registerUserAction: authenticationActions.registerUser
}, dispatch)

const ConnectedUserSession = connect(mapStateToProps, mapDispatchToProps)(RegisterUser)

export default ConnectedUserSession;