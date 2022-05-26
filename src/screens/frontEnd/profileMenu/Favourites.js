import React, { useEffect, useState } from "react";

// api
import { getFavourites, deleteFavourite } from '../../../services/api/lista/listaPreferiti/listaPreferitiApi';

// components
import FavouriteCard from '../../../components/frontEnd/funcComponents/favouriteCard/FavouriteCard';
import { notification } from 'antd';

// modules
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

// styles
import './profileMenuCSS/Favourites.scss';
import '../../../assets/variables/_common.scss'
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

// utils
import { wrapperMap } from "../../../utils/generalIteration/generalIteration";



const Favourites = () => {
   const { t } = useTranslation();

   const [state, setState] = useState({
      favourites: []
   });

   useEffect(() => {
      if(localStorage.getItem('token') !== null)
      getFavourites(getLocalStorage('token'))
         .then(res => {
            setState({
               favourites: res?.data
            })
         });
   }, [])

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
      deleteFavourite(propertyId, getLocalStorage('token'));
      showToast(propertyId, propertyName);
   }

   return (
      <>
         <Helmet>
            <title>{t('fe.screens.settings.settingsCard.favourites')}</title>
         </Helmet>
         <div className='favourites-page flex column'>
            {/* To-DO: back button */}
            <div className="back-button"></div>
            <h1 className="title">{t('fe.screens.settings.settingsCard.favourites')}</h1>
            {wrapperMap(FavouriteCard, state.favourites, handleFavourite)}
            {/* To-DO: pagination */}
            <div className="pagination my1"></div>
         </div>
      </>
   );
};

export default Favourites;
