import React, { useEffect } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import MsgBox from "./components/MsgBox";

const Message = () => {
  const navigate = useNavigate;
  useEffect(() => {
    const loginFlag = loginCheck();

    console.log(loginFlag);

    if (!loginFlag) {
      // 메인화면으로
      navigate("/");
    }
  }, []);
  return (
    <div>
      <TopNav title="Message" desc="메세지를 확인 할 수 있습니다" />

      <MsgBox isSend={true} />
      <MsgBox isSend={false} />
      <MsgBox isSend={true} />
    </div>
  );
};

export default Message;
