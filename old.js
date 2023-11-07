import logofret from "../logofret.jpeg";
import { useState } from "react";
import { ref, set, get, child, update } from "firebase/database";
import { db } from "../firebase";
import { uid } from "uid";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submited, setSubmited] = useState(false);
  const [validated, setValidated] = useState(false);
  const [eventNumber, setEventNumber] = useState(0);

  /*
  DB 구조
  count
    ㄴ last
      ㄴ num: 2 << 마지막 번호 저장공간
      ㄴ uuid: "last"
  number
    ㄴ 01012345678 << uid
      ㄴ num: 1 << 추첨번호
      ㄴ phoneNumber: "01012345678" << 전화번호
      ㄴ uuid: "01012345678"
    ㄴ 01012341234
      ㄴ num: 2
      ㄴ phoneNumber: "01012341234"
      ㄴ uuid: "01012341234"
  */

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

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logofret}
            alt="Your Company"
            onClick={(e) => setSubmited(false)}
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            대충 메인화면
          </h2>
        </div>
        {submited ? (
          <div className="flex flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
              <p>전화번호: {phoneNumber}</p>
              <p>머라하지 입장번호?</p>
              <p className="text-8xl font-semibold">{eventNumber}</p>
              <button
                onClick={(e) => {
                  setSubmited(false);
                  setPhoneNumber(0);
                  setValidated(false);
                }}
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
                  onInput={(e) => {
                    if (e.target.value.length > e.target.maxLength)
                      e.target.value = e.target.value.slice(
                        0,
                        e.target.maxLength
                      );
                  }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                onClick={(e) => {
                  if (phoneNumber.length !== 11) {
                    setValidated(true);
                    return;
                  }
                  testFunc();
                }}
                className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
