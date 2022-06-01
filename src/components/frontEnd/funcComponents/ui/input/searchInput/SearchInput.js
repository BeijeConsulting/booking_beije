import React from 'react'
import './SearchInput.scss'
import PropTypes from 'prop-types';


function SearchInput(props) {
    return (
        <div className='search_input_container'>
            <label>{props.label}</label>
            <input className={`search_input ${props.className}`} type="text" placeholder={props.placeholder} ></input>
        </div>
    )
}

SearchInput.defaultProps = {
   placeholder: 'Insert...'
}

SearchInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
}

export default SearchInput;
