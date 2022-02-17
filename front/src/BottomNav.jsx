import React from "react";
import styled from "styled-components";
import {
  TeamOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;

  border-top: 1px solid #999;
  border-radius: 10px;

  box-shadow: -3px 0px 10px #999;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BottomNav = () => {
  return (
    <Wrapper>
      <NavLink to="/friend">
        <TeamOutlined style={{ fontSize: 22 }} />
      </NavLink>

      <NavLink to="/message">
        <MessageOutlined style={{ fontSize: 22 }} />
      </NavLink>

      <NavLink to="/profile">
        <UserOutlined style={{ fontSize: 22 }} />
      </NavLink>

      <NavLink to="/setting">
        <SettingOutlined style={{ fontSize: 22 }} />
      </NavLink>
    </Wrapper>
  );
};

export default BottomNav;
