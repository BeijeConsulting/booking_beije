import React from 'react';
import PropTypes from 'prop-types';
import { renderSelectOptions } from '../../../../../utils/Utils';


function UiSelect(props) {

   const onChangeCallback = (e) => {
      if (props.callback) props.callback(e.target.value);
   }

   return (
      <>
         <select name={props.name} className={props.cssClass} onChange={onChangeCallback}>
            {props.data.map(props.renderingCallback(props.name))}
         </select>
      </>
   )
}

UiSelect.defaultProps = {
   renderingCallback: renderSelectOptions
}

UiSelect.propTypes = {
   callback: PropTypes.func,
   cssClass: PropTypes.string,
   data: PropTypes.array.isRequired,
   name: PropTypes.string,
   renderingCallback: PropTypes.func
}

export default UiSelect;