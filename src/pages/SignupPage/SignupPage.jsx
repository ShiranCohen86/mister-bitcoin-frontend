import { useEffect } from "react";
import { useState } from "react";
import { Login } from "../../cmps/Login/Login";
import { SignUp } from "../../cmps/SignUp/SignUp";

export const SignupPage = (props) => {
  const [view, setView] = useState("Login");

  useEffect(() => {
    const { pathname } = props.history.location;
    if (pathname === "/signup/login") {
      setView("Login");
    } else {
      setView("SignUp");
    }
  }, [props.history.location]);

  const dynamicMap = {
    SignUp,
    Login,
  };

  const DynamicCmp = dynamicMap[view];

  return (
    <div className="signup-page">
      <DynamicCmp />
    </div>
  );
};
