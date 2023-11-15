import CustomButton from "Components/CustomButton";
import Footer from "Components/Footer";
import Header from "Components/Header";
import Logo from "Components/Logo";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cookieNames, getCookie } from "util/cookieUtil";
import { navigationPath } from "util/navigationPath";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  const TEST = async () => {};

  useEffect(() => {
    if (isLoading) {
      console.log("[HomePage] LOADING...");
    } else {
      console.log("[HomePage] LOADING COMPLETE!");
    }
  }, [isLoading]);
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<FOR DEBUG<<<<<<<<<<<<<<<

  /**
   * FOR INITIALIZE
   */
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setIsLoading(false);
    };
    init();
  }, []);

  const onClickSetListButton = () => {
    navigate(navigationPath.SET_LIST_PAGE);
  };

  const onClickRaffleButton = () => {
    if (getCookie(cookieNames.phoneNumber) === undefined) {
      navigate(navigationPath.RAFFLE_INPUT_PAGE);
    } else {
      navigate(navigationPath.RAFFLE_CONFIRM_PAGE);
    }
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if(type === 'setlist'){
      navigate(navigationPath.SET_LIST_PAGE)
    }else if(type === 'raffle'){
      if (getCookie(cookieNames.phoneNumber) === undefined) {
        navigate(navigationPath.RAFFLE_INPUT_PAGE);
      } else {
        navigate(navigationPath.RAFFLE_CONFIRM_PAGE);
      }
    }
  }, [searchParams])

  return (
    <>
    <Header/>
      <div className="flex flex-col justify-center m-6  mb-[48px]">
        {isLoading ? null : (
          <div>
            <Logo/>
            <CustomButton
              title={"셋리스트 조회"}
              onClick={onClickSetListButton}
            />
            <CustomButton
              title={"추첨권 등록 및 조회"}
              onClick={onClickRaffleButton}
            />
          </div>
        )}
      </div>
    <Footer/>
    </>
  );
};

export default HomePage;
