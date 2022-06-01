import React from 'react'

//PROP-TYPES
import PropTypes from 'prop-types';

//STYLE
import './MessageCard.scss';


const MessageCard = (props) => {


    return (
        // "You" - need to recontroll params in entry
        <div className={props.classControll} >
            <h2 className="name_message">{props.nameMessage}</h2>
            <p>{props.bodyMessage}</p>
            <p className='time_message'>{props.dateMessage}</p>
            {/* - {props.timeMessage} */}
        </div>
    )
}

MessageCard.defaultProps = {
    nameMessage: 'User',
    bodyMessage: 'Hello world',
    dateMessage: '2022/06/13',
    // timeMessage: '17:00'
}

MessageCard.propTypes = {
    // idSender: PropTypes.number,
    nameMessage: PropTypes.string,
    bodyMessage: PropTypes.string,
    dateMessage: PropTypes.string,
    // timeMessage: PropTypes.string,
};

export default MessageCard



