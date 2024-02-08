import React from "react"
import "./AuthenticationBtn.css"
import { NavLink } from "react-router-dom"
import { logoutActionCreator } from "../../../Redux/Reducers/authentication-reducer" 
import { useNavigate } from 'react-router-dom';
import handleRegistration from "../../../Redux/handleRegistration";
import handleLogin from "../../../Redux/handleLogin";
import { updateUrlActionCreator } from "../../../Redux/Reducers/authentication-reducer";

const AuthenticationBtn = (props) => {
    let returnValue = null
    const navigate = useNavigate();

    function registrationButtonClick (){
        handleRegistration();
        props.dispatch(updateUrlActionCreator(navigate))
    }

    function loginButtonClick(){
        handleLogin();
        props.dispatch(updateUrlActionCreator(navigate))
    }

    function onLogout(){
        props.dispatch(logoutActionCreator()).then(() => {
            props.dispatch(updateUrlActionCreator(navigate));
        });
    }

    switch(props.type){
        case "SignUp":
            returnValue = (
                <div className="authenticationbtns">
                    <button className="authenticationbtn" onClick={registrationButtonClick}>SignUp</button>
                    <NavLink className="authenticationtext" to='/Login/'>Already have an account?</NavLink>
                </div>
            )
            break;
        case "Login":
            returnValue = (
                <div className="authenticationbtns">
                    <button className="authenticationbtn" onClick={loginButtonClick}>Login</button>
                    <NavLink className="authenticationtext" to='/'>Don't have an account created?</NavLink>
                </div>
            )
            break;
        case "Logout":
            returnValue = (
                    <button className="authenticationbtn" onClick={onLogout}>Logout</button>
            )
            break;
        default:
            break;
    }

    return (
        <div>
            {returnValue}
        </div>
    )
}

export default AuthenticationBtn