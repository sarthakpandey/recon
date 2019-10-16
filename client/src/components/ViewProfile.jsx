import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Card,
  Button,
  message,
  Icon,
  Badge,
  Tag,
  Divider,
  Collapse
} from "antd";
import Container from "./Elements/Container";
import {
  getProfileByUserId,
  sendFollowRequest,
  checkFriend,
  cancelRequest
} from "../actions";

const ViewProfile = props => {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(null);
  const id = props.match.params.userId || props.id;

  const currentUser = id === props.user._id ? true : false;

  useEffect(() => {
    const fetchData = async () => {
      let response = await getProfileByUserId(id);
      setProfile(response.data);
      if (!currentUser) {
        response = await checkFriend(id);
        let status = null;
        if (response.data.friend) {
          status = "friend";
        } else if (response.data.sent) {
          status = "sent";
        }
        if (status) {
          setStatus(status);
        }
      }
    };
    fetchData();
  }, [id, currentUser]);

  const onFollowClick = async () => {
    try {
      await sendFollowRequest(id);
      message.success("Request sent successfully");
      setStatus("sent");
    } catch (err) {
      message.error("Could not send request. Please try again");
    }
  };

  const onCancelClick = async () => {
    try {
      await cancelRequest(id);
      message.success("Request cancelled successfully");
      setStatus(null);
    } catch (err) {
      message.error("Could not cancel request. Please try again");
    }
  };

  const onUnfollowClick = () => {
    message.warning("Once a friend, always a friend");
  };

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
              <Row type="flex" justify="space-between">
                <Col span={16}>
                  <Typography.Title>{profile.user.name}</Typography.Title>
                </Col>
                <Col span={6}>
                  {!currentUser && !status ? (
                    <Button
                      size="large"
                      type="primary"
                      shape="round"
                      style={{ width: "100%" }}
                      onClick={onFollowClick}
                    >
                      Follow
                    </Button>
                  ) : null}
                  {!currentUser && status ? (
                    <Button
                      size="large"
                      type="primary"
                      shape="round"
                      style={{ width: "100%" }}
                      onClick={
                        status === "sent" ? onCancelClick : onUnfollowClick
                      }
                    >
                      {status === "sent" ? "Pending" : "Following"}
                    </Button>
                  ) : null}
                </Col>
              </Row>
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
                      {profile.skills.map((skill, idx) => (
                        <Tag
                          color="blue"
                          style={{
                            fontSize: 16,
                            padding: 7,
                            borderRadius: 25
                          }}
                          key={idx}
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
              <Collapse defaultActiveKey={[1, 2, 3]}>
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
                    <Card key={i}>
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
                <Collapse.Panel
                  key="3"
                  header={<div>Work Experience Details</div>}
                >
                  {profile.experience.map((experience, i) => (
                    <Card key={i}>
                      <div>
                        <Badge
                          status="processing"
                          text={
                            <span style={{ fontSize: 16 }}>
                              <span style={{ fontWeight: "bold" }}>
                                Company:{" "}
                              </span>
                              <span>{experience.company}</span>
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
                                Title:{" "}
                              </span>
                              <span>{experience.title}</span>
                            </span>
                          }
                        />
                      </div>
                    </Card>
                  ))}
                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
};

export default withRouter(ViewProfile);
