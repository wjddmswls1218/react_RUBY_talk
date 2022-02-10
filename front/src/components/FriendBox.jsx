import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Image, Modal, Input, message } from "antd";
import axios from "axios";

const Box = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #999;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.div`
  width: ${(props) => {
    return props.width;
  }};
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled(Image)`
  width: 35px;
  height: 35px;

  border-radius: 100%;
  margin-right: 10px;
`;

const ProfileName = styled.span`
  font-weight: 700;
`;

const SendTextArea = styled(Input.TextArea)`
  width: 100%;
  resize: none;
`;

const FriendBox = ({ id, name, avatar, status }) => {
  const [sendModal, setSendModal] = useState(false);
  const [sendContent, setSendContent] = useState("");

  const contentOnChange = useCallback(
    (event) => {
      setSendContent(event.target.value);
    },
    [sendContent]
  );
  //
  const sendOpen = (pk) => {
    setSendModal(true);
  };

  const sendClose = () => {
    setSendModal(false);
  };

  // DATA Selection
  // 현재 나의 아이디
  // 누구한테 보낼지, 메세지를 받을 사람의 아이디
  // 뭐라고 보낼지
  //

  const sendMesssgeAction = useCallback(async () => {
    const callResult = await axios.post(
      "http://localhost:4000/api/message/sendMessage",
      {
        who: localStorage.getItem("ruby_user_id"),
        whom: id,
        content: sendContent,
      }
    );

    if (callResult.data === "성공") {
      message.success("메세지가 전송되었습니다.");
    } else {
      message.success("메세지 전송에 실패하셨습니다.");
    }

    sendClose();
    setSendContent("");
  }, [sendContent]);

  return (
    <Box>
      <InnerBox width="25%">
        <ProfileImage src={avatar} />
        <ProfileName onClick={() => sendOpen(4)}>{name}</ProfileName>
      </InnerBox>

      <InnerBox width="75%">
        <span>{status}</span>
      </InnerBox>

      <Modal
        title="메세지 보내기"
        visible={sendModal}
        onCancel={() => sendClose()}
        onOk={sendMesssgeAction}
      >
        <SendTextArea
          allowClear={true}
          rows={10}
          value={sendContent}
          onChange={contentOnChange}
        />
      </Modal>
    </Box>
  );
};

export default FriendBox;
