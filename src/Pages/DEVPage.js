import CustomButton from "Components/CustomButton";
import Logo from "Components/Logo";
import PageTitle from "Components/PageTitle";
import { useNavigate } from "react-router-dom";
import { cookieNames, deleteCookie } from "util/cookieUtil";
import { navigationPath } from "util/navigationPath";

const DEVPage = () => {
  const navigate = useNavigate();

  const inputHandler = () => {};

  const onChangeInput = () => {};

  const onClickSetListSubmit = () => {};

  const onClickResetCookie = () => {
    deleteCookie(cookieNames.phoneNumber);
    deleteCookie(cookieNames.ticketNumber);
    window.alert("추첨권 쿠키를 초기화했습니다.");
  };

  const onClickGoToDB = () => {
    navigate(navigationPath.RAFFLE_DB_PAGE);
  };

  const onClickBackToMain = () => {
    navigate(navigationPath.HOME_PAGE);
  };
  
  return (
    <div className="flex flex-col justify-center m-6">
      <Logo/>
      <PageTitle title={"=======DEV======="} />
      <div className="mt-5" />
      <CustomButton
        title={"쿠키(추첨권 번호) 초기화"}
        onClick={onClickResetCookie}
      />
      <CustomButton title={"DB 정보 열람하기"} onClick={onClickGoToDB} />
      <CustomButton title={"돌아가기"} onClick={onClickBackToMain} />
    </div>
  );
};

export default DEVPage;
