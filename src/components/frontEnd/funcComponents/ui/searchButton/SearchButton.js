import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

// style
import './SearchButton.scss';

// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchForm from '../../../classComponents/pageComponents/modalChildrenComponent/searchForm/SearchForm';

const SearchButton = ({callback, classCustom}) => {
  
    const [state, setState] = useState({
        width: null
    })

    function handleWindowWidth () {
        setState({
            ...state,
            width: window.innerWidth
        })
        window.addEventListener('resize', handleWindowWidth)

        return () => { window.removeEventListener('resize', handleWindowWidth) }
    } 

    useEffect(handleWindowWidth, [])

    return (

        state.width < 480 ?
        <button
            onClick={ callback}
            className={classCustom}
        >
            <span>
                <FontAwesomeIcon icon={faSearch} />
            </span>
            {t('fe.screens.homePage.searchButton')}
        </button>

        :
        <SearchForm />
    )
}

SearchButton.defaultProps = {
    classCustom: 'searchButton'
}

SearchButton.propTypes = {
    classCustom: PropTypes.string
}

export default SearchButton