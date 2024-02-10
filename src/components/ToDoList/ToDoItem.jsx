import React from "react";
import "./ToDoItem.css"
import handleDeleteTask from "../../Redux/handleDeleteTask";
import handleUpdatetTaskText from "../../Redux/handleUpdatetTaskText";
import handleUpdatetTaskCheckbox from "../../Redux/handleUpdatetTaskCheckbox";

const ToDoItem = (props) => {

    let fieldId = props.todo._id

    function onChangeTaskText(event){
        let newText = event.target.innerText
        handleUpdatetTaskText(fieldId, newText)
    }

    function onChangeCheckbox(event){
        let checkboxValue = event.target.checked ? 1 : 0
        handleUpdatetTaskCheckbox(fieldId, checkboxValue)
    }

    function onDeleteTaskField(){
        handleDeleteTask(fieldId)
    }

    return (
        <div className="todo-item">
            <input className="todo-item__input" onChange={onChangeCheckbox} type="checkbox" checked={props.todo.isChecked}/>
            <span className="text" onBlur={onChangeTaskText} contentEditable="true">{props.todo.text}</span>
            <button>
                <img src="/img/remove.png" onClick={onDeleteTaskField} alt="" />
            </button>
        </div>
    )
}

export default ToDoItem