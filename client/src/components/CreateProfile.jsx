import React from "react";
import _ from "lodash";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Card,
  Form,
  Input,
  Button,
  Select,
  message
} from "antd";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "./Elements/Container";
import { BRANCHES, LOCATIONS } from "../utils";
import { createProfile } from "../actions";

const CreateProfile = ({ form, history }) => {
  const user = useSelector(state => state.auth.user);

  const onSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, formProps) => {
      if (!err) {
        const data = _.pickBy(formProps, _.identity);
        try {
          await createProfile(data);
          message.success("Profile updated successfully");
          return history.push("/dashboard");
        } catch (err) {
          if (err.response.status === 400) {
            message.error("Username already taken");
          } else {
            message.error("Internal server error");
          }
        }
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
    <Container>
      <Card>
        <Form onSubmit={onSubmit}>
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
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("handle", {
                  rules: [{ required: true, message: "Username is required" }]
                })(<Input size="large" placeholder="Set username/handle" />)}
              </Form.Item>
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
              <Form.Item>
                {getFieldDecorator("skills", {
                  rules: [
                    { required: true, message: "Atleast one skill is required" }
                  ]
                })(
                  <Input
                    size="large"
                    placeholder="Add skills (separated by commas) "
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("location")(
                  <Select size="large" placeholder="Select your location">
                    {LOCATIONS.map(location => (
                      <Select.Option key={location} value={location}>
                        {location}
                      </Select.Option>
                    ))}
                  </Select>
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
                    <Select size="large" placeholder="Select your Branch">
                      {BRANCHES.map(branch => (
                        <Select.Option key={branch} value={branch}>
                          {branch}
                        </Select.Option>
                      ))}
                    </Select>
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
            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
              style={{ marginTop: 25 }}
            >
              Create Profile
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default withRouter(Form.create()(CreateProfile));
