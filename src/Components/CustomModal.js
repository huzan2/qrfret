import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { atomIsOpenModal } from "util/atom";
import Logo from "./Logo";

const CustomModal = () => {
  const setIsOpenModal = useSetRecoilState(atomIsOpenModal);
  const onClickInvisible = () => {
    setIsOpenModal(false)
  }

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => document.body.style = `overflow: auto`
  }, [])

  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-10 whitespace-pre-line" onClick={onClickInvisible}>
      <div className="mx-6 w-full bg-white rounded-lg p-4 flex flex-col align-center justify-center gap-3 break-keep h-[50%] overflow-scroll pt-[34rem]">
        <div className="w-full text-center font-bold text-xl">
          <Logo />
          {"2023년 14fret 정기공연"}
          <div />
          {"FLY WITH 14FRET"}
        </div>
        <div className="w-full text-center text-sm">
          <div className="font-bold">임원</div>
          <div className="w-full flex justify-center">
            <div className="w-[7rem] flex justify-between">
              <div className="font-bold">회장</div>
              <div>김민정</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[7rem] flex justify-between">
              <div className="font-bold">부회장</div>
              <div>안승환</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[7rem] flex justify-between">
              <div className="font-bold">총무</div>
              <div>심주원</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[7rem] flex justify-between">
              <div className="font-bold">기획부장</div>
              <div>최현성</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[7rem] flex justify-between">
              <div className="font-bold">고문</div>
              <div>박건도</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-center text-sm">
          <div className="font-bold">기획부</div>
          <div className="w-full flex justify-center">
            <div className="w-[7rem] flex justify-between">
              <div className="font-bold">부장</div>
              <div>최현성</div>
            </div>
          </div>
          <div />
          <div className="w-[12rem]">
          {"김준서 류미진 이서은 한지우"}
          </div>
          <div>{"\n"}</div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">티켓</div>
              <div>류미진 이서은</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">포스터</div>
              <div>김준서 최현성</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">리플렛</div>
              <div>이서은</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">SNS</div>
              <div>이서은 최현성</div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">웹페이지</div>
              <div>박지한 한지우</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-center text-sm">
          <div className="font-bold">{"\n보컬"}</div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">부장</div>
              <div>박지한 이시연</div>
            </div>
          </div>
          <div />
          <div className="w-[12rem]">
            {"김다솔 김민정 김민지 김선우 김준서 박건도 안병규 이주원 최승혜 최현석"}
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-center text-sm">
          <div className="font-bold">{"\n기타"}</div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">부장</div>
              <div>강재호 박건도</div>
            </div>
          </div>
          <div />
          <div className="w-[12rem]">
            {"권예찬 김민제 김상경 김원후 박준영 이주원 이지호 조현호 최현석"}
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-center text-sm">
          <div className="font-bold">{"\n베이스"}</div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">부장</div>
              <div>배유호 홍윤표</div>
            </div>
          </div>
          <div />
          <div className="w-[12rem]">
            {"이서영 이승하 임은수 한지우"}
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-center text-sm">
          <div className="font-bold">{"\n키보드"}</div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">부장</div>
              <div>이서영</div>
            </div>
          </div>
          <div />
          <div className="w-[12rem]">
            {"김민정 박민석 이서은 장우종 황정빈"}
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-center text-sm">
          <div className="font-bold">{"\n드럼"}</div>
          <div className="w-full flex justify-center">
            <div className="w-[10rem] flex justify-between">
              <div className="font-bold">부장</div>
              <div>안승환 이유진</div>
            </div>
          </div>
          <div />
          <div className="w-[12rem]">
            {"김석진 김영균 이유준 한지우"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomModal;