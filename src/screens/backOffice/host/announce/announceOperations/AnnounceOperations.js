import {
    InputNumber,
    Input,
    Button,
    Checkbox,
    Row,
    Col,
    Form
} from 'antd';

//STYLE
import "./AnnounceOperations.less"

const Demo = () => {

    const { TextArea } = Input;

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            // labelCol={{
            //     span: 4,
            // }}
            // wrapperCol={{
            //     span: 14,
            // }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {/* INPUT NUMBER PRICE AND BEDS */}
            <div className="input_number_container ">
                <Form.Item
                    label="Price for night"
                    name="priceForNight"
                    rules={[
                        {
                            required: true,
                            message: 'Insert price',
                        },
                    ]}
                >
                    <InputNumber
                        // status={state.priceForNight && "error"}
                        prefix="$"
                        className="input_number_item border_radius_all_input"
                        min={1}
                        max={9999}
                        defaultValue={null}
                    // onChange={onChangePrice}
                    // value={state.data !== null ? state.data.priceOfNight : ""}
                    />
                </Form.Item>

                <Form.Item
                    label="Beds"
                    name="beds"
                    rules={[
                        {
                            required: true,
                            message: 'Insert number of beds',
                        },
                    ]}
                >
                    <InputNumber
                        // status={state.bedsError && "error"}
                        className="input_number_item border_radius_all_input"
                        min={1}
                        max={50}
                    // defaultValue={5}
                    // value={state.data !== null ? state.data.beds : ""}
                    // onChange={onChangeBeds}
                    />
                </Form.Item>
            </div>

            {/* CHECKBOX AMMENITIES GROUPE */}
            <div className="checkbox_ammenities_container">
                <Form.Item
                    label="Services"
                    name="checkbox-group"
                    rules={[
                        {
                            required: true,
                            message: '!',
                        },
                    ]}
                >
                    <Checkbox.Group
                        className="checkbox_group_service"
                        name="service"
                    // onChange={onChangeCheckboxService}
                    // value={state.data !== null && state.data.service}
                    >
                        <Row>
                            <Col span={8}>
                                <Checkbox value="servizio-3">servizio-3</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="servizio-4">servizio-4</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="servizio-5">servizio-5</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="servizio-6">servizio-6</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="servizio-7">servizio-7</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="servizio-8">servizio-8</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="servizio-9">servizio-9</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            </div>

            {/* ONLY INPUT TEXT AND TEXT AREA */}
            <div className="input_text_container">
                <Form.Item
                    label="Announce"
                    name="announce"
                    rules={[
                        {
                            required: true,
                            message: '!',
                        },
                    ]}
                >
                    <Input
                        // status={state.announceError && "error"}
                        // onChange={onChange}
                        name="announce"
                        placeholder="Basic usage"
                        // value={state.data !== null ? state.data.announce : ""}
                        className="input_announce border_radius_all_input"
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: '!',
                        },
                    ]}
                >
                    <TextArea
                        // status={state.descriptionError && "error"}
                        // onChange={onChange}
                        placeholder="Description"
                        name="description"
                        rows={6}
                        // value={state.data !== null ? state.data.description : ""}
                        className="input_text_area border_radius_all_input"
                    />
                </Form.Item>
            </div>


            {/* INPUT NUMBER FOR NUMBER OF BADS AND NUMBER OF ROOMS */}
            <div className="input_number_container">
                <div className="margin_input_number">

                    <Form.Item
                        label="Rooms"
                        name="rooms"
                        rules={[
                            {
                                required: true,
                                message: '!',
                            },
                        ]}
                    >
                        <InputNumber
                            className="input_number_item border_radius_all_input"
                            min={1}
                            max={50}
                            defaultValue={50}
                        // value={state.data !== null ? state.data.rooms : ""}
                        // onChange={onChangeRooms}
                        />
                    </Form.Item>
                </div>
            </div>

            {/* CHECKBOX OF RULES */}
            <div className="checkbox_rules_container" >
                <Form.Item
                    label="Rules"
                    name="rules"
                    rules={[
                        {
                            required: true,
                            message: '!',
                        },
                    ]}
                >
                    <Checkbox.Group
                        className="checkbox_group_rules"
                    // onChange={onChangeCheckboxRules}
                    // value={state.data !== null && state.data.rules}
                    >
                        <div>
                            <Checkbox value="dogs-not-allowed" >Dogs not allowed</Checkbox>
                        </div>

                        <div>
                            <Checkbox value="smoking-allowed1">Smoking allowed</Checkbox>
                        </div>

                        <div>
                            <Checkbox value="smoking-allowed2">Smoking allowed</Checkbox>
                        </div>

                        <div>
                            <Checkbox value="smoking-allowed3" >Smoking allowed</Checkbox>
                        </div>

                        <div>
                            <Checkbox value="smoking-allowed4">Smoking allowed</Checkbox>
                        </div>

                    </Checkbox.Group>
                </Form.Item>
            </div>



            <Form.Item
                wrapperCol={{
                    offset: 20,
                    span: 25,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};

export default Demo;


