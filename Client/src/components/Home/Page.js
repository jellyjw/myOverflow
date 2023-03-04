import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import Buttons from "../Post/Buttons";
import Pagination from "@mui/material/Pagination";

export default function Page({ pagination, onPagination }) {
  const { page, totalElements, totalPages } = pagination;
  const handleLeftPage = () => {
    if (page === 1) return;
    onPagination({ ...pagination, page: page - 1 });
  };
  const handleRightPage = () => {
    if (page === totalPages) return;
    onPagination({ ...pagination, page: page + 1 });
  };
  return (
    <div className="flex justify-center gap-10 w-full mt-5 basis-1/12 items-center">
      <Buttons text={<AiOutlineArrowLeft className="text-2xl" />} onClick={handleLeftPage} />
      <div>
        <ul className="flex gap-3">
          {Array(totalPages)
            .fill()
            .map((page, idx) => (
              <li key={idx} className="list-none" onClick={() => onPagination({ ...pagination, page: idx + 1 })}>
                <Buttons text={idx + 1}></Buttons>
              </li>
            ))}
        </ul>
      </div>
      <Buttons text={<AiOutlineArrowRight className="text-2xl" />} onClick={handleRightPage} />
    </div>
  );
}
