import Header from "../Header/Header"
import AuthenticationBtn from "../Authentication/AuthenticationBtn/AuthenticationBtn"
import "./Profile.css"

const Profile = (props) => {
    return(
        <div>
            <Header/>
            <div className="logout">
                <AuthenticationBtn dispatch={props.dispatch} type="Logout"/>
            </div>
        </div>
    )
}

export default Profile