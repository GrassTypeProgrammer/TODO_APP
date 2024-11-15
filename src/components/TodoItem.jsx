import { PropTypes } from "prop-types"
import './../styles/TodoItem.css'


function TodoItem (props) {

      return (
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