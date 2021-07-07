import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as sendMessageActions from "../actions/SendMessageActions";

import "../layout/css/bootstrap.css";
import "../layout/css/bootstrap-grid.css";
import "../layout/css/bootstrap-reboot.css";
import "../layout/css/bootstrap.min.css";
import "../layout/css/bootstrap-grid.min.css";
import "../layout/css/colors.css";
import "../layout/css/myStyles.css";
import "../layout/css/navbar.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const mapStateToProps = state => {
    return state;
}

class CreateMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            receive: "",
            text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({ [name] : value });

    }

    sendMessage(e){
        e.preventDefault();
        let token = "Bearer " + this.props.accessToken;
        const { sendMessageAction } = this.props;
        sendMessageAction(token, this.state.subject, this.state.receive, this.state.text);
    }


    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label><h3>Empfänger</h3></Form.Label>
                    <Form.Control type="text" name="receive" placeholder="Empfänger eingeben" onChange= {this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label><h3>Betreff</h3></Form.Label>
                    <Form.Control type="text" name="subject" placeholder="Betreff eingeben" onChange= {this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label><h3>Nachricht</h3></Form.Label>
                    <Form.Control as="textarea" name="text" rows="5" onChange= {this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" block onClick= {this.sendMessage}>
                    <h3>Nachricht abschicken</h3>
  </Button>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    sendMessageAction: sendMessageActions.sendMessage
}, dispatch)

const ConnectedCreateMessage = connect(mapStateToProps, mapDispatchToProps)(CreateMessage);

export default ConnectedCreateMessage