import React from "react";
import { Card, Row, Col, Icon, Typography, Avatar } from "antd";
import { withRouter } from "react-router-dom";

const PeopleListItem = ({ user, history }) => {
  const onItemClick = () => {
    return history.push(`/profile/${user.user}`);
  };

  return (
    <Card onClick={onItemClick}>
      <Row gutter={48}>
        <Col span={4} style={{ height: "100%" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar icon="user" size={48} />
          </div>
        </Col>
        <Col span={20} style={{ minHeight: "100%" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Typography.Text style={{ fontSize: 28 }}>
              {user.name}
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default withRouter(PeopleListItem);
