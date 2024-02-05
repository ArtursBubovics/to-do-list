import "./Authentication.css"
import AuthenticationInputs from "./AuthenticationInputs/AuthenticationInputs"
import AuthenticationBtn from "./AuthenticationBtn/AuthenticationBtn"
const Authentication = (props) => {
    return (
        <div className="authentication">
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