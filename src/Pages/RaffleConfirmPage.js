import APIRaffle from "APIs/APIRaffle";
import FloatingButtonGoToGuestBook from "Components/FloatingButtonGoToGuestBook";
import Footer from "Components/Footer";
import Header from "Components/Header";
import IconLine from 'images/icon-line.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookieNames, getCookie } from "util/cookieUtil";
import { navigationPath } from "util/navigationPath";

const RaffleConfirmPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketNumber, setTicketNumber] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      console.log("[RaffleConfirmPage] LOADING...");
    } else {
      console.log("[RaffleConfirmPage] LOADING COMPLETE!");
    }
  }, [isLoading]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const cookiePhoneNumber = getCookie(cookieNames.phoneNumber);
      const isExistPhoneNumber = await APIRaffle.getIsExistPhoneNumber(
        cookiePhoneNumber
      );
      if (isExistPhoneNumber) {
        setPhoneNumber(cookiePhoneNumber);
        setTicketNumber(isExistPhoneNumber.num);
      } else {
        navigate(navigationPath.RAFFLE_INPUT_PAGE);
      }
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center m-6 text-BLUE_5 mt-[164px] mb-[48px]">
      <FloatingButtonGoToGuestBook page={navigationPath.RAFFLE_CONFIRM_PAGE} />
      <h2 className="mt-3 text-center text-xl font-bold leading-7 tracking-tight">
        추첨권 조회
      </h2>
      {isLoading ? null : (
        <div className="mt-[-2rem] sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <p className="mb-[-3.75rem] text-[10rem] font-semibold font-['sangju']">
            {ticketNumber}
          </p>
          <img className="mx-auto w-auto" src={IconLine} alt="icon-line" />
          <p className="text-xl">
            {phoneNumber.toString().replace ? phoneNumber.toString()
              .replace(/[^0-9]/g, "")
              .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`) : phoneNumber}
          </p>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default RaffleConfirmPage;
