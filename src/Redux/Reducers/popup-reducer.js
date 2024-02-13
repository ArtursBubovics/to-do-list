const SHOW_PLAIN_TEXT = "SHOW-PLAIN-TEXT"
const HIDE_POPUP = "HIDE-POPUP"
const CLEAR_POPUP = "CLEAR-POPUP"

const popupReducer = (state, action) => {
    switch (action.type) {
        case SHOW_PLAIN_TEXT:
            return {
                ...state,
                popupBlock: {
                    isActive: true,
                    message: action.newMessage,
                    messageType: SHOW_PLAIN_TEXT
                }
            };

        case HIDE_POPUP:
            return {
                ...state,
                popupBlock: {
                    // isActive: false,
                    // message: '',
                    // messageType: ''
                    ...state.popupBlock,
                    isActive: false
                }
            };

        case CLEAR_POPUP:
            return {
                ...state,
                popupBlock: {
                    ...state.popupBlock,
                    message: '',
                    messageType: ''

                }
            };
    
        default:
            return state;
    }
}

export const showPlainTextActionCreator = (newMessage) => ({
    type: SHOW_PLAIN_TEXT,
    newMessage: newMessage
})

export const hidePopupActionCreator = () => ({
    type: HIDE_POPUP
})

export const clearPopupActionCreator = () => ({
    type: CLEAR_POPUP
})

export default popupReducer;