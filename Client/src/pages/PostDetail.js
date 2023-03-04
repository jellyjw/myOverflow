import { FiArrowLeft } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { IoChatbubbleOutline } from "react-icons/io5";
import { GoDiffIgnored } from "react-icons/go";
import Buttons from "../components/Post/Buttons";
import { Link, useLocation } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as dayjs from "dayjs";
import { getUser } from "../util/data";
import { useRecoilState } from "recoil";
import { loginState } from "../store";

export function PostDetail() {
  const [answerData, setAnswerData] = useState([]);
  const [userAnswerInput, setUserAnswerInput] = useState("");
  const [editAnswerInput, setEditAnswerInput] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [editId, setEditId] = useState();
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const { data } = useLocation().state;
  const { category, content, createdAt, nickname, likeCount, title, questionId, memberId } = data;

  function getAnswerData() {
    return axios.get(`http://13.209.121.17:8080/answers?questionId=${questionId}`).then(res => res.data.data);
  }

  useEffect(() => {
    getAnswerData().then(res => setAnswerData(res));
    const r = getUser();
    setIsLogin(r?.memberId === 1);
  }, []);

  const editAnswer = (id, content) => {
    setEditAnswerInput(content);
    setEditId(id);
  };

  const handleSubmit = e => {
    const baseUrl = "http://13.209.121.17:8080/answers";
    const newAnswer = {
      memberId: 1,
      questionId,
      content: userAnswerInput,
    };
    axios.post(baseUrl, newAnswer);

    e.preventDefault();
    alert("답변이 등록되었어요.");
    getAnswerData().then(res => setAnswerData(res));
    setUserAnswerInput("");
  };

  const handleCancelButtonClick = () => {
    setEditId(undefined);
  };

  const handleDeleteAnswerButtonClick = answerId => {
    const isConfirm = window.confirm("답변을 삭제하시겠어요?");
    if (isConfirm) {
      deleteAnswer(answerId);
    }
    getAnswerData().then(res => setAnswerData(res));
  };

  const handleUpdateAnswerButtonClick = answerId => {
    editAnswer(answerId, editAnswerInput);
    updateAnswer(answerId);
    getAnswerData().then(res => setAnswerData(res));
    if (editId) {
      setEditId(undefined);
    }
    getAnswerData().then(res => setAnswerData(res));
  };

  // console.log(answerData[0].answerId);
  // console.log(answerData[0].answerId);
  const updateAnswer = answerId => {
    const updateAnswer = {
      memberId,
      content: editAnswerInput,
    };
    axios.patch(`http://13.209.121.17:8080/answers/${answerId}`, updateAnswer);
  };

  const deleteAnswer = answerId => {
    axios.delete(`http://13.209.121.17:8080/answers/${answerId}`);
    alert("답변이 삭제되었어요.");
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-screen-2xl w-[70vw] m-auto">
      <main className="w-[60vw] overflow-auto">
        <Link to="/">
          <FiArrowLeft size={40} />
        </Link>
        <h1 className="text-[45px] font-bold mb-5 mt-5">{title}</h1>
        <section className="flex items-center mb-5">
          <VscAccount size={38} />
          <span className="text-[20px] font-bold border-solid border-r-4 pr-5 ml-5">{nickname || "jangjiwoo"}</span>
          <span className="text-[20px] pl-5 text-gray-500">{createdAt && dayjs(createdAt).format("YYYY-MM-DD")}</span>
          {category?.map((el, i) => (
            <span key={i} className="text-[20px] ml-[30px]">
              {el}
            </span>
          ))}
          <div className="ml-auto">
            {isLogin ? (
              <>
                <span className="mr-3">본문 수정</span>
                <span className="mr-3">삭제</span>
              </>
            ) : null}
          </div>
        </section>
        <div className="w-[60vw] border-solid border-[2px] mb-[20px]" />
        <article className="text-xl h-auto pt-[20px] pb-[20px] leading-10">{content}</article>
        <div className="mt-5">
          <div className="w-[60vw] border-solid border-[2px] mb-[20px]" />
          <div>
            <section className="text-[20px] flex items-center">
              <div className="flex items-center cursor-pointer mr-3" onClick={() => setIsLike(!isLike)}>
                {isLike ? <FcLike size={30} /> : <FcLikePlaceholder size={30} />}
              </div>
              <IoChatbubbleOutline size={26} />
              <span className="ml-2">
                {answerData ? `${answerData.length}개의 답변이 있습니다.` : "답변 대기중입니다."}
              </span>
            </section>
            <div className="h-auto pt-[30px] pb-[30px]">
              {answerData &&
                answerData.map((el, i) => {
                  const { answerId, content, createdAt, memberId, nickname } = el;
                  // console.log(memberId);
                  return (
                    <div className="mb-5" key={i}>
                      <div className="flex items-center mb-2">
                        <span>
                          <VscAccount size={38} />
                        </span>
                        <div className="flex flex-col">
                          <span className="ml-3 font-extrabold text-[15px]">{nickname}</span>
                          <span className="ml-3 text-[12px] text-gray-500">
                            {dayjs(createdAt).format("YYYY-MM-DD")}
                          </span>
                        </div>
                        <div className="ml-auto">
                          {(isLogin && (
                            <>
                              <span
                                className="mr-2 cursor-pointer"
                                onClick={() => handleUpdateAnswerButtonClick(answerId)}
                              >
                                {answerId === editId ? "등록" : "수정"}
                              </span>
                              {console.log(answerId)}
                              <span
                                className="mr-2 cursor-pointer"
                                onClick={
                                  answerId === editId
                                    ? handleCancelButtonClick
                                    : () => handleDeleteAnswerButtonClick(answerId)
                                }
                              >
                                {answerId === editId ? "취소" : "삭제"}
                              </span>
                            </>
                          )) ||
                            null}
                        </div>
                      </div>
                      {answerId === editId ? (
                        <TextField
                          multiline
                          onChange={e => setEditAnswerInput(e.target.value)}
                          value={editAnswerInput}
                        />
                      ) : (
                        <pre>{content}</pre>
                      )}
                      <div className="flex items-center cursor-pointer" onClick={() => setIsLike(!isLike)}>
                        {/* {isLike ? <FcLike size={26} /> : <FcLikePlaceholder size={26} />} */}
                        {/* <span className="ml-1 text-[12px]">{answerLike.memberId.length}</span> */}
                      </div>
                      <div className="w-[60vw] border-solid border-[1px] border-gray mt-5" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="mb-[70px] mt-5">
          <section className="flex">
            <GoDiffIgnored size={26} />
            <span className="text-[20px] ml-2 mb-3">답변하기</span>
          </section>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{
                width: "60vw",
                "& .MuiInputBase-root": {
                  height: 200,
                },
              }}
              value={userAnswerInput}
              rows={7}
              multiline
              placeholder="질문에 답변을 등록해보세요."
              onChange={e => setUserAnswerInput(e.target.value)}
            />
            <div className="flex justify-end mb-[40px] mt-5">
              <Buttons
                sx={{ width: 140, fontSize: 18, border: "0.5px solid gray", color: "black" }}
                text="등록"
                color="black"
                className="justify-end"
                type="submit"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
