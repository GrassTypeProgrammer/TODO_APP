import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { usePrevious } from "./Utils";
import './styles/TaskDetails.css'


function TaskDetails(props){
    const currentTask = props.currentTask;
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [descriptionChanged, setDescriptionChanged] = useState(false);
    const [nameChanged, setNameChanged] = useState(false);
    const wasEditing = usePrevious(isEditing);
    const editTitleFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    {/* TODO: Center this */}
    // const noTaskTemplate = <label>No task selected</label>


    useEffect(() => {
        if (!wasEditing && isEditing) {
            editTitleFieldRef.current.focus();
        } 
        else if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }

        if(props.addingNewTask){
            setEditing(true);
        }
    }, [wasEditing, isEditing, props.addingNewTask]);

    // TODO: make this more readable
    return <form className="TaskDetails_root" onSubmit={handleSubmit}>
        {currentTask != undefined &&
        <>
            {isEditing ? 
                <input 
                    id={currentTask != undefined? currentTask.id : 0} 
                    // Does this need todo-text?
                    className="todo-text TaskDetails_header" 
                    type="text" 
                    onChange={handleChangeTitle} 
                    ref={editTitleFieldRef}
                    defaultValue={currentTask.name}
                />
                :
                <h2 className='TaskDetails_header'>{currentTask.name}</h2>
            }
            <br/>
            {isEditing ? 
                <input  
                    id={currentTask != undefined? currentTask.id : 0} 
                    // Does this need todo-text?
                    className="TaskDetails_descriptionBox" 
                    type="text" 
                    onChange={handleChangeDescription} 
                    defaultValue={currentTask.description}
                />
                :
                <div className='TaskDetails_descriptionBox'>
                    <p>{currentTask.description}</p>
                </div>
            }
            <br/>
            <div className='TaskDetails_footer'>
                {isEditing ? 
                    <button 
                        type="button" 
                        className="TaskDetails_button btn todo-cancel"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                    :
                    <button 
                        type="button" 
                        className="TaskDetails_button btn " 
                        onClick={() => {setEditing(true)}}
                        ref={editButtonRef}
                    >
                        Edit
                    </button>
                }

                {isEditing ? 
                    <button 
                        type="button" 
                        className="TaskDetails_button btn" 
                        onClick={onCancelTask}
                    >
                        Cancel
                    </button>
                    :
                    <button 
                        type="button" 
                        className="TaskDetails_button btn btn__danger" 
                        onClick={() => {props.deleteTask(currentTask.id)}}
                    >
                        Delete
                    </button>
                }
            </div>
        </>
        }
    </form>

    function handleChangeTitle(e) {
        setNewName(e.target.value);
        setNameChanged(true);
    }

    function handleChangeDescription(e){
        setNewDescription(e.target.value);
        setDescriptionChanged(true);
    }

    function onCancelTask(){
        setEditing(false);

        if(props.addingNewTask){
            props.stopAddingNewTask()
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        props.editTask(
            nameChanged ? newName : currentTask.name, 
            descriptionChanged ? newDescription : currentTask.description, 
        );
        setNewName("");
        setNewDescription("");
        setEditing(false);
        setNameChanged(false);
        setDescriptionChanged(false);
        
        if(props.addingNewTask){
            props.stopAddingNewTask()
        }
    }
}

TaskDetails.propTypes = {
    currentTask: PropTypes.object,
    addingNewTask: PropTypes.bool,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    stopAddingNewTask: PropTypes.func.isRequired,
}



export default TaskDetails;