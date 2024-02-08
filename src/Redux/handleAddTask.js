import store from "./store";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleAddTask = async () => {
    const enterText = store.getState().toDoListPage.enterText;
    const userId = localStorage.getItem('personID')

    if (!enterText) {
        console.error('');
        return
    }

    try {
        const addUserTaskResponse = await fetch('http://127.0.0.1:5000/api/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: enterText,
            user_id: userId
          }),
        });

        const addUserTaskResult = await addUserTaskResponse.json();

        if(addUserTaskResult.ok){
            store.getState().toDoListPage.toDoFieldData = null
            store.dispatch(updateNewToDoDataActionCreator(true));
        }else {
          console.error('Ошибка при проверке пользователя:', addUserTaskResult.error);
        }
    }catch (error){
        console.error('Ошибка при отправке запроса:', error);
    }

}

export default handleAddTask;