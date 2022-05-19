import React from 'react'
import './FavouriteCard.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';


function FavouriteCard(props) {

   const handleFavourite = (propertyId) => () => {
      // remove property from favourites
   }

   return (
      <div className='favourite-card'>
         <div className='thumbnail-container'>
            <img src={props.thumbnail} alt={props.title} />
         </div>
         <div className={`card-content ${props.className}`}>
            <div className='card-header'>
               <span className='card-title'>{props.title}</span>
               <FontAwesomeIcon icon={faHeart} onClick={handleFavourite(props.id)} />
            </div>
            {props.children}
         </div>
      </div>
   )
}

FavouriteCard.defaultProps = {
   className: ''
}

FavouriteCard.propTypes = {
   id: PropTypes.number.isRequired,
   thumbnail: PropTypes.string.isRequired,
   className: PropTypes.string,
   title: PropTypes.string.isRequired
}

export default FavouriteCard;