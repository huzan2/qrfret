import CustomButton from "Components/CustomButton";
import Logo from "Components/Logo";
import PageTitle from "Components/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cookieNames, getCookie } from "util/cookieUtil";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>FOR DEBUG>>>>>>>>>>>>>>>
  const TEST = async () => {};

  useEffect(() => {
    if (isLoading) {
      console.log("[Home Papge] LOADING...");
    } else {
      console.log("[Home Papge] LOADING COMPLETE!");
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
    navigate("/setlist");
  };

  const onClickRaffleButton = () => {
    if (getCookie(cookieNames.phoneNumber) === undefined) {
      navigate("/raffle");
    } else {
      navigate("/raffleticket");
    }
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if(type === 'setlist'){
      navigate('/setlist')
    }else if(type === 'raffle'){
      if (getCookie(cookieNames.phoneNumber) === undefined) {
        navigate("/raffle");
      } else {
        navigate("/raffleticket");
      }
    }
  }, [searchParams])

  return (
    <>
      <div className="flex flex-col justify-center">
        {isLoading ? null : (
          <div className="m-6">
            <Logo/>
            <PageTitle title={"2023 14fret 정기공연"} />
            <PageTitle title={"Fly with 14FRET"} />
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
    </>
  );
};

export default Home;
