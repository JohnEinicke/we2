import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as privateMessageAction from "../actions/PrivateMessageActions";
import * as sendMessageAction from "../actions/SendMessageActions";
import "../layout/css/bootstrap.css";
import "../layout/css/bootstrap-grid.css";
import "../layout/css/bootstrap-reboot.css";
import "../layout/css/bootstrap.min.css";
import "../layout/css/bootstrap-grid.min.css";
import "../layout/css/colors.css";
import "../layout/css/myStyles.css";
import CreateMessage from "./CreateMessage";
import SendSucess from "./SendSucess";
import Button from "react-bootstrap/Button";
import * as groupMessageActions from "../actions/GroupMessageActions";
import CreatePost from "./CreatePost";

const mapStateToProps = state => {
    return state;
}

class PrivatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupMessages: [],
            privateMessages: []
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleShowSend = this.handleShowSend.bind(this);
        this.handleGroupMessage = this.handleGroupMessage.bind(this);
        this.handleShowGroup = this.handleShowGroup.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.reloadPost = this.reloadPost.bind(this);
        this.loadMessage = this.loadMessage.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
    }

    handleShow(e) {
        this.handleHide(e);
        const { showPrivateMessageAction } = this.props;
        this.handleMessage(e);
        showPrivateMessageAction();
    }

    handleHide(e) {
        const { hidePrivateMessageAction } = this.props;
        const { hideSendMessageAction } = this.props;
        const { hideGroupMessageAction } = this.props;
        hidePrivateMessageAction();
        hideSendMessageAction();
        hideGroupMessageAction();
    }

    handleShowSend(e) {
        this.handleHide(e);
        const { showSendMessageAction } = this.props;
        showSendMessageAction();
    }

    handleShowGroup(e) {
        this.handleGroupMessage(e);
        this.handleHide(e);
        const { showGroupMessageAction } = this.props;
        showGroupMessageAction();
    }

    async handleGroupMessage() {
        const { getPublicGroupMessagesAction } = this.props;
        let token = "Bearer " + this.props.accessToken
        await getPublicGroupMessagesAction(token);
        this.setState({ groupMessages: this.props.publicGroupMessages });
    }

    async handleMessage(e) {
        e.preventDefault();
        const { getPrivateMessageAction } = this.props;
        let token = "Bearer " + this.props.accessToken
        await getPrivateMessageAction(token);
        this.setState({ privateMessages: this.props.privateMessages });
    }

    deleteMessage(e) {
        console.log("!")
    }

    reloadPost() {
        this.handleGroupMessage();
        const { getPostPendingOverAction } = this.props;
        getPostPendingOverAction();
    }

    loadMessage() {
        const { getMessageArrivedResetAction } = this.props;
        getMessageArrivedResetAction();
    }

    renderMessage() {
        var privateMessage = this.props.privateMessages;
        if (privateMessage.length > 0) {
            var privateMessageData = JSON.parse(privateMessage);
        }

        var listPrivateMessage = "";
        if (privateMessageData) {
            listPrivateMessage = privateMessageData.map((d) =>
                <li key={d._id}>
                    <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                        <div className="myColor2 mr-md-3 pt-3 px-3 px-md-5 overflow-hidden">
                            <div className="my-3 py-3">
                                <h2 className="display-5"><i className="far fa-comment-dots"></i><u>Nachricht von {d.sender}</u></h2>
                                <h3 className="display-5">{d.subject}</h3>
                                <p className="lead">{d.messageText}</p>
                                <div className="row">
                                    <div className="col-lg">
                                        <button type="button" className="btn btn-secondary btn-block rounded-0">
                                            <i className="fas fa-reply"></i> Antworten
              </button>
                                    </div>
                                    <div className="col-lg">
                                        <button type="button" className="btn btn-secondary btn-block rounded-0" onClick={this.deleteMessage}>
                                            <i className="fas fa-trash"></i> Löschen
              </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            );
        }

        return listPrivateMessage;
    }

    render() {
        var postPending = this.props.postPending;

        if (postPending === undefined) {
            postPending = false;
        }

        if (postPending) {
            this.reloadPost();
        }

        var groupMessage = this.state.groupMessages;
        if (groupMessage.length > 0) {
            var data = JSON.parse(groupMessage);
        }

        var listGroupMessage = "";
        if (data) {
            listGroupMessage = data.map((d) =>
                <li key={d._id}>
                    <div className="">
                        <div className="border rounded mb-4 shadow-sm">
                            <div className="">
                                <strong className="mb-2 text-primary">{d.sender}</strong>
                                <h3 className="mb-0">{d.subject}</h3>
                                <div className="mb-1 text-muted">Öffentlich</div>
                                <p className="card-text mb-auto">{d.messageText}</p>
                            </div>
                        </div>
                    </div>
                </li>
            );
        }


        var showMessage = this.props.showPrivateMessage;
        if (showMessage === undefined) {
            showMessage = "invisible";
        }

        var showSendMessage = this.props.showSendMessage;
        if (showSendMessage === undefined) {
            showSendMessage = "invisible";
        }

        var showGroupMessage = this.props.showGroupMessage;
        if (showGroupMessage === undefined) {
            showGroupMessage = "invisible";
        }


        const username = this.props.username;




        var privateMessage = this.state.privateMessages;
        if (privateMessage.length > 0) {
            var privateMessageData = JSON.parse(privateMessage);
        }

        var listPrivateMessage = "";
        if (privateMessageData) {
            listPrivateMessage = privateMessageData.map((d) =>
                <li key={d._id}>
                    <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                        <div className="myColor2 mr-md-3 pt-3 px-3 px-md-5 overflow-hidden">
                            <div className="my-3 py-3">
                                <h2 className="display-5"><i className="far fa-comment-dots"></i><u>Nachricht von {d.sender}</u></h2>
                                <h3 className="display-5">{d.subject}</h3>
                                <p className="lead">{d.messageText}</p>
                                <div className="row">
                                    <div className="col-lg">
                                        <button type="button" className="btn btn-secondary btn-block rounded-0">
                                            <i className="fas fa-reply"></i> Antworten
              </button>
                                    </div>
                                    <div className="col-lg">
                                        <button type="button" className="btn btn-secondary btn-block rounded-0" onClick={this.deleteMessage}>
                                            <i className="fas fa-trash"></i> Löschen
              </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            );
        }


        return (
            <div>
                <style type="text/css">
                    {`
                    .btn{
                        border-radius: 0px;
                    }
                    `}
                </style>
                <div className="myColor1">
                    <div className="mx-auto bg-white" id="personalContent">
                        <div className="container" id="userInformation">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src="pictures/profile.jpg" id="profilepic" className="rounded-circle mx-auto d-block" alt="User" />
                                </div>
                                <div className="col-md-6" id="username">
                                    <h1 className="text-center">{username}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="ml-2 mr-2 mt-2 mb-2" id="userMenu">
                            <div className="row">
                                <div className="col-lg">
                                    <div>
                                        <Button variant="primary" block onClick={this.handleShow}>
                                            <h2>Private Nachrichten</h2>
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-lg">
                                    <div>
                                        <Button variant="primary" block onClick={this.handleShowSend}>
                                            <h2>Nachricht erstellen</h2>
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-lg">
                                    <div>
                                        <Button variant="primary" block onClick={this.handleShowGroup}>
                                            <h2>LeseBlog</h2>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={showMessage}>
                            <ul id="listMessage">
                                {listPrivateMessage}
                            </ul>
                        </div>
                        <div className={showSendMessage}>
                            <CreateMessage />
                        </div>
                        <div className={showGroupMessage}>
                            <ul id="listMessage">
                                {listGroupMessage}
                            </ul>
                            <hr />
                            <CreatePost />
                        </div>
                    </div>
                    <hr />
                    <footer className="container">
                    </footer>
                </div>
                <SendSucess />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showPrivateMessageAction: privateMessageAction.getShowPrivateMessageAction,
    hidePrivateMessageAction: privateMessageAction.getHidePrivateMessageAction,
    getPrivateMessageAction: privateMessageAction.getPrivateMessages,
    showSendMessageAction: sendMessageAction.getShowSendMessageAction,
    hideSendMessageAction: sendMessageAction.getHideSendMessageAction,
    getPublicGroupMessagesAction: groupMessageActions.getPublicGroupMessages,
    showGroupMessageAction: groupMessageActions.getShowGroupMessageAction,
    hideGroupMessageAction: groupMessageActions.getHideGroupMessageAction,
    getPostPendingOverAction: groupMessageActions.getPostPendingOverAction,
    getMessageArrivedResetAction: privateMessageAction.getMessageArrivedReset
}, dispatch)

const ConnectedPrivatePage = connect(mapStateToProps, mapDispatchToProps)(PrivatePage);

export default ConnectedPrivatePage