import React, { useState } from "react";
import Container from "./Elements/Container";
import { Card, Button, Row, Col, Modal } from "antd";
import AddExperience from "./AddExperience";

const Dashboard = () => {
  const [modal, setModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onModalClose = () => {
    setShowModal(false);
  };

  const onExperienceClick = () => {
    setModal("experience");
    setShowModal(true);
  };

  return (
    <Container>
      <Card>
        <Row type="flex" justify="end" gutter={48}>
          <Col span={5}>
            <Button type="primary" size="large" onClick={onExperienceClick}>
              Add Work Experience
            </Button>
          </Col>
          <Col span={5}>
            <Button type="primary" size="large">
              Add Education
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        onCancel={onModalClose}
        closable
        visible={showModal}
        title="Add Work Experience"
      >
        {modal === "experience" ? <AddExperience /> : <Dashboard />}
      </Modal>
    </Container>
  );
};

export default Dashboard;
