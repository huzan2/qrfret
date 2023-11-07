import { useEffect, useState } from "react";
import CustomButton from "../Components/CustomButton";
import PageTitle from "../Components/PageTitle";
import { useNavigate } from "react-router-dom";
import { getNumberList } from "../APIs/APIRaffle";

const DB = () => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  const [numList, setNumList] = useState([]);
  const [searchNum, setSearchNum] = useState();
  const onClickBackButton = () => {
    navigate("/");
  };
  const onChangeInputNumber = (e) => {
    setSearchNum(e.target.value);
  };
  useEffect(() => {
    if (isloading) {
      console.log("[DB Page] LOADING...");
    } else {
      console.log("[DB Page] LOADING COMPLETE");
    }
  }, [isloading]);
  useEffect(() => {
    setIsLoading(true);
    getNumberList().then((res) => {
      if (res) {
        console.log(
          Object.entries(res)
            .map(([key, value]) => ({ key, value }))
            .sort((a, b) => b.value.num - a.value.num)
        );
        setNumList(
          Object.entries(res)
            .map(([key, value]) => ({ key, value }))
            .sort((a, b) => a.value.num - b.value.num)
        );
      }
    });
    setIsLoading(false);
  }, []);
  return (
    <div className="flex min-h-full items-center flex-1 flex-col justify-center">
      <PageTitle title={"추첨번호 DB 열람"} />
      {isloading ? null : (
        <div className="mt-4 w-full sm:mx-auto sm:max-w-sm">
          <div className="flex">
            <input
              type="number"
              pattern="[0-9]*"
              maxLength={11}
              onChange={onChangeInputNumber}
              className="block w-10/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button className="w-1/6 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
              검색
            </button>
          </div>
          <CustomButton title={"뒤로가기"} onClick={onClickBackButton} />
          <div>
            {numList && numList.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-100 mt-5">
                {numList.map((ele, idx) => (
                  <li key={ele.value.num} className="flex justify-between py-2">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {ele.value.num}
                        </p>
                      </div>
                    </div>
                    <div className="sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {ele.value.phoneNumber}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default DB;
