import React, { useEffect } from 'react'
import './FavouriteCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

import { getStructureImage } from '../../../../services/api/struttura/struttura-immagini-controller/structureImagesApi';


function FavouriteCard(props) {

   const { citta, numero_civico, via } = props.item.Struttura.indirizzo;
   const { descrizione, id } = props.item.Struttura;
   const { tipo } = props.item.Struttura.tipologiaStrutturaId;
   let thumbnail;

   useEffect(() => {
      thumbnail = getStructureImage(id).then(res => res.data);
   }, [])

   const handleOnClick = () => {
      props.callback(id, descrizione);
   }

   return (
      <div className='favourite-card'>
         <div className='thumbnail-container'>
            <img src={thumbnail} alt={descrizione} />
         </div>
         <div className={`card ${props.className}`}>
            <div className='card-header'>
               <span className='card-title'>{descrizione}</span>
               <FontAwesomeIcon icon={faHeart} onClick={handleOnClick} />
            </div>
            <div className='card-content'>
               <p>{tipo}</p>
               <p>{via} {numero_civico} - {citta}</p>
            </div>
         </div>
      </div>
   )
}

FavouriteCard.defaultProps = {
   className: ''
}

FavouriteCard.propTypes = {
   className: PropTypes.string,
   callback: PropTypes.func,
   item: PropTypes.object
}

export default FavouriteCard;