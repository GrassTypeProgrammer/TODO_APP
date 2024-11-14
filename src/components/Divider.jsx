import { PropTypes } from "prop-types"
import  classNames  from "classnames"
import './../styles/components/Divider.css'

function Divider(props) {
    return <div className={classNames("Divider_root", props.isHorizontal? 'horizontal' : 'vertical')}/>
}

Divider.propTypes = {
    isHorizontal: PropTypes.bool,
}
export default Divider;