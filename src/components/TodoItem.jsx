import { PropTypes } from "prop-types"
import './../styles/TodoItem.css'


function TodoItem (props) {

      return (
        <div className="TodoItem_root" 
          aria-current={props.isCurrent}
          onClick={() => props.onSelectItem(props.id)} 
        >
            <input
              className="TodoItem_checkBox"
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="TodoItem_label" htmlFor={props.id}  >
              {props.name}
            </label>
        </div>
    );
}

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    toggleTaskCompleted: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    isCurrent: PropTypes.bool,
}

export default TodoItem;