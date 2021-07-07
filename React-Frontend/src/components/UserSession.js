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

class UserSession extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: ""
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
        const { showLoginDialogAction } = this.props;
        showLoginDialogAction();
    }

    handleClose(e) {
        const { hideLoginDialogAction } = this.props;
        hideLoginDialogAction();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        const {authenticateUserAction} = this.props;
        await authenticateUserAction(username, password);
        this.setState({username : "" , password : ""});
    }

    

    render() {

        var showDialog = this.props.showLoginDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        return (
            <div>
                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="loginForm">
                            <Form.Group controlId="formBasicEmail">
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
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
              </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Sign In
              </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser
}, dispatch)

const ConnectedUserSession = connect(mapStateToProps, mapDispatchToProps)(UserSession)

export default ConnectedUserSession;