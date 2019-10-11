import React, { useEffect, useState } from "react";
import _ from "lodash";
import { withRouter } from "react-router-dom";
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
  message,
  Icon,
  Badge,
  Tag,
  Divider,
  Collapse
} from "antd";
import Container from "./Elements/Container";
import { BRANCHES, LOCATIONS } from "../utils";
import { getProfileByUserId } from "../actions";

const ViewProfile = props => {
  const [profile, setProfile] = useState(null);
  const id = props.match.params.userId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProfileByUserId(id);
      setProfile(response.data);
    };
    fetchData();
  }, [id]);
  return (
    <Container>
      {!profile ? (
        <Card loading />
      ) : (
        <Card>
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
              <Typography.Title>{profile.user.name}</Typography.Title>
              <div style={{ fontSize: 20 }}>@{profile.handle}</div>
              <Divider />
              <div>{profile.bio}</div>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" style={{ marginTop: 30 }}>
            <Col span={11}>
              <Badge
                status="processing"
                text={
                  <span style={{ fontSize: 20 }}>
                    <span style={{ fontWeight: "bold" }}>Status: </span>
                    <span style={{ textTransform: "capitalize" }}>
                      {profile.status}
                    </span>
                  </span>
                }
              />
            </Col>
            <Col span={11}>
              {profile.githubusername ? (
                <Badge
                  status="processing"
                  text={
                    <span style={{ fontSize: 20 }}>
                      <span style={{ fontWeight: "bold" }}>
                        <Icon type="github" />
                      </span>
                      <span>{profile.githubusername}</span>
                    </span>
                  }
                />
              ) : null}
            </Col>
            <Col span={24} style={{ marginTop: 20, marginBottom: 20 }}>
              <Badge
                status="processing"
                text={
                  <span style={{ fontSize: 20 }}>
                    <span style={{ fontWeight: "bold" }}>Skills: </span>
                    <span>
                      {profile.skills.map(skill => (
                        <Tag
                          color="blue"
                          style={{
                            fontSize: 16,
                            padding: 7,
                            borderRadius: 25
                          }}
                        >
                          {skill}
                        </Tag>
                      ))}
                    </span>
                  </span>
                }
              />
            </Col>
            <Col span={24}>
              <Badge
                status="processing"
                text={
                  <span style={{ fontSize: 20 }}>
                    <span style={{ fontWeight: "bold" }}>From: </span>
                    <span>{profile.location}</span>
                  </span>
                }
              />
            </Col>
            <Col span={24} style={{ marginTop: 30 }}>
              <Collapse defaultActiveKey="1">
                <Collapse.Panel key="1" header={<div>More Details</div>}>
                  <div>
                    <Badge
                      status="processing"
                      text={
                        <span style={{ fontSize: 16 }}>
                          <span style={{ fontWeight: "bold" }}>College: </span>
                          <span>{profile.collegeID}</span>
                        </span>
                      }
                    />
                  </div>
                  <div>
                    <Badge
                      status="processing"
                      text={
                        <span style={{ fontSize: 16 }}>
                          <span style={{ fontWeight: "bold" }}>Branch: </span>
                          <span>{profile.branch}</span>
                        </span>
                      }
                    />
                  </div>
                </Collapse.Panel>
                <Collapse.Panel key="2" header={<div>Academic Details</div>}>
                  {profile.education.map((education, i) => (
                    <Card>
                      <div>
                        <Badge
                          status="processing"
                          text={
                            <span style={{ fontSize: 16 }}>
                              <span style={{ fontWeight: "bold" }}>
                                School:{" "}
                              </span>
                              <span>{education.school}</span>
                            </span>
                          }
                        />
                      </div>
                      <div>
                        <Badge
                          status="processing"
                          text={
                            <span style={{ fontSize: 16 }}>
                              <span style={{ fontWeight: "bold" }}>
                                Degree:{" "}
                              </span>
                              <span>{education.degree}</span>
                            </span>
                          }
                        />
                      </div>
                    </Card>
                  ))}
                </Collapse.Panel>
              </Collapse>
            </Col>

            {/* <Col span={24}>
              <Card
                title={
                  <div style={{ fontSize: 20 }}>
                    <Icon type="book" style={{ marginRight: 15 }} />
                    <Typography.Text>Academic Details</Typography.Text>
                  </div>
                }
              >
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
            </Col> */}
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
        </Card>
      )}
    </Container>
  );
};

export default withRouter(ViewProfile);
