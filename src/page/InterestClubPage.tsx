import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderBackButton from "../components/HeaderBackButton";
import { Images } from "../components/Images";
import PageHeader from "../components/PageHeader";

const InterestClubPage = () => {
  const [recentClubList, setRecentClubList] = useState<any[]>([]);
  const getData = localStorage.getItem("recentClub");
  useEffect(() => {
    if (getData !== null) {
      const parseData = JSON.parse(getData);
      setRecentClubList(parseData);
    }
  }, []);

  return (
    <div className="h-full pt-10 pb-16 overflow-auto">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate">내 찜 클럽</h1>
        </div>
      </PageHeader>
      <div>
        {recentClubList.map((item, idx) => {
          return (
            <div className="relative" key={idx}>
              <Link to={`/clubs/${item.id}`} state={item}>
                <div className="relative mt-6 h-12">
                  <img
                    src={item.clubImage}
                    alt="클럽 이미지"
                    className="w-12 rounded-2xl inline-block border-dashed border-2 border-gray-500"
                  />
                  <div className="text-12 absolute top-0 left-16">
                    {item.clubTitle}
                  </div>
                  <div className="text-10 absolute top-5 left-16 text-gray-400">
                    {item.clubDescription}
                  </div>
                  <div className="text-10 absolute bottom-0 left-16">
                    <span className="border-r-2 border-solid border-gray-200 pr-1 mr-1">
                      {item.region}
                    </span>
                    <span className="text-gray-400 mr-2">
                      멤버 {item.member}
                    </span>
                    <span className="text-gray-400 bg-gray-100 pl-1 pr-1 pt-0.5 pb-0.5 rounded-md">
                      {item.interestTitle}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterestClubPage;