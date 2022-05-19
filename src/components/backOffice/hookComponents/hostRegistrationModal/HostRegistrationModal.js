import React, { useState } from "react"
import PropTypes from "prop-types";

//COMPONENTS
import { Input, Checkbox, Button } from "antd";

//STYLE
import "./HostRegistrationModal.less"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";



const HostRegistrationModal = (props) => {

    const { t } = useTranslation();

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
                    <div className="host_choice" onClick={setFirstchoice}>{t('bo.components.hostRegistrationModal.privateRegistration')}</div>
                    <div className="host_choice" onClick={setSecondchoice}>{t('bo.components.hostRegistrationModal.companyRegistration')}</div>
                </div>
            }

            {
                state.displayFirstchoice &&
                <div className="modal">
                    <h2>{t('bo.components.hostRegistrationModal.setUpPrivateAccount')}</h2>
                    <Input placeholder="Phone number" />
                    <Input placeholder="City" />
                    <Input placeholder="Postcode" />
                    <Input placeholder="Billing address" />
                    <Checkbox>{t('bo.components.hostRegistrationModal.accept')} <Link to={"/terms-and-service"} target="_blank">{t('bo.components.hostRegistrationModal.termsConditionsForHost')}</Link></Checkbox>
                    <Button type="primary">{t('common.registerLabel')}</Button>
                </div>
            }

            {
                state.displaySecondchoice &&
                <div className="modal">
                    <h2>{t('bo.components.hostRegistrationModal.setUpCompanyAccount')}</h2>
                    <Input placeholder="Phone number" />
                    <Input placeholder="VAT number" />
                    <Input placeholder="City" />
                    <Input placeholder="Postcode" />
                    <Input placeholder="Billing address" />
                    <Checkbox>{t('bo.components.hostRegistrationModal.accept')} <Link to={"/terms-and-service"} target="_blank">{t('bo.components.hostRegistrationModal.termsConditionsForHost')}</Link></Checkbox>
                    <Button type="primary">{t('common.registerLabel')}</Button>
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