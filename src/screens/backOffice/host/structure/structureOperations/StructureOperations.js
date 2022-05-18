import React, { useState } from 'react'

import './StructureOperations.less'


//ANT DESIGN
import {
    Input,
    InputNumber,
    Radio,
    TimePicker,
    Button
} from 'antd';

//COMPONENTS
import GoBackButton from '../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton';
import UploadFoto from '../../../../../components/backOffice/hookComponents/uploadFoto/UploadFoto';


const StructureOperation = () => {

    const { TextArea } = Input;

    const [state, setState] = useState({
        data: {
            address: "",
            announce: "",
            category: "",
            city: "",
            country: "",
            description: "",
            zipCode: null,
            checkIn: "",
            checkOut: "",
            fotoStructure: []
        },
        // editData: editObj
    });


    //VALUE OF ALL INPUT
    const onChange = (e) => {
        setState({
            data: {
                ...state.data,
                [e.target.name]: e.target.value
            }
        });
    };

    //VALUE OF INPUTNUMBER
    const onChangeZipCode = (value) => {

        setState({
            data: {
                ...state.data,
                zipCode: value
            }
        })
    }

    //VALUE OF TIME CHEKIN
    const onChangeTimeCheckIn = (time, timeString) => {

        setState({
            data: {
                ...state.data,
                checkIn: timeString,
            }
        });
    }

    //VALUE OF TIME CHECKOUT
    const onChangeTimeCheckOut = (time, timeString) => {

        setState({
            data: {
                ...state.data,
                checkOut: timeString
            }
        });
    }

    const onChangeFoto = (value) => {

        setState({
            data: {
                ...state.data,
                fotoStructure: value
            }
        })
    }

    //SUBMIT DATA OF STRUCTURE
    const handlerSubmitStructure = e => {
        e.preventDefault();
        console.log(state.data)
    }



    return (
        <div className="container_structure_operation">

            <GoBackButton />
            <h1 className="title_messages_page">Create structure</h1>
            <form onSubmit={handlerSubmitStructure}>
                <div>
                    {/* UPLOAD FOTO */}
                    <UploadFoto addFotoStructure={onChangeFoto} />

                    {/* INPUT OF DATA APARTMENT */}
                    <h3>Announce title</h3>
                    <Input onChange={onChange} name="announce" placeholder="Basic usage" className="input_announce border_radius_all_input" />

                    <div className="border_radius_all_input">
                        <h3>Category</h3>
                        <Radio.Group onChange={onChange} name="category" value={state.data.category}>
                            <Radio value={"Hotel"}>Hotel</Radio>
                            <Radio value={"Apartment"}>Apartment</Radio>
                            <Radio value={"Villa"}>Villa</Radio>
                            <Radio value={"Hostel"}>Hostel</Radio>
                        </Radio.Group>
                    </div>

                    <h3>Description</h3>
                    <TextArea onChange={onChange} placeholder="Description" name="description" rows={6} className="input_text_area border_radius_all_input" />

                    {/* INPUT ADDRESS */}
                    <div className="input_group_address">
                        <div className="input_group_flex">
                            <div className="input_margin">
                                <h3>Address</h3>
                                <Input onChange={onChange} name="address" placeholder="Via Bella Vita, 21" className="input_address border_radius_all_input" />
                            </div>

                            <div className="input_margin">
                                <h3>City</h3>
                                <Input onChange={onChange} name="city" placeholder="City" className="input_address border_radius_all_input" />
                            </div>
                        </div>
                        <div className="input_group_flex">
                            <div className="input_margin">
                                <h3>Country</h3>
                                <Input onChange={onChange} name="country" placeholder="Country" className="input_address border_radius_all_input" />
                            </div>
                            <div className="input_margin" >
                                <h3>ZIP code</h3>
                                <InputNumber onChange={onChangeZipCode} name="zipCode" placeholder="ZIP-code" className="input_zip_code border_radius_all_input" />
                            </div>
                        </div>
                    </div>

                    {/* INPUT TIMEPICKER */}
                    <div className="check_block">
                        <div >
                            <h3>Check-in</h3>
                            <TimePicker onChange={onChangeTimeCheckIn} placeholder="16:00" className="input_time_picker border_radius_all_input" />
                        </div>

                        <div>
                            <h3>Check-out</h3>
                            <TimePicker onChange={onChangeTimeCheckOut} placeholder="19:00" className="input_time_picker border_radius_all_input" />
                        </div>
                    </div>

                </div>

                {/* BUTTON */}
                <div className="button_container">
                    <Button htmlType="submit" type="primary" className="button_add_structure">Share Hosting</Button>
                </div>
            </form>
        </div>
    )
}

export default StructureOperation