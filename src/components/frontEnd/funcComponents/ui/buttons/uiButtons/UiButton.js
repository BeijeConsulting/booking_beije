import React from 'react'
import './UiButton.scss'
import PropTypes from 'prop-types';


function UiButton({ className, callback, label }) {

   return (
      <button
         className={`ui_button ${className}`}
         onClick={callback}
         type="button"
      >
         {label}
      </button>
   )

}

UiButton.defaultProps = {
   placeholder: 'Press me!'
}

UiButton.propTypes = {
   label: PropTypes.string.isRequired,
   className: PropTypes.string
}

export default UiButton;