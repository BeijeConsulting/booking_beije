import React, { Component } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';

// api
import { getFavourites, addFavourite, deleteFavourite } from '../../../../services/api/lista/listaPreferiti/listaPreferitiApi';

// utils
import { getLocalStorage } from '../../../../utils/localStorage/localStorage';

// components
import { notification } from 'antd';
import { withTranslation } from 'react-i18next';

// styles
import '../../../../assets/commonStyles/toasts.scss';


class Like extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isFavourite: false
      }
      this.favourites = [];
   }

   componentDidMount() {
      this.handleApi();
   }

   handleApi = async () => {
      const FAVOURITES = await getFavourites(25, 1, getLocalStorage("token"));
      this.favourites = FAVOURITES?.data?.list;
      let newIsFavourite = this.state.isFavourite;
      if (this.favourites?.find(item => item.Struttura.id == this.props.id)) newIsFavourite = true;
      this.setState({
         isFavourite: newIsFavourite
      })
   }

   handleAdd = (id, name) => async () => {
      this.showToast(id, name, 'favouritesAdded');
      await addFavourite(id, getLocalStorage("token"));
      this.setState({
         isFavourite: true
      })
   }

   handleDelete = (id, name) => () => {
      deleteFavourite(id, getLocalStorage('token'));
      this.showToast(id, name, 'favouritesDeleted');
      this.setState({
         isFavourite: false
      })
   }

   showToast = (propertyId, propertyName, string) => {
      const key = `${propertyId}-toast`;
      let cssClass = string === 'favouritesDeleted' ? 'custom-toast' : 'info-toast';
      notification.open({
         description: this.props.t(`toasts.${string}`, { name: propertyName }),
         onClick: () => {
            notification.close(key)
         },
         duration: 2,
         key,
         placement: 'bottom',
         className: cssClass
      });
   }

   render() {
      return (
         <>
            <FontAwesomeIcon className='cursor px1' icon={this.state.isFavourite === true ? faHeartFull : faHeart}
               onClick={this.state.isFavourite === true ? this.handleDelete(this.props?.id, this.props?.propertyName) : this.handleAdd(this.props?.id, this.props?.propertyName)}
            />
         </>
      )
   }

   find = (item) => {
      return this.props?.id === item?.Struttura?.id
   }
}

export default withTranslation()(Like);