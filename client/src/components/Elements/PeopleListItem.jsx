import React from "react";
import { Card, Row, Col, Icon, Typography, Avatar, Button } from "antd";
import { withRouter } from "react-router-dom";

const PeopleListItem = ({ user, history, bText }) => {
  const onItemClick = () => {
    return history.push(`/profile/${user.user}`);
  };

  return (
    <Card style={{ width: "100%" }}>
      <Row type="flex" align="middle">
        <Col
          span={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={onItemClick}
          style={{ cursor: "pointer" }}
        >
          <Icon type="user" style={{ fontSize: 24 }} />
        </Col>
        <Col span={20}>
          <Row type="flex" justify="space-between">
            <Col span={10} onClick={onItemClick} style={{ cursor: "pointer" }}>
              <Typography.Title style={{ fontSize: 24 }}>
                {user.name}
              </Typography.Title>
            </Col>
            <Row type="flex" gutter={10}>
              {bText.first ? (
                <Col span={12}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => bText.firstOnClick(user._id)}
                  >
                    {bText.first}
                  </Button>
                </Col>
              ) : null}
              {bText.second ? (
                <Col span={12}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => bText.secondOnClick(user._id)}
                  >
                    {bText.second}
                  </Button>
                </Col>
              ) : null}
            </Row>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default withRouter(PeopleListItem);
