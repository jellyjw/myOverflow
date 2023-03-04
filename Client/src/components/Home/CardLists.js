import React, { useEffect, useState } from "react";
import { getAllData, getCategoryData } from "../../util/data";
import Card from "./Card";
import SubNav from "./SubNav";
import Page from "./Page";
import PopularTap from "./PopularTap";
import LoadingIcon from "../ui/LoadingIcon";
const filteredTap = ["Javascript", "Typescript", "React", "Java", "Spring"];
export default function CardLists() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
  });
  const [click, setClick] = useState([]);
  useEffect(() => {
    const stack = click.join(",");
    setLoading(true);
    if (filter === "전체") {
      getAllData(pagination.page)
        .then(res => {
          setData(res.data);
          setPagination({
            page: res.pageInfo.page,
            totalElements: res.pageInfo.totalElements,
            totalPages: res.pageInfo.totalPages,
          });
          setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      getCategoryData(pagination.page, stack)
        .then(res => {
          setData(res.data);
          setPagination({
            page: res.pageInfo.page,
            totalElements: res.pageInfo.totalElements,
            totalPages: res.pageInfo.totalPages,
          });
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [filter, pagination.page, click]);
  return (
    <section className="max-w-screen-2xl m-auto p-5 w-[90vw]">
      <PopularTap />
      <nav className="gap-6 mb-10 flex">
        {filteredTap.map((text, idx) => (
          <SubNav
            key={idx}
            data={data}
            onData={setData}
            text={text}
            filter={filter}
            onFilter={setFilter}
            onClick={setClick}
            click={click}
          />
        ))}
      </nav>
      <div className="h-[80vh] flex flex-col">
        {loading && <LoadingIcon />}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 h-9/10 basis-10/12">
          {data && data.map((data, idx) => <Card key={idx} data={data} />)}
        </ul>
        <Page pagination={pagination} onPagination={setPagination} data={data} />
      </div>
    </section>
  );
}
