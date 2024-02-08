import React from "react";
import "./ToDoItem.css"
// import { updateNewTaskTextActionCreator, updateNewCheckboxActionCreator } from "../../Redux/Reducers/todo-reducer";
import handleDeleteTask from "../../Redux/handleDeleteTask";
import handleUpdatetTaskText from "../../Redux/handleUpdatetTaskText";

const ToDoItem = (props) => {

    let fieldId = props.todo._id

    function onChangeTaskText(event){
        let newText = event.target.innerText
        handleUpdatetTaskText(fieldId, newText)
    }

    function onChangeCheckbox(event){
        //value = event.target.checked
        //handleDeleteTask(fieldId, value)
    }

    function onDeleteTaskField(){
        handleDeleteTask(fieldId)
    }

    return (
        <div className="todo-item">
            <input className="todo-item__input" onChange={onChangeCheckbox} type="checkbox" checked={props.todo.isChecked}/>
            <span className="text" onInput={onChangeTaskText} contentEditable="true">{props.todo.text}</span>
            <button>
                <img src="/img/remove.png" onClick={onDeleteTaskField} alt="" />
            </button>
        </div>
    )
}

export default ToDoItem