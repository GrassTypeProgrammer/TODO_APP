import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import {PropTypes} from "prop-types"
import './styles/TodoApp.css'
import Divider from "./components/Divider";
import { useState,  } from "react";


function App(props) {
    const [currentTask, setCurrentTask] = useState(null);

    return <div className="TodoApp_root">
        <TaskList tasks={props.tasks} onSelectItem={onSelectItem}/>
        <Divider/>
        <TaskDetails currentTask={currentTask} />
    </div>

    function onSelectItem(item){
        setCurrentTask(item);
    }

}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  