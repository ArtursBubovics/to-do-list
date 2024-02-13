import store from "./store";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleUpdatetTaskCheckbox = async (fieldId, checkboxValue) => {
    try{
        const updateUserTasCheckboxResponse = await fetch('http://127.0.0.1:5000/api/updateTask/checkbox', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fieldId: fieldId,
                checkboxValue: checkboxValue
            }),
        });

        const updateUserTaskCheckboxResult = await updateUserTasCheckboxResponse.json();

        if(updateUserTaskCheckboxResult.ok){
            store.dispatch(updateNewToDoDataActionCreator(true));
        }else {
          console.error('Error while updating the task:', updateUserTaskCheckboxResult.error);
        }
    }catch (error){
        console.error('Error sending request:', error);
    }
}

export default handleUpdatetTaskCheckbox