const UPDATE_AUTHENTICATE = "UPDATE-AUTHENTICATE"
const UPDATE_GMAIL = "UPDATE-GMAIL"
const UPDATE_PASSWORD = "UPDATE-PASSWORD"
const UPDATE_CONFIRM = "UPDATE-CONFIRM"
const UPDATE_URL = "UPDATE-URL"
const LOGOUT = "LOGOUT"


const authenticationReducer = (state, action) => {

    switch(action.type){
        case UPDATE_AUTHENTICATE:
            state.isAuthenticated = action.authentication_value
            return state;

        case UPDATE_URL:
            action.navigate('/');
            state.gmailField = '';
            state.passwordField = '';
            state.confirmField = '';
            return state;

        case UPDATE_GMAIL:
            state.gmailField = action.newGmail;
            return state;

        case UPDATE_PASSWORD:
            state.passwordField = action.newPassword;
            return state;

        case UPDATE_CONFIRM:
            state.confirmField = action.newConfirm;
            return state;

        case LOGOUT:
            state.isAuthenticated = false;

            return state;
        default:
            return state;
    }
}

export const updateAuthenticationStatus = (value) => ({type: UPDATE_AUTHENTICATE, authentication_value: value})

export const updateUrlActionCreator = (navigateuUrl) => ({type: UPDATE_URL, navigate: navigateuUrl})

export const logoutActionCreator = () => ({type: LOGOUT})

export const updateNewGmailActionCreator = (text) => ({type: UPDATE_GMAIL, newGmail: text})
export const updateNewPasswordActionCreator = (text) => ({type: UPDATE_PASSWORD, newPassword: text})
export const updateNewConfirmActionCreator = (text) => ({type: UPDATE_CONFIRM, newConfirm: text})

export default authenticationReducer;