import removeDuplicates from "./removeTaskDuplicates";

const UPDATE_TODO_DATA = "UPDATE-TODO-DATA"
const UPDATE_ENTER_TEXT = "UPDATE-ENTER-TEXT"

const toDoReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_TODO_DATA:
            return new Promise(async (resolve, reject) => {
                try {
                    const userId = localStorage.getItem('personID')
                    const response = await fetch(`http://127.0.0.1:5000/api/data/task?userId=${userId}`);
                    const data = await response.json();

                    let test = {
                        ...state,
                        toDoListPage: {
                            ...state.toDoListPage,
                            toDoFieldData: state.toDoListPage.toDoFieldData === null ? data.data : removeDuplicates(data.data, '_id')
                            
                        },
                        authenticationPage: {
                            ...state.authenticationPage,
                            isAuthenticated: action.isAuthenticated
                        }
                    };
                    resolve(test);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    reject(error);
                }
            });

        case UPDATE_ENTER_TEXT:
            return {
                ...state,
                toDoListPage: {
                    ...state.toDoListPage,
                    enterText: action.newEnterText
                }
            };

        default:
            return state;
    }
}

export const updateNewToDoDataActionCreator = (isAuthenticated) => ({
    type: UPDATE_TODO_DATA,
    isAuthenticated: isAuthenticated
})

export const updateNewEnterTextActionCreator = (text) => ({
    type: UPDATE_ENTER_TEXT,
    newEnterText: text
});

export default toDoReducer;