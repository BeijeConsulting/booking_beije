import React from 'react';
import PropTypes from 'prop-types';


function CheckboxInput(props) {

   const handleClick = (e) => {
      props.callback(e.target.checked);
   }

   return (
      <input
         type="checkbox"
         name={props.name}
         className={props.className}
         onClick={handleClick}
      />
   )
}

CheckboxInput.defaultProps = {
   className: 'bottom'
}

CheckboxInput.propTypes = {
   name: PropTypes.string,
   className: PropTypes.string,
   callback: PropTypes.func
}

export default CheckboxInput;