import { DEV_ResetRaffle, getNumberList } from "APIs/APIRaffle";
import CustomButton from "Components/CustomButton";
import PageTitle from "Components/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookieNames, deleteCookie } from "util/cookieUtil";

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

  const inputNumberhandler = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  const onClickResetRaffle = () => {
    const confirmReset = window.confirm("DB를 초기화하시겠습니까?");
    if (confirmReset) {
      DEV_ResetRaffle();
      deleteCookie(cookieNames.phoneNumber);
      deleteCookie(cookieNames.ticketNumber);
      window.alert("DB를 초기화했습니다.");
      navigate("/DEV");
    }
  };

  const phoneSearch = (target) => {
    if (target.length !== 4) {
      alert("전화번호 뒷 4자리를 입력해주세요");
      return;
    }
    const result = numList.filter((e) => e.key.slice(-4, 11) === target);
    if (result.length < 1) {
      alert("검색 결과가 없습니다");
    } else {
      navigate("/DBsearch", {
        state: result,
      });
    }
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
    <div>
      <div className="flex min-h-full items-center flex-1 flex-col justify-center">
        <PageTitle title={"추첨번호 DB 열람"} />
        {isloading ? null : (
          <div className="mt-4 w-full sm:mx-auto sm:max-w-sm">
            <div className="flex">
              <input
                type="number"
                pattern="[0-9]*"
                maxLength={4}
                placeholder="전화번호 끝 4자리"
                onChange={onChangeInputNumber}
                onInput={inputNumberhandler}
                className="block w-10/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              />
              <button
                onClick={() => {
                  phoneSearch(searchNum);
                }}
                className="w-1/6 rounded-md bg-indigo-600 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              >
                검색
              </button>
            </div>
            <CustomButton
              title={"추첨권 DB 초기화"}
              onClick={onClickResetRaffle}
            />
            <CustomButton title={"뒤로가기"} onClick={onClickBackButton} />
            <div>
              {numList && numList.length > 0 ? (
                <ul className="divide-y divide-gray-600 mt-5">
                  {numList.map((ele, idx) => (
                    <li
                      key={ele.value.num}
                      className="flex justify-between py-2"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-base font-semibold leading-6 text-gray-900">
                            {ele.value.num}
                          </p>
                        </div>
                      </div>
                      <div className="sm:flex sm:flex-col sm:items-end">
                        <p className="text-base leading-6 text-gray-900">
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
    </div>
  );
};

export default DB;
