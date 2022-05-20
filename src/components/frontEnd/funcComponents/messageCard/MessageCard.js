import React from 'react'
import PropTypes from "prop-types"

//LESS
import './MessageCard.less'

function MessageCard(props) {

    const goToMessage = () =>{
        return props.callback()
    }

    return (
        <div className='message-card' onClick={goToMessage}>
            <div className='thumbnail-container'>
                <img src={props.thumbnail} alt={props.title} />
            </div>
            <div className={props.classNameContent}>
                <div className='card-header'>
                    <span className='card-title'>{props.title}</span>
                    <span className='data-message'>{props.date}</span>
                </div>
                <p className='message-text'>{props.textMessage}</p>
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


