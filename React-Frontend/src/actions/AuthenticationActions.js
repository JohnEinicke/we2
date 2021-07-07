export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG";
export const SHOW_REGISTER_DIALOG = "SHOW_REGISTER_DIALOG";

export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";
export const HIDE_REGISTER_DIALOG = "HIDE_REGISTER_DIALOG";

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENTICATION_SUCESS = "AUTHENTICATION_SUCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export const REGISTER_SUCESS = "REGISTER_SUCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const HIDE_REGISTER_SUCESS_ALERT = "REGISTER_SUCESS_ALERT"

export const LOGOUT = "LOGOUT";

export function getHideRegisterSucessAlertAction() {
    return {
        type: HIDE_REGISTER_SUCESS_ALERT
    }
}

export function getLogoutAction() {
    return {
        type: LOGOUT
    }
}

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getShowRegisterDialogAction() {
    return {
        type: SHOW_REGISTER_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getHideRegisterDialogAction() {
    return {
        type: HIDE_REGISTER_DIALOG
    }
}

export function getAuthenticationPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSucessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCESS,
        acessToken: userSession.acessToken,
        username: userSession.username,
        role: userSession.role
    }
}

export function getAuthenticationErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function getRegisterSucessAction(userSession) {
    return {
        type: REGISTER_SUCESS,
        showRegisterSucess: true
    }
}

export function getRegisterErrorAction(error) {
    return {
        type: REGISTER_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password) {
    console.log("Authenticate")
        return dispatch => {
            dispatch(getAuthenticationPendingAction());
            login(userID, password)
                .then(
                    userSession => {
                        const action = getAuthenticationSucessAction(userSession);
                        dispatch(action);
                    },
                    error => {
                        dispatch(getAuthenticationErrorAction(error));
                    }
                )
                .catch(error => {
                    dispatch(getAuthenticationErrorAction(error));
                })
        }
}

function login(username, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    };

    return fetch("https://localhost:8080/login/normal", requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get("Authorization");

    return response.text().then(text => {
        console.log("Receive result: " + authorizationHeader);

        let json = JSON.parse(text)

        var token;
        if (authorizationHeader) {
            token = authorizationHeader.split(" ")[1];
        }


        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            const error = response.statusText;
            return Promise.reject(error);
        }

        else {
            let userSession = {
                acessToken: token,
                username: json.username,
                role: json.role
            }
            return userSession;
        }
    })
}

export function registerUser(username, password, email){
    console.log("Register")
    return dispatch => {
        register(username, password, email)
            .then(
                sucess => {
                    const action = getRegisterSucessAction();
                    dispatch(action);
                },
                error => {
                    dispatch(getRegisterErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getRegisterErrorAction(error));
            })
    } 
}

function register(username, password, email) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email})
    }

    console.log(requestOptions);

    return fetch("https://localhost:8080/register", requestOptions)
}

function logout() {
    console.error("Fehler beim Login");
}