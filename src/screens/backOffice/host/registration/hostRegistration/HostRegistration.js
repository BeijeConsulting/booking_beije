import { Form, Input, Checkbox, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};


const HostRegistration = () => {

    const [state, setState] = useState({
        displayRegistration: true,
        displayFirstchoice: false,
        displaySecondchoice: false
    })

    const navigate = useNavigate()

    const { t } = useTranslation();

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
            displayRegistration: false,
            displaySecondchoice: true
        })
    }

    const onFinish = (values) => {
        console.log(values);
    };

    const sendHostData = (e) => {
        alert("Utente registrato correttamente")
        navigate("/structure-operation")
    }

    const closeInputRegistration = (e) => {
        setState({
            displayRegistration: true,
            displayFirstchoice: false,
            displaySecondchoice: false
        })
    }


    return (
        <>
            {state.displayRegistration &&
                <div>
                    <h2>"Register as host"</h2>
                    <div className="host_choice" onClick={setFirstchoice}>{t('bo.components.hostRegistrationModal.privateRegistration')}</div>
                    <div className="host_choice" onClick={setSecondchoice}>{t('bo.components.hostRegistrationModal.companyRegistration')}</div>
                </div>
            }


            {state.displayFirstchoice &&
                <>


                    <Form {...layout} name="nest-messages" onFinish={onFinish} >
                        <>
                            <h2>Setup your host account</h2>
                            <div onClick={closeInputRegistration} className='go_back'><strong>X</strong></div>
                        </>
                        <Form.Item
                            name={['user', 'phone-number']}
                            label="Phone number"
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
                            label="City"
                            rules={[
                                {

                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'postcode']}
                            label="Postcode"
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
                            label="Billing address"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Checkbox>{t('bo.components.hostRegistrationModal.accept')} <Link to={"/terms-and-service"} target="_blank">{t('bo.components.hostRegistrationModal.termsConditionsForHost')}</Link></Checkbox>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button onClick={sendHostData} type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            }

            {state.displaySecondchoice &&
                <Form {...layout} name="nest-messages" onFinish={onFinish} >
                    <>
                        <h2>Setup your host account</h2>
                        <div onClick={closeInputRegistration} className='go_back'><strong>X</strong></div>
                    </>
                    <Form.Item
                        name={['user', 'company-name']}
                        label="Company name"
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
                        label="Phone number"
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
                        label="VAT Number"
                        rules={[
                            {
                                type: 'number',
                                required: true
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'city']}
                        label="City"
                        rules={[
                            {

                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'postcode']}
                        label="Postcode"
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
                        label="Billing address"
                        rules={[
                            {
                                type: 'string',
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Checkbox>{t('bo.components.hostRegistrationModal.accept')} <Link to={"/terms-and-service"} target="_blank">{t('bo.components.hostRegistrationModal.termsConditionsForHost')}</Link></Checkbox>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button onClick={sendHostData} type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            }
        </>
    );
};

export default HostRegistration;
