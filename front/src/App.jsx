import React from "react";
import styled from "styled-components";
import BottomNav from "./BottomNav";
import { Routes, Route } from "react-router-dom";
import Friend from "./Friend";
import Message from "./Message";
import Profile from "./Profile";
import Setting from "./Setting";
import Login from "./Login";

const ContentWrapper = styled.section`
  width: 100%;
  height: calc(100vh - 60px);

  overflow: scroll;
`;

const NavWrapper = styled.section`
  width: 100%;
  height: 60px;
`;

class App extends React.Component {
  render() {
    return (
      <>
        <Routes>
          <Route exaxt path="/" element={<Login />} />
        </Routes>
        <ContentWrapper>
          <Routes>
            <Route exaxt path="/friend" element={<Friend />} />
            <Route exaxt path="/message" element={<Message />} />
            <Route exaxt path="/profile" element={<Profile />} />
            <Route exaxt path="/setting" element={<Setting />} />
          </Routes>
        </ContentWrapper>

        <NavWrapper>
          <Routes>
            <Route exaxt path="/friend" element={<BottomNav />} />
            <Route exaxt path="/message" element={<BottomNav />} />
            <Route exaxt path="/profile" element={<BottomNav />} />
            <Route exaxt path="/setting" element={<BottomNav />} />
          </Routes>
        </NavWrapper>
      </>
    );
  }
}

export default App;
