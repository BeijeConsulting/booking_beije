import React, { useEffect, useState } from "react";

// api
import { getFavourites, deleteFavourite } from '../../../services/api/lista/listaPreferiti/listaPreferitiApi';

// components
import FavouriteCard from '../../../components/frontEnd/funcComponents/favouriteCard/FavouriteCard';
import { notification, Pagination } from 'antd';

// modules
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

// styles
import './profileMenuCSS/Favourites.scss';
import '../../../assets/variables/_common.scss'
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

// utils
import { wrapperMap } from "../../../utils/generalIteration/generalIteration";
import { paginationArrowsRender } from "../../../utils/pagination/pagination";



const Favourites = () => {
   const { t } = useTranslation();

   const [state, setState] = useState({
      favourites: [],
      page: 1
   });

   useEffect(() => {
      if (localStorage.getItem('token') !== null)
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
         description: t('toasts.favouritesDeleted', {name: propertyName}),
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

   const onPageChange = (page) => {
      setState({
         ...state,
         page: page
      })
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

            {state.favourites.length > 5 &&
               <Pagination
                  size={"small"}
                  total={10}
                  pageSize={5}
                  current={state.page}
                  onChange={onPageChange}
                  itemRender={paginationArrowsRender}
                  className={'custom-pagination'}
               />
            }

         </div>
      </>
   );
};

export default Favourites;
