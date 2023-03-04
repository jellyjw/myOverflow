import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="w-full mb-8 h-full">
      <Slider {...settings}>
        <div className="relative bg-orange-300 rounded-lg shadow-md h-[20rem]">
          <div className='flex w-full absolute justify-between p-36'>
            <img
             src={"/images/no.png"}
             alt="xgesture"
             className='w-20 h-20 left-20'
             />
             <img
             src={"/images/no.png"}
             alt="xgesture"
             className='w-20 h-20 left-20'
             />
          </div>
          <div className='absolute left-1/3 top-1/5'>
            <img
              src={"/images/warning.png"}
              className="h-20 w-20 mb-10 mt-8"
              alt="캐러셀이미지"
            />
            <div className=''>
              <h1 className='font-bold text-2xl'>실시간 욕설/ 비방 추적중</h1>
              <h2>바른말 고운말을 사용해주세요. 비방/ 욕설 단어 사용시 무통보 삭제 됩니다.</h2>
              <h3>좋은 커뮤니티 환경을 만들어 주세요</h3>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-yellow-300 rounded-lg shadow-md relative h-[20rem]">
            <div className='flex absolute justify-around items-center w-full mt-10'>
              <div className=''>
                <img
                   src={"/images/congratulations.png"}
                  className="h-20 w-20 mb-8"
                  alt="캐러셀이미지"
                />
                <div className=''>
                  <h1 className='text-3xl font-bold mb-10'>첫 질문 이벤트</h1>
                  <h2>최초 회원가입 후 첫 질문글을 작성하시는 분들에게</h2>
                  <h2>3000포인트 상당의 현금화 가능한 지식 포인트를 드립니다</h2>
                </div>
              </div>
              <img
                   src={"/images/slash.png"}
                  className="absolute h-[23rem] "
                  alt="캐러셀이미지"
                />
              <div className='flex flex-col items-center'>
              <img
                   src={"/images/xpert.png"}
                  className="h-20 w-20 mb-8"
                  alt="캐러셀이미지"
                />
                <div className=''>
                  <h1 className='text-2xl font-semibold mb-10'>다양한 분야의 개발전문가들과 소통해보세요!</h1>
                  <h2>아무리 고민해도 해결되지 않는 궁금증, 이 곳에 공유해주세요!</h2>
                  <h2>혼자 고민하는 시간 아깝지 않으신가요?</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
