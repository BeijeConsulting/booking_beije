import React from 'react'
import './UiButton.less'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

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
   placeholder: t('fe.components.button.pressMe'),
}

UiButton.propTypes = {
   label: PropTypes.string.isRequired,
   className: PropTypes.string
}

export default UiButton;