import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Stack from "./Stack";
import * as dayjs from "dayjs";
export default function Card({ data }) {
  const navigate = useNavigate();
  const { answerCount, category, content, createdAt, likeCount, title, nickname, questionId } = data;
  const handleClick = () => {
    navigate(`/postdetail/${questionId}`, { state: { data } });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
  };
  return (
    <li
      onClick={handleClick}
      className="border-4 shadow-md border-gray-300 rounded-3xl cursor-pointer 
                    hover:scale-105 duration-300 w-[21rem] h-[24rem] p-9 flex flex-col justify-between m-5"
    >
      <div className="flex flex-col justify-center items-start gap-3 text-darkMode">
        <div className="opacity-50 mb-3 text-sm mt-3 ">등록날짜 | {dayjs(createdAt).format("YYYY-MM-DD")}</div>
        <div className=" font-semibold">{title}</div>
        {/* 카드 예외처리 (subNav.js에서의 string과 서버데이터로 받아오는 array 값을 처리하기 위함) */}
        <div className='flex'>
          {Array.isArray(category) ?
           category.map((stack,idx)=><Stack key={idx} stack={stack} />) :
           <Stack stack={category} />}
           {category.length === 0 && <div className='h-[2rem]'></div>}
        </div>
        <div className="line-clamp-2 text-sm text">{content}</div>
      </div>
      <div className="flex justify-between mb-0.5">
        <div className="font-semibold">{nickname}</div>
        <div className="flex gap-1">
          <div className="flex gap-1">
            <AiOutlineHeart />
            {likeCount}
          </div>
          <div className="flex gap-1">
            <AiOutlineComment />
            {answerCount}
          </div>
        </div>
      </div>
    </li>
  );
}
