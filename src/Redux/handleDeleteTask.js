import store from "./store";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleDeleteTask = async (fieldId) => {

    try{
        const deleteUserTaskResponse = await fetch('http://127.0.0.1:5000/api/deleteTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fieldId: fieldId
            }),
        });

        const deleteUserTaskResult = await deleteUserTaskResponse.json();

        if(deleteUserTaskResult.ok){
            store.getState().toDoListPage.toDoFieldData = null
            store.dispatch(updateNewToDoDataActionCreator(true));
        }else {
          console.error('Ошибка при удаления задания:', deleteUserTaskResult.error);
        }
    }catch (error){
        console.error('Ошибка при отправке запроса:', error);
    }
}

export default handleDeleteTask