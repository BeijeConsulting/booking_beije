import React from 'react'
import './FormInput.less'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


function FormInput(props) {
   const { t } = useTranslation();

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
   className: '',
   // placeholder: t('fe.components.input.insert'),
}

FormInput.propTypes = {
   type: PropTypes.string.isRequired,
   className: PropTypes.string,
   placeholder: PropTypes.string,
   info: PropTypes.string
}

export default FormInput;