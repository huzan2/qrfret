import CustomButton from "Components/CustomButton";
import Logo from "Components/Logo";
import PageTitle from "Components/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookieNames, deleteCookie } from "util/cookieUtil";
import { navigationPath } from "util/navigationPath";
import APIRaffle from './../APIs/APIRaffle';

const RaffleDBPage = () => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  const [numList, setNumList] = useState([]);
  const [searchNum, setSearchNum] = useState('');
  const [filteredList, setFilteredList] = useState([]);


  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  const TEST = async () => {};

  useEffect(() => {
    if (isloading) {
      console.log("[DB Page] LOADING...");
    } else {
      console.log("[DB Page] LOADING COMPLETE");
    }
  }, [isloading]);

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<

  /**
   * FOR INITIALIZE
   */
  useEffect(() => {
    setIsLoading(true);
    APIRaffle.getNumberList().then((res) => {
      if (res) {
        const rs = Object.entries(res)
          .map(([key, value]) => ({ key, value }))
          .sort((a, b) => a.value.num - b.value.num)
        setNumList(rs);
        setFilteredList(rs);
      }
    });
    setIsLoading(false);
  }, []);

  const onClickBackButton = () => {
    navigate(navigationPath.HOME_PAGE);
  };

  const onChangeInputNumber = (e) => {
    setSearchNum(e.target.value);
  };

  const inputNumberhandler = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  /**
   * FOR DEV: 추첨권 DB 초기화
   */
  const onClickResetRaffle = () => {
    const inputPW = prompt('비밀번호를 입력하세요.')
    if(inputPW === process.env.REACT_APP_DB_INIT_PASSWORD){
      APIRaffle.DEV_ResetRaffle()
      .then((res) => {
        deleteCookie(cookieNames.phoneNumber);
        deleteCookie(cookieNames.ticketNumber);
        window.alert("DB를 초기화했습니다.");
        navigate(navigationPath.DEV_PAGE);
      })
      .catch((err) => {
        console.err(err);
        window.alert("DB 초기화에 실패했습니다.");
      })
    }
  };

  /**
   * 출력 리스트 필터링
   */
  useEffect(() => {
    if (searchNum === '') {
      if (numList.length === 0) return;
      setFilteredList(numList)
    } else {
      const res = numList.filter((e) => {
        return e.key.indexOf(searchNum) !== -1
      })
      setFilteredList(res)
    }
  }, [searchNum])

  return (
    <div className="mx-6">
      <div className="flex min-h-full items-center flex-1 flex-col justify-center">
        <Logo />
        <PageTitle title={"추첨번호 DB 열람"} />
        {isloading ? null : (
          <div className="mt-2 w-full sm:mx-auto sm:max-w-sm">
            <CustomButton
              title={"추첨권 DB 초기화"}
              onClick={onClickResetRaffle}
            />
            <CustomButton title={"뒤로가기"} onClick={onClickBackButton} />
            <input
              type="number"
              pattern="[0-9]*"
              maxLength={11}
              placeholder="전화번호 검색"
              onChange={onChangeInputNumber}
              onInput={inputNumberhandler}
              className="block w-full rounded-md border-0 py-1.5 mt-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
            />
            <div>
              {filteredList && filteredList.length > 0 ? (
                <ul className="divide-y divide-gray-600 mt-5">
                  {filteredList.map((ele, idx) => (
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

export default RaffleDBPage;
