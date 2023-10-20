import { child, get, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCount, getIsExistPhoneNumber, setCount } from "../APIs/API";
import CustomButton from "../Components/CustomButton";
import PageTitle from "../Components/PageTitle";
import { db } from "../firebase";

const Raffle = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submited, setSubmited] = useState(false);
  const [validated, setValidated] = useState(false);
  const [eventNumber, setEventNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  const TEST = async () => {
    const isExistPhoneNumber = await getIsExistPhoneNumber(phoneNumber)
    if (isExistPhoneNumber) {
    } else {
      await getCount()
        .then((res) => {
          setEventNumber(res)
        })
      await setCount(eventNumber + 1)
    }
  }

  useEffect(() => {
    console.log("eventNumber CHANGED: ", eventNumber)
  }, [eventNumber])

  useEffect(() => {
    if (isLoading) {
      console.log("LOADING...")
    } else {
      console.log("LOADING COMPLETE!")
    }
  }, [isLoading])
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<

  const testFunc = () => {
    const dbref = ref(db);
    get(child(dbref, "/number")).then((snapshot) => {
      if (snapshot.exists()) {
        const temp = snapshot.toJSON();
        if (temp.hasOwnProperty(phoneNumber)) {
          // 입력받은 번호가 이미 db에 존재하는 경우
          // show own event number
          console.log("number is already exist");
        } else {
          // 처음 들어온 전화번호인 경우
          getLastNum(writeData);
        }
      }
    });
  };
  const getLastNum = async (callback) => {
    const dbref = ref(db);
    await get(child(dbref, "/count")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("changing eventnum from " + eventNumber);
        setEventNumber(snapshot.val().last.num + 1);
        // db에 저장된 마지막 번호 + 1 해서 eventNum state에 저장
        console.log("to " + eventNumber);
      } else {
        console.log("error getting lastnum");
      }
    });
    callback(); // 콜백 -> 아래 writeData()로 넘어감
  };
  const writeData = () => {
    const uuid = phoneNumber;
    const num = eventNumber;
    set(ref(db, "number/" + uuid), {
      phoneNumber,
      num,
      uuid,
    });
    setValidated(false); // css 적용 관련
    setSubmited(true); // css 적용 관련
    update(ref(db, "/count/last"), {
      num: eventNumber, // firebase db에 마지막 번호 업데이트
    });
  };

  /**
   * 제출 클릭시(폰 번호 입력 페이지)
   */
  const onClickSubmit = () => {
    if (phoneNumber.length !== 11) {
      setValidated(true);
      return;
    }
    testFunc();
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
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <PageTitle title="추첨권 등록 및 조회" />
        {
          isLoading ?
            null :
            <div>
              {submited ? (
                <div className="flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                    <p>전화번호: {phoneNumber}</p>
                    <p>머라하지 입장번호?</p>
                    <p className="text-8xl font-semibold">{eventNumber}</p>
                    <button
                      onClick={onClickBackToMain}
                      className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      돌아가기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      전화번호를 입력하세요
                    </label>
                    <div className="mt-2">
                      <input
                        onInput={inputPhoneNumberHandler}
                        onChange={onChangeInputPhoneNumber}
                        id="pnumber"
                        name="pnumber"
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
                        11자리 전화번호 입력하라고
                      </p>
                    ) : (
                      <></>
                    )}
                    <button
                      type="submit"
                      onClick={onClickSubmit}
                      className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>
        }

        <button
          onClick={TEST}
        >
          테스트
        </button>
        <CustomButton
          title={"뒤로가기"}
          onClick={onClickBackButton}
        />
      </div>
    </>
  );

}

export default Raffle