import React, { useEffect, useState } from "react";

// api
import { getFavourites, deleteFavourite } from '../../../services/api/lista/listaPreferiti/listaPreferitiApi';

// components
import FavouriteCard from '../../../components/frontEnd/funcComponents/favouriteCard/FavouriteCard';
import { notification } from 'antd';
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";

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
      favourites: [],
      windowWidth: window.innerWidth
   });


   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize) }
   })

   useEffect(() => {
      if (localStorage.getItem('token') !== null)
         getFavourites(getLocalStorage('token'))
            .then(res => {
               setState({
                  favourites: res?.data
               })
            });
   }, [])


   function handleResize() {
      setState({
         ...state,
         windowWidth: window.innerWidth
      })
   }

   const showToast = (propertyId, propertyName) => {
      const key = `${propertyId}-toast`;
      notification.open({
         description: `"${propertyName}" ${t('toasts.favouritesDeleted')}`,
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
           
            <h1 className="title">{t('fe.screens.settings.settingsCard.favourites')}</h1>
            {wrapperMap(FavouriteCard, state.favourites, handleFavourite)}
            {/* To-DO: pagination */}
            <div className="pagination my1"></div>
         </div>
      </>
   );
};

export default Favourites;
