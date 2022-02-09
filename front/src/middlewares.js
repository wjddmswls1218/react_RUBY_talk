import { Route } from "react-router-dom";

export const loginCheck = () => {
  //localStorage

  const isLoggedIn = localStorage.getItem("ruby_login");
  return isLoggedIn || false;
};
