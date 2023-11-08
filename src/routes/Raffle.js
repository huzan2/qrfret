import { getCount, getIsExistPhoneNumber, postPhoneNumber, setCount } from "APIs/APIRaffle";
import CustomButton from "Components/CustomButton";
import PageTitle from "Components/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookieNames, setCookie } from "util/cookieUtil";

const Raffle = () => {
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [submited, setSubmited] = useState(false);
  const [validated, setValidated] = useState(false);
  const [eventNumber, setEventNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const TEST = async () => {
  }

  useEffect(() => {
    console.log("[Raffle] eventNumber CHANGED: ", eventNumber)
  }, [eventNumber])

  useEffect(() => {
    if (isLoading) {
      console.log("[Raffle] LOADING...")
    } else {
      console.log("[Raffle] LOADING COMPLETE!")
    }
  }, [isLoading])
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  /**
   * 제출 클릭시
   */
  const onClickSubmit = async () => {
    if (
      !phoneNumber
      || phoneNumber.length < 11
    ) {
      console.log("[Raffle] UNVALID INPUT")
      setValidated(true);
      return;
    }
    const isExistPhoneNumber = await getIsExistPhoneNumber(phoneNumber)
    if (isExistPhoneNumber) {
      console.log("[Raffle] PHONE NUMBER EXIST")
      setCookie(cookieNames.phoneNumber, phoneNumber)
      setCookie(cookieNames.ticketNumber, isExistPhoneNumber.num)
      navigate("/raffleticket")
    } else {
      const count = await getCount()
        .then((res) => {
          setEventNumber(res)
          setCount(res + 1)
          return res + 1
        })
        .catch(err => {
          console.warn(err)
        })
      postPhoneNumber(phoneNumber, count)
        .then(() => {
          console.log("[Raffle] PHONE NUMBER CREATED")
          setCookie(cookieNames.phoneNumber, phoneNumber)
          setCookie(cookieNames.ticketNumber, count)
          navigate("/raffleticket")
        })
        .catch(err => {
          console.warn(err)
        })
    }
  }

  /**
   * 메인페이지로 돌아가기
   */
  const onClickBackToMain = () => {
    setSubmited(false);
    setPhoneNumber(0);
    setValidated(false);
  }

  /**
   * 
   */
  const inputPhoneNumberHandler = (e) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(
        0,
        e.target.maxLength
      );
  }

  const onChangeInputPhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const onClickBackButton = () => {
    navigate("/")
  }

  /**
   * FOR INITIALIZE
   */
  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      const num = await getCount();
      setEventNumber(num)
      setIsLoading(false)
    }
    init()
  }, [])

  return (
    <>
      <div className="flex flex-col justify-center">
        <PageTitle title="추첨권 등록" />
        {
          isLoading ?
            null :
            <div>
              <div className="mt-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    전화번호를 입력하세요
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  {validated ? (
                    <p className="text-right font-medium text-sm text-red-500">
                      전화번호가 유효하지 않습니다.
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    onClick={onClickSubmit}
                    className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
        }
        <CustomButton
          title={"뒤로가기"}
          onClick={onClickBackButton}
        />
      </div>
    </>
  );

}

export default Raffle