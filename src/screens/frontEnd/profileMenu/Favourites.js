import React, { useEffect, useState } from "react";

// api
import { getFavourites, deleteFavourite } from '../../../services/api/lista/listaPreferiti/listaPreferitiApi';

// components
import FavouriteCard from '../../../components/frontEnd/funcComponents/favouriteCard/FavouriteCard';
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
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
      windowWidth: window.innerWidth,
      page: 1,
      totalItems: 0
   });

   let itemsPerPage = 5;

   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize) }
   })

   function loadFavourites() {
      if (localStorage.getItem('token') !== null)
         getFavourites(itemsPerPage, state.page, getLocalStorage('token'))
            .then(res => {
               setState({
                  ...state,
                  favourites: res?.data?.list ? res?.data?.list : [],
                  totalItems: res?.data?.elementsTotal
               });
            });
   }

   useEffect(() => {
      loadFavourites();
   }, [])

   useEffect(() => {
      loadFavourites();
   }, [state.page])


   function handleResize() {
      setState({
         ...state,
         windowWidth: window.innerWidth
      })
   }

   const showToast = (propertyId, propertyName) => {
      const key = `${propertyId}-toast`;
      notification.open({
         description: t('toasts.favouritesDeleted', { name: propertyName }),
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
      loadFavourites();
      showToast(propertyId, propertyName);
   }

   const onPageChange = (nextPage) => {
      setState({
         ...state,
         page: nextPage
      })
   }

   let favouritesRendering = <p>{t('fe.screens.favourites.noFavourites')}</p>;
   if (Array.isArray(state.favourites) && state.favourites.length > 0) {
      favouritesRendering = wrapperMap(FavouriteCard, state.favourites, handleFavourite);
   }

   return (
      <>
         <Helmet>
            <title>{t('fe.screens.settings.settingsCard.favourites')}</title>
         </Helmet>
         <div className='favourites-page flex column'>
            {
               state.windowWidth < 991 &&
               <div className="back-button"><GoBackButton /></div>
            }

            <h1 className="title">{t('fe.screens.settings.settingsCard.favourites')}</h1>

            {favouritesRendering}

            {state.totalItems > itemsPerPage &&
               <Pagination
                  size={"small"}
                  total={state.totalItems}
                  pageSize={itemsPerPage}
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
