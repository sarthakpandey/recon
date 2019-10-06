import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Input, Button, Form, message, Icon } from "antd";
import { loginUser, logoutUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
const Navbar = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    console.log("call");
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  const onLogin = e => {
    e.preventDefault();
    props.form.validateFields(async (err, formProps) => {
      if (!err) {
        await dispatch(loginUser(formProps));
        message.success("Logged in");
        props.history.push("/dashboard");
      }
    });
  };

  const onLogout = async () => {
    await dispatch(logoutUser());
    setLoggedIn(false);
    console.log(user);
  };

  const { getFieldDecorator } = props.form;
  return (
    <Layout.Header>
      <Row type="flex">
        <Col span={14}>
          <h1 style={{ color: "white" }}>RECON</h1>
        </Col>
        {loggedIn ? (
          <Col span={10}>
            <div style={{ textAlign: "right", color: "white" }}>
              <span style={{ marginRight: 10, fontSize: 16 }}>
                <Icon type="user" />
              </span>
              <span style={{ marginRight: 10 }}>{user ? user.name : null}</span>
              <Button icon="logout" type="primary" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </Col>
        ) : (
          <Col span={9}>
            <Form layout="inline" onSubmit={onLogin}>
              <Row
                type="flex"
                justify="end"
                gutter={12}
                style={{ marginBottom: 10 }}
              >
                <Col span={9}>
                  <Form.Item
                    style={{ marginRight: 0, marginTop: 10, marginBottom: 10 }}
                  >
                    {getFieldDecorator("email", {
                      rules: [{ required: true, message: "Email is required" }]
                    })(<Input placeholder="Email" type="email" />)}
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item
                    style={{ marginRight: 0, marginTop: 10, marginBottom: 10 }}
                  >
                    {getFieldDecorator("password", {
                      rules: [
                        { required: true, message: "Password is required" }
                      ]
                    })(<Input.Password placeholder="Password" />)}
                  </Form.Item>
                </Col>
                <Col span={2} style={{ textAlign: "right" }}>
                  <Form.Item
                    style={{ marginRight: 0, marginTop: 10, marginBottom: 10 }}
                  >
                    <Button htmlType="submit" type="primary">
                      Login
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
      </Row>
    </Layout.Header>
  );
};

export default withRouter(Form.create()(Navbar));
