import PropTypes from 'prop-types';
import './styles/TaskDetails.css'


function TaskDetails(props){
    const currentTask = props.currentTask;

        return <div className="TaskDetails_root">
            {currentTask != undefined &&
            <>
                <h2 className='TaskDetails_header'>{currentTask.name}</h2>
                <br/>
                <div className='TaskDetails_descriptionBox'>
                    <p>{currentTask.description}</p>
                </div>
                <br/>
                <div className='TaskDetails_footer'>
                    <button type="button"  className="TaskDetails_button btn " >
                        Edit
                    </button>
                    <button type="button"  className="TaskDetails_button btn btn__danger" >
                        delete
                    </button>
                </div>
            </>
        }
        {/* TODO: Center this */}
        {currentTask == undefined &&
            <label>No task selected</label>
        }
    </div>
}

TaskDetails.propTypes = {
    currentTask: PropTypes.object,
}



export default TaskDetails;