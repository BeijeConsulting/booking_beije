import React from 'react'
import './PropertyCards.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import BackupImage from '../../../../assets/backupimage.jpg'


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

FormInput.defaultProps = {
    imgPreview: BackupImage,
    title: 'Appartamento',
}

FormInput.propTypes = {
    imgPreview: PropTypes.img.isRequired,
    title: PropTypes.string.isRequired,
    className: propTypes.string
}

export default PropertyCards;