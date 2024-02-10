import authenticationReducer from "./Reducers/authentication-reducer"
import toDoReducer from "./Reducers/todo-reducer"

let store = {
    _state: {
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
    },
    _callSubscriber() {},

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    async dispatch(action) {
        this._state = await authenticationReducer(this._state, action)
        this._state = await toDoReducer(this._state, action)

        this._callSubscriber(this._state)
    }
    
}

export default store