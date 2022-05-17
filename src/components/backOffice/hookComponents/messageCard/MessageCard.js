import React from 'react'

//PROP-TYPES
import PropTypes from 'prop-types';

//STYLE
import './messageCard.less'


const MessageCard = (props) => {

    return (
        // "You" - need to recontroll params in entry
        <div className={props.nameMessage === 'You' ? 'single_message_card_you' : 'single_message_card_response'} >
            <h2 className="name_message">{props.nameMessage}</h2>
            <p>{props.bodyMessage}</p>
            <p className='time_message'>{props.dateMessage} - {props.timeMessage}</p>
        </div>
    )
}

MessageCard.defaultProps = {
    nameMessage: 'User',
    bodyMessage: 'Hello world',
    dateMessage: '2022/06/13',
    timeMessage: '17:00'
}

MessageCard.propTypes = {
    nameMessage: PropTypes.string,
    bodyMessage: PropTypes.string,
    dateMessage: PropTypes.string,
    timeMessage: PropTypes.string,
};

export default MessageCard



