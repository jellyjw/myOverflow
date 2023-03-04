import React  from "react";
import { logout } from '../../util/data';
import { useNavigate } from "react-router-dom";
export default function MyPageDropDown({onClick,user,onToggle}) {
  const navigate = useNavigate();
  const handleLoginClick = () =>{
    //실제데이터들어올때 한번더 검증하는 if문 붙일지말지 고민쓰
    onClick()
  }
  const handleLogoutClick = () =>{
    onToggle(prev=>!prev)
    logout()
  }
  // console.log(user);
  return (
    <ul className="absolute top-full right-[-25px] mt-8 z-10 group-hover:scale-105
    bg-white p-1 text-lg w-36 flex flex-col justify-center gap-4 items-center">
      <li className='cursor-pointer'>내작성글</li>
      <li onClick={() => navigate("/setting")} className="cursor-pointer">
        설정
      </li>
      {user ?
      <li
       onClick={handleLogoutClick}
       className='cursor-pointer'
       >로그아웃
       </li>:
       <li
       onClick={handleLoginClick}
       className='cursor-pointer'
       >로그인
       </li>}
    </ul>
  );
}
