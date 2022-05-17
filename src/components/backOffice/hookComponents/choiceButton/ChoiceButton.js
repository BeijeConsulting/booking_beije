import { Button } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types"

const ChoiceButton = (props) => {
    const [state, setState] = useState({
        firstButton: "primary",
        secondButton: "",
        thirdButton: "",
    })

    const showFirstSelection = (e) => {
        setState({
            ...state,
            firstButton: "primary",
            secondButton: "",
            thirdButton: "",
        })
        props.callbackFirstButton(e)
    }

    const showSecondSelection = (e) => {
        setState({
            ...state,
            firstButton: "",
            secondButton: "primary",
            thirdButton: "",
        })
        props.callbackSecondButton(e)
    }

    const showThirdSelection = (e) => {
        setState({
            ...state,
            firstButton: "",
            secondButton: "",
            thirdButton: "primary",
        })
        props.callbackThirdButton(e)
    }

    return (
        <>
            <Button
                onClick={showFirstSelection}
                type={state?.firstButton}>
                {props.firstButtonName}
            </Button>

            <Button
                onClick={showSecondSelection}
                type={state?.secondButton}>
                {props.secondButtonName}
            </Button>

            <Button
                onClick={showThirdSelection}
                type={state?.thirdButton}>
                {props.thirdButtonName}
            </Button>
        </>
    )
}

ChoiceButton.default = {
    firstButtonName: "First",
    secondButtonName: "Second",
    thirdButtonName: "Third"
}

ChoiceButton.propTypes = {
    firstButtonName: PropTypes.string,
    secondButtonName: PropTypes.string,
    thirdButtonName: PropTypes.string,
    callbackFirstButton: PropTypes.func.isRequired,
    callbackSecondButton: PropTypes.func.isRequired,
    callbackThirdButton: PropTypes.func.isRequired

}

export default ChoiceButton;