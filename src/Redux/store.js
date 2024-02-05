import authenticationReducer from "./Reducers/authentication-reducer"
import toDoReducer from "./Reducers/todo-reducer"

let store = {
    _state: {
        authenticationPage: {
            gmailField: '',
            passwordField: '',
            confirmField: '',
            isAuthenticated: false //
        },
        toDoListPage: {
            toDoFieldData: [],
            enterText: ''
        }
    },
    _callSubscriber() {},

    getState() {
        console.log(this._state)
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.authenticationPage = authenticationReducer(this._state.authenticationPage, action)
        this._state.toDoListPage = toDoReducer(this._state, action)

        this._callSubscriber(this._state)
    }
    
}

export default store