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
         className={`form_button ${props.className}`}
         placeholder={props.label}
         type="submit"
      />
   )
}

FormButton.defaultProps = {
   placeholder: 'Cliccami!',
}

FormButton.propTypes = {
   label: PropTypes.string.isRequired,
   callback: PropTypes.func,
   className: PropTypes.string
}

export default FormButton