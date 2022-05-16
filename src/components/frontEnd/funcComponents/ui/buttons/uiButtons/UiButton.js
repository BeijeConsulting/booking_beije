import React from 'react'
import './UiButton.less'
import PropTypes from 'prop-types';
function UiButton(props) {
    return (
        <button className={`ui_button ${props.className}`} type="button">{props.label}</button>
    )
}

UiButton.defaultProps = {
    placeholder: 'Cliccami!',
}

UiButton.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,

}

export default UiButton