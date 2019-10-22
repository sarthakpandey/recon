import React from "react";
import { Card, Typography, Button } from "antd";
import { withRouter } from "react-router-dom";

const Banner = props => {
  return (
    <>
      <Card
        style={{
          margin: "20px 20px",
          height: "400px",
          backgroundColor: "#303F9F"
        }}
        bordered={false}
      >
        <h1
          style={{
            color: "white",
            fontWeight: "100",
            fontSize: 36,
            fontFamily: "Rubik",
            letterSpacing: ".2rem"
          }}
        >
          RECON
        </h1>
        <Typography.Title style={{ color: "white" }} level={3}>
          Connecting students
        </Typography.Title>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 20 }}
          onClick={() => props.history.push("/register")}
        >
          Register Now
        </Button>
      </Card>
    </>
  );
};

export default withRouter(Banner);
