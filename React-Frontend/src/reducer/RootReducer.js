import * as authenticationActions from "../actions/AuthenticationActions"
import * as privateMessageActions from "../actions/PrivateMessageActions"
import * as sendMessageActions from "../actions/SendMessageActions"
import * as groupMessageActions from "../actions/GroupMessageActions"

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    showPrivateMessage: "invisible",
    showSendMessage: "invisible",
    privateMessages: [],
    error: null,
    showSendAlert: false
};
function rootReducer(state = initialState, action) {

    console.log(action)

    switch (action.type) {
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null,
            }

        case authenticationActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null,
                wrongLogin: false
            }

        case authenticationActions.SHOW_REGISTER_DIALOG:
            return {
                ...state,
                showRegisterDialog: true,
                error: null,
            }

        case authenticationActions.HIDE_REGISTER_DIALOG:
            return {
                ...state,
                showRegisterDialog: false,
                error: null
            }

        case authenticationActions.AUTHENTICATION_SUCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false,
                accessToken: action.acessToken,
                username: action.username,
                role: action.role,
                wrongLogin: false
            }

        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                pending: false,
                error: "Authentication failed",
                wrongLogin: true
            }

        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }

        case privateMessageActions.SHOW_PRIVATE_MESSAGE:
            return {
                ...state,
                showPrivateMessage: "visible",
                error: null
            }

        case privateMessageActions.HIDE_PRIVATE_MESSAGE:
            return {
                ...state,
                showPrivateMessage: "invisible",
                error: null
            }

        case privateMessageActions.GET_MESSAGES_SUCESS:
            return {
                ...state,
                privateMessages: action.privateMessages,
                messageArrived : true
            }

        case privateMessageActions.GET_MESSAGES_ERROR:
            return {
                ...state,
                error: "Retrieving Messages failed"
            }

        case sendMessageActions.SHOW_SEND_MESSAGE:
            return {
                ...state,
                showSendMessage: "visible",
                error: null
            }

        case sendMessageActions.HIDE_SEND_MESSAGE:
            return {
                ...state,
                showSendMessage: "invisible",
                error: null
            }

        case sendMessageActions.GET_SEND_SUCESS:
            return {
                ...state,
                showSendMessage: "invisible",
                error: null,
                showSendAlert: true
            }

        case sendMessageActions.HIDE_SEND_ALERT:
            return {
                ...state,
                showSendAlert: false
            }

        case authenticationActions.LOGOUT:
            return initialState

        case groupMessageActions.GET_GROUP_MESSAGES_SUCESS:
            return {
                ...state,
                error: null,
                publicGroupMessages: action.publicGroupMessages,
            }

        case privateMessageActions.MESSAGE_PENDING:
            return {
                ...state,
            }
        
        case privateMessageActions.MESSAGE_ARRIVED_RESET:
            return {
                ...state,
                messageArrived : false
            }
        
        case groupMessageActions.GET_GROUP_MESSAGES_ERROR:
            return {
                ...state,
                error: action.error
            }

        case groupMessageActions.SHOW_GROUP_MESSAGE:
            return {
                ...state,
                showGroupMessage: "visible",
                error: null
            }

        case groupMessageActions.HIDE_GROUP_MESSAGE:
            return {
                ...state,
                showGroupMessage: "invisible",
                error: null
            }

        case groupMessageActions.GET_POST_SUCESS:
            return {
                ...state,
                showSendAlert: true,
                error: null
            }

        case groupMessageActions.GET_POST_PENDING:
            return {
                ...state,
                postPending: true
            }

        case groupMessageActions.GET_POST_PENDING_OVER:
            return {
                ...state,
                postPending: false
            }

        case authenticationActions.REGISTER_SUCESS:
            return {
                ...state,
                registerSucess: true,
                error: null,
                showRegisterDialog: false,
            }

        case authenticationActions.HIDE_REGISTER_SUCESS_ALERT:
            return {
                ...state,
                registerSucess: false,
                error: null
            }

        default:
            return state;
    }
};
export default rootReducer;