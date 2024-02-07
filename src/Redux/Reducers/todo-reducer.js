const ADD_TASK = "ADD-TASK"
const UPDATE_TODO_DATA = "UPDATE-TODO-DATA"
const UPDATE_ENTER_TEXT = "UPDATE-ENTER-TEXT"
const UPDATE_TASK_TEXT = "UPDATE-TASK-TEXT"
const UPDATE_CHECKBOX = "UPDATE-CHECKBOX"
const DELETE_TASK_FIELD = "DELETE-TASK-FIELD"

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
                            toDoFieldData: state.toDoListPage.toDoFieldData === null ? data.data : state.toDoListPage.toDoFieldData.concat(data.data)
                        }
                    };
                    resolve(test);
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                    reject(error);
                }
            });

        // case ADD_TASK:
        //     return state;

        case UPDATE_ENTER_TEXT:
            return {
                ...state,
                toDoListPage: {
                    ...state.toDoListPage,
                    enterText: action.newEnterText
                }
            };

        case UPDATE_TASK_TEXT:
            return {
                ...state,
                toDoFieldData: state.toDoListPage.toDoFieldData.map(todo => {
                    if (todo._id === action.list.key) {
                        return {
                            ...todo,
                            text: action.list.body
                        };
                    }
                    return todo;
                })
            };

        case UPDATE_CHECKBOX:
            return {
                ...state,
                toDoFieldData: state.toDoListPage.toDoFieldData.map(todo => {
                    if (todo._id === action.list.key) {
                        return {
                            ...todo,
                            isChecked: action.list.body
                        };
                    }
                    return todo;
                })
            };

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