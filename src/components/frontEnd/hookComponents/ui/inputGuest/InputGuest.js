import React, { useState, useEffect } from 'react';

// ant
import { InputNumber, Space } from 'antd';

// events
import { eventBus } from '../../../../../eventBus/eventBus';


function InputGuest(props) {

   const [state, setState] = useState({
      value: 1
   });

   const handleEvent = () => {
      eventBus.onDispatch('guests', state.value);
   }

   useEffect(handleEvent,[state.value]);

   function handleClick(e) {
      let newState = Object.assign({}, state);
      let value = e.target.getAttribute("name");
      newState = { ...newState, value: newState.value + parseInt(value) }
      setState(newState);
   }

   const handleChange = (e) => {
      setState({
         ...state,
         value: parseInt(e)
      })
   }

   const selectBefore = (
      <span name={-1} onClick={handleClick}>
         -
      </span>
   );

   const selectAfter = (
      <span name={1} onClick={handleClick}>
         +
      </span>
   );

   return (
      <Space direction="vertical">
         <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} onChange={handleChange} min={1} max={12} value={state.value} />

      </Space>
   )
}

export default InputGuest;
