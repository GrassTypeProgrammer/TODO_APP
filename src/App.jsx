import TodoItem from "./components/TodoItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
    const [tasks, setTasks] = useState(props.tasks);
    
    

    return (
      <div className="todoapp stack-large">
        <h1>TODO</h1>
        <Form onSubmit={addTask}/>
        <div className="filters btn-group stack-exception">
            <FilterButton label="All"/>
            <FilterButton label="Active"/>
            <FilterButton label="Completed"/>
          
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
        />)
      }
  
      return listItems;
    }

    function addTask(name){
        if(name != undefined && name != ""){
           const newTask = { id: `todo_${nanoid()}`, name, completed: false };
           alert(newTask.id)
           setTasks([...tasks, newTask]);
        }
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
    
}
  
export default App;
  