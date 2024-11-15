import { useState} from "react";
import { PropTypes } from "prop-types"
import './../styles/TodoItem.css'


function TodoItem (props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    
    function handleChange(e) {
        setNewName(e.target.value);
      }

    function handleSubmit(e){
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }


    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit} >
          <div className="form-group"  >
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input 
                id={props.id} 
                className="todo-text" 
                type="text" 
                onChange={handleChange} 
            />
          </div>
          <div className="btn-group">
          </div>
        </form>
      );
      
      const viewTemplate = (
        <div className="TodoItem_root stack-small" onClick={() => props.onSelectItem(props.id)} aria-current={props.isCurrent}>
          <div className="TodoItem_content c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          
        </div>
    );
    
    return isEditing? editingTemplate : viewTemplate;
}

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTaskCompleted: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    isCurrent: PropTypes.bool,
}

export default TodoItem;