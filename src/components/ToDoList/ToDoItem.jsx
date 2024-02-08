import React from "react";
import "./ToDoItem.css"
import { updateNewTaskTextActionCreator, updateNewCheckboxActionCreator } from "../../Redux/Reducers/todo-reducer";

const ToDoItem = (props) => {

    function onChangeTaskText(event){
        let body = event.target.innerText
        let value = {key: props.todo._id, body: body}
        props.dispatch(updateNewTaskTextActionCreator(value))
    }

    function onChangeCheckbox(event){
        let body = event.target.checked
        let value = {key: props.todo._id, body: body}
        props.dispatch(updateNewCheckboxActionCreator(value))
    }

    function onDeleteTaskField(){
        let fieldId = props.todo._id
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