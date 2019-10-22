import React from "react";
import { Card, Typography, Button } from "antd";
import { withRouter } from "react-router-dom";

const Banner = props => {
  return (
    <>
      <Card
        style={{
          margin: "20px 20px",
          height: "100%",
          backgroundColor: "#414141",
          color: "white",
          borderRadius: 10,
          boxShadow: "15px 15px 5px 0px rgba(0,0,0,0.75)",
          zIndex: 2
        }}
        bordered={false}
      >
        <p
          style={{
            fontSize: 52,
            fontFamily: "Rubik",
            fontWeight: "lighter",
            letterSpacing: ".2rem",
            marginBottom: 10
          }}
        >
          RECON
        </p>
        <p
          style={{
            fontFamily: "Rubik",
            letterSpacing: ".1rem",
            fontSize: 28,
            marginBottom: 10
          }}
          level={3}
        >
          Connecting students
        </p>
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
