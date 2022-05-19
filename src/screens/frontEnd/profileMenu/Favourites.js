import React from "react";


// components
import FavouriteCard from '../../../components/frontEnd/funcComponents/favouriteCard/FavouriteCard';

// modules
import { useTranslation } from 'react-i18next';

// styles
import './profileMenuCSS/Favourites.less';


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
         title: 'Title',
         thumbnail: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'
      },
      {
         id: 2,
         title: 'Title',
         thumbnail: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'
      },
      {
         id: 3,
         title: 'Title',
         thumbnail: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'
      }
   ]

   const renderFavourites = (property, key) => {
      return (
         <FavouriteCard
            key={`fav${key}`}
            id={property.id}
            title={property.title}
            thumbnail={property.thumbnail}
         />
      )
   }

   return (
      <div className='favourites-page'>
         {/* back button */}
         <h1 className="title">{t('fe.screens.settingsCard.favourites')}</h1>
         {favouritesArray.map(renderFavourites)}
         {/* pagination */}
      </div>
   );
};

export default Favourites
