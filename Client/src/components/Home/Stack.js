import React from "react";
import { Avatar } from "@mui/material";
// import { ReactComponent as JavaIcon } from "/images/Java-logo.svg";

export default function Stack({ stack }) {
  return (
    <>
      {stack === "전체" || (
        <div className="border border-gray-500 w-10 h-9 rounded-full flex items-center mr-2">
          {/* <Avatar alt={stack} src={`./image/${stack}-logo.png`} sx={{width:'2.2rem', height:'2rem', marginLeft:'0.1rem'}}/> */}
          <Avatar
            alt={stack}
            src={`${process.env.PUBLIC_URL}/images/${stack}-logo.png`}
            sx={{ width: "2.2rem", height: "2rem", marginLeft: "0.1rem" }}
          />
          {/* <Avatar
            alt={stack}
            src={`/images/${stack}-logo.svg`}
            sx={{ width: "2.2rem", height: "2rem", marginLeft: "0.1rem" }}
          /> */}
        </div>
      )}
    </>
  );
}
