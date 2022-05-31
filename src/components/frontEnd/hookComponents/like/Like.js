import React, { Component } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';

// api
import { getFavourites, addFavourite, deleteFavourite } from '../../../../services/api/lista/listaPreferiti/listaPreferitiApi';

// utils
import { getLocalStorage } from '../../../../utils/localStorage/localStorage';

// components
import { notification } from 'antd';
import { withTranslation } from 'react-i18next';



class Like extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.favourites = [];
        this.isFavourites = null;
    }

    componentDidMount() {
        this.handleApi();
        console.log();
    }

    handleApi = async () => {
        const FAVOURITES = await getFavourites(10, 1, getLocalStorage("token"));

        console.log(FAVOURITES?.data?.list);
        this.favourites = FAVOURITES?.data?.list;
        this.isFavourites = this.favourites?.find(this.find);
    }

    handleAdd = (id, name) => async () => {
        this.showToast(id, name);
        await addFavourite(id, getLocalStorage("token"));
        this.setState({
            clickedHeart: true
        })
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

    render() {
        return (
            <>
                {
                    this.isFavourites === this.props?.id ?
                        <FontAwesomeIcon icon={heart}
                            onClick={this.handleDelete(this.props?.id, this.props?.propertyName)}
                        />
                        :

                        <FontAwesomeIcon icon={this.state?.clickedHeart ? heart : faHeart}
                            onClick={this.handleAdd(this.props?.id, this.props?.propertyName)}
                        />
                }
            </>
        )
    }

    find = (item) => {
        return this.props?.id === item?.Struttura?.id
    }
}

export default withTranslation()(Like);