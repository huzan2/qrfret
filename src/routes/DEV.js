import { useNavigate } from "react-router-dom";
import { DEV_ResetRaffle } from "../APIs/API";
import CustomButton from "../Components/CustomButton";
import PageTitle from "../Components/PageTitle";
import { cookieNames, deleteCookie } from "../util/cookieUtil";

const DEVPage = () => {
  const navigate = useNavigate();

  const inputHandler = () => {

  }
  
  const onChangeInput = () => {

  }

  const onClickSetListSubmit = () => {

  }

  const onClickResetRaffle = () => {
    DEV_ResetRaffle();
    onClickResetCookie();
  }

  const onClickResetCookie = () => {
    deleteCookie(cookieNames.phoneNumber)
    deleteCookie(cookieNames.ticketNumber)
  }

  const onClickBackToMain = () => {
    navigate('/')
  }
  return (
    <div>
      <PageTitle title={"관리 페이지"} />
      <div className="mt-5" />
      <input
        onInput={inputHandler}
        onChange={onChangeInput}
        type="text"
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <CustomButton
        title={"셋리스트 입력(for test)"}
        type="submit"
        onClick={onClickSetListSubmit}
      />
      <CustomButton
        title={"추첨권 초기화"}
        onClick={onClickResetRaffle}
      />
      <CustomButton
        title={"쿠키(추첨권 번호) 초기화"}
        onClick={onClickResetCookie}
      />
      <CustomButton
        title={"돌아가기"}
        onClick={onClickBackToMain}
      />
    </div>
  )
}

export default DEVPage