import React from "react";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Card,
  Form,
  Input,
  Button,
  Select
} from "antd";
import { useSelector } from "react-redux";
import Container from "./Elements/Container";

const CreateProfile = ({ form }) => {
  const user = useSelector(state => state.auth.user);

  const { getFieldDecorator } = form;
  return (
    <Container>
      <Card>
        <Form>
          <Row type="flex" align="middle">
            <Col span={10}>
              <div
                style={{
                  textAlign: "center"
                }}
              >
                <Avatar icon="user" size={160} />
              </div>
            </Col>
            <Col span={14}>
              <Typography.Title>{user.name}</Typography.Title>
              <Form.Item>
                {getFieldDecorator("bio")(
                  <Input.TextArea placeholder="Add bio..." rows={5} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={18}>
              <Form.Item>
                {getFieldDecorator("handle", {
                  rules: [{ required: true, message: "Username is required" }]
                })(<Input size="large" placeholder="Set username/handle" />)}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Button size="large" style={{ width: "100%" }} type="primary">
                Check availability
              </Button>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={11}>
              <Form.Item>
                {getFieldDecorator("status", {
                  rules: [{ required: true, message: "Status is required" }]
                })(
                  <Select size="large" placeholder="Select a status">
                    <Select.Option key="student" value="student">
                      Student
                    </Select.Option>
                    <Select.Option key="teacher" value="teacher">
                      Teacher
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item>
                {getFieldDecorator("githubusername")(
                  <Input
                    size="large"
                    placeholder="Enter your github username"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Card title="Academic Details">
                <Form.Item>
                  {getFieldDecorator("collegeID")(
                    <Input size="large" placeholder="Enter your College ID" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("branch")(
                    <Input size="large" placeholder="Enter your Branch" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("yearOfJoin")(
                    <Input
                      size="large"
                      placeholder="Enter your Year of Joining (YYYY)"
                    />
                  )}
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Form.create()(CreateProfile);
