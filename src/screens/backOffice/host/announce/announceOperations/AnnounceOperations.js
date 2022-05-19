import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

//PROP-TYPES
import PropTypes from "prop-types"

//STYLE
import "./AnnounceOperations.less"

//ANT-DESING
import {
    InputNumber,
    Input,
    Button,
    Checkbox,
    Row,
    Col
} from "antd"

//COMPONENTS
import UploadFoto from "../../../../../components/backOffice/hookComponents/uploadFoto/UploadFoto"

const AnnounceOperations = (props) => {

    // const location = useLocation();
    // const idStructure = location.state.idStructure;

    const [state, setState] = useState({
        data: {
            announce: '',
            rules: [],
            service: [],
            description: '',
            priceForNight: null,
            beds: null,
            rooms: null,
            numberBeds: null,
            otherRules: []
        },
        inputRules: false,
    })
    // useEffect(() => {
    //     // Per farlo funzionare usare json-server
    //     // const getStructure = async () => {
    //     //   const res = await fetch(`http://localhost:30001/data/${idStructure}`);
    //     //   const structureFromServer = await res.json();
    //     //   setState({ ...state, data: structureFromServer });
    //     // };

    //     if (location.state.idStructure !== null) {
    //         //futura chiamata a API
    //         //getStructure();
    //     }
    // }, []);


    const { TextArea } = Input;

    //ONCHANGE FOR INPUT TEXT
    const onChange = (event) => {
        setState({
            ...state,
            data: {
                ...state.data,
                [event.target.name]: event.target.value,
            }
        })
    }

    // ONCHANGE FOR ADDOTHER
    const onChangeOtherRules = (event) => {
        setState({
            ...state,
            data: {
                ...state.data,
                otherRules: {
                    ruler: event.target.value
                }
            }
        })
    }

    //INPUT NUMBER ONCHANGE
    const onChangePrice = (value) => {
        setState({
            ...state,
            data: {
                ...state.data,
                priceForNight: value
            }
        })
    }

    const onChangeBeds = (value) => {
        setState({
            ...state,
            data: {
                ...state.data,
                beds: value
            }
        })
    }

    const onChangeRooms = (value) => {
        setState({
            ...state,
            data: {
                ...state.data,
                rooms: value
            }
        })
    }

    const onChangeNumberOfBeds = (value) => {
        setState({
            ...state,
            data: {
                ...state.data,
                numberBeds: value
            }
        })
    }

    //ONCHANGE FOR CHECKBOX(non sono riuscito a generalizare)
    const onChangeCheckboxRules = (checkedValue) => {
        setState({
            ...state,
            data: {
                ...state.data,
                rules: checkedValue
            }
        })
    }

    //ONCHANGE FOR CHECKBOX(non sono riuscito a generalizare)
    const onChangeCheckboxService = (checkedValue) => {
        setState({
            ...state,
            data: {
                ...state.data,
                service: checkedValue
            }
        })
    }

    //HANDLER ADD RULES INPUT
    const handlerAddRuls = () => {
        setState({
            ...state.data,
            inputRules: !state.inputRules

        })
        console.log(state.inputRules)
    }

    //SUBMIT ANNOUNCE FORM
    const handlerSubmitAnnounce = (event) => {
        event.preventDefault()
        console.log(state.data)
    }


    return (
        <>
            <div className="announce_operation_container">
                <goBackButton />
                <h1 className="announce_operatio_title">Announce create</h1>


                <form onSubmit={handlerSubmitAnnounce}>
                    <div className="announce_upload_foto">
                        <UploadFoto />
                    </div>

                    {/* INPUT NUMBER GROUP */}
                    <div className="input_number_container ">
                        <div className="margin_input_number">
                            <h3>Price for night</h3>
                            <InputNumber
                                prefix="$"
                                className="input_number_item border_radius_all_input"
                                min={1}
                                max={50}
                                defaultValue={300}
                                onChange={onChangePrice}
                                value={state.data !== null ? state.data.priceOfNight : ""}
                            />
                        </div>
                        <div className="margin_input_number">
                            <h3>Beds</h3>
                            <InputNumber
                                className="input_number_item border_radius_all_input"
                                min={1}
                                max={50}
                                defaultValue={5}
                                value={state.data !== null ? state.data.beds : ""}
                                onChange={onChangeBeds}
                            />
                        </div>
                    </div>

                    {/* CHECKBOX AMMENITIES GROUPE */}
                    <div className="checkbox_ammenities_container">
                        <h3>Ammenities</h3>
                        <Checkbox.Group className="checkbox_group_service" name="service" onChange={onChangeCheckboxService} value={state.data !== null && state.data.service}>
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
                    </div>

                    {/* ONLY INPUT TEXT AND TEXT AREA */}
                    <div className="input_text_container">
                        <h3>Announce title</h3>
                        <Input
                            onChange={onChange}
                            name="announce"
                            placeholder="Basic usage"
                            value={state.data !== null ? state.data.announce : ""}
                            className="input_announce border_radius_all_input"
                        />

                        <h3>Description</h3>
                        <TextArea
                            onChange={onChange}
                            placeholder="Description"
                            name="description"
                            rows={6}
                            value={state.data !== null ? state.data.description : ""}
                            className="input_text_area border_radius_all_input"
                        // value={state.data !== null ? state.data.description : ""}
                        />
                    </div>

                    {/* INPUT NUMBER FOR NUMBER OF BADS AND NUMBER OF ROOMS */}
                    <div className="input_number_container">
                        <div className="margin_input_number">
                            <h3>Number of rooms</h3>
                            <InputNumber
                                className="input_number_item border_radius_all_input"
                                min={1}
                                max={50}
                                defaultValue={50}
                                value={state.data !== null ? state.data.rooms : ""}
                                onChange={onChangeRooms}
                            />
                        </div>
                        <div className="margin_input_number">
                            <h3>Number of beds</h3>
                            <InputNumber
                                className="input_number_item border_radius_all_input"
                                min={1}
                                max={50}
                                value={state.data !== null ? state.data.numberBeds : ""}
                                defaultValue={50}
                                onChange={onChangeNumberOfBeds}
                            />
                        </div>
                    </div>

                    {/* CHECKBOX OF RULES */}
                    <div className="checkbox_rules_container" >
                        <Checkbox.Group className="checkbox_group_rules" onChange={onChangeCheckboxRules} value={state.data !== null && state.data.rules}>
                            <div>
                                <Checkbox value="dogs-not-allowed" onClick={handlerAddRuls}>Dogs not allowed</Checkbox>
                                {state.inputRules ? <Input onChange={onChangeOtherRules} name="otherRules" className="input_other_rules" /> : ''}
                            </div>

                            <div>
                                <Checkbox value="smoking-allowed1" onClick={handlerAddRuls}>Smoking allowed</Checkbox>
                            </div>

                            <div>
                                <Checkbox value="smoking-allowed2" onClick={handlerAddRuls}>Smoking allowed</Checkbox>
                            </div>

                            <div>
                                <Checkbox value="smoking-allowed3" onClick={handlerAddRuls}>Smoking allowed</Checkbox>
                            </div>

                            <div>
                                <Checkbox value="smoking-allowed4" onClick={handlerAddRuls}>Smoking allowed</Checkbox>
                            </div>

                        </Checkbox.Group>
                    </div>

                    {/* BUTTON */}
                    <div className="button_container">
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="button_add_structure"
                        // onClick={() => console.log(state.data)}
                        >
                            Share Hosting
                        </Button>
                    </div>
                </form>


            </div >
        </>
    )
}

AnnounceOperations.defaultProps = {

}

AnnounceOperations.propTypes = {

}

export default AnnounceOperations;