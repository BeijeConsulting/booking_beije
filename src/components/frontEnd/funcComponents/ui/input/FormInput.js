import React from 'react'
import './FormInput.css'
import PropTypes from 'prop-types';
function FormInput(props) {
    return (
        <input className={`form_input ${props.className}`} type={props.type} placeholder={props.placeholder} id={props.info} name={props.info} ></input>
    )
}


FormInput.defaultProps = {
    type: 'text',
    placeholder: 'inserisci...',
}

FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string
}

export default FormInput;
