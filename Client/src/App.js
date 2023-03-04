import Nav from "./components/layout/Nav";
import { Outlet } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Nav />
        <Outlet />
      </RecoilRoot>
    </>
  );
}

export default App;
