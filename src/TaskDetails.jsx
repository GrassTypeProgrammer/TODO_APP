import PropTypes from 'prop-types';
import './styles/TaskDetails.css'


function TaskDetails(props){
    return <div className="TaskDetails_root">
        <h2 className='TaskDetails_header'>{props.label}</h2>
        <br/>
        <div className='TaskDetails_descriptionBox'>
            <p>{props.description}</p>
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
    </div>
}

TaskDetails.propTypes = {
    label: PropTypes.string.isRequired,
    description:  PropTypes.string.isRequired,
}



export default TaskDetails;