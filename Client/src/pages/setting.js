import Buttons from "../components/Post/Buttons";
import DropDown from "../components/Post/DropDown";
import { VscAccount } from "react-icons/vsc";
import { GoThreeBars } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { GoDiffIgnored } from "react-icons/go";
import { useForm, Controller } from "react-hook-form";

export function Setting() {
  const navigate = useNavigate();

  const categoryItems = [
    { value: "Javascript", label: "Javascript" },
    { value: "Typescript", label: "Typescript" },
    { value: "React", label: "React" },
    { value: "Java", label: "Java" },
    { value: "Spring", label: "Spring" },
  ];

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      stack: null,
      content: "",
    },
  });

  const onSubmit = data => {
    const newData = {
      memberId: 1,
      nickname: data.nickname,
      category: [data.stack],
    };

    axios.patch(`http://13.209.121.17:8080/questions`, newData);
    alert("회원 정보가 수정되었습니다.");
    navigate("/");
  };

  return (
    <main className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 mb-5">
          <h1 className="text-[40px] mb-10 font-bold">회원 정보 수정</h1>
          <section className="flex mb-2">
            <GoDiffIgnored size={24} />
            <span className="text-[20px] ml-[10px]">프로필 이미지</span>
          </section>
          <section className="flex">
            <VscAccount size={100} />
            <div className="flex flex-col m-3">
              <Buttons
                text="이미지 변경"
                sx={{
                  marginBottom: "10px",
                  marginLeft: "15px",
                  width: "150px",
                  color: "black",
                  border: "1px solid black",
                }}
              />
              <Buttons
                text="이미지 제거"
                sx={{
                  marginBottom: "10px",
                  marginLeft: "15px",
                  width: "150px",
                  color: "black",
                  border: "1px solid black",
                }}
              />
            </div>
          </section>
        </div>
        <div className="mt-10 mb-5">
          <section className="flex mb-2">
            <GoDiffIgnored size={24} />
            <span className="text-[20px] ml-[10px]">닉네임</span>
          </section>
          <Controller
            name="nickname"
            control={control}
            rules={{ required: "변경할 닉네임을 입력해주세요." }}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <TextField
                    value={value}
                    onChange={onChange}
                    sx={{ width: "70vw" }}
                    placeholder="My Overflow에서 사용할 닉네임을 입력해주세요."
                    control={control}
                    name="nickname"
                  />
                </>
              );
            }}
          />
          {errors.nickname && <div className="text-red-500 text-[15px] ml-3">{errors.nickname.message}</div>}
        </div>

        <div className="mt-10 mb-5 flex flex-col">
          <section className="flex mb-2">
            <GoThreeBars size={24} />
            <span className="text-[20px] ml-[10px]">관심 기술(선택)</span>
          </section>
          <Controller
            name="stack"
            control={control}
            rules={{ required: false }}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <DropDown
                    value={value}
                    onChange={onChange}
                    sx={{ width: "70vw" }}
                    items={categoryItems}
                    displayEmpty
                  />
                </>
              );
            }}
          />
          {errors.stack && <span className="text-red-500 text-[15px] ml-3">{errors.stack.message}</span>}
        </div>
        <div className="flex flex-col">
          <div className="flex justify-end mt-5 mb-7">
            <Link to="/">
              <Buttons
                sx={{ width: 140, fontSize: 18, marginRight: "30px", border: "0.5px solid gray", color: "black" }}
                text="취소"
              />
            </Link>
            <Buttons
              sx={{ width: 140, fontSize: 18, border: "0.5px solid gray", color: "black", marginRight: "30px" }}
              text="변경"
              type="submit"
            />
            <Buttons
              sx={{
                width: 140,
                fontSize: 18,
                border: "0.5px solid white",
                color: "white",
                backgroundColor: "red",
                ":hover": { backgroundColor: "black" },
              }}
              text="회원 탈퇴"
              type="button"
            />
          </div>
        </div>
      </form>
    </main>
  );
}
