const UPDATE_TODO_DATA = "UPDATE-TODO-DATA"
const ADD_TASK = "ADD-TASK"
const UPDATE_ENTER_TEXT = "UPDATE-ENTER-TEXT"
const UPDATE_TASK_TEXT = "UPDATE-TASK-TEXT"
const UPDATE_CHECKBOX = "UPDATE-CHECKBOX"
const DELETE_TASK_FIELD = "DELETE-TASK-FIELD"

const toDoReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_TODO_DATA:
            return (async function (userId) {
                try {
                    const response = await fetch(`http://192.168.31.93:5000/api/data/task?userId=${userId}`);
                    const data = await response.json();
                    debugger
                    return {
                        ...state,
                        toDoFieldData: state.toDoFieldData === undefined ? data.data : state.toDoFieldData.concat(data.data)
                    };
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                    return state;
                }
            })(localStorage.getItem('personID'));
            
            // case ADD_TASK:
            //     return state;

        case UPDATE_ENTER_TEXT:
            state.enterText = action.newEnterText
            return state;

        case UPDATE_TASK_TEXT:
            let toDoItemText = state.toDoFieldData.find(todo => todo._id === action.list.key)
            toDoItemText.text = action.list.body
            return state;

        case UPDATE_CHECKBOX:
            let toDoItemCheckbox = state.toDoFieldData.find(todo => todo._id === action.list.key)
            toDoItemCheckbox.isChecked = action.list.body
            return state;

        // case DELETE_TASK_FIELD:
        //     нужно удалить actionюdeleteFieldId этот ид из бд
        //     return state;

        default:
            return state;
    }
}

export const addTaskActionCreator = () => ({
    type: ADD_TASK
}) // not working yet

export const updateNewToDoDataActionCreator = () => ({
    type: UPDATE_TODO_DATA
})

export const updateNewEnterTextActionCreator = (text) => ({
    type: UPDATE_ENTER_TEXT,
    newEnterText: text
});

export const updateNewTaskTextActionCreator = (value) => ({
    type: UPDATE_TASK_TEXT,
    list: value
})
export const updateNewCheckboxActionCreator = (value) => ({
    type: UPDATE_CHECKBOX,
    list: value
})

export const deleteTaskFieldActionCreator = (id) => ({
    type: DELETE_TASK_FIELD,
    deleteFieldId: id
});


export default toDoReducer;