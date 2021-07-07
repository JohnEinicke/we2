import React, { Component } from "react";
import * as groupMessageActions from  "../actions/GroupMessageActions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendPost = this.sendPost.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async sendPost(e) {
        e.preventDefault();
        let token = "Bearer " + this.props.accessToken;
        const {sendPostAction} = this.props;
        const {postPendingAction} = this.props;
        await sendPostAction(token, this.state.subject, this.state.text);
        postPendingAction();
    }


    render() {
        return (
            <Form>
                <h1>Neuer Post</h1>
                <Form.Group>
                    <Form.Label><h3>Betreff</h3></Form.Label>
                    <Form.Control id = "form" type="text" name="subject" placeholder="Betreff eingeben" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label><h3>Nachricht</h3></Form.Label>
                    <Form.Control id = "form" as="textarea" name="text" rows="5" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" block onClick={this.sendPost}>
                    <h3>Posten</h3>
                </Button>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    sendPostAction : groupMessageActions.sendPost,
    postPendingAction : groupMessageActions.getPostPendingAction
}, dispatch)

const ConnectedCreatePost = connect(mapStateToProps, mapDispatchToProps)(CreatePost);

export default ConnectedCreatePost