import React, { useEffect, useState } from "react";

// api
// import { deleteFavourite } from '../../../services/api/lista/listaPreferiti/listaPreferitiApi';

// components
import FavouriteCard from '../../../components/frontEnd/funcComponents/favouriteCard/FavouriteCard';
import { notification } from 'antd';

// modules
import { useTranslation } from 'react-i18next';

// styles
import './profileMenuCSS/Favourites.less';
// import { getLocalStorage } from "../../../utils/localStorage/localStorage";


const Favourites = () => {
   const { t } = useTranslation();

   let favouritesArray = [
      {
         id: 0,
         title: 'Title',
         thumbnail: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'
      },
      {
         id: 1,
         title: 'Title1',
         thumbnail: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'
      },
      {
         id: 2,
         title: 'Title2',
         thumbnail: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'
      },
      {
         id: 3,
         title: 'Title3',
         thumbnail: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'
      }
   ]

   const [state, setState] = useState({
      favourites: []
   });

   useEffect(() => {
      // TO-DO: get array from api and set it in the state + use the right token
      // getFavourites(userId, getLocalStorage('token'))
      setState({
         favourites: favouritesArray
      })
   }, []) // TO-DO: update dependency

   const showToast = (propertyId, propertyName) => {
      const key = `${propertyId}-toast`;
      notification.open({
         description: `"${propertyName}" has been deleted from your favourites`,
         onClick: () => {
            notification.close(key)
         },
         duration: 2,
         key,
         placement: 'bottom',
         className: 'custom-toast'
      });
   };

   const handleFavourite = (propertyId, propertyName) => {

      // TO-DO: use the right token
      // deleteFavourite(propertyId, getLocalStorage('token'));

      favouritesArray.splice(propertyId, 1);

      // TO-DO: check if state gets updated, otherwise update it:
      setState({
         favourites: favouritesArray
      })

      showToast(propertyId, propertyName);
   }

   const renderFavourites = (property, key) => {
      return (
         <FavouriteCard
            key={`fav${key}`}
            id={property.id}
            title={property.title}
            thumbnail={property.thumbnail}
            callback={handleFavourite}
         />
      )
   }

   return (
      <div className='favourites-page'>
         {/* To-DO: back button */}
         <div className="back-button"></div>
         <h1 className="title">{t('fe.screens.settingsCard.favourites')}</h1>
         {state.favourites.map(renderFavourites)}
         {/* To-DO: pagination */}
         <div className="pagination"></div>
      </div>
   );
};

export default Favourites
