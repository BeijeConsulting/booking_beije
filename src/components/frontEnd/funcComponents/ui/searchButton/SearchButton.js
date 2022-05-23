import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

// style
import './SearchButton.less';

// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchButton = ({callback, classCustom}) => {


    return (
        <button
            onClick={ callback}
            className={classCustom}
        >
            <span>
                <FontAwesomeIcon icon={faSearch} />
            </span>
            {t('fe.screens.homePage.searchButton')}
        </button>
    )
}

SearchButton.defaultProps = {
    classCustom: 'searchButton'
}

SearchButton.propTypes = {
    classCustom: PropTypes.string
}

export default SearchButton