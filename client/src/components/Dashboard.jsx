import React, { useState } from "react";
import Container from "./Elements/Container";
import { Card, Button, Row, Col, Modal } from "antd";
import AddExperience from "./AddExperience";
import AddEducation from "./AddEducation";
import ViewProfile from "./ViewProfile";
import CreatePost from "./CreatePost";

const Dashboard = ({ user }) => {
  const [modal, setModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
            <Col span={14}>
              <Button type="primary" size="large" onClick={onCreateClick}>
                Create Post
              </Button>
            </Col>
            <Col span={5}>
              <div style={{ width: "100%" }}>
                <Button type="primary" size="large" onClick={onExperienceClick}>
                  Add Work Experience
                </Button>
              </div>
            </Col>
            <Col span={5}>
              <div style={{ width: "100%" }}>
                <Button type="primary" size="large" onClick={onEducationClick}>
                  Add Education
                </Button>
              </div>
            </Col>
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
            <CreatePost onCloseModal={onModalClose} />
          ) : (
            <AddEducation />
          )}
        </Modal>
      </Container>
      <ViewProfile id={user._id} />
    </div>
  );
};

export default Dashboard;
