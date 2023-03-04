import Buttons from "../components/Post/Buttons";
import DropDown from "../components/Post/DropDown";
import { GoBook, GoDiffIgnored, GoThreeBars } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";

export function Post() {
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
      title: data.title,
      category: [data.stack],
      content: data.content,
    };
    axios.post(`http://13.209.121.17:8080/questions`, newData);
    alert("질문이 등록되었어요.");
    navigate("/");
  };

  return (
    <>
      <main className="flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <section className="flex">
              <GoBook size={24} />
              <span className="text-[20px] ml-[10px]">제목</span>
            </section>
            <Controller
              name="title"
              control={control}
              rules={{ required: "질문 제목은 필수 입력사항입니다." }}
              render={({ field: { value, onChange } }) => {
                return (
                  <>
                    <input hidden="hidden" />
                    <TextField
                      value={value}
                      onChange={onChange}
                      sx={{ width: "70vw" }}
                      placeholder="질문 제목을 입력해주세요."
                      control={control}
                      name="title"
                    />
                  </>
                );
              }}
            />
            {errors.title && <div className="text-red-500 text-[15px] ml-3">{errors.title.message}</div>}
          </div>
          <div className="mb-5 flex flex-col">
            <section className="flex">
              <GoThreeBars size={24} />
              <span className="text-[20px] ml-[10px]">기술 스택</span>
            </section>
            <Controller
              name="stack"
              control={control}
              rules={{ required: "기술 스택은 필수 선택사항입니다." }}
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
            <section className="flex">
              <GoDiffIgnored size={24} />
              <span className="text-[20px] ml-[10px]">질문 내용</span>
            </section>
            <Controller
              name="content"
              control={control}
              rules={{ required: "질문 내용은 필수 입력사항입니다." }}
              render={({ field: { value, onChange } }) => {
                return (
                  <>
                    <TextField
                      name="content"
                      value={value}
                      onChange={onChange}
                      direction="row"
                      className="w-[70vw]"
                      sx={{
                        width: "70vw",
                        "& .MuiInputBase-root": {
                          height: 500,
                        },
                      }}
                      rows={20}
                      placeholder="질문 내용을 입력해주세요."
                      multiline
                      onClick={() => onSubmit()}
                    />
                  </>
                );
              }}
            />

            {errors.content && <span className="text-red-500 text-[15px] ml-3">{errors.content.message}</span>}
            <div className="flex justify-end mt-5 mb-7">
              <Link to="/">
                <Buttons
                  sx={{ width: 140, fontSize: 18, marginRight: "30px", border: "0.5px solid gray", color: "black" }}
                  text="취소"
                />
              </Link>
              <Buttons
                sx={{ width: 140, fontSize: 18, border: "0.5px solid gray", color: "black" }}
                text="등록"
                type="submit"
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
