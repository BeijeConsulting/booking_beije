//ANT DESIGN
import { Form, Input, Checkbox, Button, Spin } from 'antd';

//REACT
import { useEffect, useState } from 'react';

//ROUTING
import { Link, useNavigate } from 'react-router-dom';
import { routes } from "../../../../../routes/routes"

//API
import { hostRequestPost } from '../../../../../services/api/host/hostApi';
import { decryptItem } from '../../../../../utils/crypto/crypto';

//TRANSLATION
import { useTranslation } from 'react-i18next';

//STYLE
import "./HostRegistration.scss"

import { connect } from 'react-redux';


const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};

let companyName = null,
    vat = null

const HostRegistration = (props) => {

    const [state, setState] = useState({
        loading: true,
        displayRegistration: true,
        displayFirstchoice: false,
        displaySecondchoice: false
    })

    const navigate = useNavigate()

    const { t } = useTranslation();


    useEffect(() => {
        console.log(props.userDuck.user.auth)
        let userType = props.userDuck.user.auth
        setTimeout(() => {
            if (userType.includes("HOST")) {
                navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_LIST}`)
            }
            else {
                setState({
                    ...state,
                    loading: false
                })
            }
            console.log(userType)
        }, 1000)

    }, [props.userDuck.user.auth])

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
        const HEADER = decryptItem(props.tokenDuck.token);
        console.log("values", values);
        companyName = values.user.companyName
        vat = values.user.vatNumber

        console.log(hostRequestPost({ companyName: companyName, vat: vat }, HEADER,
            {
                "utente": {
                    "telephone_number": values.user.phoneNumber,
                    "address": {
                        "city": values.user.city,
                        "postcode": values.user.postcode,
                    },
                    "billingAddress": values.user.billingAddress,
                    "companyName": companyName,
                    "iva": vat
                }
            }
        ));

        alert("Utente registrato correttamente")
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_OPERATION}/new`, { state: { idStructure: null } })

    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <>
            {state.loading === true &&
                <Spin />
            }

            {(state.displayRegistration && state.loading === false) &&
                <div className='host_type_pick'>
                    <h2>{t("bo.screens.host.hostRegistration.title")}</h2>
                    <div className="host_choice" onClick={setHostType(1)}>{t("bo.screens.host.hostRegistration.privateRegistration")}</div> {/* to onClik parameter define type of host */}
                    <div className="host_choice" onClick={setHostType(2)}>{t("bo.screens.host.hostRegistration.companyRegistration")}</div> {/* to onClik parameter define type of host */}
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
                <Form {...layout} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} >
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

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck,
});

export default connect(mapStateToProps)(HostRegistration);
