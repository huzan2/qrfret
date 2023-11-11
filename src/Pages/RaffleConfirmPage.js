import { getIsExistPhoneNumber } from "APIs/APIRaffle"
import Logo from "Components/Logo"
import PageTitle from "Components/PageTitle"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cookieNames, getCookie } from "util/cookieUtil"
import { navigationPath } from "util/navigationPath"

const RaffleConfirmPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [ticketNumber, setTicketNumber] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      console.log("[RaffleConfirmPage] LOADING...")
    } else {
      console.log("[RaffleConfirmPage] LOADING COMPLETE!")
    }
  }, [isLoading])

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      const cookiePhoneNumber = getCookie(cookieNames.phoneNumber);
      const isExistPhoneNumber = await getIsExistPhoneNumber(cookiePhoneNumber);
      if(isExistPhoneNumber){
        setPhoneNumber(cookiePhoneNumber);
        setTicketNumber(isExistPhoneNumber.num);
      }else{
        navigate(navigationPath.RAFFLE_INPUT_PAGE)
      }
      setIsLoading(false)
    }
    init();
  }, [])

  return (
    <div className="flex flex-col justify-center m-6">
      <Logo/>
      <PageTitle title={"추첨권 조회"} />
      {
        isLoading ?
          null :
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <p>전화번호: {phoneNumber}</p>
            <p>추첨권 번호</p>
            <p className="text-8xl font-semibold">{ticketNumber}</p>
          </div>
      }
    </div>
  )
}

export default RaffleConfirmPage