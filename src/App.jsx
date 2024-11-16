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
    const [addingNewTask, setAddingNewTask] = useState(false);

    if(tasks == undefined){
      return <div/>
    }

    return <div className="TodoApp_root">
        {/* TODO: Perhaps move the editing of tasks into this component so that you don't have to pass in the currentUpdatedTask */}
        <div className="column">
            <TaskList 
                tasks={tasks} 
                currentTaskUpdated={currentTask} 
                onSelectItem={onSelectItem} 
                toggleTaskCompleted={toggleTaskCompleted}
                // addTask={addTask}
                />
            <button type="submit" className="btn btn__primary btn__lg" onClick={addTask}>
                Add
            </button>
        </div>
        <Divider/>
        <TaskDetails 
            currentTask={currentTask} 
            editTask={editTask}
            deleteTask={deleteTask}
            addingNewTask={addingNewTask}
            stopAddingNewTask={stopAddingNewTask}
        />
    </div>

    function onSelectItem(item){
        setCurrentTask(item);
    }

    function editTask(newName, newDescription){
        const editedTask = {
            id: currentTask.id,
            completed: currentTask.completed,
            name: newName,
            description: newDescription,
        }

        const updatedTasks = tasks.map((task) => {
            if (editedTask.id === task.id) {
                return { ...task, name: editedTask.name, description: editedTask.description };
            }
            
            return task;
        });
        
        setCurrentTask(editedTask);
        setTasks(updatedTasks);
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

    function addTask(){
        const newTask = { 
            id: `todo_${nanoid()}`, 
            name: "New Task", 
            description: "Description Here", 
            completed: false 
        };

        setCurrentTask(newTask);
        setAddingNewTask(true);
        setTasks([...tasks, newTask]);
    }

    function stopAddingNewTask(){
        setAddingNewTask(false);
    }
}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  