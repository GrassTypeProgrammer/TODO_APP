import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import {PropTypes} from "prop-types"
import './styles/TodoApp.css'
import Divider from "./components/Divider";
import { useEffect, useState  } from "react";
import { nanoid } from "nanoid";

// dataTemplate
// { id: "todo-0", name: "Eat", completed: true, description: "description-0"}

function App() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [addingNewTask, setAddingNewTask] = useState(false);

    useEffect(() => {
        loadData();
    },[]);

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
        saveTasksData(updatedTasks);
    }

    function deleteTask(id){
        const remainingTasks = tasks.filter(task => id !== task.id);
        setCurrentTask(null);
        setTasks(remainingTasks);
        deleteTaskData(remainingTasks, id);
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
        saveTasksData(tasks);
    }

    function stopAddingNewTask(){
        setAddingNewTask(false);
    }

    //#region Save/Load
    function saveTasksData(tasks) {
        const taskIDs = [];

        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            const taskString = JSON.stringify(task);
            localStorage.setItem(task.id, taskString);
            taskIDs.push(task.id);
        }

        const taskIDsString = JSON.stringify(taskIDs);
        localStorage.setItem('taskIDs', taskIDsString);
    }

    function deleteTaskData(tasks, IDToDelete){
        localStorage.removeItem(IDToDelete);
        saveTaskIDs(tasks);
    }

    function saveTaskIDs(tasks){
        const taskIDs = [];

        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            taskIDs.push(task.id);
        }

        const taskIDsString = JSON.stringify(taskIDs);
        localStorage.setItem('taskIDs', taskIDsString);
    }

    function loadData(){
        const taskIDsString = localStorage.getItem('taskIDs');
        if(taskIDsString != undefined && taskIDsString != ''){
            const taskIDs = JSON.parse(taskIDsString);
            const loadedTasks = [];
            
            if(taskIDs != undefined){
                for (let index = 0; index < taskIDs.length; index++) {
                    const taskID = taskIDs[index];
                    const taskString = localStorage.getItem(taskID);
                    const task = JSON.parse(taskString);
                    if(task != null){
                        loadedTasks.push(task);
                    }
                }
                
                setTasks(loadedTasks);
            }
        }
    }

    //#endregion
}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  