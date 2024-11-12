import TodoItem from "./components/TodoItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
    return (
      <div className="todoapp stack-large">
        <h1>TODO</h1>
        <Form/>
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
            {createListItems(props.tasks)}
        </ul>
      </div>
    );
  }

  function createListItems(tasks) {
    const listItems = [];

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        listItems.push(<TodoItem id={task.id} name={task.name} completed={task.completed} key={task.id}/>)
    }

    return listItems;
  }
  
  export default App;
  