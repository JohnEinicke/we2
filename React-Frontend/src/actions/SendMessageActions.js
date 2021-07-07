export const GET_SEND_SUCESS = "GET_SEND_SUCESS";
export const GET_SEND_ERROR = "GET_SEND_ERROR";
export const SHOW_SEND_MESSAGE = "SHOW_SEND_MESSAGE";
export const HIDE_SEND_MESSAGE = "HIDE_SEND_MESSAGE";
export const HIDE_SEND_ALERT = "HIDE_SEND_ALERT";

export function getHideSendAlertAction(){
    return {
        type: HIDE_SEND_ALERT
    }
}

export function getShowSendMessageAction(){
    return {
        type: SHOW_SEND_MESSAGE
    }
}

export function getHideSendMessageAction(){
    return {
        type: HIDE_SEND_MESSAGE
    }
}

export function getSendSucessAction() {
    return {
        type: GET_SEND_SUCESS
    }
}

export function getSendErrorAction() {
    return {
        type: GET_SEND_ERROR
    }
}

export function sendMessage(token, subject, receive, text){
    console.log("Send message")

    return dispatch => {
        send(token, subject, receive, text)
            .then(
                response => {
                    dispatch(getSendSucessAction());
                },

                error => {
                    dispatch(getSendErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getSendErrorAction(error));
            })
    }
}

function send(token, subject, empfang, messageText) {
    const requestOptions = {
        method: "POST",
        headers: { 
            "Authorization": token,
            "Content-Type" : "application/json" 
    },
        body: JSON.stringify({subject, empfang, messageText})
    }

    return fetch("https://localhost:8080/privateMessage/createMessage", requestOptions)
        .then(handleResponse)
        .then(sucess => {
            console.log("hier")
            return sucess
        })
}

function handleResponse(response) {
    response.text().then(text => {

        let json = JSON.parse(text)
        let response = {
            emfpang: json.empfang
        }

        return response
    })
}