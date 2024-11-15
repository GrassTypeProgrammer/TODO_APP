import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import {PropTypes} from "prop-types"
import './styles/TodoApp.css'
import Divider from "./components/Divider";
import { useState  } from "react";
import { nanoid } from "nanoid";


function App(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [currentTask, setCurrentTask] = useState(null);
  
    if(tasks == undefined){
      return <div/>
    }

    return <div className="TodoApp_root">
        {/* TODO: Perhaps move the editing of tasks into this component so that you don't have to pass in the currentUpdatedTask */}
        <TaskList 
            tasks={tasks} 
            currentTaskUpdated={currentTask} 
            onSelectItem={onSelectItem} 
            toggleTaskCompleted={toggleTaskCompleted}
            addTask={addTask}
        />
        <Divider/>
        <TaskDetails 
            currentTask={currentTask} 
            editTask={editTask}
            deleteTask={deleteTask}
        />
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

    function deleteTask(id){
        const remainingTasks = tasks.filter(task => id !== task.id);
        setCurrentTask(null);
        setTasks(remainingTasks);
    }

    function toggleTaskCompleted(id){
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
            }

            return task;
        });

        setTasks(updatedTasks);
    }

    function addTask(name){
        if(name != undefined && name != ""){
           const newTask = { id: `todo_${nanoid()}`, name, completed: false };
           setTasks([...tasks, newTask]);
        }
    }
}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  