import React from 'react'
import './FormButton.less'
import PropTypes from 'prop-types';



function FormButton(props) {

   function clickButton(e) {
      props.callback(e);
   }

   return (
      <input
         onClick={clickButton}
         className={`form-button ${props.className}`}
         placeholder={props.label}
         value={props.label}
         type="submit"
         disabled={props.disabled}
      />
   )
}

FormButton.defaultProps = {
   className: '',
   placeholder: 'Press me!',
   disabled: false
}

FormButton.propTypes = {
   label: PropTypes.string.isRequired,
   callback: PropTypes.func,
   className: PropTypes.string
}

export default FormButton