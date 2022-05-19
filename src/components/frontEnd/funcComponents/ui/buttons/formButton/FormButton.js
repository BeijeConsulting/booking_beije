import React from 'react'
import './FormButton.less'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';



function FormButton(props) {
   const { t } = useTranslation();

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
      />
   )
}

FormButton.defaultProps = {
   className: ''
   // placeholder: t('fe.components.button.pressMe'),
}

FormButton.propTypes = {
   label: PropTypes.string.isRequired,
   callback: PropTypes.func,
   className: PropTypes.string
}

export default FormButton