const UPDATE_AUTHENTICATE = "UPDATE-AUTHENTICATE"
const UPDATE_GMAIL = "UPDATE-GMAIL"
const UPDATE_PASSWORD = "UPDATE-PASSWORD"
const UPDATE_CONFIRM = "UPDATE-CONFIRM"
const UPDATE_URL = "UPDATE-URL"
const LOGOUT = "LOGOUT"


const authenticationReducer = (state, action) => {

    switch(action.type){

        case UPDATE_AUTHENTICATE:
            return {
                ...state,
                authenticationPage: {
                    ...state.authenticationPage,
                    isAuthenticated: action.authentication_value
                },
            };

        case UPDATE_URL:
            action.navigate('/');
            return {
                ...state,
                authenticationPage: {
                    ...state.authenticationPage,
                }
            };

        case UPDATE_GMAIL:
            return {
                ...state,
                authenticationPage: {
                    ...state.authenticationPage,
                    gmailField: action.newGmail
                }
            };

        case UPDATE_PASSWORD:
            return {
                ...state,
                authenticationPage: {
                    ...state.authenticationPage,
                    passwordField: action.newPassword
                },
                toDoListPage: state.toDoListPage
            };

        case UPDATE_CONFIRM:
            return {
                ...state,
                authenticationPage: {
                    ...state.authenticationPage,
                    confirmField: action.newConfirm
                }
            };    
            
        case LOGOUT:
            return {
                authenticationPage: {
                    gmailField: '',
                    passwordField: '',
                    confirmField: '',
                    isAuthenticated: false
                },
                toDoListPage: {
                    toDoFieldData: null,
                    enterText: ''
                }
            }; 
            
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