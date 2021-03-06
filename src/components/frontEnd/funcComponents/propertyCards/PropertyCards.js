import React from 'react'
import './PropertyCards.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
/* import BackupImage from '../../../../assets/backupimage.jpg' */
import PropTypes from 'prop-types';

function PropertyCards(props) {

    return (
        <div className='card_container'>
            <img src={props.imgPreview}></img>
            <div className={`card_info ${props.className}`}>
                <h3>{props.title}</h3>
                {props.isMostReviewed ? <FontAwesomeIcon icon={faHeart} /> : props.children}
            </div>
        </div>
    )
}

PropertyCards.defaultProps = {
    isMostReviewed: false
}

PropertyCards.propTypes = {
    /*  imgPreview: PropTypes.string.isRequired, */
    title: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default PropertyCards;