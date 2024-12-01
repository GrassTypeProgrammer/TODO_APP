import PropTypes from 'prop-types';
import './../styles/components/TabBar.css'
import classNames from 'classnames';


function TabBar (props){
    return (
        <div className='TabBar_root'>
            {props.labels.map((label, index)=>{
                return <button 
                className={classNames('TabBar_tab', index == props.toggledTab? 'toggled': '')} 
                aria-pressed={index == props.toggledTab}
                key={index} 
                onClick={() => {props.onSelectTab(index)}}

                >
                    {label}
                    </button>
            })}
        </div>
    )

}

TabBar.propTypes = {
    labels: PropTypes.array.isRequired,
    toggledTab: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired,
}

export default TabBar;