import CustomButton from "Components/CustomButton";
import PageTitle from "Components/PageTitle";
import { useNavigate } from "react-router-dom";
import { cookieNames, deleteCookie } from "util/cookieUtil";

const DEVPage = () => {
  const navigate = useNavigate();

  const inputHandler = () => {};

  const onChangeInput = () => {};

  const onClickSetListSubmit = () => {};

  const onClickResetCookie = () => {
    deleteCookie(cookieNames.phoneNumber);
    deleteCookie(cookieNames.ticketNumber);
  };

  const onClicktoDB = () => {
    navigate("/DB");
  };

  const onClickBackToMain = () => {
    navigate("/");
  };
  return (
    <div>
      <PageTitle title={"=======DEV======="} />
      <div className="mt-5" />
      {/* <input
        onInput={inputHandler}
        onChange={onChangeInput}
        type="text"
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6 sm:mx-auto sm:w-full sm:max-w-sm"
      />
      <CustomButton
        title={"셋리스트 입력(for test)"}
        type="submit"
        onClick={onClickSetListSubmit}
      /> */}
      <CustomButton
        title={"쿠키(추첨권 번호) 초기화"}
        onClick={onClickResetCookie}
      />
      <CustomButton title={"DB 정보 열람하기"} onClick={onClicktoDB} />
      <CustomButton title={"돌아가기"} onClick={onClickBackToMain} />
    </div>
  );
};

export default DEVPage;
