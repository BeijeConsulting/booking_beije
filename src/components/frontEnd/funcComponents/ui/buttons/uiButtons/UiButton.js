import React from 'react'
import './UiButton.less'
import PropTypes from 'prop-types';

function UiButton({className, callback, label}) {

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
   placeholder: 'Cliccami!',
}

UiButton.propTypes = {
   label: PropTypes.string.isRequired,
   className: PropTypes.string
}

export default UiButton