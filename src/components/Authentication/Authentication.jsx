import React, { useEffect } from 'react';
import "./Authentication.css"
import AuthenticationInputs from "./AuthenticationInputs/AuthenticationInputs"
import AuthenticationBtn from "./AuthenticationBtn/AuthenticationBtn"
import PopupBlock from '../PopupBlock/PopupBlock';
import { Transition } from 'react-transition-group';
import { clearPopupActionCreator} from '../../Redux/Reducers/popup-reducer';

const clearLocalStorage = () => {
    localStorage.clear();
  };

const Authentication = (props) => {

    useEffect(() => {
        clearLocalStorage();
      }, []);
      
    return (
        <div className="authentication">
            <Transition
                in={props.state.popupBlock.isActive}
                timeout={500}
                unmountOnExit
                onExited={() => props.dispatch(clearPopupActionCreator())} 
            >
                {state => <PopupBlock state={props.state} stateTransition={state}/>}
            </Transition>
            <div className="authentication__container">
                <div className="authentication__inner-block">
                    <img className="authentication__img" src="/img/user-con.png" alt=''/>
                    <div className="authenticationinputs-block">
                        <div>
                            <AuthenticationInputs state={props.state} dispatch={props.dispatch}  type={props.type}/>
                        </div>
                        <div>
                            <AuthenticationBtn dispatch={props.dispatch} type={props.type}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication