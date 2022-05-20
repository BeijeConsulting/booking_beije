//ANT DESIGN
import { Form, Input, Checkbox, Button } from 'antd';

//REACT
import { useState } from 'react';

//ROUTING
import { Link, useNavigate } from 'react-router-dom';

//TRANSLATION
import { useTranslation } from 'react-i18next';

//STYLE
import "./HostRegistration.less"
import FormItem from 'antd/lib/form/FormItem';

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};

let termsIsChecked = false

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

    const onFinish = (values) => {

        console.log(values);
        alert("Utente registrato correttamente")
        navigate("/structure-operation")
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };




    return (
        <>
            {state.displayRegistration &&
                <div>
                    <h2>{t("bo.screens.host.hostRegistration.title")}</h2>
                    <div className="host_choice" onClick={setHostType(1)}>{t("bo.screens.host.hostRegistration.privateRegistration")}</div>
                    <div className="host_choice" onClick={setHostType(2)}>{t("bo.screens.host.hostRegistration.companyRegistration")}</div>
                </div>
            }


            {state.displayFirstchoice &&
                <>


                    <Form {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} >
                        <div className='title-setup'>
                            <h2>{t("bo.screens.host.hostRegistration.setUpPrivateAccount")}</h2>
                            <div onClick={closeInputRegistration} className='go_back'><strong>X</strong></div>
                        </div>
                        <Form.Item
                            name={['user', 'phone-number']}
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
                                    type: 'number',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'billing-address']}
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
                    
                    </Form>
                </>
            }

            {state.displaySecondchoice &&
                <Form {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} >
                    <div className='title-setup'>
                        <h2>{t("bo.screens.host.hostRegistration.setUpCompanyAccount")}</h2>
                        <div onClick={closeInputRegistration} className='go_back'><strong>X</strong></div>
                    </div>
                    <Form.Item
                        name={['user', 'company-name']}
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
                        name={['user', 'phone-number']}
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
                        name={['user', 'vat-number']}
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
                                type: 'number',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'billing-address']}
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
