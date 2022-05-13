import React from 'react'
import './PropertyCards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


export default function PropertyCards(props) {
    return (
        <div className='card_container'>
            <img src={props.imgPreview}></img>
            <div className='card_info'>
                <h3>{props.title}</h3>
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    )
}
