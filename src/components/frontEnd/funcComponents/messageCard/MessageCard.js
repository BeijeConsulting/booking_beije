import React from 'react'
// import PropTypes from "prop-types";

//LESS
import './MessageCard.scss'
import '../../../../assets/variables/_common.scss';

function MessageCard(props) {

    const goToMessage = () =>{
        return props.callback()
    }

    return (
        <div className='message-card flex jcSpaceB cursor br3' onClick={goToMessage}>
            <div className='thumbnail-container'>
                <img className='w100 h100 ofC br3' src={props.thumbnail} alt={props.title} />
            </div>
            <div className={props.classNameContent}>
                <div className='card-header flex jcSpaceB mB1 aiCenter wrap'>
                    <span className='card-title fwB'>{props.title}</span>
                    <span className='data-message mL1'>{props.date}</span>
                </div>
                <p className='message-text'>{props.textMessage.length > 30 ? props.textMessage.substring(0, 30) + '...' : props.textMessage}</p>
            </div>
        </div>
    )
}


// default props 
MessageCard.defaultProps = {
    classNameContent: 'message-content'
    /*  nameBtn: 'click',
     cssCustom: 'defaultBtn' */
}

// propTypes 
MessageCard.propTypes = {
    /*  styleBtn: PropTypes.string,
     cssCustom: PropTypes.string,
     callback: PropTypes.func.isRequired, */
    // nameBtn: PropTypes.string.isRequired 
}

export default MessageCard


