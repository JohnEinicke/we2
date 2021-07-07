export const GET_GROUP_MESSAGES_SUCESS = "GET_GROUP_MESSAGES_SUCESS";
export const GET_GROUP_MESSAGES_ERROR = "GET_GROUP_MESSAGES_ERROR";

export const SHOW_GROUP_MESSAGE = "SHOW_GROUP_MESSAGE";
export const HIDE_GROUP_MESSAGE = "HIDE_GROUP_MESSAGE";

export const GET_POST_SUCESS = "GET_POST_SUCESS";
export const GET_POST_ERROR = "GET_POST_ERROR";
export const GET_POST_PENDING = "GET_POST_PENDING";
export const GET_POST_PENDING_OVER = "GET_POST_PENDING_OVER";

export function getPostPendingAction(){
    return{
        type: GET_POST_PENDING
    }
}

export function getPostPendingOverAction(){
    return{
        type: GET_POST_PENDING_OVER
    }
}

export function getShowGroupMessageAction() {
    return {
        type: SHOW_GROUP_MESSAGE
    }
}

export function getHideGroupMessageAction() {
    return {
        type: HIDE_GROUP_MESSAGE
    }
}

export function getPublicGroupMessagesErrorAction(error) {
    return {
        type: GET_GROUP_MESSAGES_ERROR,
        error: error
    }
}

export function getPublicGroupMessagesSucessAction(messages) {
    return {
        type: GET_GROUP_MESSAGES_SUCESS,
        publicGroupMessages: messages
    }
}

export function getPostSucessAction() {
    return {
        type: GET_POST_SUCESS
    }
}

export function getPostErrorAction(error) {
    return {
        type: GET_POST_ERROR,
        error: error
    }
}



export function getPublicGroupMessages(token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            accessMessages(token)
                .then(
                    groupMessages => {
                        const action = getPublicGroupMessagesSucessAction(groupMessages.messages);
                        dispatch(action);
                        resolve();
                    },
                    error => {
                        dispatch(getPublicGroupMessagesErrorAction(error));
                        reject();
                    }
                )
                .catch(error => {
                    dispatch(getPublicGroupMessagesErrorAction(error));
                    reject();
                })
        });
    }
}

function accessMessages(token) {
    const requestOptions = {
        method: "GET",
        headers: { "Authorization": token }
    };

    return fetch("https://localhost:8080/lesegruppe/readPublicGroupMessages", requestOptions)
        .then(handleResponse)
        .then(messages => {
            return messages
        })
}

function handleResponse(response) {
    return response.text().then(json => {
        let groupMessages = {
            messages: json
        }
        return groupMessages;
    })
}

export function sendPost(token, subject, text) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            send(token, subject, text)
                .then(
                    response => {
                        dispatch(getPostSucessAction());
                        resolve();
                    },

                    error => {
                        dispatch(getPostErrorAction(error));
                        reject();
                    }
                )
                .catch(error => {
                    dispatch(getPostErrorAction(error));
                    reject();
                })
        })
    }
}

function send(token, subject, messageText) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ subject, messageText })
    }

    return fetch("https://localhost:8080/lesegruppe/createPublicGroupMessage", requestOptions)
        .then(handlePostResponse)
        .then(sucess => {
            return sucess
        })
}

function handlePostResponse(response) {
    response.text().then(text => {
        let json = JSON.parse(text)
        let response = {
            emfpang: json.empfang
        }

        return response
    })
}