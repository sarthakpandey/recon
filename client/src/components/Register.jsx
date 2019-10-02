import React from "react";
import Navbar from "./Elements/Navbar";
import { Card } from "antd";

const Register = () => {
  return (
    <>
      <Navbar />
      <Card
        title={<h1>Register now</h1>}
        style={{ margin: "20px 20px", borderRadius: 25 }}
        headStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          fontWeight: 700
        }}
        type="inner"
      >
        form
      </Card>
    </>
  );
};

export default Register;
