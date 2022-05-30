import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

// api
import { getStructureImage } from '../../../../services/api/struttura/struttura-immagini-controller/structureImagesApi';

// assets
import '../../../../assets/variables/_common.scss';
import './FavouriteCard.scss'
import propertyPlaceholder from '../../../../assets/images/propertyPlaceholder.png';

// modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


function FavouriteCard(props) {

   const { descrizione, id, nome_struttura } = props.item.Struttura;
   const { tipo } = props.item.Struttura.tipologiaStrutturaId;
   let favouriteId = props.item.id;
   let thumbnail = propertyPlaceholder;

   useEffect(() => {
      let apiThumbnail = getStructureImage(id).then(res => res?.data?.immagine?.urlImage)
      if (apiThumbnail !== '') thumbnail = apiThumbnail;
   }, [])

   const handleOnClick = () => {
      props.callback(favouriteId, nome_struttura);
   }

   return (
      <div className='favourite-card br3 flex p1'>
         <div className='thumbnail-container'>
            <img src={thumbnail} alt={nome_struttura} />
         </div>
         <div className={`card w100 mL1 ${props.className}`}>
            <div className='card-header flex aiCenter jcSpaceB'>
               <span className='card-title'>{nome_struttura}</span>
               <FontAwesomeIcon icon={faHeart} onClick={handleOnClick} />
            </div>
            <div className='card-content'>
               <p>{tipo}</p>
               <p>{descrizione}</p>
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