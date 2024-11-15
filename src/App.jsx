import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import {PropTypes} from "prop-types"
import './styles/TodoApp.css'
import Divider from "./components/Divider";
import { useState,  } from "react";


function App(props) {
    const [currentTask, setCurrentTask] = useState(null);

    return <div className="TodoApp_root">
        {/* TODO: Perhaps move the editing of tasks into this component so that you don't have to pass in the currentUpdatedTask */}
        <TaskList tasks={props.tasks} currentTaskUpdated={currentTask} onSelectItem={onSelectItem}/>
        <Divider/>
        <TaskDetails currentTask={currentTask} editTask={editTask}/>
    </div>

    function onSelectItem(item){
        setCurrentTask(item);
    }

    function editTask(newName, newDescription){
        const task = {
            id: currentTask.id,
            completed: currentTask.completed,
            name: newName,
            description: newDescription,
        }

        setCurrentTask(task);
    }
}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  