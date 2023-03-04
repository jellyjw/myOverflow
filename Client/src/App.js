import Nav from "./components/layout/Nav";
import { Outlet } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { loginState } from "./store";
import Auth from "./Auth";

function App() {
  return (
    <>
      <RecoilRoot>
        <Auth>
          <Nav />
          <Outlet />
        </Auth>
      </RecoilRoot>
    </>
  );
}

export default App;
