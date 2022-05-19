import React from 'react'
import './FormInput.less'
import PropTypes from 'prop-types';

function FormInput(props) {
   
   const handleOnChange = (e) => {
      props.callback(e.target.value);
   }

   return (
      <input
         className={`form_input ${props.className}`}
         type={props.type}
         placeholder={props.placeholder}
         id={props.info}
         name={props.info}
         onChange={handleOnChange}
      />
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
   info: PropTypes.string
}

export default FormInput;