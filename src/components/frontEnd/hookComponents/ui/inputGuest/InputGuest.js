import React, { useState } from 'react'
import PropTypes from 'prop-types';

// ant
import { InputNumber, Space } from 'antd';

function InputGuest(props) {

    const [state, setState] = useState({
        value: 1
    });

    function handleClick(e) {
        let newState = Object.assign({}, state);
        let value =e.target.getAttribute("name");
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

InputGuest.propTypes = {}

export default InputGuest;
