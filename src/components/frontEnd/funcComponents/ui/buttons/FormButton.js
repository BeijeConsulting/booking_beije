import React from 'react'

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