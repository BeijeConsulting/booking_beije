import React from 'react'
import './FormButton.less'
import PropTypes from 'prop-types';
function FormButton(props) {
    return (
        <button className={`form_button ${props.className}`} type="submit">{props.label}</button>
    )
}

FormButton.defaultProps = {
    placeholder: 'Cliccami!',
}

FormButton.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,

}

export default FormButton