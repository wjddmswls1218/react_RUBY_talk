import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import FriendBox from "./components/FriendBox";
import axios from "axios";

const Friend = () => {
  const [fList, setFlist] = useState([]);

  const navigate = useNavigate;

  const friendList = async (me) => {
    const list = await axios.post(
      "http://localhost:4000/api/user/friend/list",
      { me }
    );

    setFlist(list.data);
    console.log(me);
  };

  useEffect(() => {
    const loginFlag = loginCheck();

    console.log(loginFlag);

    if (!loginFlag) {
      navigate("/");
    }

    const me = localStorage.getItem("ruby_user_id");

    friendList(me);
  }, []);
  return (
    <div>
      <TopNav title="Friend" desc="친구 목록을 확인 할 수 있습니다" />

      {fList.map((f) => (
        <FriendBox
          key={f.id}
          id={f.id}
          name={f.nickname}
          avatar={f.avatar}
          status={f.statusMsg}
        />
      ))}
    </div>
  );
};

export default Friend;
