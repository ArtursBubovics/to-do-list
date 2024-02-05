import './App.css';
import {Routes, Route} from "react-router-dom";
import Profile from './components/Profile/Profile';
import ToDoList from './components/ToDoList/ToDoList';
import Authentication from './components/Authentication/Authentication';

function App(props) {
  return (
    <div className="App">
      {props.state.authenticationPage.isAuthenticated ? (
        <Routes>
          <Route path="/" element={<ToDoList state={props.state} dispatch={props.dispatch}/>} />
          <Route path="/Profile/*"  element={<Profile dispatch={props.dispatch}/>}/>
          <Route path="/ToDoList/*" element={<ToDoList state={props.state} dispatch={props.dispatch}/>}/>
        </Routes>
      ) : ( 
        <Routes>
          <Route path="/" element={<Authentication state={props.state} dispatch={props.dispatch} type="SignUp" />} />
          <Route path="/Login/*" element={<Authentication state={props.state} dispatch={props.dispatch} type="Login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
