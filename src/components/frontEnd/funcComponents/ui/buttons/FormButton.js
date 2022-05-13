import React from 'react'
import './FormButton.css'
import PropTypes from 'prop-types';
function FormButton(props) {
    return (
        <button className={`form_button ${props.className}`} type="submit">{props.label}</button>
    )
}

FormInput.defaultProps = {
    placeholder: 'Cliccami!',
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,

}

export default FormButton