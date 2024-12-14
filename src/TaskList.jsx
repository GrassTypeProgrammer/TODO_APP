import TodoItem from "./components/TodoItem";
import FilterButton from "./components/FilterButton";
import { useState, useRef, useEffect  } from "react";
import  PropTypes  from "prop-types"
import { usePrevious } from "./Utils";
import './styles/TaskList.css'


const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

function TaskList(props){
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState("All");
    const FILTER_NAMES = Object.keys(FILTER_MAP);
    const listHeadingRef = useRef(null);

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton 
            key={name} 
            name={name} 
            isPressed={name === filter}
            setFilter={setFilter}
        />
      ));

    const prevTaskLength = usePrevious(tasks.length);
      
    useEffect(() => {
        if (tasks.length < prevTaskLength) {
          listHeadingRef.current.focus();
        }

        if(tasks != props.tasks){
            setTasks(props.tasks)
        }

      }, [tasks.length, prevTaskLength, props.tasks, tasks]);

    return (
      <div className="TaskList_root">
        <div className="row space-between align-center">
          <h1>TODO</h1>
          <button className="TaskList_deleteButton" onClick={props.onDeleteBoard}>
            X
          </button>
        </div>
        <div className="filters btn-group stack-exception">
           {filterList}
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{tasks.filter(FILTER_MAP["Active"]).length} tasks remaining</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading">
            {createListItems(tasks)}
        </ul>
      </div>
    );
 
    function createListItems(tasks) {
        const listItems = tasks
            .filter(FILTER_MAP[filter])
            .map((task) => (
              <TodoItem
                ID={task.ID}
                name={task.name}
                completed={task.completed}
                key={task.ID}
                toggleTaskCompleted={() => {props.toggleTaskCompleted(task.ID)}}
                onSelectItem={onSelectItem}
                isCurrent={props.selectedTaskID === task.ID}
            />
        ));
  
      return listItems;
    }

    function onSelectItem(ID){
        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            if(task.ID == ID){
                props.onSelectItem(task);
                break;
            }
        }
    }
}

TaskList.propTypes = { 
    tasks: PropTypes.any,
    onSelectItem: PropTypes.func.isRequired,
    toggleTaskCompleted: PropTypes.func.isRequired,
    onDeleteBoard: PropTypes.func.isRequired,
    selectedTaskID: PropTypes.string,
}

export default TaskList;