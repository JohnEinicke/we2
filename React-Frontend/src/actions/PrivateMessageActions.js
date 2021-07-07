export const SHOW_PRIVATE_MESSAGE = "SHOW_PRIVATE_MESSAGE";
export const HIDE_PRIVATE_MESSAGE = "HIDE_PRIVATE_MESSAGE";

export const GET_MESSAGES_SUCESS = "GET_MESSAGES_SUCESS";
export const GET_MESSAGES_ERROR = "GET_MESSAGES_ERROR";
export const MESSAGE_PENDING = "MESSAGE_PENDING";

export const MESSAGE_ARRIVED_RESET = "MESSAGE_ARRIVED_RESET";

export function getMessageArrivedReset() {
    return {
        type: MESSAGE_ARRIVED_RESET
    }
}

export function getShowPrivateMessageAction() {
    return {
        type: SHOW_PRIVATE_MESSAGE
    }
}

export function getHidePrivateMessageAction() {
    return {
        type: HIDE_PRIVATE_MESSAGE
    }
}

export function getMessagesErrorAction(error) {
    return {
        type: GET_MESSAGES_ERROR,
        error: error
    }
}

export function getMessagesSucessAction(messages) {
    return {
        type: GET_MESSAGES_SUCESS,
        privateMessages: messages
    }
}

export function getMessagePendingAction() {
    return {
        type: MESSAGE_PENDING
    }
}

export function getPrivateMessages(token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(getMessagePendingAction());
            accessMessages(token)
                .then(
                    userMessages => {
                        const action = getMessagesSucessAction(userMessages.messages);
                        dispatch(action);
                        resolve()
                    },
                    error => {
                        dispatch(getMessagesErrorAction(error));
                        reject()
                    }
                )
                .catch(error => {
                    dispatch(getMessagesErrorAction(error));
                    reject()
                })
        })
    }
}

function accessMessages(token) {
    const requestOptions = {
        method: "GET",
        headers: { "Authorization": token }
    };

    return fetch("https://localhost:8080/privateMessage", requestOptions)
        .then(handleResponse)
        .then(messages => {
            return messages
        })
}

function handleResponse(response) {
    return response.text().then(json => {
        let userMessages = {
            messages: json
        }
        return userMessages;
    })
}
