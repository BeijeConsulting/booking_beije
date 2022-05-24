import { React, useEffect, useState } from "react";

import "./HostAccount.less"

// COMPONENTS
import { Button, Input, Form } from "antd";

//TRANSLATION
import { useTranslation } from "react-i18next";

//ROUTING
import { routes } from "../../../../../routes/routes";
import { useNavigate } from "react-router-dom";

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};

let hostType = "private"

const HostAccount = () => {

    const [state, setState] = useState({
        companyName: null,
        phone: null,
        vat: null,
        city: null,
        postcode: null,
        billingAddress: null,
        userRole: null
    })

    const navigate = useNavigate()

    const { t } = useTranslation()

    const onFinish = (hostData) => {
        alert("salvato!")
        setState({
            ...state,
            hostData
        })
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_LIST}`)
        //axios for put host data
        /* {
               hostDataPut( hostData.user
                   */
    }

    const getData = async () => { /*ipotetic get of host data
         let data = await getHostData()
         data.role==="company"?hostType="company" : ()
        setState({
            phone: data.host.phone,
            city: data.host.city,
            postcode: data.host.postcode,
            billingAddress: data.host.billingAddress,
            companyName: data.host.companyName,
            vat: data.host.vat,
            userRole: data.hostData.userType
        })*/
    }

    useEffect(() => {
        //get host data to place in placeholder form input 
        //setState with host data
        getData()
    }, [])


    return (
        <>
            <h1>Account</h1>
            <div className="host-profile">
                <img alt="profile_img" src="https://nastec.eu/wp-content/uploads/2019/06/sfondo-grigio-chiaro.jpg" />
                <h1>Hotel name</h1>
            </div>
            <Form {...layout} layout={"vertical"} name="nest-messages" onFinish={onFinish}>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.phoneNumber")} name={['user', 'phoneNumber']}>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.phoneNumber")} defaultValue={state.phone} />
                </Form.Item>

                {
                    state.userRole === "company" &&
                    <>
                        <Form.Item label={t("bo.screens.host.hostRegistration.fields.companyName")} name={['user', 'companyName']}>
                            <Input placeholder={t("bo.screens.host.hostRegistration.fields.companyName")} defaultValue={state.companyName} />
                        </Form.Item>
                        <Form.Item label={t("bo.screens.host.hostRegistration.fields.vatNumber")} name={['user', 'vatNumber']}>
                            <Input placeholder={t("bo.screens.host.hostRegistration.fields.vatNumber")} defaultValue={state.vat} />
                        </Form.Item>
                    </>
                }

                <Form.Item label={t("bo.screens.host.hostRegistration.fields.city")} name={['user', 'city']}>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.city")} defaultValue={state.city} />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.postcode")} name={['user', 'postcode']}>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.postcode")} defaultValue={state.postcode} />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.billingAddress")} name={['user', 'billingAddress']}>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.billingAddress")} defaultValue={state.billingAddress} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{t("common.save")}</Button>
                </Form.Item>
            </Form>

        </>
    )
}




export default HostAccount;