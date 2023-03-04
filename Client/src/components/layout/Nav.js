import React, { useEffect, useRef, useState } from "react";
import { RxBell } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import MyPageDropDown from "../Home/MyPageDropDown";
import Modal from "../Home/Modal";
import SignIn from "../SignIn/SignIn";
import ModalBackGround from "../ui/ModalBackGround";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../util/data";
import SignUp from "../SignUp/SignUp";
export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [user, setUser] = useState();
  const [memberId, setMemberId] = useState();
  const userMenu = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    setUser(getUser(memberId));
  }, [isOpen, toggle]);

  const handleModal = () => {
    setIsOpen(!isOpen);
    setToggle(!toggle);
  };

  const handleCloseModal = e => {
    if (userMenu.current === e.target) setIsOpen(!isOpen);
  };

  const handlePost = () => {
    navigate("/post", { state: { user } });
  };
  return (
    <div className="m-10">
      {isOpen && (
        <ModalBackGround onClose={handleCloseModal} userRef={userMenu}>
          <Modal
            children={
              change === false ? (
                <SignIn onClose={setIsOpen} onChange={setChange} onMemberId={setMemberId} />
              ) : (
                <SignUp onClose={setIsOpen} onChange={setChange} />
              )
            }
            onClose={setIsOpen}
          />
        </ModalBackGround>
      )}
      <nav
        className={`flex justify-between max-w-screen-2xl w-[90vw] h-0
                 m-auto p-3 relative items-center ${isOpen && "bg-fixed"}`}
      >
        <div className="flex">
          <Link to="/" className="cursor-pointer">
            <img src="/images/logo-icon2.png" alt="logo-icon" className="w-[45px] inline-block" />
            <img src={"/images/logo.png"} alt="logo" className="w-[180px] inline-block" />
          </Link>
        </div>
        <div className="flex gap-7 text-2xl">
          {user && (
            <Button className="text-2xl cursor-pointer" onClick={handlePost} size="large">
              새 글쓰기
            </Button>
          )}
          <button className="hover:animate-spin-slow text-3xl">
            <RxBell />
          </button>
          <button
            className="hover:scale-110 ease-in duration-200"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <FaRegUserCircle />
          </button>
          {toggle && <MyPageDropDown onClick={handleModal} user={user} onToggle={setToggle} />}
        </div>
      </nav>
    </div>
  );
}
