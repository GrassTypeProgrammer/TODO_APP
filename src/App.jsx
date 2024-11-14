import TodoItem from "./components/TodoItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useRef, useEffect  } from "react";
import { nanoid } from "nanoid";
import { PropTypes } from "prop-types"
import { usePrevious } from "./Utils";

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

function App(props) {
    
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
      }, [tasks.length, prevTaskLength]);

    return (
      <div className="todoapp stack-large">
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
}
  
App.propTypes = { 
    tasks: PropTypes.any,
}

export default App;
  