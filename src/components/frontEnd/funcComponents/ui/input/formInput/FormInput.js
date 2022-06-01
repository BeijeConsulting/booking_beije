import React from 'react'
import './FormInput.scss'
import PropTypes from 'prop-types';


function FormInput(props) {

   const handleOnChange = (e) => {
      props.callback(e.target.value);
   }

   return (
      <input
         className={props.className}
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
   className: '',
   placeholder: 'Insert...'
}

FormInput.propTypes = {
   type: PropTypes.string.isRequired,
   className: PropTypes.string,
   placeholder: PropTypes.string,
   info: PropTypes.string
}

export default FormInput;