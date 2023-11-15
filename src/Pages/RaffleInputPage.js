import APIRaffle from 'APIs/APIRaffle';
import CustomButton from "Components/CustomButton";
import PageTitle from "Components/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookieNames, getCookie, setCookie } from "util/cookieUtil";
import { navigationPath } from "util/navigationPath";

const RaffleInputPage = () => {
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [validated, setValidated] = useState(false);
  const [eventNumber, setEventNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const TEST = async () => {};

  useEffect(() => {
    console.log("[RaffleInputPage] eventNumber CHANGED: ", eventNumber);
  }, [eventNumber]);

  useEffect(() => {
    if (isLoading) {
      console.log("[RaffleInputPage] LOADING...");
    } else {
      console.log("[RaffleInputPage] LOADING COMPLETE!");
    }
  }, [isLoading]);
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  /**
   * 제출 클릭시
   */
  const onClickSubmit = async () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      console.log("[RaffleInputPage] UNVALID INPUT");
      setValidated(true);
      return;
    }
    const isExistPhoneNumber = await APIRaffle.getIsExistPhoneNumber(phoneNumber);
    if (isExistPhoneNumber) {
      console.log("[RaffleInputPage] PHONE NUMBER EXIST");
      setCookie(cookieNames.phoneNumber, phoneNumber);
      setCookie(cookieNames.ticketNumber, isExistPhoneNumber.num);
      navigate(navigationPath.RAFFLE_CONFIRM_PAGE);
    } else {
      const count = await APIRaffle.getCount()
        .then((res) => {
          setEventNumber(res);
          APIRaffle.setCount(res + 1);
          return res + 1;
        })
        .catch((err) => {
          console.warn(err);
        });
      APIRaffle.postPhoneNumber(phoneNumber, count)
        .then(() => {
          console.log("[RaffleInputPage] PHONE NUMBER CREATED");
          setCookie(cookieNames.phoneNumber, phoneNumber);
          setCookie(cookieNames.ticketNumber, count);
          navigate(navigationPath.RAFFLE_CONFIRM_PAGE);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const inputPhoneNumberHandler = (e) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  };

  const onChangeInputPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  /**
   * FOR INITIALIZE
   */
  useEffect(() => {
      setIsLoading(true);
      APIRaffle.getCount()
      .then(res => setEventNumber(res));
      setIsLoading(false);
  }, []);

  useEffect(() => {
    const ticketNumber = getCookie(cookieNames.ticketNumber);
    if(ticketNumber !== undefined){
      navigate(navigationPath.RAFFLE_CONFIRM_PAGE)
    }
  }, [])

  return (
    <div>
      <div className="flex flex-col justify-center m-6">
        {isLoading ? null : (
          <div>
            <PageTitle title="추첨권 등록" />
            <div className="mt-4">
              <div>
                <label className="block text-base font-medium leading-6 text-gray-900 text-center">
                  추첨번호 등록을 위하여 전화번호를 입력해주세요!
                </label>
                <div className="mt-2">
                  <input
                    onInput={inputPhoneNumberHandler}
                    onChange={onChangeInputPhoneNumber}
                    type="number"
                    pattern="[0-9]*"
                    placeholder="01012345678"
                    maxLength={11}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                  />
                </div>
              </div>
              <div>
                {validated ? (
                  <p className="text-right font-medium text-base text-red-500">
                    전화번호가 유효하지 않습니다.
                  </p>
                ) : null}
                <CustomButton
                  type="submit"
                  onClick={onClickSubmit}
                  title="확인"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaffleInputPage;
