import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { usePrevious } from "./Utils";
import './styles/TaskDetails.css'


function TaskDetails(props){
    const currentTask = props.currentTask;
    const [isEditing, setEditing] = useState(false);
    const [descriptionChanged, setDescriptionChanged] = useState(false);
    const [nameChanged, setNameChanged] = useState(false);
    const wasEditing = usePrevious(isEditing);
    const editTitleFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editTitleFieldRef.current.focus();
        } 
        else if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    return <form className="TaskDetails_root" onSubmit={handleSubmit}>
        {currentTask != undefined?
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
                <textarea  
                    id={currentTask != undefined? currentTask.id : 0} 
                    className="TaskDetails_descriptionBox" 
                    type="text" 
                    onChange={handleChangeDescription} 
                    defaultValue={currentTask.description}
                />
                :
                <textarea  
                    readOnly={true}
                    id={currentTask != undefined? currentTask.id : 0} 
                    className="TaskDetails_descriptionBox" 
                    type="text" 
                    value={currentTask.description}
                />
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
                        onClick={deleteTask}
                    >
                        Delete
                    </button>
                }
            </div>
        </>
        :
        <div className='TaskDetails_noTaskContainer'>
            <p className='TaskDetails_label'>No task selected</p>
        </div>
        }
    </form>

    function deleteTask(){
        props.deleteTask(currentTask.ID);
    }

    function handleChangeTitle(e) {
        currentTask.name = e.target.value;
        setNameChanged(true);
    }

    function handleChangeDescription(e){
        currentTask.description = e.target.value;
        setDescriptionChanged(true);
    }

    function onCancelTask(){
        setEditing(false);
    }

    function handleSubmit(e){
        e.preventDefault();

        if(nameChanged || descriptionChanged){
            props.editTask(currentTask);
        }

        setEditing(false);
        setNameChanged(false);
        setDescriptionChanged(false);
    }
}

TaskDetails.propTypes = {
    currentTask: PropTypes.object,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
}



export default TaskDetails;