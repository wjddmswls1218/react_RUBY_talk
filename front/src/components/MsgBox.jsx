import react, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Fade from "react-reveal/Fade";

const Wrapper = styled.div`
  width: 100%;
  height: 75px;

  border-bottom: 1px solid #b2b2b2;

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSend ? "flex-end" : "flex-start")};
  justify-content: flex-start;

  padding: 5px;
`;

const TopMsg = styled.div`
  font-weight: 700;
  color: ${(props) => (props.isSend ? "#778beb" : "#546de5")};
`;

const Content = styled.p`
  font-size: 12px;
  color: #666;
  padding: 5px;
`;

const MsgBox = ({
  id,
  isSend,
  content,
  isRead,
  createdAt,
  who,
  whoName,
  whom,
  whomName,
}) => {
  const [contentModal, setContentModal] = useState(false);

  const modalToggle = () => {
    setContentModal(!contentModal);
  };

  if (isSend) {
    return (
      <Fade right>
        <Wrapper isSend={isSend} onClick={() => modalToggle()}>
          <TopMsg isSend={isSend}>보낸메세지({whomName})</TopMsg>
          <Content>{content}</Content>

          <Modal
            title="쪽지함 내용"
            visible={contentModal}
            footer={null}
            onClick={() => modalToggle()}
          >
            <p>{content}</p>
          </Modal>
        </Wrapper>
      </Fade>
    );
  } else {
    return (
      <Fade left>
        <Wrapper isSend={isSend} onClick={() => modalToggle()}>
          <TopMsg isSend={isSend}>받은메세지({whoName})</TopMsg>
          <Content>{content}</Content>

          <Modal
            title="쪽지함 내용"
            visible={contentModal}
            footer={null}
            onClick={() => modalToggle()}
          >
            <p>{content}</p>
          </Modal>
        </Wrapper>
      </Fade>
    );
  }
};

export default MsgBox;
