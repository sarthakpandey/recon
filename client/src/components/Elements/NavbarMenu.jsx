import React from "react";
import { Menu } from "antd";

const NavbarMenu = ({ history }) => {
  return (
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
      <Menu.Item onClick={() => history.push("/dashboard")}>
        Dashboard
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/users")}>Users</Menu.Item>
    </Menu>
  );
};

export default NavbarMenu;
