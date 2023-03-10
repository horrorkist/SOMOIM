import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderBackButton from "./HeaderBackButton";
import PageHeader from "./PageHeader";

const regionObj = {
  home: "집",
  work: "직장(활동지역)",
  interested: "관심지역",
};

type Region = keyof typeof regionObj;

export default function RegionSelect() {
  const location = useLocation();
  const region = location.pathname.split("/")[2] as Region;
  return (
    <div className="absolute z-20 inset-0 w-full h-full p-4 bg-white rounded-md flex flex-col items-start justify-start text-black animate-slide-up">
      <PageHeader>
        <div className="flex items-center space-x-4">
          <HeaderBackButton />
          <h2 className="text-xl">{regionObj[region]} 지역 선택</h2>
        </div>
      </PageHeader>
      <input
        type="text"
        placeholder="동, 읍, 면을 입력해주세요."
        className="rounded-md bg-gray-300 mt-12 text-black outline-none p-4 w-full my-4"
      />
    </div>
  );
}