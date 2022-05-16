import React, { useState } from "react"
import PropTypes from "prop-types";

//COMPONENTS
import { Input, Checkbox, Button } from "antd";

//STYLE
import "./HostRegistrationModal.less"
import { Link } from "react-router-dom";



const HostRegistrationModal = (props) => {

    const [state, setState] = useState({
        displayRegistration: true,
        displayFirstchoice: false,
        displaySecondchoice: false
    })

    const setFirstchoice = () => {
        setState({
            ...state,
            displayRegistration: false,
            displayFirstchoice: true
        })
    }

    const setSecondchoice = () => {
        setState({
            ...state,
            ...state,
            displayRegistration: false,
            displaySecondchoice: true
        })
    }

    return (
        <>
            {state.displayRegistration &&
                <div className="modal">
                    <h2>{props.title}</h2>
                    <div className="host_choice" onClick={setFirstchoice}>I'm private</div>
                    <div className="host_choice" onClick={setSecondchoice}>I have company</div>
                </div>
            }

            {
                state.displayFirstchoice &&
                <div className="modal">
                    <h2>Setup your Private Host Account</h2>
                    <Input placeholder="Phone number" />
                    <Input placeholder="City" />
                    <Input placeholder="Postcode" />
                    <Input placeholder="Billing address" />
                    <Checkbox>I accept <Link to={"/terms-and-service"} target="_blank">Terms and Agreement for Hosts</Link></Checkbox>
                    <Button type="primary">Register</Button>
                </div>
            }

            {
                state.displaySecondchoice &&
                <div className="modal">
                    <h2>Setup your Company Host Account</h2>
                    <Input placeholder="Phone number" />
                    <Input placeholder="VAT number" />
                    <Input placeholder="City" />
                    <Input placeholder="Postcode" />
                    <Input placeholder="Billing address" />
                    <Checkbox>I accept <Link to={"/terms-and-service"} target="_blank">Terms and Agreement for Hosts</Link></Checkbox>
                    <Button type="primary">Register</Button>
                </div>
            }
        </>
    )

}

HostRegistrationModal.defaultProps = {
    title: "Titolo",
    
}

HostRegistrationModal.propTypes = {
    title: PropTypes.string,
}

export default HostRegistrationModal;