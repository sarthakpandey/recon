import React from "react";
import { Layout, Row, Col, Input, Button, Form } from "antd";
const Navbar = props => {
  const onLogin = e => {
    e.preventDefault();
    props.form.validateFields((err, formProps) => {
      if (!err) {
        console.log(formProps);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Layout.Header>
      <Row type="flex">
        <Col span={14}>
          <h1 style={{ color: "white" }}>RECON</h1>
        </Col>
        <Col span={9}>
          <Form layout="inline" onSubmit={onLogin}>
            <Row
              type="flex"
              justify="end"
              gutter={12}
              style={{ marginBottom: 10 }}
            >
              <Col span={9}>
                <Form.Item
                  style={{ marginRight: 0, marginTop: 10, marginBottom: 10 }}
                >
                  {getFieldDecorator("email", {
                    rules: [{ required: true, message: "Email is required" }]
                  })(<Input placeholder="Email" type="email" />)}
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  style={{ marginRight: 0, marginTop: 10, marginBottom: 10 }}
                >
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Password is required" }]
                  })(<Input placeholder="Password" type="password" />)}
                </Form.Item>
              </Col>
              <Col span={2} style={{ textAlign: "right" }}>
                <Form.Item
                  style={{ marginRight: 0, marginTop: 10, marginBottom: 10 }}
                >
                  <Button htmlType="submit" type="primary">
                    Login
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Form.create()(Navbar);
