import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import {PropTypes} from "prop-types"
import Divider from "./components/Divider";
import { useEffect, useState  } from "react";
import './styles/TodoApp.css'
import TabBar from "./components/TabBar";
import * as Database from "./Database";
/**
 * TODO
 *      Make a new class that handles the data. It will act like an API. It wants the following functions:
 *      - GetBoardIDs(boardID)
 *      - RemoveBoard(boardID)
 *      - AddBoard(boardID)
 *      - GetTasks(boardID)
 *      
 *      - CreateTask(boardID)
 *      - DeleteTask(boardID, taskID)   // needs board ID to remove from task from that list.
 *      - EditTask(taskID)
 *  
 */


// dataTemplate
// { id: "0", name: "Eat", completed: true, description: "description-0"}

function App() {
    const [tasks, setTasks] = useState([]);
    const [boards, setBoards] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [addingNewTask, setAddingNewTask] = useState(false);
    const [toggledTab, setToggledTab] = useState(0);

    useEffect(() => {
        // loadData();
        console.log(Database.getBoardIDs());
    },[]);

    // if(tasks == undefined){
    //   return <div/>
    // }

    return <div className="TodoApp_root">
        <TabBar labels={boards ?? []} onSelectTab={onSelectTab} toggledTab={toggledTab} onSelectNewTab={onSelectNewTab}/>
        <div className="row">
            <div className="column">
                <TaskList 
                    tasks={tasks} 
                    onSelectItem={onSelectItem} 
                    toggleTaskCompleted={toggleTaskCompleted}
                    onDeleteBoard={deleteBoard}
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
    </div>

    function addTask(){
        Database.createNewBoard();
        const ID = Database.createTask(0);
        const task = Database.getTask(ID);
        task.name = "It's Working!"
        Database.modifyTask(task.ID, task);
        // const newTask = { 
        //     id: `${nanoid()}`, 
        //     name: "New Task", 
        //     description: "Description Here", 
        //     completed: false 
        // };

        // setCurrentTask(newTask);
        // setAddingNewTask(true);
        // setTasks([...tasks, newTask]);
        // saveTaskIDs(tasks);
        // saveTasksData(tasks, toggledTab);
    }


    function onSelectNewTab(){
        // Save tasks for current board.
        // saveTasksData(tasks, toggledTab);
        // Add new tabID
        const newBoardIds = boards;
        const newBoardId = boards[boards.length - 1] + 1;
        newBoardIds.push(newBoardId);
        // save tabID
        // saveBoardIDs(newBoardIds);
        // Set new tab as current
        setToggledTab(newBoardId);
        // Save empty task list?
        setTasks([]);
        // Update the task list
        // saveTaskIDs(tasks);
        // saveTasksData(tasks, newBoardId);
    }

    function onSelectTab(index){
        setToggledTab(index);
        // saveTasksData(tasks, toggledTab);
        // loadData(index);
    }

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
        // saveTasksData(updatedTasks, toggledTab);
    }

    function deleteTask(id){
        const remainingTasks = tasks.filter(task => id !== task.id);
        setCurrentTask(null);
        setTasks(remainingTasks);
        // deleteTaskData(remainingTasks, id);
    }

    function deleteBoard(){
        
        const newBoardIDs = boards;
        const index = newBoardIDs.indexOf(toggledTab);
        
        if (index !== -1) {
            newBoardIDs.splice(index, 1);
        }

        setBoards(newBoardIDs);
        // saveBoardIDs(newBoardIDs);
        
        const taskData = tasks;
        
        for (let index = 0; index < taskData.length; index++) {
            const task = taskData[index];
            deleteTask(task.ID);
        }
        
        localStorage.removeItem(`board${toggledTab}/taskIDs`);
        
        onSelectTab(boards[0]);
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

   

    function stopAddingNewTask(){
        setAddingNewTask(false);
    }

    //#region Save/Load
    // function saveTasksData(tasks, toggledTab) {
    //     const taskIDs = [];

    //     for (let index = 0; index < tasks.length; index++) {
    //         const task = tasks[index];
    //         const taskString = JSON.stringify(task);
    //         localStorage.setItem(task.id, taskString);
    //         taskIDs.push(task.id);
    //     }

    //     const taskIDsString = JSON.stringify(taskIDs);
    //     localStorage.setItem(`board${toggledTab}/taskIDs`, taskIDsString);
    // }

    // function deleteTaskData(tasks, IDToDelete){
    //     localStorage.removeItem(`board${toggledTab}/${IDToDelete}`);
    //     localStorage.removeItem(IDToDelete);
    //     saveTaskIDs(tasks);
    // }

    // function saveTaskIDs(tasks){
    //     const taskIDs = [];

    //     for (let index = 0; index < tasks.length; index++) {
    //         const task = tasks[index];
    //         taskIDs.push(task.id);
    //     }

    //     const taskIDsString = JSON.stringify(taskIDs);
    //     localStorage.setItem(`board${toggledTab}/taskIDs`, taskIDsString);
    // }

    // function saveBoardIDs(boards){
    //     const boardIDs = JSON.stringify(boards);
    //     localStorage.setItem('boardIDs', boardIDs);
    // }

    // function loadBoardIDs(){
    //     let boardIDs = JSON.parse(localStorage.getItem('boardIDs'));
        
    //     if(boardIDs == undefined || boardIDs == ''){
    //         boardIDs = [0];
    //         saveBoardIDs(boardIDs);
    //     }

    //     setBoards(boardIDs);
    // }

    // function loadData(board){
    //     loadBoardIDs();
    //     const taskIDsString = localStorage.getItem(`board${board??0}/taskIDs`);

    //     if(taskIDsString != undefined && taskIDsString != ''){
    //         const taskIDs = JSON.parse(taskIDsString);
    //         const loadedTasks = [];
            
    //         if(taskIDs != undefined){
    //             for (let index = 0; index < taskIDs.length; index++) {
    //                 const taskID = taskIDs[index];
    //                 const taskString = localStorage.getItem(taskID);
    //                 const task = JSON.parse(taskString);
    //                 if(task != null){
    //                     loadedTasks.push(task);
    //                 }
    //             }
                
    //             setTasks(loadedTasks);
    //         }
    //     }
    // }

    //#endregion
}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  