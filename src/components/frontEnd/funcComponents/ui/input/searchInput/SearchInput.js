import React from 'react'
import './SearchInput.less'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const { t } = useTranslation();

function SearchInput(props) {
    return (
        <div className='search_input_container'>
            <label>{props.label}</label>
            <input className={`search_input ${props.className}`} type="text" placeholder={props.placeholder} ></input>
        </div>
    )
}


SearchInput.defaultProps = {
    placeholder: t('fe.components.input.insert'),
}

SearchInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
}


export default SearchInput;
