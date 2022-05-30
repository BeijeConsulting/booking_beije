import React, { useState } from 'react';

// ant
import { InputNumber, Space } from 'antd';

// events
// import { eventBus } from '../../../../../eventBus/eventBus';
import { connect } from 'react-redux';
import { setGuest } from '../../../../../redux/ducks/guestDuck';


function InputGuest(props) {

   const [state, setState] = useState({
      value: 2
   });

   function handleClick(e) {
      let newState = Object.assign({}, state);
      let value = e.target.getAttribute("name");
      newState = { ...newState, value: newState.value + parseInt(value) }
      setState(newState);
      props.dispatch(setGuest(newState.value));
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
         <InputNumber
            addonBefore={selectBefore}
            addonAfter={selectAfter}
            onChange={handleChange}
            min={1}
            max={12}
            value={state.value}
         />

      </Space>
   )
}

export default connect()(InputGuest);
