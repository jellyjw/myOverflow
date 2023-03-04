import React from "react";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { loginState } from "./store";

const Auth = props => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  useEffect(() => {
    const localLoginInfo = localStorage.getItem("login");
    if (localLoginInfo !== null) {
      const parsed = JSON.parse(localLoginInfo);
      setLoginInfo({
        login: true,
        memberId: parsed.memberId,
      });
    }
  }, []);

  return <>{props.children}</>;
};

export default Auth;
