//ANT DESIGN
import { Form, Input, Checkbox, Button } from 'antd';

//REACT
import { useState } from 'react';

//ROUTING
import { Link, useNavigate } from 'react-router-dom';
import { routes } from "../../../../../routes/routes"

//TRANSLATION
import { useTranslation } from 'react-i18next';

//STYLE
import "./HostRegistration.scss"

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};

let companyName = null,
    phone = null,
    vat = null,
    city = null,
    postcode = null,
    billingAddress = null,
    userRoles = null

const HostRegistration = () => {

    const [state, setState] = useState({
        displayRegistration: true,
        displayFirstchoice: false,
        displaySecondchoice: false
    })

    const navigate = useNavigate()

    const { t } = useTranslation();

    const setHostType = (hostChoice) => () => {
        let displayFirstchoice = false;
        let displaySecondchoice = false;
        (hostChoice === 1) ? (displayFirstchoice = true) : (displaySecondchoice = true)
        setState({
            ...state,
            displayRegistration: false,
            displayFirstchoice: displayFirstchoice,
            displaySecondchoice: displaySecondchoice
        })
    }

    const closeInputRegistration = (e) => {
        setState({
            displayRegistration: true,
            displayFirstchoice: false,
            displaySecondchoice: false
        })
    }

    const onFinish = (userType) => (values) => {

        console.log(values);
        console.log(userType);
        alert("Utente registrato correttamente")
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_OPERATION}/new`, {state: { idStructure: null }})
        phone = values.user.phoneNumber
        city = values.user.city
        postcode = values.user.postcode
        billingAddress = values.user.billingAddress
        companyName = userType === 2 ? values.user.companyName : null
        vat = userType === 2 ? values.user.vatNumber : null
        userRoles = userType === 2 ? "company" : "private"

        /* {
               hostDataPut(  ipotetico put da mandare a backend
                   {
                        phone: phone,
                        city: city,
                        postcode: postcode,
                        billingAddress: billingAddress,
                        companyName: companyName,
                        vat: vat,
                        userRoles: userRoles
                   }
               )
           } */
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };




    return (
        <>
            {state.displayRegistration &&
                <div>
                    <h2>{t("bo.screens.host.hostRegistration.title")}</h2>
                    <div className="host_choice" onClick={setHostType(1)}>{t("bo.screens.host.hostRegistration.privateRegistration")}</div> {/* to onClik parameter define type of host */}
                    <div className="host_choice" onClick={setHostType(2)}>{t("bo.screens.host.hostRegistration.companyRegistration")}</div> {/* to onClik parameter define type of host */}
                </div>
            }


            {state.displayFirstchoice &&
                <>


                    <Form {...layout} name="nest-messages" onFinish={onFinish(1)} onFinishFailed={onFinishFailed} > {/* to onFinish parameter define type of host */}
                        <div className='title-setup'>
                            <h2>{t("bo.screens.host.hostRegistration.setUpPrivateAccount")}</h2>
                            <div onClick={closeInputRegistration} className='go_back'><strong>X</strong></div>
                        </div>
                        <Form.Item
                            name={['user', 'phoneNumber']}
                            label={t("bo.screens.host.hostRegistration.fields.phoneNumber")}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'city']}
                            label={t("bo.screens.host.hostRegistration.fields.city")}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'postcode']}
                            label={t("bo.screens.host.hostRegistration.fields.postcode")}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'billingAddress']}
                            label={t("bo.screens.host.hostRegistration.fields.billingAddress")}
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error(t("toasts.formErrorTerms"))),
                                },
                            ]}
                        >
                            <Checkbox>
                                {t("bo.screens.host.hostRegistration.accept")} <Link to={"/terms-and-service"} target="_blank">{t("bo.screens.host.hostRegistration.termsConditionsForHost")}</Link>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                {t("bo.screens.host.hostRegistration.fields.registerButton")}
                            </Button>
                        </Form.Item>

                    </Form>
                </>
            }

            {state.displaySecondchoice &&
                <Form {...layout} name="nest-messages" onFinish={onFinish(2)} onFinishFailed={onFinishFailed} > {/* to onFinish parameter define type of host */}
                    <div className='title-setup'>
                        <h2>{t("bo.screens.host.hostRegistration.setUpCompanyAccount")}</h2>
                        <div onClick={closeInputRegistration} className='go_back'><strong>X</strong></div>
                    </div>
                    <Form.Item
                        name={['user', 'companyName']}
                        label={t("bo.screens.host.hostRegistration.fields.companyName")}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'phoneNumber']}
                        label={t("bo.screens.host.hostRegistration.fields.phoneNumber")}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'vatNumber']}
                        label={t("bo.screens.host.hostRegistration.fields.vatNumber")}
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'city']}
                        label={t("bo.screens.host.hostRegistration.fields.city")}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'postcode']}
                        label={t("bo.screens.host.hostRegistration.fields.postcode")}
                        rules={[
                            {

                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'billingAddress']}
                        label={t("bo.screens.host.hostRegistration.fields.billingAddress")}
                        rules={[
                            {
                                type: 'string',
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error(t("toasts.formErrorTerms"))),
                            },
                        ]}
                    >
                        <Checkbox>
                            {t("bo.screens.host.hostRegistration.accept")} <Link to={"/terms-and-service"} target="_blank">{t("bo.screens.host.hostRegistration.termsConditionsForHost")}</Link>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            {t("bo.screens.host.hostRegistration.fields.registerButton")}
                        </Button>
                    </Form.Item>
                </Form>
            }
        </>
    );
};

export default HostRegistration;
