import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import MsgBox from "./components/MsgBox";
import axios from "axios";

const Message = () => {
  const navigate = useNavigate;
  const [message, setMessage] = useState([]);

  const getMyMesaage = async () => {
    const list = await axios.post(
      "http://localhost:4000/api/message/getMessage",
      {
        myId: localStorage.getItem("ruby_user_id"),
      }
    );

    setMessage(list.data);
  };

  useEffect(() => {
    const loginFlag = loginCheck();

    console.log(loginFlag);

    if (!loginFlag) {
      // 메인화면으로
      navigate("/");
    }
    getMyMesaage();
  }, []);
  return (
    <div>
      <TopNav title="Message" desc="메세지를 확인 할 수 있습니다" />

      {message.map((m) => {
        return (
          <MsgBox
            key={m.id}
            id={m.id}
            isSend={
              parseInt(m.who) === parseInt(localStorage.getItem("ruby_user_id"))
            }
            content={m.content}
            isRead={m.isRead}
            createdAt={m.createdAt}
            who={m.who}
            whoName={m.whoName}
            whom={m.whom}
            whomName={m.whomName}
          />
        );
      })}
    </div>
  );
};

export default Message;
