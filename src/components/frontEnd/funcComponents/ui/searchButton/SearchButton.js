import React from 'react';
import PropTypes from 'prop-types';

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
            Search your destination
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