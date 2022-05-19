import React from "react";


// components
import FavouriteCard from '../../../components/frontEnd/funcComponents/favouriteCard/FavouriteCard';

// modules
import { useTranslation } from 'react-i18next';

// styles
import './profileMenuCSS/Favourites.less';


const Favourites = () => {
   const { t } = useTranslation();
   return (
      <div className='favourites-page'>
         {/* back button */}
         <h1 className="title">{t('fe.screens.settingsCard.favourites')}</h1>
         <FavouriteCard
            id={0}
            title={'Title'}
            thumbnail={'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'}
         />
         <FavouriteCard
            id={1}
            title={'Title'}
            thumbnail={'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'}
         />
         <FavouriteCard
            id={2}
            title={'Title'}
            thumbnail={'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg'}
         />
         {/* pagination */}
      </div>
   );
};

export default Favourites
