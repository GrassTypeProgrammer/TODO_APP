import TodoItem from "./components/TodoItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useRef, useEffect  } from "react";
import { nanoid } from "nanoid";
import { PropTypes } from "prop-types"
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
    const [selectedTaskID, setSelectedTaskID] = useState(null);
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
      }, [tasks.length, prevTaskLength]);

    return (
      <div className="TaskList_root">
        <h1>TODO</h1>
        <Form onSubmit={addTask}/>
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
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
                onSelectItem={onSelectItem}
                isCurrent={selectedTaskID === task.id}
            />
        ));
  
      return listItems;
    }

    function addTask(name){
        if(name != undefined && name != ""){
           const newTask = { id: `todo_${nanoid()}`, name, completed: false };
           setTasks([...tasks, newTask]);
        }
    }
    
    function deleteTask(id){
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
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

    function editTask(id, newName) {
        const editedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, name: newName };
            }
            
            return task;
        })

        setTasks(editedTasks);
    }

    function onSelectItem(id){
        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            if(task.id == id){
                setSelectedTaskID(id)
                props.onSelectItem(task);
                break;
            }

        }
    }
}

TaskList.propTypes = { 
    tasks: PropTypes.any,
    onSelectItem: PropTypes.func.isRequired,
}

export default TaskList;