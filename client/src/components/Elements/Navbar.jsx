import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Input, Button, Form, message, Icon } from "antd";
import { loginUser, logoutUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";

const Navbar = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
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
        await dispatch(loginUser(formProps, props.history));
        message.success("Logged in");
        props.history.push("/dashboard");
      }
    });
  };

  const onLogout = async () => {
    await dispatch(logoutUser());
    setLoggedIn(false);
  };

  const onUserClick = () => {
    props.history.push(`/profile/${user._id}`);
  };

  const { getFieldDecorator } = props.form;
  return (
    <Layout.Header style={{ backgroundColor: "#313131" }}>
      <Row type="flex">
        <Col span={3}>
          <h1 style={{ color: "white" }}>
            <Link to="/dashboard">RECON</Link>
          </h1>
        </Col>

        {loggedIn ? (
          <Col span={21}>
            <Row>
              <Col span={14}>
                <NavbarMenu history={props.history} />
              </Col>
              <Col span={10}>
                <div style={{ textAlign: "right", color: "white" }}>
                  <span onClick={onUserClick} style={{ cursor: "pointer" }}>
                    <span style={{ marginRight: 10, fontSize: 16 }}>
                      <Icon type="user" />
                    </span>
                    <span style={{ marginRight: 10 }}>
                      {user ? user.name : null}
                    </span>
                  </span>

                  <Button icon="logout" type="primary" onClick={onLogout}>
                    Logout
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        ) : (
          <Col span={21}>
            <Form layout="inline" onSubmit={onLogin}>
              <Row
                type="flex"
                justify="end"
                gutter={12}
                style={{ marginBottom: 10 }}
              >
                <Col>
                  <Form.Item
                    style={{ marginRight: 0, marginTop: 10, marginBottom: 10 }}
                  >
                    {getFieldDecorator("email", {
                      rules: [{ required: true, message: "Email is required" }]
                    })(<Input placeholder="Email" type="email" />)}
                  </Form.Item>
                </Col>
                <Col>
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
                <Col style={{ textAlign: "right" }}>
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
