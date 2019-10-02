import React from "react";
import Navbar from "./Elements/Navbar";
import { Card, Form, Input, Row, Col, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions";

const Register = props => {
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      const { name, email, password, confirm_password } = formProps;
      if (!err) {
        if (password === confirm_password) {
          await dispatch(registerUser({ name, email, password }));
          message.success("Registered successfully");
        } else {
          return message.error("Passwords do not match");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <>
      <Navbar />
      <Row type="flex" justify="center">
        <Col span={8}>
          <Card
            title={
              <h1 style={{ color: "white", margin: "auto" }}>Register now</h1>
            }
            style={{ margin: "20px 20px", borderRadius: 25 }}
            headStyle={{
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              fontWeight: 700,
              backgroundColor: "#303F9F",
              textAlign: "center"
            }}
            type="inner"
          >
            <Form onSubmit={onSubmit}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "Name is required" }]
                })(<Input size="large" />)}
              </Form.Item>
              <Form.Item label="Email Address">
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Email is required" }]
                })(<Input size="large" type="email" />)}
              </Form.Item>
              <Form.Item label="Password">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Password is required" }]
                })(<Input size="large" type="password" />)}
              </Form.Item>
              <Form.Item label="Confirm Password">
                {getFieldDecorator("confirm_password", {
                  rules: [{ required: true, message: "Passwords do not match" }]
                })(<Input size="large" type="password" />)}
              </Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                shape="round"
                size="large"
                style={{ backgroundColor: "#303F9F" }}
              >
                Register
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Form.create()(Register);
