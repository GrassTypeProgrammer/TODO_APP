import TodoItem from "./components/TodoItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

function App(props) {
    
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState("All");
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton 
            key={name} 
            name={name} 
            isPressed={name === filter}
            setFilter={setFilter}
        />
      ));

    return (
      <div className="todoapp stack-large">
        <h1>TODO</h1>
        <Form onSubmit={addTask}/>
        <div className="filters btn-group stack-exception">
           {filterList}
        </div>
        <h2 id="list-heading">3 tasks remaining</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading">
            {createListItems(tasks)}
        </ul>
      </div>
    );
 
    function createListItems(tasks) {
      const listItems = [];
  
      for (let index = 0; index < tasks.length; index++) {
          const task = tasks[index];
          listItems.push(
          <TodoItem 
            id={task.id} 
            name={task.name} 
            completed={task.completed} 
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            onDeleteTask={deleteTask}
            editTask={editTask}
        />)
      }
  
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
  
export default App;
  