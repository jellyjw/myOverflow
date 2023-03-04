import React, { useState } from 'react';

export default function LoadingIcon() {
    const [loading, setLoading] = useState(true);
  function handleClick() {
    setLoading(true);
  }
    return (  
    <>
       <img src={"/images/spinner.gif"} alt="logo" className="w-[180px] inline-block bg-transparent" />
    </>
    );
}

