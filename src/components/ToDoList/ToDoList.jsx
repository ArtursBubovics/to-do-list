import Header from "../Header/Header"
import ToDoItem from "./ToDoItem"
import "./ToDoList.css"
import { updateNewEnterTextActionCreator } from "../../Redux/Reducers/todo-reducer"
import handleAddTask from "../../Redux/handleAddTask"
import PopupBlock from "../PopupBlock/PopupBlock"


const ToDoList = (props) => {

    let toDoListPage = props.state.toDoListPage

    function onChangeEnterText(event) {
        let body = event.target.value
        props.dispatch(updateNewEnterTextActionCreator(body))
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            console.log("Enter key pressed. Submitting...");
            handleAddTask();
        }
    }
    
    return (
        <div>
            <Header />
            <div className="to-do__block">
            {props.state.popupBlock.isActive ? <PopupBlock state={props.state}/> : null } 

                <h1>ToDoList</h1>
                {toDoListPage.toDoFieldData !== null ?
                    toDoListPage.toDoFieldData.map(todo => <ToDoItem key={todo._id} dispatch={props.dispatch} todo={todo} />)
                    : null
                }

                <input className="enterTextField" type="text" value={toDoListPage.enterText} onChange={onChangeEnterText}
                    onKeyDown={handleKeyPress} placeholder="Enter new task" />
            </div>

        </div>
    )
}

export default ToDoList