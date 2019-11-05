import React, { useState } from "react";
import Container from "./Elements/Container";
import { Card, Button, Row, Col, Modal, Tabs } from "antd";
import AddExperience from "./AddExperience";
import AddEducation from "./AddEducation";
import ViewProfile from "./ViewProfile";
import CreatePost from "./CreatePost";
import PostsList from "./Elements/PostsList";

const Dashboard = ({ user }) => {
  const [modal, setModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const onModalClose = () => {
    setShowModal(false);
  };

  const onExperienceClick = () => {
    setModal("experience");
    setShowModal(true);
  };

  const onEducationClick = () => {
    setModal("education");
    setShowModal(true);
  };

  const onCreateClick = () => {
    setModal("create");
    setShowModal(true);
  };

  return (
    <div className="dashboard">
      <Container>
        <Card>
          <Row gutter={48}>
            <Col span={12}>
              <Button type="primary" size="large" onClick={onCreateClick}>
                Create Post
              </Button>
            </Col>
            <Col span={6}>
              <div style={{ width: "100%" }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  onClick={onExperienceClick}
                >
                  Add Work Experience
                </Button>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ width: "100%" }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  onClick={onEducationClick}
                >
                  Add Education
                </Button>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Tabs>
              <Tabs.TabPane key="conn" tab="Posts from connections">
                <PostsList
                  type="conn"
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="all" tab="All posts">
                <PostsList
                  type="all"
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </Tabs.TabPane>
            </Tabs>
          </Row>
        </Card>

        <Modal
          onCancel={onModalClose}
          closable
          destroyOnClose
          visible={showModal}
          footer={null}
          title={
            modal === "experience"
              ? "Add Work Experience"
              : modal === "create"
              ? "Create A Post"
              : "Add Education Details"
          }
        >
          {modal === "experience" ? (
            <AddExperience />
          ) : modal === "create" ? (
            <CreatePost onCloseModal={onModalClose} setRefresh={setRefresh} />
          ) : (
            <AddEducation />
          )}
        </Modal>
      </Container>
    </div>
  );
};

export default Dashboard;
