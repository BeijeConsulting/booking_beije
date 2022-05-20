import { React, useEffect, useState } from "react";

import "./HostAccount.less"

// COMPONENTS
import { Button, Input, Form } from "antd";

//TRANSLATION
import { useTranslation } from "react-i18next";

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};


const HostAccount = () => {

    const [state, setState] = useState()

    const { t } = useTranslation()

    const saveHostData = () => {
        console.log("salvato!")
        //axios for put host data
    }

    useEffect(() => {
        //get host data to place in placeholder form input 
        //setState with host data
    })


    return (
        <>
            <h1>Account</h1>
            <div className="host-profile">
                <img alt="profile_img" src="https://nastec.eu/wp-content/uploads/2019/06/sfondo-grigio-chiaro.jpg" />
                <h1>Hotel name</h1>
            </div>
            <Form {...layout} layout={"vertical"} name="nest-messages">
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.phoneNumber")}>
                    <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.vatNumber")}>
                    <Input placeholder="VAT Number" />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.city")}>
                    <Input placeholder="City" />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.postcode")}>
                    <Input placeholder="Postcode" />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.billingAddress")}>
                    <Input placeholder="Billing address" />
                </Form.Item>
            </Form>
            <Button onClick={saveHostData} type="primary" htmlType="submit">{t("common.save")}</Button>
        </>
    )
}




export default HostAccount;