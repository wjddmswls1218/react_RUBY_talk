import styled from "styled-components";
import {
  TeamOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Nav = styled.div`
  width: 100%;
  height: 70px;

  background-color: #3b2dff;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const NavTitle = styled.h3`
  font-size: 20px;
  color: #fff;
`;
const NavDesc = styled.span`
  font-size: 14px;
  margin-top: 5px;
  color: #fff;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopNav = ({ title, desc }) => {
  const iconStyle = {
    fontSize: 19,
    color: "#fff",
    marginTop: 4,
    marginRight: 5,
  };
  return (
    <Nav>
      <NavWrapper>
        {title === "Friend" && <TeamOutlined style={iconStyle} />}
        {title === "Message" && <MessageOutlined style={iconStyle} />}
        {title === "Profile" && <UserOutlined style={iconStyle} />}
        {title === "Setting" && <SettingOutlined style={iconStyle} />}

        <NavTitle>{title}</NavTitle>
      </NavWrapper>
      <NavDesc>{desc}</NavDesc>
    </Nav>
  );
};

export default TopNav;
