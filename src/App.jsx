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
 *      Modifications to make this work again:
 *      x Delete task
 *      x Delete Board
 *      x Ticking off a task does not remain ticked off if you change board and return.
 *      x Cancel editing
 *      x When adding new task, set it to the current task and set to editing.
 *      x Check that toggling tasks is complete.
 *   
 *      - Next tasks:
 *          - Make sure everything works if you delete a board and add new ones. (i.e. you have boards 0, 1, 4. board
 *                  4 would be index 2. Make sure everything works in that case).         
 *          - download data button
 *          - Make some anki notes. (remember to add the one where setstate is asynchronous and not guaranteed to 
 *              update intime for the next line of code).
 *          - Move back to carnivorous giraffe for a bit. Make sure to create anki cards for that.
 * 
 *          - Edit board name
 *          
 */


// dataTemplate
// { id: "0", name: "Eat", completed: true, description: "description-0"}

function App() {
    const [boardIDs, setBoardIDs] = useState([]);
    const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);
    const [selectedBoardID, setSelectedBoardID] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    
    useEffect(() => {
        loadData(selectedBoardIndex);
    },[]);

return <div className="TodoApp_root">
        <TabBar 
            labels={boardIDs ?? []} 
            onSelectTab={onSelectTab} 
            toggledTab={selectedBoardIndex} 
            onSelectNewTab={onSelectNewTab}
        />
        <div className="row">
            <div className="column">
                <TaskList 
                    tasks={tasks} 
                    onSelectItem={onSelectItem} 
                    toggleTaskCompleted={toggleTaskCompleted}
                    onDeleteBoard={deleteBoard}
                    selectedTaskID={currentTask != null? currentTask.ID: undefined}
                    editNewTask={true}
                    />
                <button type="submit" className="btn btn__primary btn__lg" onClick={createTask}>
                    Add
                </button>
            </div>

            <Divider/>
            <TaskDetails 
                currentTask={currentTask} 
                editTask={editTask}
                deleteTask={deleteTask}
            />
        </div>
    </div>

    function loadData(boardIndex){
        const boardIDs = loadBoardIDs();
        loadTasks(boardIDs[boardIndex]);        
    }

    function loadBoardIDs(){
        let boardIDs = Database.getBoardIDs();

        if(boardIDs == undefined || boardIDs.length == 0){
            Database.createNewBoard();
            boardIDs = Database.getBoardIDs();
        }
        
        setBoardIDs(boardIDs);
        return boardIDs;
    }

    function loadTasks(boardID){
        const tasks = Database.getTasks(boardID);
        setTasks(tasks);
    }

    function createTask(){
        Database.createTask(selectedBoardID);
        const tasks = Database.getTasks(selectedBoardID);
        setTasks(tasks);
        setCurrentTask(tasks[tasks.length-1]);
    }

    function onSelectTab(boardIndex, _boardIDs){
        if(_boardIDs == undefined){
            _boardIDs = boardIDs;
        }

        setSelectedBoardIndex(boardIndex);
        setSelectedBoardID(_boardIDs[boardIndex]);
        loadData(boardIndex);
        setCurrentTask(null)
    }

    function onSelectNewTab(){
        const newBoardIndex = boardIDs.length;
        Database.createNewBoard();
        const _boardIDs = loadBoardIDs();
        setSelectedBoardIndex(newBoardIndex);
        setSelectedBoardID(_boardIDs[newBoardIndex]);
        loadTasks(_boardIDs[newBoardIndex]);
    }

    function onSelectItem(item){
        setCurrentTask(item);
    }

    function editTask(task){
        Database.modifyTask(task.ID, task);
        loadTasks(selectedBoardID);
    }

    function deleteTask(taskID){
        Database.deleteTask(selectedBoardID, taskID);
        setCurrentTask(null);
        loadData(selectedBoardIndex);
    }
    
    function deleteBoard(){
        Database.deleteBoard(selectedBoardID);
        const boardIDs = loadBoardIDs();
        loadData(boardIDs.length - 1);
        onSelectTab(boardIDs.length - 1, boardIDs);
    }

    function toggleTaskCompleted(ID){
        let editedTask = null;

        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            
            if( task.ID == ID){
                editedTask = { ...task, completed: !task.completed }
                break;
            }
        }

        if(editedTask != null){
            editTask(editedTask);
        }
    }
}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  