
import { nanoid } from "nanoid";

//#region Utility functions
const boardIDsPath = 'boardIDs'; 
const boardPath = (ID) => {return `board_${ID}`};
const taskPath = (boardID, taskID) => {return `board_${boardID}:Task_${taskID}`};
const taskIDsPath = (boardID) => {return `${boardPath(boardID)}:TaskIDs`}

//#endregion

//#region Boards
export function createNewBoard(){
    let currentBoards = getBoardIDs();
    let nextID = 0;
    
    if(currentBoards.length > 0){
        nextID = currentBoards[currentBoards.length - 1] + 1;
    }

    currentBoards.push(nextID);
    saveBoards(currentBoards);
}

export function getBoardIDs(){
    let currentBoards = JSON.parse(localStorage.getItem(boardIDsPath));
   
    if(currentBoards == null || !Array.isArray(currentBoards)){
        currentBoards = [];
    }

    return currentBoards;
}

export function deleteBoard(ID){
    const currentBoards = getBoardIDs();
    const index = currentBoards.indexOf(ID);

    if(index != -1){
        currentBoards.splice(index, 1);
        saveBoards(currentBoards);
        deleteAllTasks(ID);
        localStorage.removeItem(taskIDsPath(ID));
    }
    else{
        console.warn(`Board ${ID} does not exist`);
    }
}

function saveBoards(boards){
    const boardsString = JSON.stringify(boards);
    localStorage.setItem(boardIDsPath, boardsString);
}
//#endregion

//#region Tasks
export function getTaskIDs(boardID){
    let taskIDs = JSON.parse(localStorage.getItem(taskIDsPath(boardID)));

    if(taskIDs == null || !Array.isArray(taskIDs)){
        taskIDs = [];
    }

    return taskIDs;
}

// create task returns the taskID. Then use getTask(taskID) to get it.
export function createTask(boardID){
    const task = {
        ID: taskPath(boardID, nanoid()),
        boardID: boardID,
        name: 'New Task',
        description: 'Description',
        completed: false,
    };

    // save task
    const taskString = JSON.stringify(task);
    localStorage.setItem(task.ID, taskString);

    // save taskID to board
    const taskIDs = getTaskIDs(boardID);
    taskIDs.push(task.ID);
    saveTaskIDs(boardID, taskIDs);

    return task.ID;
}

export function getTask(taskID){
    const task = JSON.parse(localStorage.getItem(taskID));
    return task;
}

export function getTasks(boardID){
    const taskIDs = getTaskIDs(boardID);
    const tasks = [];

    for (let index = 0; index < taskIDs.length; index++) {
        const ID = taskIDs[index];
        tasks.push(getTask(ID));
    }

    return tasks;
}

export function deleteTask(boardID, taskID){
    localStorage.removeItem(taskID);

    const taskIDs = getTaskIDs(boardID);
    const index = taskIDs.indexOf(taskID);
    taskIDs.splice(index, 1);
    saveTaskIDs(boardID, taskIDs);
}

export function deleteAllTasks(boardID){
    const taskIDs = getTaskIDs(boardID);

    for (let index = 0; index < taskIDs.length; index++) {
        const taskID = taskIDs[index];
        deleteTask(boardID, taskID);
    }
}

export function modifyTask(taskID, task){
    const taskString = JSON.stringify(task);
    localStorage.setItem(taskID, taskString);
}

function saveTaskIDs(boardID, taskIDs){
    const taskIDsString = JSON.stringify(taskIDs);
    localStorage.setItem(taskIDsPath(boardID), taskIDsString);
}
//#endregion
