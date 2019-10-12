import React from "react";
import { Menu } from "antd";

const NavbarMenu = ({ history }) => {
  console.log(history.location.pathname);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px" }}
      selectedKeys={[history.location.pathname.split("/")[1]]}
    >
      <Menu.Item
        onClick={() => {
          history.push("/dashboard");
        }}
        key="dashboard"
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push("/users");
        }}
        key="users"
      >
        Users
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push("/connections");
        }}
        key="connections"
      >
        Manage Connections
      </Menu.Item>
    </Menu>
  );
};

export default NavbarMenu;
