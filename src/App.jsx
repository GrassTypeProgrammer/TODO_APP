import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import {PropTypes} from "prop-types"
import './styles/TodoApp.css'
import Divider from "./components/Divider";


function App(props) {
    return <div className="TodoApp_root">
        <TaskList tasks={props.tasks}/>
        <Divider/>
        <TaskDetails/>
    </div>
}
  
App.propTypes = {
    tasks: PropTypes.any,
}

export default App;
  