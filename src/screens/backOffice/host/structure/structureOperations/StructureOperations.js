import { useState, useEffect } from "react";

import moment from "moment";

import { Form, Input, InputNumber, Button, TimePicker, Spin } from "antd";
import GoBackButton from "../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import { useLocation } from "react-router-dom";

const StructureOperation = () => {
  const { TextArea } = Input;

  const [state, setState] = useState({ data: null });

  const location = useLocation();

  const initialFormValue = {
    address: "",
    announce: "",
    city: "",
    category: null,
    country: "",
    description: "",
    zipCode: null,
    checkIn: "16:00",
    checkOut: "19:00",
  };

  useEffect(() => {
    // Per farlo funzionare usare json-server
    // const getStructure = async () => {
    //   const res = await fetch(
    //     `http://localhost:30001/data/${location.state.idStructure}`
    //   );
    //   const structureFromServer = await res.json();
    //   setState({ ...state, data: structureFromServer });
    // };

    // if (location.state.idStructure !== null) {
    //   // futura chiamata a API
    //   getStructure();
    // } else {
      setState({ ...state, data: initialFormValue });
    // }
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    setState({ ...state, values });
    // CONTROLLARE, IMMAGINI NON GESTITE
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {state.data === null ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            address: state.data.address,
            announce: state.data.announce,
            city: state.data.city,
            category: state.data.category,
            country: state.data.country,
            description: state.data.description,
            zipCode: state.data.zipCode,
            checkIn: moment(state.data.checkIn, "HH:mm"),
            checkOut: moment(state.data.checkOut, "HH:mm"),
          }}
        >
          <GoBackButton />
          <Form.Item
            label="Announce"
            name="announce"
            rules={[
              {
                required: true,
                message: "Please input your announce!",
              },
            ]}
          >
            <Input name="announce" placeholder="Announce title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <TextArea name="description" placeholder="Descriprion" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input name="address" placeholder="address" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <Input name="city" placeholder="city" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
                message: "Please input your country!",
              },
            ]}
          >
            <Input name="country" placeholder="country" />
          </Form.Item>

          <Form.Item
            label="ZIP code"
            name="zipCode"
            rules={[
              {
                required: true,
                message: "Please input your zipCode!",
              },
            ]}
          >
            <InputNumber name="zipCode" placeholder="zipCode" />
          </Form.Item>

          <Form.Item
            label="Check-in"
            name="checkIn"
            rules={[
              {
                required: true,
                message: "Please input your checkIn!",
              },
            ]}
          >
            <TimePicker name="checkIn" placeholder="checkIn" />
          </Form.Item>

          <Form.Item
            label="Check-out"
            name="checkOut"
            rules={[
              {
                required: true,
                message: "Please input your checkIn!",
              },
            ]}
          >
            <TimePicker name="checkOut" placeholder="checkOut" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default StructureOperation;
