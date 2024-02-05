import React from "react"
import "./AuthenticationInputs.css"
import { updateNewGmailActionCreator, 
    updateNewPasswordActionCreator, updateNewConfirmActionCreator } from "../../../Redux/Reducers/authentication-reducer";

const AuthenticationInputs = (props) => {
    let returnValue = null;
    let authenticationPage = props.state.authenticationPage;

    function onNewGmailText(event){
        let body = event.target.value
        props.dispatch(updateNewGmailActionCreator(body))
    }

    function onNewPasswordText(event){
        let body = event.target.value
        props.dispatch(updateNewPasswordActionCreator(body))
    }

    function onNewConfirmText(event){
        let body = event.target.value
        props.dispatch(updateNewConfirmActionCreator(body))
    }

    switch (props.type) {
        case "SignUp":
            returnValue = (
                <div className="authenticationinputs">
                    <input value={authenticationPage.gmailField} onChange={onNewGmailText}  type="text" placeholder="Gmail" />
                    <input value={authenticationPage.passwordField} onChange={onNewPasswordText} type="password" placeholder="Password" />
                    <input value={authenticationPage.confirmField} onChange={onNewConfirmText} type="password" placeholder="Confirm" />
                </div>
            )
            break;
        case "Login":
            returnValue = (
                <div className="authenticationinputs">
                    <input value={authenticationPage.gmailField} onChange={onNewGmailText} type="text" placeholder="Gmail" />
                    <input value={authenticationPage.passwordField} onChange={onNewPasswordText} type="password" placeholder="Password" />
                </div>)
            break;

        default:
            break
    }

    return (
        <div>
            {returnValue}
        </div>
    )
}

export default AuthenticationInputs