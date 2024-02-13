import store from "./store";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleUpdatetTaskText = async (fieldId, newText) => {

    try{
        const updateUserTaskTextResponse = await fetch('http://127.0.0.1:5000/api/updateTask/text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fieldId: fieldId,
                newText: newText
            }),
        });

        const updateUserTaskTextResult = await updateUserTaskTextResponse.json();

        if(updateUserTaskTextResult.ok){
            store.dispatch(updateNewToDoDataActionCreator(true));
        }else {
          console.error('Error while updating the task:', updateUserTaskTextResult.error);
        }
    }catch (error){
        console.error('Error sending request:', error);
    }
}

export default handleUpdatetTaskText