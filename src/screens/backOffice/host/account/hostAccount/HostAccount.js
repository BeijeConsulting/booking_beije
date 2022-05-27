import { React, useEffect } from "react";

import "./HostAccount.scss"

// COMPONENTS
import { Button, Input, Form } from "antd";

//TRANSLATION
import { useTranslation } from "react-i18next";

//ROUTING
import { routes } from "../../../../../routes/routes";
import { useNavigate } from "react-router-dom";

//API
import { myProfilesGetApi, editProfileModifyPutApi } from "../../../../../services/api/user/userApi";

import { connect } from "react-redux";
import { decryptItem } from "../../../../../utils/crypto/crypto";

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};


const HostAccount = (props) => {

    const [form] = Form.useForm()

    const navigate = useNavigate()

    const { t } = useTranslation()

    const onFinish = (hostData) => {
        alert("salvato!")
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_LIST}`)
        console.log(editProfileModifyPutApi(
            {
                "utente": {
                    "name": hostData.name,
                    "surname": hostData.surname,
                    "email": hostData.email,
                    "telephone_number": hostData.phoneNumber,
                    "companyName": hostData.companyName,
                    "iva": hostData.vatNumber,
                    "address":{
                        "citta": hostData.city,
                        "cap": hostData.postcode,
                        "via": hostData.billingAddress
                    }
                }
            }
        ))
        //axios for put host data
        /* {
               hostDataPut( hostData.user
                   */
    }

    const getData = async () => {
        const HEADER = decryptItem(props.tokenDuck.token);
        let user = await myProfilesGetApi(HEADER)
        console.log(user.data.utente)
        form.setFieldsValue({
            name: user.data.utente?.name,
            surname: user.data.utente?.surname,
            email: user.data.utente?.email,
            phoneNumber: user.data.utente?.telephone_number,
            companyName: user.data.utente?.companyName,
            vatNumber: user.data.utente?.iva,
            city: user.data.utente?.address.citta,
            postcode: user.data.utente?.address.cap,
            billingAddress: user.data.utente?.address.via
        });

    }

    useEffect(() => {
        //get host data to place in placeholder form input 
        //setState with host data
        getData()
        form.setFieldsValue({
            name: null,
            surname: null,
            email: null,
            phoneNumber: null,
            companyName: null,
            vatNumber: null,
            city: null,
            postcode: null,
            billingAddress: null

        });

    }, []);


    return (
        <>
            <h1>Account</h1>
            <div className="host-profile">
                <img alt="profile_img" src="https://nastec.eu/wp-content/uploads/2019/06/sfondo-grigio-chiaro.jpg" />
                <h1>Hotel name</h1>
            </div>
            <Form form={form} {...layout} layout={"vertical"} name="nest-messages" onFinish={onFinish}>
                <Form.Item label={t("common.name")} name='name'>
                    <Input placeholder={t("common.name")} />
                </Form.Item>

                <Form.Item label={t("common.surname")} name='surname'>
                    <Input placeholder={t("common.surname")} />
                </Form.Item>

                <Form.Item label={t("common.email")} name='email'>
                    <Input placeholder={t("common.email")} />
                </Form.Item>

                <Form.Item label={t("bo.screens.host.hostRegistration.fields.phoneNumber")} name='phoneNumber'>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.phoneNumber")} />
                </Form.Item>

                {
                    (form.getFieldsValue("companyName") === null) && (form.getFieldsValue("vatNumber") === null) &&
                    <>
                        <Form.Item label={t("bo.screens.host.hostRegistration.fields.companyName")} name='companyName'>
                            <Input placeholder={t("bo.screens.host.hostRegistration.fields.companyName")} />
                        </Form.Item>
                        <Form.Item label={t("bo.screens.host.hostRegistration.fields.vatNumber")} name='vatNumber'>
                            <Input placeholder={t("bo.screens.host.hostRegistration.fields.vatNumber")} />
                        </Form.Item>

                    </>
                }

                <Form.Item label={t("bo.screens.host.hostRegistration.fields.city")} name='city'>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.city")} />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.postcode")} name='postcode'>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.postcode")} />
                </Form.Item>
                <Form.Item label={t("bo.screens.host.hostRegistration.fields.billingAddress")} name='billingAddress'>
                    <Input placeholder={t("bo.screens.host.hostRegistration.fields.billingAddress")} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{t("common.save")}</Button>
                </Form.Item>
            </Form>

        </>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck,
});


export default connect(mapStateToProps)(HostAccount);