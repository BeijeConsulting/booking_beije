// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

// components
import { faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// style
import './PropertyCard.scss';
import '../../../../../assets/variables/_common.scss';

// API
import { getStructureImage } from '../../../../../services/api/struttura/struttura-immagini-controller/structureImagesApi';
import { annuncioOnStrutturaGetApi } from '../../../../../services/api/annuncio/annuncioApi';
import withRouting from '../../../../../withRouting/withRouting';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import { addFavourite, deleteFavourite, getFavourites } from '../../../../../services/api/lista/listaPreferiti/listaPreferitiApi';
import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';
import { notification } from 'antd';

class PropertyCard extends Component {
   constructor(props) {
      super(props)

      this.state = {
         image: null,
         price: [],
         clickedHeart: false
      }
      this.listings = [];
      this.favourites = [];
      this.isFavourites = null;
   }

   componentDidMount() {
      this.handleApi()
   }

   handleApi = async () => {
      const LISTINGS = await annuncioOnStrutturaGetApi(this.props?.data?.struttura?.id);
      const IMAGE = await getStructureImage(this.props?.data?.struttura?.id);
      const FAVOURITES = await getFavourites(getLocalStorage("token"));

      this.setState({
         image: IMAGE.data?.immagine?.urlImage
      })

      this.listings = LISTINGS?.data?.list;
      this.favourites = FAVOURITES?.data?.list;
      // console.log(this.favourites);
      // console.log(this.props?.data?.indirizzo?.struttura_id);
      this.isFavourites = this.favourites?.find(this.find);
      this.findLowestPrice();

   }

   handleResponse = (name, id) => (res) => {
      this.showToast(id, name);
      this.setState({
         clickedHeart: true
      })
   }

   handleError = (error) => {
      return error.message
   }

   handleAdd = (id, name) => () => {
      addFavourite(id, getLocalStorage("token"))
         .then(this.handleResponse(name, id))
         .catch(this.error)

   }


   handleDelete = (id, name) => () => {
      deleteFavourite(id, getLocalStorage('token'));
      this.showToast(id, name);

   }

   showToast = (propertyId, propertyName) => {
      const key = `${propertyId}-toast`;
      notification.open({
         description: this.props.t('toasts.favouritesAdd', { name: propertyName }),
         onClick: () => {
            notification.close(key)
         },
         duration: 2,
         key,
         placement: 'bottom',
         className: 'custom-toast'
      });
   }

   findLowestPrice() {

      this.listings.forEach(item => {

         this.state.price.push(item.prezzo);
      });

      let lowerPrice = this.state.price.reduce((previousValue, currentValue) => previousValue < currentValue ? previousValue : currentValue);

      this.setState({
         price: lowerPrice
      })
   }

   render() {
      return (
         <>
            <FontAwesomeIcon
               className="info_icon"
               icon={faInfoCircle}
               onClick={this.props?.callback}
            />

            <section className='propertyCardContainer flex relative aiCenter'>
               <img src={this.state?.image} />
               {/* <img className='ofC' src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcache.eupedia.com%2Fimages%2Fcontent%2Fburghley-2.jpg&f=1&nofb=1"} /> */}
               <div>
                  <div className='titleContainer'>
                     <span>{this.props?.data?.struttura?.nome}</span>
                     {
                        this.isFavourites === this.props?.data?.indirizzo?.struttura_id ?
                           <FontAwesomeIcon icon={heart}
                              onClick={this.handleDelete(this.props?.data?.indirizzo?.struttura_id, this.props?.data?.struttura?.nome)}
                           />
                           :

                           <FontAwesomeIcon icon={this.state?.clickedHeart ? heart : faHeart}
                              onClick={this.handleAdd(this.props?.data?.indirizzo?.struttura_id, this.props?.data?.struttura?.nome)}
                           />
                     }
                  </div>
                  <small>{this.props?.data?.struttura?.tipologia}</small>
                  <div className='mediaRateCard'>
                     <FontAwesomeIcon icon={faStar} />
                     <small>{this.props?.data?.media_recensioni}</small>
                  </div>
               </div>


               <span className='absolute r0 b0'>
                  {this.props?.t('common.currency', {
                     price: this.state?.price,
                     formatParams: {
                        price: { currency: 'EUR', maximumFractionDigits: 0 }
                     }
                  })}
               </span>
            </section>
         </>
      )
   }
   find = (item) => {
      return this.props?.data?.indirizzo?.struttura_id === item?.Struttura?.id
   }
}

PropertyCard.propTypes = {

}

export default withTranslation()(withRouting(PropertyCard));