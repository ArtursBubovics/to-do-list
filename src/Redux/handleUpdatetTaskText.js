import store from "./store";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleUpdatetTaskText = async (fieldId, newText) => {

    try{
        const updateUserTaskResponse = await fetch('http://127.0.0.1:5000/api/updateTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fieldId: fieldId,
                newText: newText
            }),
        });

        const updateUserTaskResult = await updateUserTaskResponse.json();

        if(updateUserTaskResult.ok){
            store.getState().toDoListPage.toDoFieldData = null
            store.dispatch(updateNewToDoDataActionCreator(true));
        }else {
          console.error('Ошибка при удаления задания:', updateUserTaskResult.error);
        }
    }catch (error){
        console.error('Ошибка при отправке запроса:', error);
    }
}

export default handleUpdatetTaskText